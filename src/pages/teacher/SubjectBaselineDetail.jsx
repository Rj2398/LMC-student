import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';
import { getBaselineSummitiveQuiz } from '../../redux/slices/teacher/dashboardSlice';

const SubjectBaselineDetail = () => {
    const dispatch = useDispatch();
    const paramData = useParams();
    const subjectId = location?.state?.subjectId ? location?.state?.subjectId : paramData?.subjectId;
    const { baslineSummitiveInfo } = useSelector((state) => state.dashboard)

    useEffect(() => {
        if (subjectId) {
            dispatch(getBaselineSummitiveQuiz({ subject_id: subjectId }));
        }
    }, [subjectId]);

  return (
    <>
    <div className="bas-sum-asses-wrp">
        <div className="back-btn mb-5">
            <Link to={`/teacher/subject-detail/${subjectId}`}>
                <img src="/images/baseline-assessment/back-icon.svg" alt="back" /> Back to the Subject
            </Link>
        </div>
        <h1>{baslineSummitiveInfo?.baseline_test?.subject_name}-Baseline Assessment</h1>
        <form>
            {baslineSummitiveInfo?.baseline_test?.answers?.map((item, index) => (
                <div className="less-details-in" key={index}>
				<h2> {item?.type === "standard" ? "Multiple Choice Question with one correct answer" : item?.type === "fill_points" ? "Fill in the Blank with Points" : item?.type === "fill_blank" ? "Fill in the Blank" : ""} </h2>
				
				<h4>Question</h4>
                <input readOnly type="text" className="q-fiel" value={item?.question}/>
                <h4>Options</h4>
                <div className="options-list-grp">
                    {item?.options?.map((item, index) => (
                        <div className="options-list-in" key={index}>
                            <span></span>
                            <input readOnly type="text" className="option-fiel" value={item?.option}/>
                        </div>
                    ))}
                </div>

            </div>
            ))}
        </form>
    </div>
    </>
  )
}

export default SubjectBaselineDetail

// import React from 'react';
// import { useState } from 'react';
// import { Modal } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router';

// const SubjectBaselineDetail = () => {
// 	const navigate = useNavigate();

//   const [showModal, setShowModal] = useState(false);
//   const handleShow = () => setShowModal(true);
//   const handleClose = () => setShowModal(false);
//   return (
//     <>
// 		<div className="bas-sum-asses-wrp">
// 			<div className="back-btn mb-5">
// 				<Link to="/teacher/subject-detail">
// 					<img src="../images/baseline-assessment/back-icon.svg" alt="" /> Back to the Subject
// 				</Link>
// 			</div>
// 			<h1>Life Dream-Baseline Assessment</h1>
// 			<form action="">
// 				<div className="less-details-in">
// 					<h2>Multiple Choice Question with one correct answer</h2>
// 					<h4>Question</h4>
// 					<input type="text" className="q-fiel" value="What was the lesson about?" readOnly/>
// 					<h4>Options</h4>
// 					<div className="options-list-grp">
// 						<div className="options-list-in">
// 							<span></span>
// 							<input type="text" className="option-fiel" value="Option 1..." readOnly/>
// 						</div>
// 						<div className="options-list-in">
// 							<span></span>
// 							<input type="text" className="option-fiel" value="Option 2..." readOnly/>
// 						</div>
// 						<div className="options-list-in">
// 							<span></span>
// 							<input type="text" className="option-fiel" value="Option 3..." readOnly/>
// 						</div>
// 						<div className="options-list-in">
// 							<span></span>
// 							<input type="text" className="option-fiel" value="Option 4..." readOnly/>
// 						</div>
// 					</div>
					
