import React, {useState} from 'react';
import {Modal, Form} from 'react-bootstrap';
import { Link } from 'react-router';

const MwlLibrary = () => {

  const [showAddSubject, setShowAddSubject] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAddSubjectSubmit = (e) => {
    e.preventDefault();
    // Handle add subject logic here
    setShowAddSubject(false);
    setSubjectName('');
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    // Handle delete confirmation logic here
    setShowDeleteConfirm(false);
    setPassword('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
		<>
			<div className="top-head course-mng-top">
				<div className="top-head-in">
					<h1>MWL Library</h1>
					<p>View all training videos</p>
				</div>
			</div>

			<div className="subjects-lesson-progress mt-0 course-management">
				<div className="row">
					<div className="col-lg-12">
						<div className="my-subjects mt-0">
							<div className="my-subjects-head">
								<h3>
									Courses
								</h3>
							</div>
							<div className="manage-sub-grid">
								{/* <!-- ITEM --> */}
								<div className="manage-sub-item sub-lessons-list-in mb-0">
									<div className="manage-sub-data">
										<h4 className="mb-0">Micro-Credentials &amp; Domain Training</h4>
									</div>
									<div className="manage-sub-cta">
										{/* <a href="mwl-micro-credentials-domain-training">View Course</a> */}
                    <Link to="/teacher/mwl-micro-credentials-domain-training" >View Course</Link>
										
									</div>
								</div>
							
								<div className="manage-sub-item sub-lessons-list-in mb-0">
									<div className="manage-sub-data">
										<h4 className="mb-0">Scope &amp; Sequence</h4>
									</div>
									<div className="manage-sub-cta">
										<a href="" target="_blank">View Course</a>
										
									</div>
								</div>
								
								<div className="manage-sub-item sub-lessons-list-in mb-0">
									<div className="manage-sub-data">
										<h4 className="mb-0">Lesson Prep</h4>
									</div>
									<div className="manage-sub-cta">
										<a href="mwl-lesson-prep">View Course</a>
										
									</div>
								</div>
							
								<div className="manage-sub-item sub-lessons-list-in mb-0">
									<div className="manage-sub-data">
										<h4 className="mb-0">Parent Training</h4>
									</div>
									<div className="manage-sub-cta">
										{/* <a href="mwl-parent-training">View Course</a> */}
                    <Link to="/teacher/mwl-parent-training">View Course</Link>
										
									</div>
								</div>
								{/* <!-- ITEM --> */}
								<div className="manage-sub-item sub-lessons-list-in mb-0">
									
									<div className="manage-sub-data">
										<h4 className="mb-0">Onboarding</h4>
									</div>
									<div className="manage-sub-cta">
										<Link to="/teacher/mwl-onboarding">View Course</Link>
										
									</div>
								</div>
								{/* <!-- ITEM --> */}
							</div>
						</div>
					</div>


				</div>
			</div>


            {/* ADD-SUBJECT-POPUP */}
            <Modal 
        show={showAddSubject} 
        onHide={() => setShowAddSubject(false)} 
        className="my-popup fade" 
        id="quit-popup" 
        tabIndex="-1" 
        role="dialog" 
        aria-labelledby="myModalLabel"
      >
        <div className="modal-dialog modal-dialog-edit" role="document">
          <div className="modal-content clearfix">
            <div className="modal-heading">
              <h2>Add Subject</h2>
              <button 
                type="button" 
                className="close close-btn-front" 
                onClick={() => setShowAddSubject(false)} 
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <img src="../images/cross-pop.svg" alt="" />
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="delete-pop-wrap">
                <Form onSubmit={handleAddSubjectSubmit}>
                  <div className="delete-pop-inner my-2 align-items-start">
                    <p>Subject Name</p>
                  </div>
                  <div className="form-group mb-4">
                    <input 
                      type="text" 
                      placeholder="Enter Subject Name" 
                      value={subjectName}
                      onChange={(e) => setSubjectName(e.target.value)}
                    />
                  </div>
                  <div className="delete-pop-btn">
                    <a 
                      href="#" 
                      className="active" 
                      onClick={(e) => {
                        e.preventDefault();
                        setShowAddSubject(false);
                      }}
                    >
                      Cancel
                    </a>
                    <button type="submit">Add</button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* CONFIRM-DELETION-POPUP */}
      <Modal 
        show={showDeleteConfirm} 
        onHide={() => setShowDeleteConfirm(false)} 
        className="my-popup fade" 
        id="delete-popup" 
        tabIndex="-1" 
        role="dialog" 
        aria-labelledby="myModalLabel"
      >
        <div className="modal-dialog modal-dialog-edit" role="document">
          <div className="modal-content clearfix">
            <div className="modal-heading">
              <h2>Confirm Deletion</h2>
              <button 
                type="button" 
                className="close close-btn-front" 
                onClick={() => setShowDeleteConfirm(false)} 
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <img src="../images/cross-pop.svg" alt="" />
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="delete-pop-wrap">
                <Form onSubmit={handleDeleteSubmit}>
                  <div className="delete-pop-inner my-2 mb-3">
                    <p><b>Are you sure you want to delete this subject?</b></p>
                    <p>This will permanently remove all its contents, quizzes, and lessons.</p>
                  </div>
                  <div className="delete-pop-inner mb-1 align-items-start">
                    <p>Enter your password to confirm:</p>
                  </div>
                  <div className="form-group password-wrapper mb-4">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter Password" 
                      className="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="password-eye" onClick={togglePasswordVisibility}>
                      <div className={`eye ${showPassword ? "" : "eye-close"}`}></div>
                    </div>
                  </div>
                  <div className="delete-pop-btn">
                    <button type="submit" className="active">Delete</button>
                    <button 
                      type="button" 
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      
		</>
  )
}

export default MwlLibrary
