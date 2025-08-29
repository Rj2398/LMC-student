import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { getmwlLesson } from "../../redux/slices/teacher/mwlSlice";
import {
  startLession,
  startQuiz,
} from "../../redux/slices/student/lessionSlice";
import { setMwlDomain } from "../../redux/slices/teacher/dashboardSlice";

const MwlMicroCredentialsDomainTrainingSubject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  var id = searchParams.get("id");
  const { mwlessondetail } = useSelector((state) => state.mwl);
  const { name, previousName } = location.state || {}; // Use optional chaining to avoid errors if state is null
  const trainingName =
    !localStorage.getItem("mwlTraining") ||
    localStorage.getItem("mwlTraining") === ""
      ? previousName
      : localStorage.getItem("mwlTraining");
  //  fetch respective data

  useEffect(() => {
    if (id) dispatch(getmwlLesson({ subject_id: id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (mwlessondetail) {
      dispatch(setMwlDomain(mwlessondetail?.subject?.Subject));
    }
  }, [mwlessondetail]);

  //start lesson

  const handleStartLesson = async (
    lessonId,
    subjectId,
    status,
    isLastLesson
  ) => {
    dispatch(
      startLession({
        lesson_id: lessonId,
      })
    ).then((response) => {
      const converedResponse = response.payload;

      if (converedResponse) {
        navigate(
          `/teacher/mwl-micro-credentials-domain-training-lesson?lesson_id=${lessonId}&id=${id}`,
          {
            state: {
              simulateMatchingQuizAnswered:
                status == "completed" ? true : false,
              previousName:
                localStorage.getItem("mwlTraining") ===
                "Micro-Credentials & Domain Training"
                  ? "Micro-Credentials & Domain Training"
                  : localStorage.getItem("mwlTraining") === "Lesson Prep"
                  ? "Lesson Prep"
                  : previousName,

              isLastLesson: isLastLesson,
            },
          }
        );
      }
    });
  };

  return (
    <main>
      <div className="sub-detail-wrap">
        <div className="sub-detail-top">
          <h1 className="mb-2">
            {mwlessondetail?.subject?.Subject}
            {/* {previousName != "Lesson Prep" && (
              <span>
                <b>{mwlessondetail?.subject?.percentage}%</b>{" "}
                {mwlessondetail?.subject?.completed}/
                {mwlessondetail?.subject?.total_lessons} Lessons
              </span>
            )} */}

            {trainingName !== "Lesson Prep" && (
              <span>
                <b>{mwlessondetail?.subject?.percentage}%</b>{" "}
                {mwlessondetail?.subject?.completed}/
                {mwlessondetail?.subject?.total_lessons} Lessons
              </span>
            )}
          </h1>

          <div className="sub-pro mb-0">
            <ul className="w-100">
              <li>
                <img src="../images/subject-detail/lessons.svg" alt="" />{" "}
                {mwlessondetail?.subject?.total_lessons} lessons
              </li>
              <li>
                <img src="../images/subject-detail/quizzes.svg" alt="" />
                {mwlessondetail?.subject?.total_lesson_quizzes} Quizzes
              </li>
              {/* {previousName != "Lesson Prep" && (
                <li className="me-3">
                  <span>Overall Progress</span>
                </li>
              )} */}

              {trainingName !== "Lesson Prep" && (
                <>
                  <li className="me-3">
                    <span>Overall Progress</span>
                  </li>
                </>
              )}
            </ul>

            {/* {previousName != "Lesson Prep" && (
              <div className="progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `${mwlessondetail?.subject?.percentage || 0}%`,
                  }}
                  role="progressbar"
                  aria-label="Lesson Progress"
                  aria-valuenow={mwlessondetail?.subject?.percentage || 0}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            )} */}

            {trainingName !== "Lesson Prep" && (
              <div className="progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `${mwlessondetail?.subject?.percentage || 0}%`,
                  }}
                  role="progressbar"
                  aria-label="Lesson Progress"
                  aria-valuenow={mwlessondetail?.subject?.percentage || 0}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            )}
          </div>
        </div>
        <div className="sub-lessons-list">
          <h3> Lessons</h3>

          {mwlessondetail?.lessons?.length > 0 ? (
            mwlessondetail.lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="sub-lessons-list-in"
                style={{
                  pointerEvents: lesson?.status === "locked" ? "none" : "auto",
                  cursor:
                    lesson?.status === "locked" ? "not-allowed" : "pointer",
                }}
              >
                <div className="lesson-num-ico">
                  <span>{index + 1}</span>
                  {/* <img
                    src={`/images/subject-detail/sub-lessons/${
                      lesson?.status == "not_started"
                        ? "locked-not-started"
                        : lesson?.status == "completed"
                        ? "completed"
                        : lesson?.status == "locked"
                        ? "locked-not-started"
                        : "in-progress"
                    }.svg`}
                    alt={lesson.status}
                  /> */}

                  {trainingName !== "Lesson Prep" ? (
                    <img
                      src={`/images/subject-detail/sub-lessons/${
                        lesson?.status === "not_started"
                          ? "locked-not-started"
                          : lesson?.status === "completed"
                          ? "completed"
                          : lesson?.status === "locked"
                          ? "locked-not-started"
                          : "in-progress"
                      }.svg`}
                      alt={lesson.status}
                    />
                  ) : (
                    <img
                      src={`/images/subject-detail/sub-lessons/locked-not-started.svg`}
                    />
                  )}
                </div>
                <div className="lesson-data">
                  <h2>
                    <Link
                      to="#"
                      onClick={() =>
                        handleStartLesson(
                          lesson?.id,
                          lesson?.subject_id,
                          lesson?.status,
                          {
                            isLastLesson:
                              index === mwlessondetail.lessons.length - 1,
                          }
                        )
                      }
                    >
                      {lesson?.title}
                    </Link>
                  </h2>
                  <p>{lesson.desc}</p>
                </div>

                {/* {previousName != "Lesson Prep" && (
                  <div className="sub-lessons-list-in-ryt">
                    <div className={`status ${lesson.status}`}>
                      {lesson.status
                        .replace(/_/g, " ")
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </div>
                  </div>
                )} */}

                {(!localStorage.getItem("mwlTraining") ||
                localStorage.getItem("mwlTraining") === ""
                  ? previousName
                  : localStorage.getItem("mwlTraining")) !== "Lesson Prep" && (
                  <div className="sub-lessons-list-in-ryt">
                    <div className={`status ${lesson.status}`}>
                      {lesson.status
                        .replace(/_/g, " ")
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No lessons found.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default MwlMicroCredentialsDomainTrainingSubject;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useSearchParams } from "react-router";
// import { getmwlLesson } from "../../redux/slices/teacher/mwlSlice";
// import {
//   startLession,
//   startQuiz,
// } from "../../redux/slices/student/lessionSlice";

// import { setMwlDomain } from "../../redux/slices/teacher/dashboardSlice";

// const MwlMicroCredentialsDomainTrainingSubject = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   var id = searchParams.get("id");
//   const { mwlessondetail } = useSelector((state) => state.mwl);
//   const name = location?.state?.name;

//   //  fetch respective data

//   useEffect(() => {
//     if (id) dispatch(getmwlLesson({ subject_id: id }));
//   }, [dispatch, id]);

//     useEffect(() => {
//     if (mwlessondetail){
//       dispatch(setMwlDomain(mwlessondetail?.subject?.Subject))
//     }
//   }, [mwlessondetail])

//   //start lesson

//   const handleStartLesson = async (lessonId, subjectId, status) => {

//     dispatch(
//       startLession({
//         lesson_id: lessonId,
//       })
//     ).then((response) => {
//       const converedResponse = response.payload;

//       if (converedResponse) {
//         navigate(
//           `/teacher/mwl-micro-credentials-domain-training-lesson?lesson_id=${lessonId}&id=${id}`,
//           {
//             state: {
//               simulateMatchingQuizAnswered:
//                 status == "completed" ? true : false,
//             },
//           }
//         );
//       }
//     });
//   };

//   return (
//     <main>
//       <div className="sub-detail-wrap">
//         <div className="sub-detail-top">
//           <h1 className="mb-2">
//             {mwlessondetail?.subject?.Subject}
//             <span>
//               <b>{mwlessondetail?.subject?.percentage}%</b>{" "}
//               {mwlessondetail?.subject?.completed}/
//               {mwlessondetail?.subject?.total_lessons} Lessons
//             </span>
//           </h1>

//           <div className="sub-pro mb-0">
//             <ul className="w-100">
//               <li>
//                 <img src="../images/subject-detail/lessons.svg" alt="" />{" "}
//                 {mwlessondetail?.subject?.total_lessons} lessons
//               </li>
//               <li>
//                 <img src="../images/subject-detail/quizzes.svg" alt="" />
//                 {mwlessondetail?.subject?.total_lesson_quizzes} Quizzes
//               </li>
//               <li className="me-3">
//                 <span>Overall Progress</span>
//               </li>
//             </ul>
//             <div className="progress">
//               <div
//                 className="progress-bar"
//                 style={{
//                   width: `${mwlessondetail?.subject?.percentage || 0}%`,
//                 }}
//                 role="progressbar"
//                 aria-label="Lesson Progress"
//                 aria-valuenow={mwlessondetail?.subject?.percentage || 0}
//                 aria-valuemin="0"
//                 aria-valuemax="100"
//               ></div>
//             </div>
//           </div>
//         </div>
//         <div className="sub-lessons-list">
//           <h3> Lessons</h3>

//           {mwlessondetail?.lessons?.map((lesson, index) => (
//             <div
//               key={lesson.id}
//               className="sub-lessons-list-in"
//               style={{
//                 pointerEvents: lesson?.status === "locked" ? "none" : "auto",
//                 // opacity: lesson?.status === "locked" ? 1 : 1,
//                 cursor: lesson?.status === "locked" ? "not-allowed" : "pointer",
//               }}
//             >
//               <div className="lesson-num-ico">
//                 <span>{index + 1}</span>
//                 <img
//                   src={`/images/subject-detail/sub-lessons/${
//                     lesson?.status == "not_started"
//                       ? "locked-not-started"
//                       : lesson?.status == "completed"
//                       ? "completed"
//                       : lesson?.status == "locked"
//                       ? "locked-not-started"
//                       : "in-progress"
//                   }.svg`}
//                   alt={lesson.status}
//                 />
//               </div>
//               <div className="lesson-data">
//                 <h2>
//                   {/* <Link
//                     to={`/teacher/mwl-micro-credentials-domain-training-lesson?lesson_id=${lesson.id}&id=${id}`}
//                   >
//                     {lesson.title}
//                   </Link> */}

//                   <Link
//                     to="#"
//                     onClick={() =>
//                       handleStartLesson(
//                         lesson?.id,
//                         lesson?.subject_id,
//                         lesson?.status
//                       )
//                     }
//                   >
//                     {lesson?.title}
//                   </Link>
//                 </h2>
//                 <p>{lesson.desc}</p>
//               </div>
//               <div className="sub-lessons-list-in-ryt">
//                 <div className={`status ${lesson.status}`}>
//                   {lesson.status
//                     .replace(/_/g, " ")
//                     .split(" ")
//                     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                     .join(" ")}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default MwlMicroCredentialsDomainTrainingSubject;
