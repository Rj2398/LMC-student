import React, { useState } from 'react';
import { Link } from 'react-router';
import data from "../../assets/teacher.json"

const ProgressSubjectWise = () => {
	const [activeDropdown, setActiveDropdown] = useState(null);

	const [selectedClasses, setSelectedClasses] = useState([]);
	const [selectedStudents, setSelectedStudents] = useState([]);
	const [selectedCourses, setSelectedCourses] = useState([]);

	const [classSearch, setClassSearch] = useState('');
	const [studentSearch, setStudentSearch] = useState('');

	const handleToggle = (id, list, setList) => {
		if (list.includes(id)) {
			setList(list.filter(item => item !== id)); // Uncheck
		} else {
			setList([...list, id]); // Check
		}
	};

	const filteredClasses = data.subjectListData.filter(item =>
		item.title.toLowerCase().includes(classSearch.toLowerCase())
	);

	const filteredStudents = data.StudentListData.filter(item =>
		item.title.toLowerCase().includes(studentSearch.toLowerCase())
	);

	return (
		<div className="my-subjects">
			<div className="top-head">
				<div className="top-head-in">
					<h1 className="mb-0">Subject Wise Quiz Scores</h1>
				</div>
				<div className="influ-btns ms-auto">
					{/* Class Dropdown */}
					<div className="influ-dropdown">
						<button
							className="influ-btn influ-drop-btn"
							type="button"
							onClick={() =>
								setActiveDropdown(activeDropdown === "classDropdown" ? null : "classDropdown")
							}
						>
							{/* All ClassNames <i className="fas fa-chevron-down"></i> */}
							All ClassNames <i className={`fa-regular ${activeDropdown === "classDropdown" ? "fa-angle-up" : "fa-angle-down"}`}></i>
						</button>
						<div className="influ-drop-list" style={{ display: activeDropdown === "classDropdown" ? "block" : "none" }}>
							<div className="influ-drop-list-search">
								<button type="submit"><img src="images/search-icon.svg" alt="" /></button>
								<input
									type="text"
									placeholder="Search"
									value={classSearch}
									onChange={e => setClassSearch(e.target.value)}
								/>
							</div>
							<div className="influ-drop-list-inner">
								<div className="influ-drop-list-item">
									<input type="checkbox" checked={selectedClasses.includes("all")} onChange={() => handleToggle("all", selectedClasses, setSelectedClasses)} />
									All Classes
								</div>
								{filteredClasses.map(item => (
									<div key={item.id} className="influ-drop-list-item">
										<input type="checkbox" checked={selectedClasses.includes("all") || selectedClasses.includes(item.id)} disabled={selectedClasses.includes("all")} onChange={() => handleToggle(item.id, selectedClasses, setSelectedClasses)} />
										{item.title}
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Student Dropdown */}
					<div className="influ-dropdown">
						<button
							className="influ-btn influ-drop-btn"
							type="button"
							onClick={() =>
								setActiveDropdown(activeDropdown === "studentDropdown" ? null : "studentDropdown")
							}
						>
							{/* All Students <i className="fas fa-chevron-down"></i> */}
							All Students <i className={`fa-regular ${activeDropdown === "studentDropdown" ? "fa-angle-up" : "fa-angle-down"} `}></i>
						</button>
						<div className="influ-drop-list" style={{ display: activeDropdown === "studentDropdown" ? "block" : "none" }}>
							<div className="influ-drop-list-search">
								<button type="submit"><img src="images/search-icon.svg" alt="" /></button>
								<input
									type="text"
									placeholder="Search"
									value={studentSearch}
									onChange={e => setStudentSearch(e.target.value)}
								/>
							</div>
							<div className="influ-drop-list-inner">
								<div className="influ-drop-list-item">
									<input type="checkbox" checked={selectedStudents.includes("all")}
										disabled={selectedStudents.length > 0 && selectedStudents[0] !== "all"}
										
										onChange={() => {
											if (selectedStudents.includes("all")) {
												setSelectedStudents([]); // Unselect if already selected
											} else {
												setSelectedStudents(["all"]); // Select all
											}
										}}
										style={
											selectedStudents.length > 0 && selectedStudents[0] !== "all" ? { backgroundColor: "#d7cdcd" }
												: {}
										}
									/>
									All Students
								</div>
								{filteredStudents.map(item => (
									<div key={item.id} className="influ-drop-list-item">
									<input type="checkbox" checked={selectedStudents.includes("all") || selectedStudents.includes(item.id)} disabled={selectedStudents.length > 0 && !selectedStudents.includes(item.id)}
								
										onChange={() => {
											if (selectedStudents.includes(item.id)) {
												setSelectedStudents([]); // Unselect if already selected
											} else {
												setSelectedStudents([item.id]); // Select this student only
											}
										}}
										style={selectedStudents.length > 0 && !selectedStudents.includes(item.id) ? { backgroundColor: "#d7cdcd" } : {}}

									/>
									{item.title}
								</div>
								))}
							</div>
						</div>
					</div>

					{/* Course Dropdown */}
					<div className="influ-dropdown">
						<button className="influ-btn influ-drop-btn" type="button" onClick={() => setActiveDropdown(activeDropdown === "courseDropdown" ? null : "courseDropdown")} >
							{/* All Subjects <i className="fas fa-chevron-down"></i> */}
							All Subjects <i className={`fa-regular ${activeDropdown === "courseDropdown" ? "fa-angle-up" : "fa-angle-down"} `}></i>
						</button>
						<div className="influ-drop-list" style={{ display: activeDropdown === "courseDropdown" ? "block" : "none" }}>
							<div className="influ-drop-list-inner">
								<div className="influ-drop-list-item">
									<input type="checkbox" checked={selectedCourses.includes("all")} onChange={() => handleToggle("all", selectedCourses, setSelectedCourses)} />
									All Subjects
								</div>
								{data.courseData.map(item => (
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
									<div className="progress-bar" style={{ width: "92%" }} role="progressbar"
										aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
										aria-valuemax="100"></div>
								</div>
							</div>
						</td>
						<td>
							<div className="status">Completed</div>
						</td>
						<td>
							{/* <a href="subject-baseline-detail"><i className="fa-light fa-eye"></i> View Full Details</a> */}
							<Link to="/teacher/student-baseline-assessment"><i className="fa-light fa-eye"></i> View Full
								Details</Link>
						</td>
					</tr>
					<tr>
						<td>Lesson Quiz</td>
						<td>All Lessons
							<button type="button" className="lessons-btn">
								<i className="fa-regular fa-angle-down"></i>
							</button>
						</td>
						<td>
							&nbsp;
						</td>
						<td>
							<div className="status">Completed</div>
						</td>
						<td>
							{/* <a href="#"><i className="fa-light fa-eye"></i> View Full Details</a> */}
							<Link to="/teacher/student-lesson-quiz"><i className="fa-light fa-eye"></i> View Full Details</Link>
						</td>
					</tr>
					{/* <!-- LESSONS-DROPDOWN-LIST --> */}
					<tr className="lessons-list" style={{ display: "none" }}>
						<td>&nbsp;</td>
						<td>Lesson 1</td>
						<td>
							<div className="prog">
								92%
								<div className="progress">
									<div className="progress-bar" style={{ width: "92%" }} role="progressbar"
										aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
										aria-valuemax="100"></div>
								</div>
							</div>
						</td>
						<td>
							<div className="status">Completed</div>
						</td>
						<td>
							<a href="subject-lesson-detail"><i className="fa-light fa-eye"></i> View Full Details</a>
						</td>
					</tr>
					<tr className="lessons-list" style={{ display: "none" }}>
						<td>&nbsp;</td>
						<td>Lesson 2</td>
						<td>
							<div className="prog">
								92%
								<div className="progress">
									<div className="progress-bar" style={{ width: "60%", backgroundColor: "#F28100" }}
										role="progressbar" aria-label="Basic example" aria-valuenow="60"
										aria-valuemin="0" aria-valuemax="100"></div>
								</div>
							</div>
						</td>
						<td>
							<div className="status review">Review</div>
						</td>
						<td>
							<a href="subject-lesson-detail"><i className="fa-light fa-eye"></i> View Full Details</a>
						</td>
					</tr>
					<tr className="lessons-list" style={{ display: "none" }}>
						<td>&nbsp;</td>
						<td>Lesson 3</td>
						<td>
							<div className="prog">
								92%
								<div className="progress">
									<div className="progress-bar" style={{ width: "92%" }} role="progressbar"
										aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
										aria-valuemax="100"></div>
								</div>
							</div>
						</td>
						<td>
							<div className="status">Completed</div>
						</td>
						<td>
							<a href="subject-lesson-detail"><i className="fa-light fa-eye"></i> View Full Details</a>
						</td>
					</tr>
					<tr className="lessons-list" style={{ display: "none" }}>
						<td>&nbsp;</td>
						<td>Lesson 4</td>
						<td>
							<div className="prog">
								92%
								<div className="progress">
									<div className="progress-bar" style={{ width: "92%" }} role="progressbar"
										aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
										aria-valuemax="100"></div>
								</div>
							</div>
						</td>
						<td>
							<div className="status">Completed</div>
						</td>
						<td>
							<a href="subject-lesson-detail"><i className="fa-light fa-eye"></i> View Full Details</a>
						</td>
					</tr>
					<tr className="lessons-list" style={{ display: "none" }}>
						<td>&nbsp;</td>
						<td>Lesson 5</td>
						<td>
							<div className="prog">
								92%
								<div className="progress">
									<div className="progress-bar" style={{ width: "65%", backgroundColor: "#F28100" }}
										role="progressbar" aria-label="Basic example" aria-valuenow="65"
										aria-valuemin="0" aria-valuemax="100"></div>
								</div>
							</div>
						</td>
						<td>
							<div className="status review">Review</div>
						</td>
						<td>
							<a href="subject-lesson-detail"><i className="fa-light fa-eye"></i> View Full Details</a>
						</td>
					</tr>
					<tr className="lessons-list" style={{ display: "none" }}>
						<td>&nbsp;</td>
						<td>Lesson 6</td>
						<td>
							<div className="prog">
								92%
								<div className="progress">
									<div className="progress-bar" style={{ width: "92%" }} role="progressbar"
										aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
										aria-valuemax="100"></div>
								</div>
							</div>
						</td>
						<td>
							<div className="status">Completed</div>
						</td>
						<td>
							<a href="subject-lesson-detail"><i className="fa-light fa-eye"></i> View Full Details</a>
						</td>
					</tr>
					<tr className="lessons-list" style={{ display: "none" }}>
						<td>&nbsp;</td>
						<td>Lesson 7</td>
						<td>
							<div className="prog">
								92%
								<div className="progress">
									<div className="progress-bar" style={{ width: "92%" }} role="progressbar"
										aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
										aria-valuemax="100"></div>
								</div>
							</div>
						</td>
						<td>
							<div className="status">Completed</div>
						</td>
						<td>
							<a href="subject-lesson-detail"><i className="fa-light fa-eye"></i> View Full Details</a>
						</td>
					</tr>
					<tr className="lessons-list" style={{ display: "none" }}>
						<td>&nbsp;</td>
						<td>Lesson 8</td>
						<td>
							<div className="prog">
								92%
								<div className="progress">
									<div className="progress-bar" style={{ width: "92%" }} role="progressbar"
										aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
										aria-valuemax="100"></div>
								</div>
							</div>
						</td>
						<td>
							<div className="status">Completed</div>
						</td>
						<td>
							<a href="subject-lesson-detail"><i className="fa-light fa-eye"></i> View Full Details</a>
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
									<div className="progress-bar" style={{ width: "60%", backgroundColor: "#F28100" }}
										role="progressbar" aria-label="Basic example" aria-valuenow="60"
										aria-valuemin="0" aria-valuemax="100"></div>
								</div>
							</div>
						</td>
						<td>
							<div className="status review">Retake Quiz</div>
						</td>
						<td>
							{/* <a href="subject-summative-detail"><i className="fa-light fa-eye"></i> View Full Details</a> */}
							<Link to="/teacher/student-summative-assessment"><i className="fa-light fa-eye"></i> View Full
								Details</Link>
						</td>
					</tr>
				</table>
			</div>
		</div>
	)
}

export default ProgressSubjectWise


// import React, { useState } from 'react';
// import { Link } from 'react-router';
// import data from "../../assets/teacher.json"

// const ProgressSubjectWise = () => {
// 	const [activeDropdown, setActiveDropdown] = useState(null);

//   const [selectedClasses, setSelectedClasses] = useState([]);
//   const [selectedStudents, setSelectedStudents] = useState([]);
//   const [selectedCourses, setSelectedCourses] = useState([]);

//   const [classSearch, setClassSearch] = useState('');
//   const [studentSearch, setStudentSearch] = useState('');

//   const handleToggle = (id, list, setList) => {
//     if (list.includes(id)) {
//       setList(list.filter(item => item !== id)); // Uncheck
//     } else {
//       setList([...list, id]); // Check
//     }
//   };

//   const filteredClasses = data.subjectListData.filter(item =>
//     item.title.toLowerCase().includes(classSearch.toLowerCase())
//   );

//   const filteredStudents = data.StudentListData.filter(item =>
//     item.title.toLowerCase().includes(studentSearch.toLowerCase())
//   );

//   return (
//     <div className="my-subjects">
// 		<div className="top-head">
// 			<div className="top-head-in">
// 				<h1 className="mb-0">Subject Wise Quiz Scores</h1>
// 			</div>
// 			<div className="influ-btns ms-auto">
//           {/* Class Dropdown */}
//           <div className="influ-dropdown">
//             <button
//               className="influ-btn influ-drop-btn"
//               type="button"
//               onClick={() =>
//                 setActiveDropdown(activeDropdown === "classDropdown" ? null : "classDropdown")
//               }
//             >
//               {/* All ClassNames <i className="fas fa-chevron-down"></i> */}
//               All ClassNames <i className={`fa-regular ${activeDropdown === "classDropdown" ? "fa-angle-up" : "fa-angle-down"}`}></i>
//             </button>
//             <div className="influ-drop-list" style={{ display: activeDropdown === "classDropdown" ? "block" : "none" }}>
//               <div className="influ-drop-list-search">
//                 <button type="submit"><img src="images/search-icon.svg" alt="" /></button>
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   value={classSearch}
//                   onChange={e => setClassSearch(e.target.value)}
//                 />
//               </div>
//               <div className="influ-drop-list-inner">
// 				<div className="influ-drop-list-item">
//                 	<input type="checkbox" checked={selectedClasses.includes("all")} onChange={() => handleToggle("all", selectedClasses, setSelectedClasses)} />
//                     All Classes
//                 </div>
//                 {filteredClasses.map(item => (
//                   <div key={item.id} className="influ-drop-list-item">
//                     <input type="checkbox" checked={selectedClasses.includes("all") || selectedClasses.includes(item.id)} disabled={selectedClasses.includes("all")} onChange={() => handleToggle(item. id, selectedClasses, setSelectedClasses)} />
//                     {item.title}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Student Dropdown */}
//           <div className="influ-dropdown">
//             <button
//               className="influ-btn influ-drop-btn"
//               type="button"
//               onClick={() =>
//                 setActiveDropdown(activeDropdown === "studentDropdown" ? null : "studentDropdown")
//               }
//             >
//               {/* All Students <i className="fas fa-chevron-down"></i> */}
//               All Students <i className={`fa-regular ${activeDropdown === "studentDropdown" ? "fa-angle-up" : "fa-angle-down"} `}></i>
//             </button>
//             <div className="influ-drop-list" style={{ display: activeDropdown === "studentDropdown" ? "block" : "none" }}>
//               <div className="influ-drop-list-search">
//                 <button type="submit"><img src="images/search-icon.svg" alt="" /></button>
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   value={studentSearch}
//                   onChange={e => setStudentSearch(e.target.value)}
//                 />
//               </div>
//               <div className="influ-drop-list-inner">
// 				<div className="influ-drop-list-item">
//                 	<input type="checkbox" checked={selectedStudents.includes("all")} onChange={() => handleToggle("all", selectedStudents, setSelectedStudents)} />
//                     All Students
//                 </div>
//                 {filteredStudents.map(item => (
//                   <div key={item.id} className="influ-drop-list-item">
//                     <input type="checkbox" checked={selectedStudents.includes("all") || selectedStudents.includes(item.id)} disabled={selectedStudents.includes("all")} onChange={() => handleToggle(item.id, selectedStudents, setSelectedStudents)} />
//                     {item.title}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Course Dropdown */}
//           <div className="influ-dropdown">
//             <button className="influ-btn influ-drop-btn" type="button" onClick={() => setActiveDropdown(activeDropdown === "courseDropdown" ? null : "courseDropdown") } >
//               {/* All Subjects <i className="fas fa-chevron-down"></i> */}
//               All Subjects <i className={`fa-regular ${activeDropdown === "courseDropdown" ? "fa-angle-up" : "fa-angle-down"} `}></i>
//             </button>
//             <div className="influ-drop-list" style={{ display: activeDropdown === "courseDropdown" ? "block" : "none" }}>
//               <div className="influ-drop-list-inner">
//               	<div className="influ-drop-list-item">
//                 	<input type="checkbox" checked={selectedCourses.includes("all")} onChange={() => handleToggle("all", selectedCourses, setSelectedCourses)} />
//                     All Subjects
//                 </div>
//                 {data.courseData.map(item => (
//                   <div key={item.id} className="influ-drop-list-item">
//                     <input type="checkbox"
//                       checked={selectedCourses.includes("all") || selectedCourses.includes(item.id)} disabled={selectedCourses.includes("all")}
//                       onChange={() => handleToggle(item.id, selectedCourses, setSelectedCourses)}
//                     />
//                     {item.title}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//         </div>
					
// 			</div>
// 				<div className="table-responsive">
// 					<table>
// 						<tr>
// 							<th style={{width: "250px"}}>Assessment Type</th>
// 							<th>Lesson </th>
// 							<th style={{width: "400px"}}>Score </th>
// 							<th>Status </th>
// 							<th>Action </th>
// 						</tr>
// 						<tr>
// 							<td>Baseline</td>
// 							<td>---</td>
// 							<td>
// 								<div className="prog">
// 									92%
// 									<div className="progress">
// 										<div className="progress-bar" style={{width: "92%"}} role="progressbar"
// 											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
// 											aria-valuemax="100"></div>
// 									</div>
// 								</div>
// 							</td>
// 							<td>
// 								<div className="status">Completed</div>
// 							</td>
// 							<td>
// 								{/* <a href="subject-baseline-detail"><i className="fa-light fa-eye"></i> View Full Details</a> */}
// 								<Link to="/teacher/student-baseline-assessment"><i className="fa-light fa-eye"></i> View Full
//                             Details</Link>
// 							</td>
// 						</tr>
// 						<tr>
// 							<td>Lesson Quiz</td>
// 							<td>All Lessons
// 								<button type="button" className="lessons-btn">
// 									<i className="fa-regular fa-angle-down"></i>
// 								</button>
// 							</td>
// 							<td>
// 								&nbsp;
// 							</td>
// 							<td>
// 								<div className="status">Completed</div>
// 							</td>
// 							<td>
// 								{/* <a href="#"><i className="fa-light fa-eye"></i> View Full Details</a> */}
// 								<Link to="/teacher/student-lesson-quiz"><i className="fa-light fa-eye"></i> View Full Details</Link>
// 							</td>
// 						</tr>
// 						{/* <!-- LESSONS-DROPDOWN-LIST --> */}
// 						<tr className="lessons-list" style={{display: "none"}}>
// 							<td>&nbsp;</td>
// 							<td>Lesson 1</td>
// 							<td>
// 								<div className="prog">
// 									92%
// 									<div className="progress">
// 										<div className="progress-bar" style={{width: "92%"}} role="progressbar"
// 											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
// 											aria-valuemax="100"></div>
// 									</div>
// 								</div>
// 							</td>
// 							<td>
// 								<div className="status">Completed</div>
// 							</td>
// 							<td>
// 								<a href="subject-lesson-detail"><i className="fa-light fa-eye"></i> View Full Details</a>
// 							</td>
// 						</tr>
// 						<tr className="lessons-list" style={{display: "none"}}>
// 							<td>&nbsp;</td>
// 							<td>Lesson 2</td>
// 							<td>
// 								<div className="prog">
// 									92%
// 									<div className="progress">
// 										<div className="progress-bar" style={{width: "60%", backgroundColor: "#F28100"}}
// 											role="progressbar" aria-label="Basic example" aria-valuenow="60"
// 											aria-valuemin="0" aria-valuemax="100"></div>
// 									</div>
// 								</div>
// 							</td>
// 							<td>
// 								<div className="status review">Review</div>
// 							</td>
// 							<td>
// 								<a href="subject-lesson-detail"><i className="fa-light fa-eye"></i> View Full Details</a>
// 							</td>
// 						</tr>
// 						<tr className="lessons-list" style={{display: "none"}}>
// 							<td>&nbsp;</td>
// 							<td>Lesson 3</td>
// 							<td>
// 								<div className="prog">
// 									92%
// 									<div className="progress">
// 										<div className="progress-bar" style={{width: "92%"}} role="progressbar"
// 											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
// 											aria-valuemax="100"></div>
// 									</div>
// 								</div>
// 							</td>
// 							<td>
// 								<div className="status">Completed</div>
// 							</td>
// 							<td>
// 								<a href="subject-lesson-detail"><i className="fa-light fa-eye"></i> View Full Details</a>
// 							</td>
// 						</tr>
// 						<tr className="lessons-list" style={{display: "none"}}>
// 							<td>&nbsp;</td>
// 							<td>Lesson 4</td>
// 							<td>
// 								<div className="prog">
// 									92%
// 									<div className="progress">
// 										<div className="progress-bar" style={{width: "92%"}} role="progressbar"
// 											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
// 											aria-valuemax="100"></div>
// 									</div>
// 								</div>
// 							</td>
// 							<td>
// 								<div className="status">Completed</div>
// 							</td>
// 							<td>
// 								<a href="subject-lesson-detail"><i className="fa-light fa-eye"></i> View Full Details</a>
// 							</td>
// 						</tr>
// 						<tr className="lessons-list" style={{display: "none"}}>
// 							<td>&nbsp;</td>
// 							<td>Lesson 5</td>
// 							<td>
// 								<div className="prog">
// 									92%
// 									<div className="progress">
// 										<div className="progress-bar" style={{width: "65%", backgroundColor: "#F28100"}}
// 											role="progressbar" aria-label="Basic example" aria-valuenow="65"
// 											aria-valuemin="0" aria-valuemax="100"></div>
// 									</div>
// 								</div>
// 							</td>
// 							<td>
// 								<div className="status review">Review</div>
// 							</td>
// 							<td>
// 								<a href="subject-lesson-detail"><i className="fa-light fa-eye"></i> View Full Details</a>
// 							</td>
// 						</tr>
// 						<tr className="lessons-list" style={{display: "none"}}>
// 							<td>&nbsp;</td>
// 							<td>Lesson 6</td>
// 							<td>
// 								<div className="prog">
// 									92%
// 									<div className="progress">
// 										<div className="progress-bar" style={{width: "92%"}} role="progressbar"
// 											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
// 											aria-valuemax="100"></div>
// 									</div>
// 								</div>
// 							</td>
// 							<td>
// 								<div className="status">Completed</div>
// 							</td>
// 							<td>
// 								<a href="subject-lesson-detail"><i className="fa-light fa-eye"></i> View Full Details</a>
// 							</td>
// 						</tr>
// 						<tr className="lessons-list" style={{display: "none"}}>
// 							<td>&nbsp;</td>
// 							<td>Lesson 7</td>
// 							<td>
// 								<div className="prog">
// 									92%
// 									<div className="progress">
// 										<div className="progress-bar" style={{width: "92%"}} role="progressbar"
// 											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
// 											aria-valuemax="100"></div>
// 									</div>
// 								</div>
// 							</td>
// 							<td>
// 								<div className="status">Completed</div>
// 							</td>
// 							<td>
// 								<a href="subject-lesson-detail"><i className="fa-light fa-eye"></i> View Full Details</a>
// 							</td>
// 						</tr>
// 						<tr className="lessons-list" style={{display: "none"}}>
// 							<td>&nbsp;</td>
// 							<td>Lesson 8</td>
// 							<td>
// 								<div className="prog">
// 									92%
// 									<div className="progress">
// 										<div className="progress-bar" style={{width: "92%"}} role="progressbar"
// 											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
// 											aria-valuemax="100"></div>
// 									</div>
// 								</div>
// 							</td>
// 							<td>
// 								<div className="status">Completed</div>
// 							</td>
// 							<td>
// 								<a href="subject-lesson-detail"><i className="fa-light fa-eye"></i> View Full Details</a>
// 							</td>
// 						</tr>
// 						{/* <!-- LESSONS-DROPDOWN-LIST --> */}
// 						<tr>
// 							<td>Summative</td>
// 							<td>---</td>
// 							<td>
// 								<div className="prog">
// 									60%
// 									<div className="progress">
// 										<div className="progress-bar" style={{width: "60%", backgroundColor: "#F28100"}}
// 											role="progressbar" aria-label="Basic example" aria-valuenow="60"
// 											aria-valuemin="0" aria-valuemax="100"></div>
// 									</div>
// 								</div>
// 							</td>
// 							<td>
// 								<div className="status review">Retake Quiz</div>
// 							</td>
// 							<td>
// 								{/* <a href="subject-summative-detail"><i className="fa-light fa-eye"></i> View Full Details</a> */}
// 								<Link to="/teacher/student-summative-assessment"><i className="fa-light fa-eye"></i> View Full
//                                     Details</Link>
// 							</td>
// 						</tr>
// 					</table>
// 				</div>
// 			</div>
//   )
// }

// export default ProgressSubjectWise
