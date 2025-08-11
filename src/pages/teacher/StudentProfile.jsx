import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import data from "../../assets/teacher.json";
import { useDispatch, useSelector } from "react-redux";
import { studentProfilePerformance } from "../../redux/slices/teacher/dashboardSlice";

const StudentProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  const studentId = location?.state?.studentId;
  const subjectId = location?.state?.subjectId;

  const { studentProfileInfo } = useSelector((state) => state.dashboard)

  useEffect(() => {
    dispatch(studentProfilePerformance({student_id: studentId,subject_id:subjectId}))
  },[studentId])

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleToggle = (id, list, setList) => {
    if (list.includes(id)) {
      setList(list.filter((item) => item !== id)); // Uncheck
    } else {
      setList([...list, id]); // Check
    }
  };

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
        <h3>
          {studentProfileInfo?.student_name} <span>Overall Score</span>
        </h3>
        <p>
          {studentProfileInfo?.student_email} <b>{studentProfileInfo?.overall_score}%</b>
        </p>
      </div>
      <div className="my-subjects">
        <div className="top-head">
          <div className="top-head-in">
            <h1 className="mb-0">Subject Wise Quiz Scores</h1>
          </div>
          <div className="influ-btns ms-auto">
            {/* <!-- INNER-DROPDOWN --> */}
            <div className="influ-dropdown">
            <button className="influ-btn influ-drop-btn" type="button" onClick={() => setActiveDropdown(activeDropdown === "courseDropdown" ? null : "courseDropdown" )} >
              All Subjects <i className={`fa-regular ${activeDropdown === "courseDropdown" ? "fa-angle-up" : "fa-angle-down"}`}></i>

            </button>
            <div className="influ-drop-list" style={{ display: activeDropdown === "courseDropdown" ? "block" : "none", }} >
              <div className="influ-drop-list-inner">
                <div className="influ-drop-list-item">
                	<input type="checkbox" checked={selectedCourses.includes("all")} onChange={() => handleToggle("all", selectedCourses, setSelectedCourses)} />
                    All Subjects
                </div>
                {data.courseData.map((item) => (
                  <div key={item.id} className="influ-drop-list-item">
                    <input type="checkbox"
                      checked={selectedCourses.includes("all") || selectedCourses.includes(item.id)} disabled={selectedCourses.includes("all")}
                      onChange={() => handleToggle(item.id, selectedCourses, setSelectedCourses)}
                    />
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
            {/* <!-- INNER-DROPDOWN --> */}
          </div>
          <div className="back-btn ms-2">
            <a href="subject-detail">
              <img src="../images/view-icon.svg" alt="" /> View Full Details
            </a>
          </div>
        </div>
        <div className="table-responsive">
          <table>
            <tr>
              <th style={{ width: "250px" }}>Assessment Type</th>
              <th>Lesson </th>
              <th style={{ width: "400px" }}>Score </th>
              <th>Status </th>
              <th>Action </th>
            </tr>
            <tr>
              <td>Baseline</td>
              <td>---</td>
              <td>
                <div className="prog">
                  92%
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "92%" }}
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </td>
              <td>
                <div className="status">Completed</div>
              </td>
              <td>
                {/* <a href="subject-baseline-detail">
                  <i className="fa-light fa-eye"></i> View Full Details
                </a> */}
                <Link to="/teacher/student-baseline-assessment"><i className="fa-light fa-eye"></i> View Full
                Details</Link>
              </td>
            </tr>
            <tr>
              <td>Lesson Quiz</td>
              <td>
                All Lessons
                <button type="button" className="lessons-btn" onClick={() => setActiveDropdown(activeDropdown === "lessionDropdown" ? null : "lessionDropdown")}>
                  <i className="fa-solid fa-angle-down"></i>

                </button>
              </td>
              <td>&nbsp;</td>
              <td>
                <div className="status">Completed</div>
              </td>
              <td>
                {/* <a href="#">
                  <i className="fa-light fa-eye"></i> View Full Details
                </a> */}
                <Link to="/teacher/student-lesson-quiz"><i className="fa-light fa-eye"></i> View Full Details</Link>
              </td>
            </tr>
            {/* <!-- LESSONS-DROPDOWN-LIST --> */}
            
            <tr className="lessons-list" style={activeDropdown === "lessionDropdown" ? {} : { display: "none" }}>
              <td>&nbsp;</td>
              <td>Lesson 1</td>
              <td>
                <div className="prog">
                  92%
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "92%" }}
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </td>
              <td>
                <div className="status">Completed</div>
              </td>
              <td>
                <a href="subject-lesson-detail">
                  <i className="fa-light fa-eye"></i> View Full Details
                </a>
              </td>
            </tr>
            <tr className="lessons-list" style={activeDropdown === "lessionDropdown" ? {} : { display: "none" }}>
              <td>&nbsp;</td>
              <td>Lesson 2</td>
              <td>
                <div className="prog">
                  92%
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "60%", backgroundColor: "#F28100" }}
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </td>
              <td>
                <div className="status review">Review</div>
              </td>
              <td>
                <a href="subject-lesson-detail">
                  <i className="fa-light fa-eye"></i> View Full Details
                </a>
              </td>
            </tr>
            <tr className="lessons-list" style={activeDropdown === "lessionDropdown" ? {} : { display: "none" }}>
              <td>&nbsp;</td>
              <td>Lesson 3</td>
              <td>
                <div className="prog">
                  92%
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "92%" }}
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </td>
              <td>
                <div className="status">Completed</div>
              </td>
              <td>
                <a href="subject-lesson-detail">
                  <i className="fa-light fa-eye"></i> View Full Details
                </a>
              </td>
            </tr>
            <tr className="lessons-list" style={activeDropdown === "lessionDropdown" ? {} : { display: "none" }}>
              <td>&nbsp;</td>
              <td>Lesson 4</td>
              <td>
                <div className="prog">
                  92%
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "92%" }}
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </td>
              <td>
                <div className="status">Completed</div>
              </td>
              <td>
                <a href="subject-lesson-detail">
                  <i className="fa-light fa-eye"></i> View Full Details
                </a>
              </td>
            </tr>
            <tr className="lessons-list" style={activeDropdown === "lessionDropdown" ? {} : { display: "none" }}>
              <td>&nbsp;</td>
              <td>Lesson 5</td>
              <td>
                <div className="prog">
                  92%
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "65%", backgroundColor: "#F28100" }}
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow="65"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </td>
              <td>
                <div className="status review">Review</div>
              </td>
              <td>
                <a href="subject-lesson-detail">
                  <i className="fa-light fa-eye"></i> View Full Details
                </a>
              </td>
            </tr>
            <tr className="lessons-list" style={activeDropdown === "lessionDropdown" ? {} : { display: "none" }}>
              <td>&nbsp;</td>
              <td>Lesson 6</td>
              <td>
                <div className="prog">
                  92%
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "92%" }}
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </td>
              <td>
                <div className="status">Completed</div>
              </td>
              <td>
                <a href="subject-lesson-detail">
                  <i className="fa-light fa-eye"></i> View Full Details
                </a>
              </td>
            </tr>
            <tr className="lessons-list" style={activeDropdown === "lessionDropdown" ? {} : { display: "none" }}>
              <td>&nbsp;</td>
              <td>Lesson 7</td>
              <td>
                <div className="prog">
                  92%
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "92%" }}
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </td>
              <td>
                <div className="status">Completed</div>
              </td>
              <td>
                <a href="subject-lesson-detail">
                  <i className="fa-light fa-eye"></i> View Full Details
                </a>
              </td>
            </tr>
            <tr className="lessons-list" style={activeDropdown === "lessionDropdown" ? {} : { display: "none" }}>
              <td>&nbsp;</td>
              <td>Lesson 8</td>
              <td>
                <div className="prog">
                  92%
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "92%" }}
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </td>
              <td>
                <div className="status">Completed</div>
              </td>
              <td>
                <a href="subject-lesson-detail">
                  <i className="fa-light fa-eye"></i> View Full Details
                </a>
              </td>
            </tr>

            {/* <!-- LESSONS-DROPDOWN-LIST --> */}
            <tr>
              <td>Summative</td>
              <td>---</td>
              <td>
                <div className="prog">
                  60%
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "60%", backgroundColor: "#F28100" }}
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </td>
              <td>
                <div className="status review">Retake Quiz</div>
              </td>
              <td>
                {/* <a href="subject-summative-detail">
                  <i className="fa-light fa-eye"></i> View Full Details
                </a> */}
                <Link to="/teacher/student-summative-assessment"><i className="fa-light fa-eye"></i> View Full
                Details</Link>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
