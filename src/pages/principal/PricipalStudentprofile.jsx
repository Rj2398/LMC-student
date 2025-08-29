import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router'
import data from "../../assets/principal.json";
import { getSubjectList, setprincipalStudentName, studentProfilePerformance } from '../../redux/slices/principal/principalDashboardSlice';

const PricipalStudentprofile = () => {


	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const [showFullDetails, setShowFullDetails] = useState(false);
	const currentLevel = localStorage.getItem("classLevel")

	const studentId = location?.state?.studentId;
	console.log(studentId)

	const subjectId = location?.state?.subjectId;
	console.log(subjectId)

	const principalComing = location?.state?.principalComing;
	const teacherStudentComing = location?.state?.teacherStudentComing;
	const principalstudentBaseline = location?.state?.principalstudentBaseline;

	console.log("principalstudentBaseline@@@@@@", principalstudentBaseline);

	//   const studentProfileInfo= data?.studentProfile
	//   const subjectList=data?.courseData

	const { studentProfileInfo, subjectList } = useSelector((state) => state.principalDashboard);
	console.log(studentProfileInfo)
	const [activeDropdown, setActiveDropdown] = useState(null);
	const [selectedCourses, setSelectedCourses] = useState([]);
	const [showAllLession, setShowAllLesson] = useState(false);

	useEffect(() => {
		dispatch(studentProfilePerformance({ student_id: studentId, subject_id: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId, }));
	}, [studentId, selectedCourses]);

	useEffect(() => {
		if (currentLevel) {
			dispatch(getSubjectList({ level_id: currentLevel }))
			console.log({ level_id: currentLevel })
		}
	}, [currentLevel]);

	useEffect(() => {
		if (studentProfileInfo) {
			dispatch(setprincipalStudentName(studentProfileInfo?.student_name))
			console.log(studentProfileInfo?.student_name)
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
		<div>
			<div className="top-head prog-sco-wrp">
				<div className="top-head-in">
					<h1>Student Profile</h1>
					<p>Detailed view of student performance and progress</p>
				</div>
				<div className="back-btn">
					<Link onClick={() => navigate(-1)}   >
						<img src="../images/baseline-assessment/back-icon.svg" alt='' /> Back
					</Link>
				</div>

				{/* <!-- <select name="subject">
					<option value="1">Subject</option>
					<option value="2">Life Dream</option>
					<option value="3">Self-Awareness</option>
					<option value="4">Cognitive Construction</option>
					<option value="5">Coping</option>
					<option value="6">Interpersonal Relationships</option>
				// </select> --> */}

			</div>
			{/* <!-- <div className="progress-grid">
				<div className="row g-0 ps-3">
					<div className="col-lg-3">
						<div className="progress-grid-in">
							<h2><img src="../images/dashboard/progress-grid/3.svg" alt=''/> Completion Rate</h2>
							<h3>69%</h3>
							<p className="text-black">05 of 08 lessons</p>
						</div>
					</div>
					<div className="col-lg-4">
						<div className="progress-grid-in">
							<h2><img src="../images/dashboard/progress-grid/5.svg" alt=''/> Summative Assessment Score</h2>
							<h3>87%</h3>
						</div>
					</div>
				</div>
			// </div> --> */}
			{/* <div className="student-short-info">
				<h3>Emma Thompson <span>Overall Score</span></h3>
				<p>sarah.johnson@school.edu <b>92%</b></p>
			</div> */}


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
						{/* <!-- INNER-DROPDOWN --> */}
						<div className="influ-dropdown">
							<button className="influ-btn influ-drop-btn" type="button" onClick={() => setActiveDropdown(activeDropdown === "courseDropdown" ? null : "courseDropdown")} > All Subjects
								<i className={`fa-regular ${activeDropdown === "courseDropdown" ? "fa-angle-up" : "fa-angle-down"}`}
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
						{/* <!-- INNER-DROPDOWN -->
					</div> */}
						{/* <div className="back-btn ms-2">
						<a href="subject-detail.html">
							<img src="../images/view-icon.svg" alt=''/> View Full Details
						</a>
					</div> */}

						{!showFullDetails && (
							<div className="back-btn ms-2">
								<a href="" onClick={(e) => {
									e.preventDefault();
									setShowFullDetails((prev) => !prev);
									setActiveDropdown(activeDropdown === "lessionDropdown" ? null : "lessionDropdown");
								}}>
									<img src="../images/view-icon.svg" alt="" /> View Full Details
								</a>
							</div>
						)}
						{/* <!-- <select name="subject" className="ms-auto">
						<option value="1">Subject</option>
						<option value="2">Life Dream</option>
						<option value="3">Self-Awareness</option>
						<option value="4">Cognitive Construction</option>
						<option value="5">Coping</option>
						<option value="6">Interpersonal Relationships</option>
					// </select> --> */}
						{/* <!-- <a href="subject-detail.html" className="details-cta">
						<img src="../images/view-icon.svg" alt=''/>
						View Full Details
					// </a> --> */}
					</div>
					<div className="table-responsive">
						<table>
							<tr>
								<th style={{ width: ' 250px' }}>Assessment Type</th>
								<th>Lesson </th>
								<th style={{ width: "300px" }} >Score </th>
								<th>Status </th>
								{showFullDetails && <th>Action </th>}
							</tr>
							<tr>
								<td>Baseline</td>
								<td>---</td>
								<td>
									<div className="prog">
										{studentProfileInfo?.baseline_score}%
										<div className="progress">
											<div className="progress-bar" style={{ width: `${studentProfileInfo?.baseline_score}%` }}
												role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
												aria-valuemax="100" ></div>
										</div>
									</div>
								</td>
								{/* <td>
								<div className="status">Completed</div>
							</td> */}

								<td>
									<div className={`status ${["not_started", "not_completed", "in_progress"].includes(studentProfileInfo?.baseline_status) && "review"}`}>
										{studentProfileInfo?.baseline_status?.replace(/_/g, " ")
											.replace(/\b\w/g, (char) => char.toUpperCase()) || "Not Started"}
									</div>
								</td>
								{/* <td>
								<Link to="/principal/student-baseline-assesment"><i className="fa-light fa-eye"></i> View Full
									Details</Link>
							</td> */}


								{/* <td>
                  {showFullDetails &&  !["not_started", "not_completed", "in_progress"].includes(studentProfileInfo?.baseline_status) && (
                    <Link to="/principal/student-baseline-assesment" state={{studentId: studentId, subjectId: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId,}}>
                      <i className="fa-light fa-eye"></i> View Full Details
                    </Link>
                  )}
                </td> */}

								{showFullDetails && !["not_started", "not_completed", "in_progress"].includes(studentProfileInfo?.baseline_status) && (
									<td>
										{principalComing ? (
											<Link to="/principal/student/baseline/assesment" state={{ studentId: studentId, subjectId: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId, }}>
												<i className="fa-light fa-eye"></i> View Full Details
											</Link>
										) : (teacherStudentComing ? (
											<Link to="/principal/student-baseline/assesment" state={{ studentId: studentId, subjectId: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId, }}>
												<i className="fa-light fa-eye"></i> View Full Details
											</Link>

										) : (<Link to="/principal/student-baseline-assesment" state={{ studentId: studentId, subjectId: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId, }}>
											<i className="fa-light fa-eye"></i> View Full Details
										</Link>)

										)}

									</td>
								)}

{showFullDetails && !["not_started", "not_completed", "in_progress"].includes(studentProfileInfo?.baseline_status) && (
  <td>
    <Link
      to={
        principalComing
          ? "/principal/student/baseline/assesment"
          : teacherStudentComing
          ? "/principal/student-baseline/assesment"
          : principalstudentBaseline
          ? "/principal-student-baseline/assesment"
          : "/principal/student-baseline-assesment"
      }
      state={{
        studentId: studentId,
        subjectId: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId,
      }}
    >
      <i className="fa-light fa-eye"></i> View Full Details
    </Link>
  </td>
)}

							</tr>
							<tr>
								<td>Lesson Quiz</td>
								<td onClick={() => setShowAllLesson(!showAllLession)} style={{ cursor: "pointer" }}>
									All Lessons
									<button type="button" className="lessons-btn">
										<i className="fa-solid fa-angle-down"></i>
									</button>
								</td>

								<td>
									&nbsp;
								</td>
								<td>
									{/* <div className="status">Completed</div> */}

									<div className={`status ${["not_started", "not_completed", "in_progress", ""].includes(studentProfileInfo?.lesson_overall_status) && "review"}`}>{studentProfileInfo?.lesson_overall_status?.replace(/_/g, " ")
										.replace(/\b\w/g, (char) => char.toUpperCase()) || "Not Started"}</div>
								</td>
								<td>
									{/* <Link to={`/principal/student-lesson-quiz/:studentId=${studentId}`}><i className="fa-light fa-eye"></i> View Full Details</Link> */}
								</td>
							</tr>
							{/* <!-- LESSONS-DROPDOWN-LIST --> */}
							{/* <tr className="lessons-list" style={{display:'none'}}>
							<td>&nbsp;</td>
							<td>Lesson 1</td>
							<td>
								<div className="prog">
									92%
									<div className="progress">
										<div className="progress-bar" style={{width:'91.2%'}} role="progressbar"
											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
											aria-valuemax="100"></div>
									</div>
								</div>
							</td>
							<td>
								<div className="status">Completed</div>
							</td>
							<td>
								<Link to="/principal/student-lesson-quiz"><i className="fa-light fa-eye"></i> View Full
									Details</Link>
							</td>
						</tr>
						<tr className="lessons-list" style={{display:'none'}}>
							<td>&nbsp;</td>
							<td>Lesson 2</td>
							<td>
								<div className="prog">
									92%
									<div className="progress">
										<div className="progress-bar" style={{width: '60%', backgroundColor:" #F28100"}}
											role="progressbar" aria-label="Basic example" aria-valuenow="60"
											aria-valuemin="0" aria-valuemax="100"></div>
									</div>
								</div>
							</td>
							<td>
								<div className="status review">Review</div>
							</td>
							<td>
								<Link to="/principal/student-lesson-quiz"><i className="fa-light fa-eye"></i> View Full
									Details</Link>
							</td>
						</tr>
						<tr className="lessons-list" style={{display:'none'}}>
							<td>&nbsp;</td>
							<td>Lesson 3</td>
							<td>
								<div className="prog">
									92%
									<div className="progress">
										<div className="progress-bar" style={{width:'91.2%'}} role="progressbar"
											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
											aria-valuemax="100"></div>
									</div>
								</div>
							</td>
							<td>
								<div className="status">Completed</div>
							</td>
							<td>
								<Link to="/principal/student-lesson-quiz"><i className="fa-light fa-eye"></i> View Full
									Details</Link>
							</td>
						</tr>
						<tr className="lessons-list" style={{display:'none'}}>
							<td>&nbsp;</td>
							<td>Lesson 4</td>
							<td>
								<div className="prog">
									92%
									<div className="progress">
										<div className="progress-bar" style={{width:'91.2%'}} role="progressbar"
											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
											aria-valuemax="100"></div>
									</div>
								</div>
							</td>
							<td>
								<div className="status">Completed</div>
							</td>
							<td>
								<Link to="/principal/student-lesson-quiz"><i className="fa-light fa-eye"></i> View Full
									Details</Link>
							</td>
						</tr>
						<tr className="lessons-list" style={{display:'none'}}>
							<td>&nbsp;</td>
							<td>Lesson 5</td>
							<td>
								<div className="prog">
									92%
									<div className="progress">
										<div className="progress-bar" style={{width: "65%", backgroundColor:" #F28100"}}
											role="progressbar" aria-label="Basic example" aria-valuenow="65"
											aria-valuemin="0" aria-valuemax="100"></div>
									</div>
								</div>
							</td>
							<td>
								<div className="status review">Review</div>
							</td>
							<td>
								<Link to="/principal/student-lesson-quiz"><i className="fa-light fa-eye"></i> View Full
									Details</Link>
							</td>
						</tr>
						<tr className="lessons-list" style={{display:'none'}}>
							<td>&nbsp;</td>
							<td>Lesson 6</td>
							<td>
								<div className="prog">
									92%
									<div className="progress">
										<div className="progress-bar" style={{width:'91.2%'}} role="progressbar"
											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
											aria-valuemax="100"></div>
									</div>
								</div>
							</td>
							<td>
								<div className="status">Completed</div>
							</td>
							<td>
								<Link to="/principal/student-lesson-quiz"><i className="fa-light fa-eye"></i> View Full
									Details</Link>
							</td>
						</tr>
						<tr className="lessons-list" style={{display:'none'}}>
							<td>&nbsp;</td>
							<td>Lesson 7</td>
							<td>
								<div className="prog">
									92%
									<div className="progress">
										<div className="progress-bar" style={{width:'91.2%'}} role="progressbar"
											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
											aria-valuemax="100"></div>
									</div>
								</div>
							</td>
							<td>
								<div className="status">Completed</div>
							</td>
							<td>
								<Link to="/principal/student-lesson-quiz"><i className="fa-light fa-eye"></i> View Full
									Details</Link>
							</td>
						</tr>
						<tr className="lessons-list" style={{display:'none'}}>
							<td>&nbsp;</td>
							<td>Lesson 8</td>
							<td>
								<div className="prog">
									92%
									<div className="progress">
										<div className="progress-bar" style={{width:'91.2%'}} role="progressbar"
											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
											aria-valuemax="100"></div>
									</div>
								</div>
							</td>
							<td>
								<div className="status">Completed</div>
							</td>
							<td>
								<Link to="/principal/student-lesson-quiz"><i className="fa-light fa-eye"></i> View Full
									Details</Link>
							</td>
						</tr> */}




							{studentProfileInfo?.lesson_wise?.map((lesson, index) => (
								<tr key={index} className="lessons-list" style={showAllLession ? {} : { display: "none" }} >
									<td>&nbsp;</td>
									<td>{lesson?.lesson_name}</td>
									<td>
										<div className="prog">
											{lesson?.percentage}%
											<div className="progress">
												<div className="progress-bar" style={{
													width: `${lesson?.percentage}%`,
													backgroundColor: lesson?.percentage < 70 ? "#F28100" : undefined,
												}}
													role="progressbar" aria-label={`Progress for Lesson ${lesson?.lesson_id}`}
													aria-valuenow={lesson?.percentage} aria-valuemin="0" aria-valuemax="100"
												></div>
											</div>
										</div>
									</td>
									<td>
										<div className={`status ${["not_started", "not_completed", "in_progress"].includes(lesson?.status) && "review"}`} >
											{lesson?.status == "completed" && lesson?.percentage < 70
												? "Review" : lesson?.status.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) || "Not Started"}
										</div>
									</td>

									{/* {showFullDetails && !["not_started", "not_completed", "in_progress"].includes(lesson?.status) && (
										<td>
											<Link to={`/principal/student-lesson-quiz/:studentId=${studentId}`} >
												<i className="fa-light fa-eye"></i> View Full Details
											</Link>
										</td>
									)} */}

{showFullDetails && !["not_started", "not_completed", "in_progress"].includes(lesson?.status) && (
  <td>
    <Link
      to={
        principalComing
          ? "/principal/student/lesson/quiz/:studentId"
          : teacherStudentComing
          ? "/principal/student-lesson-quiz/:studentId"
          : principalstudentBaseline
          ? "/principal-student-lesson/quiz/:studentId"
          : "/principal/student-lesson-quiz/:studentId"
      }
      state={{
        studentId: studentId,
        lessonId: lesson?.lesson_id,
        subjectId: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId,
      }}
    >
      <i className="fa-light fa-eye"></i> View Full Details
    </Link>
  </td>
)}
								</tr>
							))}
							{/* <!-- LESSONS-DROPDOWN-LIST --> */}
							{/* <tr>
							<td>Summative</td>
							<td>---</td>
							<td>
								<div className="prog">
									60%
									<div className="progress">
										<div className="progress-bar" style={{width: '60%', backgroundColor:" #F28100"}}
											role="progressbar" aria-label="Basic example" aria-valuenow="60"
											aria-valuemin="0" aria-valuemax="100"></div>
									</div>
								</div>
							</td>
							<td>
								<div className="status review">Retake Quiz</div>
							</td>
							<td>
								<Link to="/principal/student-subject-summative"><i className="fa-light fa-eye"></i> View Full
									Details</Link>
							</td>
						</tr> */}

							<tr>
								<td>Summative</td>
								<td>---</td>
								<td>
									<div className="prog">
										{studentProfileInfo?.summative_score}%
										<div className="progress">
											<div className="progress-bar" style={{
												width: `${studentProfileInfo?.summative_score}%`,
												backgroundColor: "#F28100",
											}}
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
								{/* <td>
									

									{showFullDetails && !["not_started", "not_completed", "in_progress"].includes(studentProfileInfo?.summative_status) && (
										!principalComing ? (
											<Link to="/principal/student-summative" state={{ studentId: studentId, subjectId: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId, }}>
												<i className="fa-light fa-eye"></i> View Full Details
											</Link>
										) : (
											<Link to="/principal/student/summative" state={{ studentId: studentId, subjectId: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId, }}>
												<i className="fa-light fa-eye"></i> View Full Details
											</Link>
										)

									)}
								</td> */}
								{/* {showFullDetails && !["not_started", "not_completed", "in_progress"].includes(studentProfileInfo?.summative_status) && (
									<td>
										{principalComing ? (
											<Link to="/principal/student/summative" state={{ studentId: studentId, subjectId: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId, }}>
												<i className="fa-light fa-eye"></i> View Full Details
											</Link>

										) : (teacherStudentComing ? (
											<Link to="/principal/students-summative" state={{ studentId: studentId, subjectId: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId, }}>
												<i className="fa-light fa-eye"></i> View Full Details
											</Link>
										) :
											(
												<Link to="/principal/student-summative" state={{ studentId: studentId, subjectId: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId, }}>
													<i className="fa-light fa-eye"></i> View Full Details
												</Link>
											)

										)}

									</td>
								)} */}
																{showFullDetails && !["not_started", "not_completed", "in_progress"].includes(studentProfileInfo?.summative_status) && (
									<td>
										<Link
											to={
												principalComing
													? "/principal/student/summative"
													: teacherStudentComing
														? "/principal/students-summative"
														: principalstudentBaseline
														? "/principal-student-summative"
														: "/principal/student-summative"
											}
											state={{
												studentId: studentId,
												subjectId: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId,
											}}
										>
											<i className="fa-light fa-eye"></i> View Full Details
										</Link>
									</td>
								)}
							</tr>
						</table>
					</div>
				</div>
			</div>

		</div>
	)
}

export default PricipalStudentprofile



// for navigation
// {showFullDetails &&
// 	!["not_started", "not_completed", "in_progress"].includes(studentProfileInfo?.baseline_status) && (
// 	  <td>
// 		<Link
// 		  to={
// 			principalComing
// 			  ? "/principal/student/baseline/assesment"
// 			  : teacherStudentComing
// 			  ? "/principal/student-baseline/assesment"
// 			  : "/principal/student-baseline-assesment"
// 		  }
// 		  state={{
// 			studentId: studentId,
// 			subjectId: selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId,
// 		  }}
// 		>
// 		  <i className="fa-light fa-eye"></i> View Full Details
// 		</Link>
// 	  </td>
//   )}