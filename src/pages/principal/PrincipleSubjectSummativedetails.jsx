import React from 'react';
import {Link, useNavigate} from 'react-router';

const PrincipleSubjectSummativedetails = () => {
	const navigate = useNavigate();
  return (
   <>
		<div className="bas-sum-asses-wrp">
			<div className="back-btn mb-5">
				{/* <a href="subject-detail.html">
					<img src="../images/baseline-assessment/back-icon.svg" alt=""/> Back to the Subject
				</a> */}
				<Link onClick={() => navigate(-1)}>
					<img src="../images/baseline-assessment/back-icon.svg" alt=""/> Back to the Subject
				</Link>
			</div>
			<h1>Life Dream-Baseline Assessment</h1>
			<form action="">
				<div className="less-details-in">
					<h2>Multiple Choice Question with one correct answer</h2>
					<h4>Question</h4>
					<input readonly type="text" className="q-fiel" value="What was the lesson about?"/>
					<h4>Options</h4>
					<div className="options-list-grp">
						<div className="options-list-in">
							<span></span>
							<input readonly type="text" className="option-fiel" value="Option 1..."/>
						</div>
						<div className="options-list-in">
							<span></span>
							<input readonly type="text" className="option-fiel" value="Option 2..."/>
						</div>
						<div className="options-list-in">
							<span></span>
							<input readonly type="text" className="option-fiel" value="Option 3..."/>
						</div>
						<div className="options-list-in">
							<span></span>
							<input readonly type="text" className="option-fiel" value="Option 4..."/>
						</div>
					</div>
					{/* <!-- <h4 style="color: #4126A8;">Correct Answer</h4>
					<div className="correct-answer-in">
						<button type="button">Choose Correct Answer
							<i className="fa-regular fa-angle-down"></i>
						</button>
						<div className="correct-answer-list" style="display: none;">
							<div className="form-group">
								<input readonly type="radio" value="1" name="correct-answer" id="answer-1" hidden>
								<label for="answer-1">Option 1</label>
								<input readonly type="radio" value="2" name="correct-answer" id="answer-2" hidden>
								<label for="answer-2">Option 2</label>
								<input readonly type="radio" value="3" name="correct-answer" id="answer-3" checked hidden>
								<label for="answer-3">Option 3</label>
								<input readonly type="radio" value="4" name="correct-answer" id="answer-4" hidden>
								<label for="answer-4">Option 4</label>
							</div>
						</div>
					</div> --> */}
				</div>
				<div className="less-details-in">
					<h2>Multiple Choice Question with Points</h2>
					<h4>Question</h4>
					<input readonly type="text" className="q-fiel" value="What was the lesson about?"/>
					<div className="mcq-point-wrp">
						<div className="mcq-point-in w-100">
							<h4>Options</h4>
							<div className="options-list-grp">
								<div className="options-list-in">
									<span></span>
									<input readonly type="text" className="option-fiel" value="dolar"/>
								</div>
								<div className="options-list-in">
									<span></span>
									<input readonly type="text" className="option-fiel" value="sit"/>
								</div>
								<div className="options-list-in">
									<span></span>
									<input readonly type="text" className="option-fiel" value="dolor sit"/>
								</div>
								<div className="options-list-in">
									<span></span>
									<input readonly type="text" className="option-fiel" value="consectetur"/>
								</div>
							</div>
						</div>
						{/* <!-- <div className="mcq-point-in">
							<h4>Points</h4>
							<div className="options-list-grp">
								<div className="options-list-in">
									<input readonly type="text" className="option-fiel" value="1">
								</div>
								<div className="options-list-in">
									<input readonly type="text" className="option-fiel" value="2">
								</div>
								<div className="options-list-in">
									<input readonly type="text" className="option-fiel" value="4">
								</div>
								<div className="options-list-in">
									<input readonly type="text" className="option-fiel" value="3">
								</div>
							</div>
						</div> --> */}
					</div>
				</div>
				<div className="less-details-in">
					<h2>Fill in the Blank</h2>
					<h4>Question</h4>
					<input readonly type="text" className="q-fiel"
						value="Lorem ipsum ____________ amet, consectetur adipiscing elit?"/>
					<h4>Options</h4>
					<div className="options-list-grp">
						<div className="options-list-in">
							<span></span>
							<input readonly type="text" className="option-fiel" value="Option 1..."/>
						</div>
						<div className="options-list-in">
							<span></span>
							<input readonly type="text" className="option-fiel" value="Option 2..."/>
						</div>
						<div className="options-list-in">
							<span></span>
							<input readonly type="text" className="option-fiel" value="Option 3..."/>
						</div>
						<div className="options-list-in">
							<span></span>
							<input readonly type="text" className="option-fiel" value="Option 4..."/>
						</div>
					</div>
					{/* <!-- <h4 style="color: #4126A8;">Correct Answer</h4>
					<div className="correct-answer-in">
						<button type="button">Option 3...
							<i className="fa-regular fa-angle-down"></i>
						</button>
						<div className="correct-answer-list" style="display: none;">
							<div className="form-group">
								<input readonly type="radio" value="1" name="fill-correct-answer" id="fill-answer-1" hidden>
								<label for="fill-answer-1">Option 1</label>
								<input readonly type="radio" value="2" name="fill-correct-answer" id="fill-answer-2" hidden>
								<label for="fill-answer-2">Option 2</label>
								<input readonly type="radio" value="3" name="fill-correct-answer" id="fill-answer-3" checked
									hidden>
								<label for="fill-answer-3">Option 3</label>
								<input readonly type="radio" value="4" name="fill-correct-answer" id="fill-answer-4" hidden>
								<label for="fill-answer-4">Option 4</label>
							</div>
						</div>
					</div> --> */}
				</div>
				<div className="less-details-in">
					<h2>Fill in the Blank with Points</h2>
					<h4>Question</h4>
					<input readonly type="text" className="q-fiel"
						value="Lorem ipsum ____________ amet, consectetur adipiscing elit?"/>
					<div className="mcq-point-wrp">
						<div className="mcq-point-in w-100">
							<h4>Options</h4>
							<div className="options-list-grp">
								<div className="options-list-in">
									<span></span>
									<input readonly type="text" className="option-fiel" value="dolar"/>
								</div>/
								<div className="options-list-in">
									<span></span>
									<input readonly type="text" className="option-fiel" value="sit"/>
								</div>
								<div className="options-list-in">
									<span></span>
									<input readonly type="text" className="option-fiel" value="dolor sit"/>
								</div>
								<div className="options-list-in">
									<span></span>
									<input readonly type="text" className="option-fiel" value="consectetur"/>
								</div>
							</div>
						</div>
						{/* <!-- <div className="mcq-point-in">
							<h4>Points</h4>
							<div className="options-list-grp">
								<div className="options-list-in">
									<input readonly type="text" className="option-fiel" value="1">
								</div>
								<div className="options-list-in">
									<input readonly type="text" className="option-fiel" value="2">
								</div>
								<div className="options-list-in">
									<input readonly type="text" className="option-fiel" value="4">
								</div>
								<div className="options-list-in">
									<input readonly type="text" className="option-fiel" value="3">
								</div>
							</div>
						</div> --> */}
					</div>
				</div>
				{/* <!-- <button type="submit" className="publish-cta">Publish</button> --> */}
			</form>
		</div>
	
   </>
  )
}

export default PrincipleSubjectSummativedetails
