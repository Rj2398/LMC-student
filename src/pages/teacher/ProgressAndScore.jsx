import React, { useState } from 'react'
import ProgressSubjectWise from '../../components/teacher/ProgressSubjectWise'
import data from "../../assets/teacher.json"

const ProgressAndScore = () => {
	const [activeDropdown, setActiveDropdown] = useState(null);

	const [selectedClasses, setSelectedClasses] = useState([]);
	const [selectedStudents, setSelectedStudents] = useState([]);
	const [selectedCourses, setSelectedCourses] = useState([]);

	console.log(selectedClasses,'selectedClasses')
	console.log(selectedStudents,'selectedStudents')
	console.log(selectedCourses,'selectedCourses')

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
		<>
			<div className="top-head prog-sco-wrp">
				<div className="top-head-in">
					<h1>Progress & Score</h1>
					<p>Track your learning journey and achievements</p>
				</div>

				<div className="influ-btns ms-auto">
					{/* Class Dropdown */}
					<div className="influ-dropdown">
						<button className="influ-btn influ-drop-btn" type="button" onClick={() => setActiveDropdown(activeDropdown === "classDropdown" ? null : "classDropdown")} >
							All ClassNames <i className={`fa-regular ${activeDropdown === "classDropdown" ? "fa-angle-up" : "fa-angle-down"}`}></i>
							{/* All ClassNames <i className={`fas fa-chevron-down ${activeDropdown === "classDropdown" ? "active" : ""}`}></i> */}
						</button>
						<div className="influ-drop-list" style={{ display: activeDropdown === "classDropdown" ? "block" : "none" }}>
							<div className="influ-drop-list-search">
								<button type="submit"><img src="images/search-icon.svg" alt="" /></button>
								<input type="text" placeholder="Search" value={classSearch} onChange={e => setClassSearch(e.target.value)} />
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
						<button className="influ-btn influ-drop-btn" type="button" onClick={() => setActiveDropdown(activeDropdown === "studentDropdown" ? null : "studentDropdown")} >
							All Students <i className={`fa-regular ${activeDropdown === "studentDropdown" ? "fa-angle-up" : "fa-angle-down"}`}></i>
						</button>
						<div className="influ-drop-list" style={{ display: activeDropdown === "studentDropdown" ? "block" : "none" }}>
							<div className="influ-drop-list-search">
								<button type="submit"><img src="images/search-icon.svg" alt="" /></button>
								<input type="text" placeholder="Search" value={studentSearch} onChange={e => setStudentSearch(e.target.value)} />
							</div>
							<div className="influ-drop-list-inner">
								<div className="influ-drop-list-item">
									<input type="checkbox" checked={selectedStudents.includes("all")}
										disabled={selectedStudents.length > 0 && selectedStudents[0] !== "all"}
										// onChange={() => handleToggle("all", selectedStudents, setSelectedStudents)} 
										// onChange={() => setSelectedStudents(["all"])}
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
											// onChange={() => handleToggle(item.id, selectedStudents, setSelectedStudents)} 
											// onChange={() => setSelectedStudents([item.id])}
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
						<button className="influ-btn influ-drop-btn" type="button" onClick={() =>
							setActiveDropdown(activeDropdown === "courseDropdown" ? null : "courseDropdown")
						} >
							All Subjects <i className={`fa-regular ${activeDropdown === "courseDropdown" ? "fa-angle-up" : "fa-angle-down"}`}></i>
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
			<div className="progress-grid">
				<div className="row g-0">
					<div className="col-lg-3">
						<div className="progress-grid-in ms-0">
							<h2><img src="../images/dashboard/progress-grid/1.svg" alt="" /> Baseline <br /> Assessments
							</h2>
							<h3>60%</h3>
							<p className="text-white">03/05 completed</p>
						</div>
					</div>
					<div className="col-lg-3">
						<div className="progress-grid-in">
							<h2><img src="../images/dashboard/progress-grid/3.svg" alt="" /> Lesson-Wise Quiz <br />
								Progress
							</h2>
							<h3>50%</h3>
							<p className="text-black">20/40 completed</p>
						</div>
					</div>
					<div className="col-lg-3">
						<div className="progress-grid-in">
							<h2><img src="../images/dashboard/progress-grid/2.svg" alt="" /> Summative <br /> Assessments
							</h2>
							<h3>40%</h3>
							<p className="text-black">02/05 completed</p>
						</div>
					</div>
					<div className="col-lg-3">
						<div className="progress-grid-in">
							<h2><img src="../images/dashboard/progress-grid/3.svg" alt="" /> Overall Lesson progress</h2>
							<h3>50%</h3>
							<p className="text-black">20 of 40 lessons completed</p>
						</div>
					</div>
				</div>
			</div>

			<div className="subjects-lesson-progress mt-2">
				<div className="row">
					<div className="col-lg-12">
						<div className="my-subjects">
							<div className="my-subjects-head mb-4">
								<h3><img src="../images/dashboard/chart-icon.svg" alt="" /> Subject-wise Performance</h3>
							</div>
							<div className="chart-wrap">
								<div className="chart-in">
									<p className="performance-text">Subject-wise Performance</p>
									<div className="chart-in-percent-grp">
										<div className="chart-in-percent"> <span>100</span>
											<hr />
										</div>
										<div className="chart-in-percent"> <span>80</span>
											<hr />
										</div>
										<div className="chart-in-percent"> <span>60</span>
											<hr />
										</div>
										<div className="chart-in-percent"> <span>40</span>
											<hr />
										</div>
										<div className="chart-in-percent"> <span>20</span>
											<hr />
										</div>
										<div className="chart-in-percent align-items-end"> <span>0</span>
											<hr style={{ width: "95%" }} className="ms-auto" />
										</div>
										<div className="chart-bar-grp">
											<div className="chart-bar-in">
												<div className="hover-data">
													<div className="hover-data-in">
														<p><span style={{ backgroundColor: "#C951E7" }}></span> Baseline
															Assessments, 80%</p>
														<p><span style={{ backgroundColor: "#D573ED" }}></span> Lesson Quiz,
															(80%) 02/08</p>
														<p><span style={{ backgroundColor: "#F1B7FF" }}></span> Summative
															Assessments, 80%</p>
													</div>
												</div>
												<div className="bar-wrp">
													<div className="bar" style={{ backgroundColor: "#C951E7", height: "80%" }}>
													</div><span>B</span>
												</div>
												<div className="bar-wrp">
													<div className="bar" style={{ backgroundColor: "#D573ED", height: "60%" }}>
													</div><span>L</span>
												</div>
												<div className="bar-wrp">
													<div className="bar" style={{ backgroundColor: "#F1B7FF", height: "65%" }}>
													</div><span>S</span>
												</div>
											</div>
											<div className="chart-bar-in">
												<div className="hover-data">
													<div className="hover-data-in">
														<p><span style={{ backgroundColor: "#C951E7" }}></span> Baseline
															Assessments, 80%</p>
														<p><span style={{ backgroundColor: "#D573ED" }}></span> Lesson Quiz,
															(80%) 02/08</p>
														<p><span style={{ backgroundColor: "#F1B7FF" }}></span> Summative
															Assessments, 80%</p>
													</div>
												</div>
												<div className="bar-wrp">
													<div className="bar" style={{ backgroundColor: "#6466E9", height: "80%" }}>
													</div><span>B</span>
												</div>
												<div className="bar-wrp">
													<div className="bar" style={{ backgroundColor: "#888AF3", height: "60%" }}>
													</div><span>L</span>
												</div>
												<div className="bar-wrp">
													<div className="bar" style={{ backgroundColor: "#B4B5FC", height: "65%" }}>
													</div><span>S</span>
												</div>
											</div>
											<div className="chart-bar-in">
												<div className="hover-data">
													<div className="hover-data-in">
														<p><span style={{ backgroundColor: "#C951E7" }}></span> Baseline
															Assessments, 80%</p>
														<p><span style={{ backgroundColor: "#D573ED" }}></span> Lesson Quiz,
															(80%) 02/08</p>
														<p><span style={{ backgroundColor: "#F1B7FF" }}></span> Summative
															Assessments, 80%</p>
													</div>
												</div>
												<div className="bar-wrp">
													<div className="bar" style={{ backgroundColor: "#55E6C1", height: "80%" }}>
													</div><span>B</span>
												</div>
												<div className="bar-wrp">
													<div className="bar" style={{ backgroundColor: "#82EBD0", height: "60%" }}>
													</div><span>L</span>
												</div>
												<div className="bar-wrp">
													<div className="bar" style={{ backgroundColor: "#BDEFE2", height: "65%" }}>
													</div><span>S</span>
												</div>
											</div>
											<div className="chart-bar-in">
												<div className="hover-data">
													<div className="hover-data-in">
														<p><span style={{ backgroundColor: "#FFC312" }}></span> Baseline
															Assessments, 80%</p>
														<p><span style={{ backgroundColor: "#FEDB74" }}></span> Lesson Quiz,
															(80%) 02/08</p>
														<p><span style={{ backgroundColor: "#FAE9B7" }}></span> Summative
															Assessments, 80%</p>
													</div>
												</div>
												<div className="bar-wrp">
													<div className="bar" style={{ backgroundColor: "#FFC312", height: "80%" }}>
													</div><span>B</span>
												</div>
												<div className="bar-wrp">
													<div className="bar" style={{ backgroundColor: "#FEDB74", height: "60%" }}>
													</div><span>L</span>
												</div>
												<div className="bar-wrp">
													<div className="bar" style={{ backgroundColor: "#FAE9B7", height: "65%" }}>
													</div><span>S</span>
												</div>
											</div>
											<div className="chart-bar-in">
												<div className="hover-data">
													<div className="hover-data-in">
														<p><span style={{ backgroundColor: "#ED4C67" }}></span> Baseline
															Assessments, 80%</p>
														<p><span style={{ backgroundColor: "#EC6F84" }}></span> Lesson Quiz,
															(80%) 02/08</p>
														<p><span style={{ backgroundColor: "#F5ABB7" }}></span> Summative
															Assessments, 80%</p>
													</div>
												</div>
												<div className="bar-wrp">
													<div className="bar" style={{ backgroundColor: "#ED4C67", height: "80%" }}>
													</div><span>B</span>
												</div>
												<div className="bar-wrp">
													<div className="bar" style={{ backgroundColor: "#EC6F84", height: "60%" }}>
													</div><span>L</span>
												</div>
												<div className="bar-wrp">
													<div className="bar" style={{ backgroundColor: "#F5ABB7", height: "65%" }}>
													</div><span>S</span>
												</div>
											</div>
										</div>
										{/* <!-- BARS --> */}
									</div>
								</div>
								<p className="activity-text">Activity Type</p>
								<ul>
									<li><span style={{ backgroundColor: "#C951E7" }}></span> Life Dream</li>
									<li><span style={{ backgroundColor: "#6466E9" }}></span> Self-Awareness</li>
									<li><span style={{ backgroundColor: "#55E6C1" }}></span> Cognitive Construction</li>
									<li><span style={{ backgroundColor: "#FFC312" }}></span> Interpersonal Relationships
										<li><span style={{ backgroundColor: "#ED4C67" }}></span> Coping</li>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<ProgressSubjectWise />
		</>
	)
}

