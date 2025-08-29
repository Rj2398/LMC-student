import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import data from "../../assets/principal.json";
import { Link, useNavigate, useParams } from "react-router";
import { getPrincipalLessionDetail } from "../../redux/slices/principal/principalDashboardSlice";
import { completeLesson } from "../../redux/slices/student/lessionSlice";
const SubjectLessondetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paramData = useParams();

  const subjectId = location?.state?.subjectId
    ? location?.state?.subjectId
    : paramData?.subjectId;
  console.log(subjectId);
  const lessonId = location?.state?.lessonId
    ? location?.state?.lessonId
    : paramData?.lessonId;
  console.log(lessonId);

  const { lessonInfo } = useSelector((state) => state.principalDashboard);
  // const lessonInfo=data?.lesson_detail
  const [nextLesson, setNextLesson] = useState(null);

  useEffect(() => {
    if (subjectId && lessonId) {
      dispatch(
        getPrincipalLessionDetail({
          subject_id: subjectId,
          lesson_id: nextLesson ? nextLesson : lessonId,
        })
      );
      console.log({
        subject_id: subjectId,
        lesson_id: nextLesson ? nextLesson : lessonId,
      });
    }
  }, [dispatch, nextLesson]);

  const handleNextButton = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        completeLesson({ lesson_id: lessonId })
      ).unwrap();
      // const response=lessonInfo?.lesson

      if (response?.next_lesson_id) {
        setNextLesson(response?.next_lesson_id);
        navigate(
          `/principal/subject-lesson-detail/${subjectId}/${response.next_lesson_id}`
        );
      } else {
        navigate(`/principal/student-subject-detail/${subjectId}`);
      }
    } catch (error) {
      navigate(`/principal/student-subject-detail/${subjectId}`);
    }
  };

  return (
    <>
      <div className="baseline-ass-wrp">
        <div className="back-btn mb-3">
          <Link onClick={() => navigate(-1)}>
            <img src="/images/baseline-assessment/back-icon.svg" alt="" /> Back
            to the Subject
          </Link>
        </div>
        <div className="less-details">
          <h1>{lessonInfo?.lesson?.title}</h1>
          <h1 style={{ color: "#4126A8" }}>Life Dream component of PMSC!</h1>

          {[...(lessonInfo?.lesson?.contents || [])]
            .sort((a, b) => a.order - b.order)
            .map((content, index) => (
              <ShowContents key={index} data={content} type={content.type} />
            ))}
        </div>
        {/* <div className="bottom-cta justify-content-end">
				<a href="javascript:void(0);" data-bs-target="#quit-popup" data-bs-toggle="modal" className="next-cta">Next
					Lesson <i className="fa-regular fa-arrow-right"></i></a>
			</div> */}

        <div className="bottom-cta justify-content-end">
          <a
            onClick={handleNextButton}
            className="next-cta"
            style={{ cursor: "pointer" }}
          >
            Finish Lesson <i className="fa-regular fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </>
  );
};
export default SubjectLessondetail;

const ShowContents = ({ data, type }) => {
  if (!data) return null;

  return (
    <div className="less-details-in">
      {/* TEXT */}
      {type === "text" && (
        <>
          <h2 dangerouslySetInnerHTML={{ __html: data.title }}></h2>
          <p dangerouslySetInnerHTML={{ __html: data.desc }}></p>
          {data.image && <img src={data.image} alt="text-img" />}
        </>
      )}

      {/* VIDEO */}
      {type === "video" && (
        <>
          <h2 dangerouslySetInnerHTML={{ __html: data.title }}></h2>
          <video controls width="100%">
            <source src={data.video_link} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p dangerouslySetInnerHTML={{ __html: data.desc }}></p>
        </>
      )}

      {/* IMAGE */}
      {type === "image" && (
        <>
          <p dangerouslySetInnerHTML={{ __html: data.desc }}></p>
          <img src={data.img_name} alt="lesson-image" />
        </>
      )}

      {/* PDF */}
      {type === "pdf" && (
        <>
          <h2 dangerouslySetInnerHTML={{ __html: data.title }}></h2>
          <a href={data.file_name} target="_blank" rel="noopener noreferrer">
            Open PDF
          </a>
        </>
      )}

      {/* QUIZ - STANDARD */}
      {type === "quiz" &&
        (data.quiz_subtype === "standard" ||
          data.quiz_subtype === "fill_blank") && (
          <>
            <h2 dangerouslySetInnerHTML={{ __html: data.question }}></h2>
            <div className="baseline-ass-q-a b-line">
              {data.options?.map((opt, i) => (
                <label key={i}>
                  <input
                    disabled
                    type="radio"
                    name={`answer-${data.id}`}
                    value={i + 1}
                  />
                  {opt.option}
                </label>
              ))}
            </div>
          </>
        )}

      {/* QUIZ - fill_points */}
      {type === "quiz" &&
        (data.quiz_subtype === "fill_points" ||
          data.quiz_subtype === "points") && (
          <>
            <h2 dangerouslySetInnerHTML={{ __html: data.question }}></h2>
            <div className="baseline-ass-q-a b-line">
              {data.options?.map((opt, i) => (
                <div key={i} style={{ display: "flex", gap: "10px" }}>
                  <label>
                    <input
                      disabled
                      type="radio"
                      name={`answer-${data.id}`}
                      value={i + 1}
                    />
                    {opt.option}
                  </label>
                  {/* <label style={{ width: "5%", justifyContent: "center" }}>
                    {opt.points}
                  </label> */}
                </div>
              ))}
            </div>
          </>
        )}

      {/* QUIZ - MATCHING */}
      {type === "quiz" && data.quiz_subtype === "matching" && (
        <>
          <h2 dangerouslySetInnerHTML={{ __html: data.question }}></h2>
          <div className="baseline-ass-q-a">
            {data.matching_pairs?.map((pair, index) => (
              <React.Fragment key={index}>
                <label>
                  <input
                    disabled
                    type="radio"
                    name={`answer-${data.id}`}
                    value={index + 1}
                  />
                  {pair.left_item}
                </label>
                <label>
                  <input
                    disabled
                    type="radio"
                    name={`answer-${data.id}`}
                    value={index + 1}
                  />
                  {pair.right_item}
                </label>
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
