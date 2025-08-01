import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSubject } from "../../redux/slices/student/subjectSlice";

const YourSubjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allSubject,classLevel } = useSelector((state) => state.subject);

  useEffect(() => {
    dispatch(getAllSubject());
  }, [dispatch]);

  const handleNavigate = (subject) => {
    if(subject?.baseline_assessment == "Completed") {
      // navigate("/student/subject-detail", { state: { subjectId: subject?.id } });
      navigate(`/student/subject-detail?subjectId=${subject?.id}`);

      return;
    }
    navigate(`/student/baseline-assignment/${subject?.id}`, { state: { subjectId: subject?.id } });
  }

  return (
    <>
      <div className="col-lg-12">
        <div className="my-subjects">
          <div className="my-subjects-head">
            <h3 style={{textTransform:"capitalize"}}>
              <img src="/images/dashboard/book-icon.svg" alt="" /> Your Subjects
              ({classLevel || "Ruby"} Level)
            </h3>
          </div>
          <div className="my-subjects-grid">
            {allSubject?.map((subject, index) => (
              <div className="my-subjects-itm" key={index}>
                <div className="my-subjects-itm-head">
                  <h4>
                    <img src="/images/dashboard/subjects/book.svg" alt="" />
                    {subject?.name}
                  </h4>
                  <span>
                    <b>{subject?.lesson_completion}%</b> Complete
                  </span>
                </div>
                <div className="progress">
                  <div
                    className={`progress-bar w-${subject?.lesson_completion}`}
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow={subject?.lesson_completion}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <ul>
                  <li>
                    <p>
                      <img
                        src="/images/dashboard/subjects/circle-tick.svg"
                        alt=""
                      />
                      Baseline Assessment
                    </p>
                    <span className={subject?.baseline_assessment?.toLowerCase()}>
                      {subject?.baseline_assessment}
                    </span>
                  </li>
                  <li>
                    <p>
                      <img
                        src="/images/dashboard/subjects/document.svg"
                        alt=""
                      />
                      Lessons
                    </p>
                    <span>
                      {subject?.complete_lesson}/{subject?.total_lesson}
                    </span>
                  </li>
                  <li>
                    <p>
                      <img
                        src={
                          subject?.summative_assessment === "Locked"
                            ? "/images/dashboard/subjects/locked.svg"
                            : "/images/dashboard/subjects/circle-tick.svg"
                        }
                        alt=""
                      />
                      Summative Assessment
                    </p>
                    <span className={subject?.summative_assessment?.toLowerCase()}>
                      {subject?.summative_assessment}
                    </span>
                  </li>
                </ul>

                {subject?.lesson_completion === 100 &&
                subject?.summative_assessment === "Completed" ? (
                  <Link to="#" className="completed-cta">
                    <img
                      src="/images/dashboard/subjects/circle-tick.svg"
                      alt=""
                    />
                    Completed
                  </Link>
                ) : (
                  <Link to={"#"} onClick={(e) => {
                    e.preventDefault(); 
                    handleNavigate(subject);
                    }}>
                    Continue Learning
                    <i className="fa-solid fa-angle-right"></i>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default YourSubjects;


// import { Link, useNavigate } from "react-router";
// import data from "../../assets/student.json";

// const YourSubjects = () => {
//   const navigate = useNavigate();

//   const handleNavigate = (subject) => {
//     if(subject.baselineAssessment == "Completed") {
//       navigate("/student/subject-detail", { state: { subjectTitle: subject.subject_name } });
//       return;
//     }
//     navigate("/student/baseline-assignment");
//   }

//   return (
//     <>
//       <div className="col-lg-12">
//         <div className="my-subjects">
//           <div className="my-subjects-head">
//             <h3>
//               <img src="/images/dashboard/book-icon.svg" alt="" /> Your Subjects
//               (Ruby Level)
//             </h3>
//           </div>
//           <div className="my-subjects-grid">
//             {data?.subjectData.map((subject, index) => (
//               <div className="my-subjects-itm" key={index}>
//                 <div className="my-subjects-itm-head">
//                   <h4>
//                     <img src="/images/dashboard/subjects/book.svg" alt="" />
//                     {subject.subject_name}
//                   </h4>
//                   <span>
//                     <b>{subject.completion}%</b> Complete
//                   </span>
//                 </div>
//                 <div className="progress">
//                   <div
//                     className={`progress-bar w-${subject.completion}`}
//                     role="progressbar"
//                     aria-label="Basic example"
//                     aria-valuenow={subject.completion}
//                     aria-valuemin="0"
//                     aria-valuemax="100"
//                   ></div>
//                 </div>
//                 <ul>
//                   <li>
//                     <p>
//                       <img
//                         src="/images/dashboard/subjects/circle-tick.svg"
//                         alt=""
//                       />
//                       Baseline Assessment
//                     </p>
//                     <span className={subject.baselineAssessment.toLowerCase()}>
//                       {subject.baselineAssessment}
//                     </span>
//                   </li>
//                   <li>
//                     <p>
//                       <img
//                         src="/images/dashboard/subjects/document.svg"
//                         alt=""
//                       />
//                       Lessons
//                     </p>
//                     <span>
//                       {subject.lessons.completed}/{subject.lessons.total}
//                     </span>
//                   </li>
//                   <li>
//                     <p>
//                       <img
//                         src={
//                           subject.summativeAssessment === "Locked"
//                             ? "/images/dashboard/subjects/locked.svg"
//                             : "/images/dashboard/subjects/circle-tick.svg"
//                         }
//                         alt=""
//                       />
//                       Summative Assessment
//                     </p>
//                     <span className={subject.summativeAssessment.toLowerCase()}>
//                       {subject.summativeAssessment}
//                     </span>
//                   </li>
//                 </ul>

//                 {subject.completion === 100 &&
//                 subject.summativeAssessment === "Completed" ? (
//                   <Link to="#" className="completed-cta">
//                     <img
//                       src="/images/dashboard/subjects/circle-tick.svg"
//                       alt=""
//                     />
//                     Completed
//                   </Link>
//                 ) : (
//                   <Link to={"#"} onClick={(e) => {
//                     e.preventDefault(); 
//                     handleNavigate(subject);
//                     }}>
//                     Continue Learning
//                     <i className="fa-solid fa-angle-right"></i>
//                   </Link>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default YourSubjects;