export default ProgressAndScore


// import React, { useState } from 'react'
// import ProgressSubjectWise from '../../components/teacher/ProgressSubjectWise'
// import data from "../../assets/teacher.json"

// const ProgressAndScore = () => {
//   const [activeDropdown, setActiveDropdown] = useState(null);

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
// 	<>
// 		<div className="top-head prog-sco-wrp">
// 			<div className="top-head-in">
// 				<h1>Progress & Score</h1>
// 				<p>Track your learning journey and achievements</p>
// 			</div>

// 			<div className="influ-btns ms-auto">
//           {/* Class Dropdown */}
//           <div className="influ-dropdown">
//             <button className="influ-btn influ-drop-btn" type="button" onClick={() => setActiveDropdown(activeDropdown === "classDropdown" ? null : "classDropdown") } >
//               All ClassNames <i className={`fa-regular ${activeDropdown === "classDropdown" ? "fa-angle-up" : "fa-angle-down"}`}></i>
//               {/* All ClassNames <i className={`fas fa-chevron-down ${activeDropdown === "classDropdown" ? "active" : ""}`}></i> */}
//             </button>
//             <div className="influ-drop-list" style={{ display: activeDropdown === "classDropdown" ? "block" : "none" }}>
//               <div className="influ-drop-list-search">
//                 <button type="submit"><img src="images/search-icon.svg" alt="" /></button>
//                 <input type="text" placeholder="Search" value={classSearch} onChange={e => setClassSearch(e.target.value)} />
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
//             <button className="influ-btn influ-drop-btn" type="button" onClick={() => setActiveDropdown(activeDropdown === "studentDropdown" ? null : "studentDropdown") } >
//               All Students <i className={`fa-regular ${activeDropdown === "studentDropdown" ? "fa-angle-up" : "fa-angle-down"}`}></i>
//             </button>
//             <div className="influ-drop-list" style={{ display: activeDropdown === "studentDropdown" ? "block" : "none" }}>
//               <div className="influ-drop-list-search">
//                 <button type="submit"><img src="images/search-icon.svg" alt="" /></button>
//                 <input type="text" placeholder="Search" value={studentSearch} onChange={e => setStudentSearch(e.target. value)} />
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
//             <button className="influ-btn influ-drop-btn" type="button" onClick={() =>
//                 setActiveDropdown(activeDropdown === "courseDropdown" ? null : "courseDropdown")
//               } >
//               All Subjects <i className={`fa-regular ${activeDropdown === "courseDropdown" ? "fa-angle-up" : "fa-angle-down"}`}></i>
//             </button>
//             <div className="influ-drop-list" style={{ display: activeDropdown === "courseDropdown" ? "block" : "none" }}>
//               <div className="influ-drop-list-inner">
// 				<div className="influ-drop-list-item">
//                     <input type="checkbox" checked={selectedCourses.includes("all")} onChange={() => handleToggle("all", selectedCourses, setSelectedCourses)} />
//                     All Subjects
//                   </div>
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

