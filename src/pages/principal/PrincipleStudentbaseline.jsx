import React from 'react';
import {Link, useNavigate} from 'react-router';
import assesment from '../../assets/assesment.json';

const PrincipleStudentbaseline = () => {
	const navigate = useNavigate();

	const baselineTest = assesment?.baseline_test || {};
	const answer = baselineTest?.answers || [];
	const subject = assesment?.subject || {};

  return (
    <>
    
			<div className="sub-detail-wrap baseline-ass-wrp">
				<div className="sub-detail-top">
					<h1 className="mb-2">{baselineTest.subject_name}-Baseline Assessment <span className="pe-4 text-black"> Score: {subject.percentage}%</span>
					</h1>
				
					<div className="sub-pro mb-0">
						<ul>
							<li><img src="../images/subject-detail/lessons.svg" alt=''/> {subject.total_lessons} lessons</li>
							<li style={{color: "#4126A8"}}><img src="../images/subject-detail/quizzes.svg" alt=''/> {subject.total_lesson_quizzes}
								Quizzes
							</li>
						</ul>
						
						<b className="completed">{baselineTest.status}</b>
					</div>
				</div>
				<div className="assessment-result baseline-top border-0 p-0">
					<div className="baseline-ass-q-a drop-list">
						<h2><img src="../images/dashboard/earned-certificates/earned-certi.svg" alt=''/> Submitted
							assessment
							answers
						</h2>
						{(answer.length === 0) ? (
							<div>No Data Found...</div>
						) : (
							<>
							{answer.map((item, index) => (
								<div className="asse-complete-q-a">
								<h4>Question {index + 1}: {item.question}</h4>
								{item?.selected_option ? 
								(
									<p className="ps-0 d-flex gap-2 justify-content-start">
									<span>Your Answer</span>
									<img src="../images/baseline-assessment/radio-icon.svg" alt=''/>
									{item.selected_option}
								</p>
								) : (
									<p className="ps-0 d-flex gap-2 justify-content-start">
									<span>No answer submitted</span>
								  </p>
								)}
								
							</div>
							))}
							</>
						)}

						

					
					</div>
				</div>

				<div className="back-btn mt-4 mx-auto">
					<Link to="" onClick={() => navigate(-1)}>Return to Profile</Link>
				</div>
			</div>
	
    </>
  )
}

export default PrincipleStudentbaseline
