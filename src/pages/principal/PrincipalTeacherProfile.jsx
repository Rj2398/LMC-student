import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { subjectData, PrincipalStudent, ClassesPerformance, TeacherTrainingCom } from "../../assets/teacher.json"

function PrincipalTeacherProfile() {
  const navigate = useNavigate();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [searchQuery1, setSearchQuery1] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");
  const [searchQuery3, setSearchQuery3] = useState("");

  const filterClassesPerformance = ClassesPerformance.filter((classes) => classes.courseName.toLowerCase().includes(searchQuery1.toLowerCase()) || classes.averageScore.includes(searchQuery1))
  const filterPrincipalStudent = PrincipalStudent.filter((student) => student.studentName.toLowerCase().includes(searchQuery2.toLowerCase()))
  const filterTeacherTraining = TeacherTrainingCom.filter((teacher) => teacher.level.toLowerCase().includes(searchQuery3.toLowerCase()) || teacher.badge.toLocaleLowerCase().includes(searchQuery3.toLowerCase()) )
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
          <h1>Teacher Profile</h1>
          <p>Detailed view of student performance and progress</p>
        </div>
        <div className="back-btn">
          <a href="className-detail.html">
            <img src="../images/baseline-assessment/back-icon.svg" alt="" /> Back
          </a>
        </div>



      </div>

      <div className="student-short-info">
        <h3>Emma Thompson <span>Overall Score</span></h3>
        <p>sarah.johnson@school.edu <b>92%</b></p>
      </div>
      <div className="my-subjects">
        <div className="top-head">
          <div className="top-head-in">
            <h1 className="mb-0">classes Performance</h1>
          </div>
          <div className="students-src ms-auto">
            <input type="text" placeholder="Search emails by subject, send..." value={searchQuery1}
              onChange={(e) => setSearchQuery1(e.target.value)}
            />
          </div>
          <div className="back-btn ms-3">
            <a href="">
              <img src="../images/download-certif.svg" alt="" style={{ filter: "brightness(0) invert(1)" }} />
              Export Report
            </a>
          </div>
        </div>
        <div className="table-responsive">
          <table>
            <tbody>
              <tr>
                <th style={{ width: "250px" }}>Subject</th>
                <th>Students</th>
                <th style={{ width: "400px" }}>Completion % </th>
                <th>Avg. Score</th>
                <th>Action </th>
              </tr>
              {(filterClassesPerformance.length === 0) ? (
                <div>No Data Found...</div>
              ) : (
                <>
                {filterClassesPerformance?.map((item, index) => (
                  <tr>
                    <td>{item.courseName}</td>
                    <td>{item.modules}</td>
                    <td>
                      <div className="prog">
                        {item.completionPercentage}
                        <div className="progress">
                          <div className="progress-bar" style={{ width: `${item.progressWidth}` }} role="progressbar"
                            aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
                            aria-valuemax="100"></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ color: "#16A34A" }}>{item.averageScore}</div>
                    </td>
                    <td>
                      <Link to="/principal/class-detail"><i className="fa-light fa-eye"></i> View Details</Link>
                    </td>
                  </tr>
                ))}
                </>
              )}
              

           
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-subjects">
        <div className="top-head">
          <div className="top-head-in">
            <h1 className="mb-0">Students(5)</h1>
          </div>
          <div className="students-src ms-auto">
            <input type="text" placeholder="Search emails by subject, sen....." value={searchQuery2}
              onChange={(e) => setSearchQuery2(e.target.value)} />
            {/* {console.log(searchQuery2, "searchQuery211111")} */}
          </div>
          <div className="influ-btns ms-3">
            <div className="influ-dropdown">
              <button className="influ-btn influ-drop-btn" type="button" onClick={() => setActiveDropdown(activeDropdown === "courseDropdown" ? null : "courseDropdown")} >
                All Subjects <i className={`fa-regular ${activeDropdown === "courseDropdown" ? "fa-angle-up" : "fa-angle-down"}`}></i>
              </button>
              <div className="influ-drop-list" style={{ display: activeDropdown === "courseDropdown" ? "block" : "none" }}>
                <div className="influ-drop-list-inner">

                  {subjectData?.map((item, index) => (
                    <div key={index} className="influ-drop-list-item"> <input type="checkbox"
                      checked={selectedCourses.includes(item.id)}
                      onChange={() => {
                        if (selectedCourses.includes(item.id)) {
                          setSelectedCourses([]);
                        } else {
                          setSelectedCourses([item.id]);
                          console.log(item.title, "item.title11111111111");
                        }

                      }}
                    />
                      {item.title}
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
          <div className="back-btn ms-3">
            <a href="">
              <img src="../images/download-certif.svg" alt="" style={{ filter: "brightness(0) invert(1)" }} />
              Export Report
            </a>
          </div>
        </div>
        <div className="table-responsive">
          <table>
            <tbody>
              <tr>
                <th style={{ width: "250px" }}>Student Name</th>
                <th>Status </th>
                <th style={{ width: "350px" }}>Completion Score </th>
                <th>Avg. Score</th>
                <th>Action </th>
              </tr>
              {(filterPrincipalStudent.length === 0) ? (
                <div>No Data Found...</div>
              ) : (
                <>
                 {filterPrincipalStudent?.map((item, index) => (
                <tr key={index}>
                  <td>{item.studentName}</td>
                  <td>
                    <div className="status">{item.status}</div>
                  </td>
                  <td>
                    <div className="prog">
                      {item.completionScore}
                      <div className="progress">
                        <div className="progress-bar" style={{ width: "88.5%" }} role="progressbar"
                          aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
                          aria-valuemax="100"></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ color: "#16A34A" }}>{item.avgScore}</div>
                  </td>
                  <td>
                    <Link to="/principal/student-profile"><i className="fa-light fa-eye"></i> View Details</Link>

                  </td>
                </tr>
              ))}
                </>
              )}
             

            </tbody>
          </table>
        </div>
      </div>
      <div className="my-subjects">
        <div className="top-head">
          <div className="top-head-in">
            <h1 className="mb-0">Teacher Training Completion</h1>
          </div>
          <div className="students-src ms-auto">
            <input type="text" placeholder="Search by teacher name....." value={searchQuery3} 
            onChange={(e) => setSearchQuery3(e.target.value)}
            />
          </div>
          <div className="back-btn ms-3">
            <a href="">
              <img src="../images/download-certif.svg" alt="" style={{ filter: "brightness(0) invert(1)" }} />
              Export Report
            </a>
          </div>
        </div>
        <div className="table-responsive">
          <table>
            <tbody>
              <tr>
                <th style={{ width: "400px" }}>Level</th>
                <th>Completion</th>
                <th>Badges Status</th>
              </tr>
              {(filterTeacherTraining.length === 0) ? (
                <div>No Data Found...</div>
              ) : (
                <>
                 {filterTeacherTraining?.map((item, index) => (
              
              <tr>
                <td>{item.level}</td>
                <td>
                  <div className="prog">
                  {item.completion}
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `${item.progressWidth}` }} role="progressbar"
                        aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={`${item.earnedClass}`}>{item.badge}</div>
                </td>
              </tr>
            ))}
                </>
              )}
             

            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default PrincipalTeacherProfile