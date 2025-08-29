import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectList, setTeacherStudentName, studentProfilePerformance } from "../../redux/slices/teacher/dashboardSlice";

const StudentProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showFullDetails, setShowFullDetails] = useState(false);
  const currentLevel = localStorage.getItem("classLevel")

  const studentId = location?.state?.studentId;
  const subjectId = location?.state?.subjectId;

  const { studentProfileInfo, subjectList } = useSelector((state) => state.dashboard);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showAllLession, setShowAllLesson] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    dispatch(studentProfilePerformance({student_id: studentId,subject_id: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId,}));
  }, [studentId, selectedCourses]);

  useEffect(() => {
    if(currentLevel){
      dispatch(getSubjectList({level_id : currentLevel}))
    }
  }, [currentLevel]);

  useEffect(() => {
    if (studentProfileInfo) {
      dispatch(setTeacherStudentName(studentProfileInfo?.student_name))
    }
  }, [studentProfileInfo]);

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
      <div className="top-head prog-sco-wrp">
        <div className="top-head-in">
          <h1>Student Profile</h1>
          <p>Detailed view of student performance and progress</p>
        </div>
        <div className="back-btn">
          <Link to="#" onClick={() => navigate(-1)}>
            <img src="../images/baseline-assessment/back-icon.svg" alt="back" />{" "}
            Back
          </Link>
        </div>
      </div>

      <div className="student-short-info">
        <h3> {studentProfileInfo?.student_name} <span>Overall Score</span> </h3>
        <p> {studentProfileInfo?.student_email} <b>{studentProfileInfo?.overall_score}%</b> </p>
      </div>

      <div className="my-subjects">
        <div className="top-head">
          <div className="top-head-in"> 
            <h1 className="mb-0">Subject Wise Quiz Scores</h1>
          </div>

          <div className="influ-btns ms-auto">
            <div className="influ-dropdown">
              <button  className="influ-btn influ-drop-btn" type="button" onClick={() => setActiveDropdown(activeDropdown === "courseDropdown" ? null : "courseDropdown" ) } > All Subjects
                <i className={`fa-regular ${ activeDropdown === "courseDropdown" ? "fa-angle-up" : "fa-angle-down" }`} 
                ></i>
              </button>
              <div className="influ-drop-list" style={{ display: activeDropdown === "courseDropdown" ? "block" : "none" }} >

                <div className="influ-drop-list-inner">
                  {subjectList?.map((item) => (
                    <div key={item.id} className="influ-drop-list-item">
                      <input type="checkbox" checked={selectedCourses.includes(item.id)} 
                        onChange={() => {
                          if (selectedCourses.includes(item.id)) {
                            setSelectedCourses([]); // Unselect if already selected
                          } else {
                            setSelectedCourses([item.id]); // Select this student only
                          }
                        }}
                      />
                      {item.name}
                    </div>
                ))}
                </div>
              </div>
            </div>
          </div>

          {!showFullDetails && (
            <div className="back-btn ms-2">
              <a href="" onClick={(e) => { e.preventDefault();
                  setShowFullDetails((prev) => !prev);
                  setActiveDropdown(activeDropdown === "lessionDropdown" ? null : "lessionDropdown" );
                }}>
                <img src="../images/view-icon.svg" alt="" /> View Full Details
              </a>
            </div>
          )}
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th style={{ width: "250px" }}>Assessment Type</th>
                <th>Lesson </th>
                <th style={{ width: "300px" }}>Score </th>
                <th>Status </th>
                {showFullDetails && <th>Action </th>}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Baseline</td>
                <td>---</td>
                <td>
                  <div className="prog">
                    {studentProfileInfo?.baseline_score}%
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `${studentProfileInfo?.baseline_score}%`}}
                        role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" 
                        aria-valuemax="100" ></div>
                    </div>
                  </div>
                </td>

                <td>
                  <div className={`status ${["not_started", "not_completed", "in_progress"].includes(studentProfileInfo?.baseline_status) && "review"}`}>
                    {studentProfileInfo?.baseline_status?.replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase()) || "Not Started"}
                  </div>
                </td>
                <td>
                  {showFullDetails &&  !["not_started", "not_completed", "in_progress"].includes(studentProfileInfo?.baseline_status) && (
                    <Link to="/teacher/student-baseline-assessment" state={{studentId: studentId, subjectId: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId,}}>
                      <i className="fa-light fa-eye"></i> View Full Details
                    </Link>
                  )}
                </td>
              </tr>
              <tr>
                <td>Lesson Quiz</td>
                <td onClick={() => setShowAllLesson(!showAllLession)}> All Lessons
                  <button type="button" className="lessons-btn" >
                    <i className="fa-solid fa-angle-down"></i>
                  </button>
                </td>
                <td>&nbsp;</td>
                <td>
                  <div className={`status ${["not_started", "not_completed", "in_progress", ""].includes(studentProfileInfo?.lesson_overall_status) && "review"}`}>{studentProfileInfo?.lesson_overall_status?.replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase()) || "Not Started"}</div>
                </td>
              </tr>

              {/* This section dynamically generates the dropdown list */}
              {studentProfileInfo?.lesson_wise?.map((lesson, index) => (
                <tr key={index} className="lessons-list" style={ showAllLession ? {} : { display: "none" } } >
                  <td>&nbsp;</td>
                  <td>{lesson?.lesson_name}</td>
                  <td>
                    <div className="prog">
                      {lesson?.percentage}%
                      <div className="progress">
                        <div className="progress-bar" style={{ width: `${lesson?.percentage}%`, 
                            backgroundColor: lesson?.percentage < 70 ? "#F28100" : undefined, }}
                          role="progressbar" aria-label={`Progress for Lesson ${lesson?.lesson_id}`}
                          aria-valuenow={lesson?.percentage} aria-valuemin="0" aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={`status ${["not_started", "not_completed", "in_progress"].includes(lesson?.status) && "review"}`} >
                      { lesson?.status == "completed" && lesson?.percentage < 70
                        ? "Review" : lesson?.status.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) || "Not Started"}
                    </div>
                  </td>

                  {showFullDetails &&  !["not_started", "not_completed", "in_progress"].includes(lesson?.status) && (
                    <td>
                      <Link to={`/teacher/student-lesson-quiz?lessonId=${lesson?.lesson_id}&studentId=${studentId}`} >
                        <i className="fa-light fa-eye"></i> View Full Details
                      </Link>
                    </td>
                  )}
                </tr>
              ))}

              <tr>
                <td>Summative</td>
                <td>---</td>
                <td>
                  <div className="prog">
                    {studentProfileInfo?.summative_score}%
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `${studentProfileInfo?.summative_score}%`,
                          backgroundColor: "#F28100", }}
                        role="progressbar" aria-label="Basic example" aria-valuenow="60" aria-valuemin="0" 
                        aria-valuemax="100" ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={`status ${["not_started", "not_completed", "in_progress"].includes(studentProfileInfo?.summative_status) && "review"}`}>
                    {studentProfileInfo?.summative_status?.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) || "Not Started"}
                  </div>
                </td>
                <td>
                  {showFullDetails &&  !["not_started", "not_completed", "in_progress"].includes(studentProfileInfo?.summative_status) && (
                    <Link to="/teacher/student-summative-assessment" state={{studentId: studentId, subjectId: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId,}}>
                      <i className="fa-light fa-eye"></i> View Full Details
                    </Link>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;