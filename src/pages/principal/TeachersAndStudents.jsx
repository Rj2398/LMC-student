

import React, { useState } from 'react';
import { Link } from 'react-router';

const TeachersAndStudents = () => {
	const [selectedTeacher, setSelectedTeacher] = useState(null);
	const [showStudents, setShowStudents] = useState(false);

	
	
	const teachers = [
		{
			id: 1,
			name: "Sarah Johnson",
			email: "sarah.johnson@school.edu",
			studentsCount: 48,
			status: "Active"
		},
		{
			id: 2,
			name: "Michael Chen",
			email: "michael.chen@school.edu",
			studentsCount: 62,
			status: "Active"
		},
		{
			id: 3,
			name: "Emily Rodriguez",
			email: "emily.rodriguez@school.edu",
			studentsCount: 44,
			status: "Active"
		},
		{
			id: 4,
			name: "David Williams",
			email: "david.williams@school.edu",
			studentsCount: 28,
			status: "Active"
		}
	];


	const students = [
		{
			teacherId: 1,
			name: "Emma Thompson",
			score: "92%",
			status: "Active"
		},
		{
			teacherId: 1,
			name: "James Wilson",
			score: "88%",
			status: "Active"
		},

		{
			teacherId: 2,
			name: "Sanjay",
			score: "92%",
			status: "Active"
		},
		{
			teacherId: 2,
			name: "Ganjay",
			score: "88%",
			status: "Active"
		},

		{
			teacherId: 3,
			name: "Anju",
			score: "92%",
			status: "Active"
		},
		{
			teacherId: 3,
			name: "Manju",
			score: "88%",
			status: "Active"
		},

		{
			teacherId: 4,
			name: "Suresh",
			score: "92%",
			status: "Active"
		},
		{
			teacherId: 4,
			name: "Mahesh",
			score: "88%",
			status: "Active"
		}
	];

	const [searchQuery, setSearchQuery] = useState("");

	const filteredTeacher = teachers.filter((teacher) => teacher?.name.toLowerCase().includes(searchQuery.toLowerCase()) || teacher.email.toLowerCase().includes(searchQuery.toLowerCase()))


	const handleTeacherClick = (id) => {
		if(selectedTeacher === id){
			setSelectedTeacher(null)
		}
		else{

			setSelectedTeacher(id);
		}
		setShowStudents(!showStudents);
		console.log("11111111111111111111111111")
	};

	// filter students

	const filteredStudents = students.filter(student => student.teacherId === selectedTeacher);


	return (
		<>
			<div className="top-head prog-sco-wrp">
				<div className="top-head-in">
					<h1>Teachers & Students</h1>
					<p>Manage teachers and view student assignments</p>
				</div>
				<div className="students-src ms-auto me-3">
					<input type="text" placeholder="Search emails by subject, sen....." value={searchQuery} 
					onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<select name="level">
					<option value="1">Ruby Level</option>
					<option value="2">Emerald Level</option>
				</select>

			</div>

			<div className="subjects-lesson-progress teachers-students-wrp">
				<div className="row">
					<div className="col-lg-6">
						<div className="my-subjects">
							<div className="my-subjects-head">
								<h3><img src="../images/teachers-students/user.svg" alt='' /> Teachers ({teachers.length})</h3>
							</div>
							<div className="teachers-students-list">

								{(filteredTeacher.length === 0) ? (
									<div>No Data Found...</div>
								) : (
									<>
									{filteredTeacher.map(teacher => (
										<div key={teacher.id} className="teachers-students-item teachers-item"
										onClick={() => handleTeacherClick(teacher.id)}
										>
											<h2>
												{teacher.name}
												<span >{teacher.status}</span>
												{/* <a href="teacher-profile.html">
												<img src="../images/teachers-students/eye.svg" alt=''/>
												View
											</a> */}
												<Link to="/principal/teacher-profile"><img src="../images/teachers-students/eye.svg" alt='' /> View</Link>
											</h2>
											<ul>
												<li>
													<img src="../images/teachers-students/mail.svg" alt='' />
													{teacher.email}
												</li>
												<li>
													<img src="../images/teachers-students/cap.svg" alt='' />
													{teacher.studentsCount} Students
												</li>
											</ul>
										</div>
									))}
									</>
									
								)}

								


							</div>
						</div>
					</div>

					<div className="col-lg-6">
						<div className="my-subjects">
							<div className="my-subjects-head">
								<h3><img src="../images/teachers-students/user.svg" alt='' /> Select a Student</h3>
							</div>

							<div className="no-data-wrap" style={ selectedTeacher ? {display:'none'} : {}}>
								<div className="teachers-students-no-data">
									<img src="../images/teachers-students/no-users.svg" alt='' />
									<p>Select a teacher to view their assigned students.</p>
								</div>
							</div>
							
							
								<div className="students-list" style={ selectedTeacher ? {display:'block'} : {display:'none'}}>
									<div className="teachers-students-list">
										{/* <!-- I --> */}
										{filteredStudents.map(student => (
											<div className="teachers-students-item">
												<h2>
													{student.name}
													<span>{student.status}</span>
													<Link to="/principal/student-profile">
														<img src="../images/teachers-students/eye.svg" alt='' />
														View
													</Link>
												</h2>
												<ul>
													<li>
														<img src="../images/teachers-students/analytics.svg" alt='' />
														{student.score}
													</li>
												</ul>
											</div>
										))}


									</div>
								</div>
							

						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default TeachersAndStudents