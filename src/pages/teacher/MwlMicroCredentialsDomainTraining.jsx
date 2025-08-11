import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import { Link } from 'react-router';

const MwlMicroCredentialsDomainTraining = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleDelete = (e) => {
        e.preventDefault();
        // Add deletion logic here
        console.log('Password entered:', password);
        setShowDeleteModal(false);
      };

  return (
    <>
			<div className="sub-detail-top">
				<h1 className="mb-2">
					Micro-Credentials & Domain Training
					<span><b>100%</b></span>
				</h1>
				<div className="sub-pro mb-0">
					<p>Manage education levels, subjects, lessons, and content</p>
					<div className="sub-pro-grp ms-auto">
						<h1 className="mb-0">
							<span>10/10 Subjects</span>
						</h1>
						<div className="sub-pro-in">
							<ul className="ms-2">
								<li className="me-3"><span>Overall Progress</span></li>
							</ul>
							<div className="progress">
								<div className="progress-bar w-75" role="progressbar" aria-label="Basic example"
									aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
							</div>
						</div>
					</div>
				</div>
		
			</div>
			<div className="subjects-lesson-progress mt-4 course-management student-mng">
				<div className="row">
					<div className="col-lg-12">
						<div className="my-subjects mt-0">
							<div className="my-subjects-head">
								<h3>
									Ruby Level - Manage Subjects
									<a href="javascript:void(0);" className="add-cta">
										<img src="../images/cta-badge.svg" alt="" /> View Badge
									</a>
								</h3>
							</div>
							<div className="manage-sub-grid">
								<div className="manage-sub-item sub-lessons-list-in">
									<div className="lesson-num-ico"><span>1</span> <img
											src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
									</div>
									<div className="manage-sub-data">
										<h4>Life Dream <img src="../images/badge-icon.svg" alt="" /></h4>
										<ul>
											<li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>
										
										</ul>
									</div>
									<div className="manage-sub-cta">
										{/* <a href="mwl-micro-credentials-domain-training-subject">Manage Content</a> */}
										<Link to="/teacher/mwl-micro-credentials-domain-training-subject">Manage Content</Link>
									
									</div>
								</div>
						
								<div className="manage-sub-item sub-lessons-list-in">
									<div className="lesson-num-ico"><span>2</span> <img
											src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
									</div>
									<div className="manage-sub-data">
										<h4>Self-Awareness <img src="../images/badge-icon.svg" alt="" /></h4>
										<ul>
											<li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>
											
										</ul>
									</div>
									<div className="manage-sub-cta">
										{/* <a href="mwl-micro-credentials-domain-training-subject">Manage Content</a> */}
										<Link to="/teacher/mwl-micro-credentials-domain-training-subject">Manage Content</Link>
										
									</div>
								</div>
								
								<div className="manage-sub-item sub-lessons-list-in">
									<div className="lesson-num-ico"><span>3</span> <img
											src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
									</div>
									<div className="manage-sub-data">
										<h4>Cognitive Construction <img src="../images/badge-icon.svg" alt="" /></h4>
										<ul>
											<li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>
										
										</ul>
									</div>
									<div className="manage-sub-cta">
										{/* <a href="mwl-micro-credentials-domain-training-subject">Manage Content</a> */}
										<Link to="/teacher/mwl-micro-credentials-domain-training-subject">Manage Content</Link>
										
									</div>
								</div>
							
								<div className="manage-sub-item sub-lessons-list-in">
									<div className="lesson-num-ico"><span>4</span> <img
											src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
									</div>
									<div className="manage-sub-data">
										<h4>Interpersonal Relationships <img src="../images/badge-icon.svg" alt="" /></h4>
										<ul>
											<li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>
										
										</ul>
									</div>
									<div className="manage-sub-cta">
										{/* <a href="mwl-micro-credentials-domain-training-subject">Manage Content</a> */}
										<Link to="/teacher/mwl-micro-credentials-domain-training-subject">Manage Content</Link>
									
									</div>
								</div>
							
								<div className="manage-sub-item sub-lessons-list-in">
									<div className="lesson-num-ico"><span>5</span> <img
											src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
									</div>
									<div className="manage-sub-data">
										<h4>Coping <img src="../images/badge-icon.svg" alt="" /></h4>
										<ul>
											<li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>
								
										</ul>
									</div>
									<div className="manage-sub-cta">
										{/* <a href="mwl-micro-credentials-domain-training-subject">Manage Content</a> */}
										<Link to="/teacher/mwl-micro-credentials-domain-training-subject">Manage Content</Link>
									
									</div>
								</div>
							</div>
						</div>
						<div className="my-subjects">
							<div className="my-subjects-head">
								<h3>
									Emerald Level - Manage Subjects
									<a href="javascript:void(0);" className="add-cta">
										<img src="../images/cta-badge.svg" alt="" /> View Badge
									</a>
								</h3>
							</div>
							<div className="manage-sub-grid">
								<div className="manage-sub-item sub-lessons-list-in">
									<div className="lesson-num-ico"><span>1</span> <img
											src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
									</div>
									<div className="manage-sub-data">
										<h4>Life Dream <img src="../images/badge-icon.svg" alt="" /></h4>
										<ul>
											<li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>
											
										</ul>
									</div>
									<div className="manage-sub-cta">
										{/* <a href="mwl-micro-credentials-domain-training-subject">Manage Content</a> */}
										<Link to="/teacher/mwl-micro-credentials-domain-training-subject">Manage Content</Link>
										
									</div>
								</div>
							
								<div className="manage-sub-item sub-lessons-list-in">
									<div className="lesson-num-ico"><span>2</span> <img
											src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
									</div>
									<div className="manage-sub-data">
										<h4>Self-Awareness <img src="../images/badge-icon.svg" alt="" /></h4>
										<ul>
											<li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>
										
										</ul>
									</div>
									<div className="manage-sub-cta">
										{/* <a href="mwl-micro-credentials-domain-training-subject">Manage Content</a> */}
										<Link to="/teacher/mwl-micro-credentials-domain-training-subject">Manage Content</Link>
							
									</div>
								</div>
								
								<div className="manage-sub-item sub-lessons-list-in">
									<div className="lesson-num-ico"><span>3</span> <img
											src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
									</div>
									<div className="manage-sub-data">
										<h4>Cognitive Construction <img src="../images/badge-icon.svg" alt="" /></h4>
										<ul>
											<li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>
										
										</ul>
									</div>
									<div className="manage-sub-cta">
										{/* <a href="mwl-micro-credentials-domain-training-subject">Manage Content</a> */}
										<Link to="/teacher/mwl-micro-credentials-domain-training-subject">Manage Content</Link>
									
									</div>
								</div>
								
								<div className="manage-sub-item sub-lessons-list-in">
									<div className="lesson-num-ico"><span>4</span> <img
											src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
									</div>
									<div className="manage-sub-data">
										<h4>Interpersonal Relationships <img src="../images/badge-icon.svg" alt="" /></h4>
										<ul>
											<li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>
										
										</ul>
									</div>
									<div className="manage-sub-cta">
										{/* <a href="mwl-micro-credentials-domain-training-subject">Manage Content</a> */}
										<Link to="/teacher/mwl-micro-credentials-domain-training-subject">Manage Content</Link>
									
									</div>
								</div>
							
								<div className="manage-sub-item sub-lessons-list-in">
									<div className="lesson-num-ico"><span>5</span> <img
											src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
									</div>
									<div className="manage-sub-data">
										<h4>Coping <img src="../images/badge-icon.svg" alt="" /></h4>
										<ul>
											<li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>
									
										</ul>
									</div>
									<div className="manage-sub-cta">
										{/* <a href="mwl-micro-credentials-domain-training-subject">Manage Content</a> */}
										<Link to="/teacher/mwl-micro-credentials-domain-training-subject">Manage Content</Link>
									
									</div>
								</div>
							</div>
						</div>
					</div>
			
				</div>
			</div>

                {/* DELETE CONFIRMATION MODAL */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        className="my-popup"
        dialogClassName="modal-dialog-edit"
        id="delete-popup"
        aria-labelledby="myModalLabel"
      >
        <div className="modal-content clearfix">
          <div className="modal-heading">
            <h2>Confirm Deletion</h2>
            <button
              type="button"
              className="close close-btn-front"
              onClick={() => setShowDeleteModal(false)}
              aria-label="Close"
            >
              <span aria-hidden="true">
                <img src="../images/cross-pop.svg" alt="" />
              </span>
            </button>
          </div>
          <div className="modal-body">
            <div className="delete-pop-wrap">
              <form onSubmit={handleDelete}>
                <div className="delete-pop-inner my-2 mb-3">
                  <p><b>Are you sure you want to delete this subject?</b></p>
                  <p>This will permanently remove all its contents, quizzes, and lessons.</p>
                </div>
                <div className="delete-pop-inner mb-1 align-items-start">
                  <p>Enter your password to confirm:</p>
                </div>
                <div className="form-group password-wrapper mb-4 position-relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Password"
                    className="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="password-eye" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                    <div className={`eye ${showPassword ? '' : 'eye-close'}`}></div>
                  </div>
                </div>
                <div className="delete-pop-btn d-flex gap-2">
                  <button type="submit" className="active">Delete</button>
                  <button
                    type="button"
                    className=""
                    onClick={() => setShowDeleteModal(false)}
                    aria-label="Close"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
		</>
  )
}

export default MwlMicroCredentialsDomainTraining