// 		</div>
// 			<div className="progress-grid">
// 				<div className="row g-0">
// 					<div className="col-lg-3">
// 						<div className="progress-grid-in ms-0">
// 							<h2><img src="../images/dashboard/progress-grid/1.svg" alt="" /> Baseline <br /> Assessments
// 							</h2>
// 							<h3>60%</h3>
// 							<p className="text-white">03/05 completed</p>
// 						</div>
// 					</div>
// 					<div className="col-lg-3">
// 						<div className="progress-grid-in">
// 							<h2><img src="../images/dashboard/progress-grid/3.svg" alt="" /> Lesson-Wise Quiz <br />
// 								Progress
// 							</h2>
// 							<h3>50%</h3>
// 							<p className="text-black">20/40 completed</p>
// 						</div>
// 					</div>
// 					<div className="col-lg-3">
// 						<div className="progress-grid-in">
// 							<h2><img src="../images/dashboard/progress-grid/2.svg" alt="" /> Summative <br /> Assessments
// 							</h2>
// 							<h3>40%</h3>
// 							<p className="text-black">02/05 completed</p>
// 						</div>
// 					</div>
// 					<div className="col-lg-3">
// 						<div className="progress-grid-in">
// 							<h2><img src="../images/dashboard/progress-grid/3.svg" alt="" /> Overall Lesson progress</h2>
// 							<h3>50%</h3>
// 							<p className="text-black">20 of 40 lessons completed</p>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
			
