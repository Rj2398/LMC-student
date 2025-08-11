import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import data from "../../assets/teacher.json";
import { useDispatch, useSelector } from "react-redux";
import { getClassDetailBySubject, getSubjectList } from "../../redux/slices/teacher/dashboardSlice";
import Loading from "../common/Loading";

const ClassDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const paramData = useParams();
  const navigate = useNavigate();
  const currentLevel = localStorage.getItem("classLevel")

  const subjectId = location?.state?.subjectId ? location?.state?.subjectId : paramData?.subjectId;
  const { classDetails,subjectList } = useSelector((state) => state.dashboard)

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudent = classDetails?.students?.filter((student) => student.student_name.toLowerCase().includes(searchQuery.toLowerCase()) || student.student_email.toLowerCase().includes(searchQuery.toLowerCase()) || student?.status?.toLowerCase().includes(searchQuery.toLowerCase()))

  useEffect(() => {
    if(subjectId){
      dispatch(getClassDetailBySubject({subject_id: subjectId}))
    }
    if(currentLevel){
      dispatch(getSubjectList({level_id : currentLevel}))
    }
  },[subjectId, currentLevel])

  useEffect(() => {
    if(selectedCourses?.length > 0){
      dispatch(getClassDetailBySubject({subject_id: selectedCourses?.[0]}))
    }
  },[selectedCourses?.length > 0])

  const handleToggle = (id, list, setList) => {
    if (list.includes(id)) {
      setList(list.filter((item) => item !== id)); // Uncheck
    } else {
      setList([...list, id]); // Check 
    }
  };

  return (
    <>
      <div className="top-head align-items-start">
        <div className="top-head-in">
          <h1>{classDetails?.subject_name || "Not Available"}</h1>
          <p>{classDetails?.subject_desc || "Not Available"}</p>
          <ul>
            <li>
              <img src="/images/subject-detail/lessons.svg" alt="" /> {classDetails?.total_lesson + " lessons"}
            </li>
          </ul>
        </div>
        <div className="back-btn ms-auto">
          <Link to={`/teacher/subject-detail/${subjectId}`} state={{ subjectId: subjectId }}>
            <img src="/images/view-icon.svg" alt="" /> View Subject Info
          </Link>
        </div>
        <div className="influ-btns mx-3">
          {/* <!-- INNER-DROPDOWN --> */}
          <div className="influ-dropdown">
            <button className="influ-btn influ-drop-btn" type="button"
              onClick={() => setActiveDropdown(activeDropdown === "courseDropdown" ? null : "courseDropdown") } >
              {/* All Subjects <i className={`fas fa-chevron-down ${activeDropdown === "courseDropdown" ? "active" : ""}`}></i> */}
              All Subjects <i className={`fa-regular ${activeDropdown === "courseDropdown" ? "fa-angle-up" : "fa-angle-down"}`}></i>
            </button>

            <div className="influ-drop-list" style={{ display: activeDropdown === "courseDropdown" ? "block" : "none" }} >
              <div className="influ-drop-list-inner">
                
                {subjectList?.map((item) => (
                  <div key={item.id} className="influ-drop-list-item">
                    <input
                      type="checkbox" style={selectedCourses.length > 0 && !selectedCourses.includes(item.id) ? {backgroundColor:"#d7cdcd"} : {}}
                      checked={selectedCourses.includes(item.id)}
                      disabled={selectedCourses.length > 0 && !selectedCourses.includes(item.id)}
                      onChange={() =>
                        handleToggle(
                          item.id,
                          selectedCourses,
                          setSelectedCourses
                        )
                      }
                    />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <!-- INNER-DROPDOWN --> */}
        </div>

        <div className="back-btn">
          <Link to="#" onClick={() => navigate(-1)}>
            <img src="/images/baseline-assessment/back-icon.svg" alt="back" />{" "}
            Back
          </Link>
        </div>
      </div>
      <div className="my-subjects">
        <div className="top-head">
          <div className="top-head-in">
            <h1 className="mb-0">Students({classDetails?.students?.length})</h1>
          </div>
          <div className="students-src">
            <input type="text" placeholder="Search emails by subject, sen....." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} /> 
          </div>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr style={{borderBottom:"1px solid #E5E7EB"}}>
                <th style={{ width: "250px" }}>Student Name</th>
                <th>Status </th>
                <th style={{ width: "400px" }}>Completion Score </th>
                <th>Avg. Score</th>
                <th>Action </th>
              </tr>
            </thead>

            <tbody>
              {(!filteredStudent || filteredStudent.length === 0) && (
                <tr> <td colSpan="100%" style={{ paddingTop: "25px", textAlign: "center" }}> No Student Available </td> </tr> )}

              {filteredStudent?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.student_name || "Not Available"}</td>
                  <td> <div className="status">{item?.status}</div> </td>
                  <td>
                    <div className="prog">
                      {item?.overall_percentage || "88.5"}%
                      <div className="progress">
                        <div className="progress-bar" style={{ width: `${item?.overall_percentage}%` }}
                          role="progressbar" aria-label="Basic example" aria-valuenow="75"
                          aria-valuemin="0" aria-valuemax="100" ></div>
                      </div>
                    </div>
                  </td>
                  <td> <div style={{ color: "#16A34A" }}>{`${item?.overall_percentage}%`}</div> </td>
                  <td>
                    <Link to="/teacher/student-profile" state={{studentId : item.student_id, subjectId: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId }}> <i className="fa-light fa-eye"></i> View Details </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ClassDetail;