// 				</div>
// 				<div className="less-details-in">
// 					<h2>Multiple Choice Question with Points</h2>
// 					<h4>Question</h4>
// 					<input readOnly type="text" className="q-fiel" value="What was the lesson about?"/>
// 					<div className="mcq-point-wrp">
// 						<div className="mcq-point-in w-100">
// 							<h4>Options</h4>
// 							<div className="options-list-grp">
// 								<div className="options-list-in">
// 									<span></span>
// 									<input readOnly type="text" className="option-fiel" value="dolar"/>
// 								</div>
// 								<div className="options-list-in">
// 									<span></span>
// 									<input readOnly type="text" className="option-fiel" value="sit"/>
// 								</div>
// 								<div className="options-list-in">
// 									<span></span>
// 									<input readOnly type="text" className="option-fiel" value="dolor sit"/>
// 								</div>
// 								<div className="options-list-in">
// 									<span></span>
// 									<input readOnly type="text" className="option-fiel" value="consectetur"/>
// 								</div>
// 							</div>
// 						</div>
						
// 					</div>
// 				</div>
// 				<div className="less-details-in">
// 					<h2>Fill in the Blank</h2>
// 					<h4>Question</h4>
// 					<input readOnly type="text" className="q-fiel"
// 						value="Lorem ipsum ____________ amet, consectetur adipiscing elit?"/>
// 					<h4>Options</h4>
// 					<div className="options-list-grp">
// 						<div className="options-list-in">
// 							<span></span>
// 							<input readOnly type="text" className="option-fiel" value="Option 1..."/>
// 						</div>
// 						<div className="options-list-in">
// 							<span></span>
// 							<input readOnly type="text" className="option-fiel" value="Option 2..."/>
// 						</div>
// 						<div className="options-list-in">
// 							<span></span>
// 							<input readOnly type="text" className="option-fiel" value="Option 3..."/>
// 						</div>
// 						<div className="options-list-in">
// 							<span></span>
// 							<input readOnly type="text" className="option-fiel" value="Option 4..."/>
// 						</div>
// 					</div>
					
// 				</div>
// 				<div className="less-details-in">
// 					<h2>Fill in the Blank with Points</h2>
// 					<h4>Question</h4>
// 					<input readOnly type="text" className="q-fiel"
// 						value="Lorem ipsum ____________ amet, consectetur adipiscing elit?"/>
// 					<div className="mcq-point-wrp">
// 						<div className="mcq-point-in w-100">
// 							<h4>Options</h4>
// 							<div className="options-list-grp">
// 								<div className="options-list-in">
// 									<span></span>
// 									<input readOnly type="text" className="option-fiel" value="dolar"/>
// 								</div>
// 								<div className="options-list-in">
// 									<span></span>
// 									<input readOnly type="text" className="option-fiel" value="sit"/>
// 								</div>
// 								<div className="options-list-in">
// 									<span></span>
// 									<input readOnly type="text" className="option-fiel" value="dolor sit"/>
// 								</div>
// 								<div className="options-list-in">
// 									<span></span>
// 									<input readOnly type="text" className="option-fiel" value="consectetur"/>
// 								</div>
// 							</div>
// 						</div>
						
// 					</div>
// 				</div>
// 			</form>
// 		</div>



//        {/* Confirmation Modal JSX */}
//        <Modal
//         show={showModal}
//         onHide={handleClose}
//         centered
//         className="my-popup"
//         dialogClassName="modal-dialog-edit"
//         id="quit-popup"
//         aria-labelledby="myModalLabel"
//       >
//         <div className="modal-content clearfix">
//           <div className="modal-heading">
//             <h2>Confirmation</h2>
//             <button type="button" className="close close-btn-front" onClick={handleClose} aria-label="Close">
//               <span aria-hidden="true">
//                 <img src="../images/cross-pop.svg" alt="" />
//               </span>
//             </button>
//           </div>
//           <div className="modal-body">
//             <div className="delete-pop-wrap">
//               <form>
//                 <div className="delete-pop-inner">
//                   <p><b>Have you answered all your questions?</b></p>
//                   <p>
//                     Completing them can help you feel more confident and reduce stress. Keep going you’re doing great!
//                   </p>
//                 </div>
//                 <div className="delete-pop-btn">
//                   <a href="lesson-detail" className="active" onClick={handleClose} aria-label="Close">Review</a>
//                   <a href="subject-detail">Continue</a>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </Modal>
// 	</>
//   )
// }

// export default SubjectBaselineDetail