// 			<div className="subjects-lesson-progress mt-2">
// 				<div className="row">
// 					<div className="col-lg-12">
// 						<div className="my-subjects">
// 							<div className="my-subjects-head mb-4">
// 								<h3><img src="../images/dashboard/chart-icon.svg" alt="" /> Subject-wise Performance</h3>
// 							</div>
// 							<div className="chart-wrap">
// 								<div className="chart-in">
// 									<p className="performance-text">Subject-wise Performance</p>
// 									<div className="chart-in-percent-grp">
// 										<div className="chart-in-percent"> <span>100</span>
// 											<hr />
// 										</div>
// 										<div className="chart-in-percent"> <span>80</span>
// 											<hr />
// 										</div>
// 										<div className="chart-in-percent"> <span>60</span>
// 											<hr />
// 										</div>
// 										<div className="chart-in-percent"> <span>40</span>
// 											<hr />
// 										</div>
// 										<div className="chart-in-percent"> <span>20</span>
// 											<hr />
// 										</div>
// 										<div className="chart-in-percent align-items-end"> <span>0</span>
// 											<hr style={{width: "95%"}} className="ms-auto" />
// 										</div>
// 										<div className="chart-bar-grp">
// 											<div className="chart-bar-in">
// 												<div className="hover-data">
// 													<div className="hover-data-in">
// 														<p><span style={{backgroundColor: "#C951E7"}}></span> Baseline
// 															Assessments, 80%</p>
// 														<p><span style={{backgroundColor: "#D573ED"}}></span> Lesson Quiz,
// 															(80%) 02/08</p>
// 														<p><span style={{backgroundColor: "#F1B7FF"}}></span> Summative
// 															Assessments, 80%</p>
// 													</div>
// 												</div>
// 												<div className="bar-wrp">
// 													<div className="bar" style={{backgroundColor: "#C951E7", height: "80%"}}>
// 													</div><span>B</span>
// 												</div>
// 												<div className="bar-wrp">
// 													<div className="bar" style={{backgroundColor: "#D573ED", height: "60%"}}>
// 													</div><span>L</span>
// 												</div>
// 												<div className="bar-wrp">
// 													<div className="bar" style={{backgroundColor: "#F1B7FF", height: "65%"}}>
// 													</div><span>S</span>
// 												</div>
// 											</div>
// 											<div className="chart-bar-in">
// 												<div className="hover-data">
// 													<div className="hover-data-in">
// 														<p><span style={{backgroundColor: "#C951E7"}}></span> Baseline
// 															Assessments, 80%</p>
// 														<p><span style={{backgroundColor: "#D573ED"}}></span> Lesson Quiz,
// 															(80%) 02/08</p>
// 														<p><span style={{backgroundColor: "#F1B7FF"}}></span> Summative
// 															Assessments, 80%</p>
// 													</div>
// 												</div>
// 												<div className="bar-wrp">
// 													<div className="bar" style={{backgroundColor: "#6466E9", height: "80%"}}>
// 													</div><span>B</span>
// 												</div>
// 												<div className="bar-wrp">
// 													<div className="bar" style={{backgroundColor: "#888AF3", height: "60%"}}>
// 													</div><span>L</span>
// 												</div>
// 												<div className="bar-wrp">
// 													<div className="bar" style={{backgroundColor: "#B4B5FC", height: "65%"}}>
// 													</div><span>S</span>
// 												</div>
// 											</div>
// 											<div className="chart-bar-in">
// 												<div className="hover-data">
// 													<div className="hover-data-in">
// 														<p><span style={{backgroundColor: "#C951E7"}}></span> Baseline
// 															Assessments, 80%</p>
// 														<p><span style={{backgroundColor: "#D573ED"}}></span> Lesson Quiz,
// 															(80%) 02/08</p>
// 														<p><span style={{backgroundColor: "#F1B7FF"}}></span> Summative
// 															Assessments, 80%</p>
// 													</div>
// 												</div>
// 												<div className="bar-wrp">
// 													<div className="bar" style={{backgroundColor: "#55E6C1", height: "80%"}}>
// 													</div><span>B</span>
// 												</div>
// 												<div className="bar-wrp">
// 													<div className="bar" style={{backgroundColor: "#82EBD0", height: "60%"}}>
// 													</div><span>L</span>
// 												</div>
// 												<div className="bar-wrp">
// 													<div className="bar" style={{backgroundColor: "#BDEFE2", height: "65%"}}>
// 													</div><span>S</span>
// 												</div>
// 											</div>
// 											<div className="chart-bar-in">
// 												<div className="hover-data">
// 													<div className="hover-data-in">
// 														<p><span style={{backgroundColor: "#FFC312"}}></span> Baseline
// 															Assessments, 80%</p>
// 														<p><span style={{backgroundColor: "#FEDB74"}}></span> Lesson Quiz,
// 															(80%) 02/08</p>
// 														<p><span style={{backgroundColor: "#FAE9B7"}}></span> Summative
// 															Assessments, 80%</p>
// 													</div>
// 												</div>
// 												<div className="bar-wrp">
// 													<div className="bar" style={{backgroundColor: "#FFC312", height: "80%"}}>
// 													</div><span>B</span>
// 												</div>
// 												<div className="bar-wrp">
// 													<div className="bar" style={{backgroundColor: "#FEDB74", height: "60%"}}>
// 													</div><span>L</span>
// 												</div>
// 												<div className="bar-wrp">
// 													<div className="bar" style={{backgroundColor: "#FAE9B7", height: "65%"}}>
// 													</div><span>S</span>
// 												</div>
// 											</div>
// 											<div className="chart-bar-in">
// 												<div className="hover-data">
// 													<div className="hover-data-in">
// 														<p><span style={{backgroundColor: "#ED4C67"}}></span> Baseline
// 															Assessments, 80%</p>
// 														<p><span style={{backgroundColor: "#EC6F84"}}></span> Lesson Quiz,
// 															(80%) 02/08</p>
// 														<p><span style={{backgroundColor: "#F5ABB7"}}></span> Summative
// 															Assessments, 80%</p>
// 													</div>
// 												</div>
// 												<div className="bar-wrp">
// 													<div className="bar" style={{backgroundColor: "#ED4C67", height: "80%"}}>
// 													</div><span>B</span>
// 												</div>
// 												<div className="bar-wrp">
// 													<div className="bar" style={{backgroundColor: "#EC6F84", height: "60%"}}>
// 													</div><span>L</span>
// 												</div>
// 												<div className="bar-wrp">
// 													<div className="bar" style={{backgroundColor: "#F5ABB7", height: "65%"}}>
// 													</div><span>S</span>
// 												</div>
// 											</div>
// 										</div>
// 										{/* <!-- BARS --> */}
// 									</div>
// 								</div>
// 								<p className="activity-text">Activity Type</p>
// 								<ul>
// 									<li><span style={{backgroundColor: "#C951E7"}}></span> Life Dream</li>
// 									<li><span style={{backgroundColor: "#6466E9"}}></span> Self-Awareness</li>
// 									<li><span style={{backgroundColor: "#55E6C1"}}></span> Cognitive Construction</li>
// 									<li><span style={{backgroundColor: "#FFC312"}}></span> Interpersonal Relationships
// 									<li><span style={{backgroundColor: "#ED4C67"}}></span> Coping</li>
// 									</li>
// 								</ul>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
			
// 		<ProgressSubjectWise />
// 	</>
//   )
// }

// export default ProgressAndScore
