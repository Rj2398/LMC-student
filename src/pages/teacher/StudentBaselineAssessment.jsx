import React from 'react';
import {Link, useNavigate} from 'react-router';

const StudentBaselineAssessment = () => {
    const navigate = useNavigate();

  return (
    <>
    <div className="sub-detail-wrap baseline-ass-wrp">
        <div className="sub-detail-top">
            <h1 className="mb-2">Life Dream-Baseline Assessment <span className="pe-4 text-black"> Score: 80%</span>
            </h1>
            
            <div className="sub-pro mb-0">
                <ul>
                    <li><img src="../images/subject-detail/lessons.svg" alt="" /> 8 lessons</li>
                    <li style={{color: "#4126A8"}}><img src="../images/subject-detail/quizzes.svg" alt="" /> 24
                        Quizzes
                    </li>
                </ul>
                
                <b className="completed">Completed</b>
            </div>
        </div>
        <div className="assessment-result baseline-top border-0 p-0">
            <div className="baseline-ass-q-a drop-list">
                <h2><img src="../images/dashboard/earned-certificates/earned-certi.svg" alt="" /> Submitted
                    assessment
                    answers
                </h2>
                
                <div className="asse-complete-q-a">
                    <h4>Question 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit,</h4>
                    <p className="ps-0 d-flex gap-2 justify-content-start">
                        <span>Your Answer</span>
                        <img src="../images/baseline-assessment/radio-icon.svg" alt="" />
                        Lorem ipsum dolor sit amet
                    </p>
                </div>
                

                
                <div className="asse-complete-q-a">
                    <h4>Question 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit,</h4>
                    <p className="ps-0 d-flex gap-2 justify-content-start">
                        <span>Your Answer</span>
                        <img src="../images/baseline-assessment/radio-icon.svg" alt="" />
                        Lorem ipsum dolor sit amet
                    </p>
                </div>
                

                
                <div className="asse-complete-q-a">
                    <h4>Question 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit,</h4>
                    <p className="ps-0 d-flex gap-2 justify-content-start">
                        <span>Your Answer</span>
                        <img src="../images/baseline-assessment/radio-icon.svg" alt="" />
                        Lorem ipsum dolor sit amet
                    </p>
                </div>
                

                
                <div className="asse-complete-q-a">
                    <h4>Question 4: Lorem ipsum dolor sit amet, consectetur adipiscing elit,</h4>
                    <p className="ps-0 d-flex gap-2 justify-content-start">
                        <span>Your Answer</span>
                        <img src="../images/baseline-assessment/radio-icon.svg" alt="" />
                        Lorem ipsum dolor sit amet
                    </p>
                </div>
                

                
                <div className="asse-complete-q-a">
                    <h4>Question 5: Lorem ipsum dolor sit amet, consectetur adipiscing elit,</h4>
                    <p className="ps-0 d-flex gap-2 justify-content-start">
                        <span>Your Answer</span>
                        <img src="../images/baseline-assessment/radio-icon.svg" alt="" />
                        Lorem ipsum dolor sit amet
                    </p>
                </div>
                

                

                

            </div>
        </div>
        <div class="back-btn mt-4 mx-auto">
					{/* <a href="student-profile.html">Return to Profile</a> */}
                    {/* <Link to="/teacher/student-profile">Return to Profile</Link> */}
                    <Link to="" onClick={() => navigate(-1)}>Return to Profile</Link>

				</div>
    </div>
</>
  )
}

export default StudentBaselineAssessment