import React, { useState, useEffect } from "react";
import data from "../../assets/principal.json";
import { Link, useLocation, useNavigate, useParams } from "react-router";

const Classdetails = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const paramData = useParams();
  const classDetails = data;
  const subjectId = location?.state?.subjectId ? location?.state?.subjectId : paramData?.subjectId;
  const currentLevel = localStorage.getItem("classLevel");
  const [studentData, setStudentData] = useState(data?.studentData || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectList, setSubjectList] = useState(data?.courseData || []);

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const filteredStudent = studentData?.filter(
    (student) =>
      student?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.status?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (subjectId) {
      console.log(subjectId);
    
    }
    if (currentLevel) {
      //   dispatch(getSubjectList({level_id : currentLevel}))
      console.log({ level_id: currentLevel });
    }
  }, [subjectId, currentLevel]);

  useEffect(() => {
    if (selectedCourses?.length > 0) {
      //   dispatch(getClassDetailBySubject({subject_id: selectedCourses?.[0]}))
      console.log({ subject_id: selectedCourses?.[0] });
    }
  }, [selectedCourses?.length > 0, selectedCourses]);

  useEffect(() => {
    if (classDetails) {
      //   dispatch(setTeacherCurrentSubject(classDetails?.subject_name))

      console.log(classDetails?.courseData?.title);
    }
  }, [classDetails]);

  const handleToggle = (id, list, setList) => {
    if (list.includes(id)) {
      setList(list.filter((item) => item !== id)); // Uncheck
    } else {
      setList([...list, id]); // Check
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdowns = document.querySelectorAll(".influ-dropdown");
      let clickedInsideDropdown = false;

      dropdowns.forEach((dropdown) => {
        if (dropdown.contains(event.target)) {
          clickedInsideDropdown = true;
        }
      });

      if (!clickedInsideDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="top-head align-items-start">
        <div className="top-head-in">
          <h1>Life Dream</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
          <ul>
            <li>
              <img src="../images/subject-detail/lessons.svg" alt="" /> 8
              lessons
            </li>
          </ul>
        </div>
        <div className="back-btn ms-auto">
          {/* <a href="subject-detail.html">
						<img src="../images/view-icon.svg" alt=''/> View Subject Info
					</a> */}
          {/* <Link to="/principal/student-subject-detail">
            <img src="../images/view-icon.svg" alt="" /> View Subject Info
          </Link> */}

               <Link to={`/principal/student-subject-detail/${subjectId}`} state={{ subjectId: subjectId }}>
            <img src="/images/view-icon.svg" alt="" /> View Subject Info
          </Link>
        </div>
        <div className="influ-btns mx-3">
          {/* <!-- INNER-DROPDOWN --> */}
          <div className="influ-dropdown">
            <button
              className="influ-btn influ-drop-btn"
              type="button"
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "courseDropdown" ? null : "courseDropdown"
                )
              }
            >
              {/* All Subjects <i className={`fas fa-chevron-down ${activeDropdown === "courseDropdown" ? "active" : ""}`}></i> */}
              All Subjects{" "}
              <i
                className={`fa-regular ${
                  activeDropdown === "courseDropdown"
                    ? "fa-angle-up"
                    : "fa-angle-down"
                }`}
              ></i>
            </button>

            <div
              className="influ-drop-list"
              style={{
                display: activeDropdown === "courseDropdown" ? "block" : "none",
              }}
            >
              <div className="influ-drop-list-inner">
                {subjectList?.map((item) => (
                  // <div key={item.id} className="influ-drop-list-item">
                  //   <input type="checkbox" style={selectedCourses.length > 0 && !selectedCourses.includes(item.id) ? {backgroundColor:"#d7cdcd"} : {}}
                  //     checked={selectedCourses.includes(item.id)} disabled={selectedCourses.length > 0 && !selectedCourses.includes(item.id)}
                  //     onChange={() =>
                  //       handleToggle(
                  //         item.id,
                  //         selectedCourses,
                  //         setSelectedCourses
                  //       )
                  //     }
                  //   />
                  //   {item.name}
                  // </div>
                  <div key={item.id} className="influ-drop-list-item">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(item.id)}
                      onChange={() => {
                        if (selectedCourses.includes(item.id)) {
                          setSelectedCourses([]); // Unselect if already selected
                        } else {
                          setSelectedCourses([item.id]); // Select this student only
                        }
                      }}
                    />
                    {item?.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <!-- INNER-DROPDOWN --> */}
        </div>
        {/* <!-- <select name="year" className="mx-3">
					<option value="1">Subject Name</option>
					<option value="2">Life Dream</option>
					<option value="3">Self-Awareness</option>
					<option value="4">Cognitive Construction</option>
					<option value="5">Coping</option>
					<option value="6">Interpersonal Relationships</option>
				</select> --> */}
        <div className="back-btn">
          <Link onClick={() => navigate(-1)}>
            <img src="../images/baseline-assessment/back-icon.svg" alt="" />{" "}
            Back
          </Link>
        </div>
      </div>
      <div className="progress-grid principal-progress">
        <div className="row g-0">
          <div className="col-lg-4">
            <div className="progress-grid-in ms-0 class">
              <h2>
                <img src="../images/dashboard/progress-grid/9.svg" alt="" />{" "}
                Class Average Score
              </h2>
              <h3>84.2%</h3>
              {/* <!-- <a href="#">See details <i className="fa-regular fa-arrow-right"></i></a> --> */}
              <p>Last updated 2 hours ago</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="progress-grid-in class">
              <h2>
                <img src="../images/dashboard/progress-grid/8.svg" alt="" />{" "}
                Overall Completion Rate
              </h2>
              <h3>78%</h3>
              {/* <!-- <a href="#">See details <i className="fa-regular fa-arrow-right"></i></a> --> */}
              <p>Last updated 2 hours ago</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="progress-grid-in class">
              <h2>
                <img src="../images/dashboard/progress-grid/10.svg" alt="" />{" "}
                Lessons Quiz Score
              </h2>
              <h3>92%</h3>
              {/* <!-- <a href="#">See details <i className="fa-regular fa-arrow-right"></i></a> --> */}
              <p>Last updated 2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-subjects">
        <div className="top-head">
          <div className="top-head-in">
            <h1 className="mb-0">Students({studentData?.length})</h1>
          </div>
          {/* <div className="students-src">
						<input type="text" placeholder="Search emails by subject, sen....." />
					</div> */}

          <div className="students-src">
            <input
              type="text"
              placeholder="Search emails by subject, sen....."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* <!-- <select name="subject" className="ms-auto">
						<option value="1">Subject</option>
						<option value="2">Life Dream</option>
						<option value="3">Subject 2</option>
						<option value="4">Subject 3</option>
					</select> --> */}
          {/* <!-- <a href="#" className="details-cta">
						<img src="../images/view-icon.svg" alt=''/>
						View Full Details
					</a> --> */}
        </div>
        <div className="table-responsive">
          <table>
            <tr>
              <th style={{ width: "250px" }}>Student Name</th>
              <th>Status </th>
              <th style={{ width: "300px" }}>Completion Score </th>
              <th>Avg. Score</th>
              <th>Action </th>
            </tr>

            {!filteredStudent || filteredStudent.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{ paddingTop: "25px", textAlign: "center" }}
                >
                  No Student Available
                </td>
              </tr>
            ) : (
              filteredStudent.map((student, index) => (
                <tr key={index}>
                  <td>{student?.name || "Lorem Ipsum"}</td>
                  <td>
                    <div
                      className={
                        student?.status == "Completed"
                          ? "status"
                          : "inactive status"
                      }
                    >
                      {student?.status || "Completed"}
                    </div>
                  </td>
                  <td>
                    {/* <div className="prog">
									{student?.completionScore||"91.0%"}
									<div className="progress">
										<div className="progress-bar" style={{ width: '91.2%' }} role="progressbar"
											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
											aria-valuemax="100"></div>
									</div>
								</div> */}

                    <div className="prog">
                      {student?.completionScore || "91.0%"}
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{ width: student?.completionScore || "91.0%" }}
                          role="progressbar"
                          aria-label="Basic example"
                          aria-valuenow={
                            parseFloat(student?.completionScore) || 91.0
                          }
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ color: "#16A34A" }}>
                      {student?.avgScore || "91.2%"}
                    </div>
                  </td>
                  {/* <td>
                    <Link to="/principal/student-profile">
                      <i className="fa-light fa-eye"></i> View Details
                    </Link>
                  </td> */}


                   <td>
                      <Link
                        to="/principal/student-profile"
                        state={{
                          studentId: student?.student_id,
                          subjectId:
                            selectedCourses?.length > 0 ? selectedCourses[0] : subjectId,
                        }}
                      >
                        <i className="fa-light fa-eye"></i> View Details
                      </Link>
                    </td>
                </tr>
              ))
            )}

            {/* <tr>
							<td>Lorem Ipsum</td>
							<td>
								<div className="inactive status">Inactive</div>
							</td>
							<td>
								<div className="prog">
									91.2%
									<div className="progress">
										<div className="progress-bar" style={{ width: '91.2%' }} role="progressbar"
											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
											aria-valuemax="100"></div>
									</div>
								</div>
							</td>
							<td>
								<div style={{ color: "#16A34A" }}>91.2%</div>
							</td>
							<td>
								<Link to="/principal/student-profile"><i className="fa-light fa-eye"></i> View Details</Link>
							</td>
						</tr>
						<tr>
							<td>Lorem Ipsum</td>
							<td>
								<div className="status">Completed</div>
							</td>
							<td>
								<div className="prog">
									91.2%
									<div className="progress">
										<div className="progress-bar" style={{ width: '91.2%' }} role="progressbar"
											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
											aria-valuemax="100"></div>
									</div>
								</div>
							</td>
							<td>
								<div style={{ color: "#16A34A" }}>91.2%</div>
							</td>
							<td>
								<Link to="/principal/student-profile"><i className="fa-light fa-eye"></i> View Details</Link>
							</td>
						</tr>
						<tr>
							<td>Lorem Ipsum</td>
							<td>
								<div className="status">Completed</div>
							</td>
							<td>
								<div className="prog">
									91.2%
									<div className="progress">
										<div className="progress-bar" style={{ width: '91.2%' }} role="progressbar"
											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
											aria-valuemax="100"></div>
									</div>
								</div>
							</td>
							<td>
								<div style={{ color: "#16A34A" }}>91.2%</div>
							</td>
							<td>
								<Link to="/principal/student-profile"><i className="fa-light fa-eye"></i> View Details</Link>
							</td>
						</tr> */}
          </table>
        </div>
      </div>
    </>
  );
};

export default Classdetails;
