import React, {useEffect, useState} from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router';
import { getTeacherLessionDetail } from '../../redux/slices/teacher/dashboardSlice';
import Loading from '../common/Loading';

const SubjectLessonDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const paramData = useParams();

    const subjectId = location?.state?.subjectId ? location?.state?.subjectId : paramData?.subjectId;
    const lessonId = location?.state?.lessonId ? location?.state?.lessonId : paramData?.lessonId;

    const { lessonInfo } = useSelector((state) => state.dashboard);

    useEffect(() => {
        if(subjectId && lessonId){
            dispatch(getTeacherLessionDetail({subject_id: subjectId, lesson_id:lessonId}));
        }
    }, [dispatch]);

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    return (
        <>
            <div className="baseline-ass-wrp">
                <div className="back-btn mb-3">
                    <Link to="#" onClick={()=> navigate(-1)}>
					    <img src="/images/baseline-assessment/back-icon.svg" alt="" /> Back to the Subject
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
                <div className="bottom-cta justify-content-end">
                    {/* <a href="javascript:void(0);" data-bs-target="#quit-popup" data-bs-toggle="modal" className="next-cta">Next
                        Lesson <i className="fa-regular fa-arrow-right"></i></a> */}
                    <a onClick={handleShowModal} className="next-cta" style={{cursor:"pointer"}} >
                        Next Lesson <i className="fa-regular fa-arrow-right"></i>
                    </a>
                </div>
            </div>


            {/* Confirmation Modal JSX */}
            <Modal show={showModal} onHide={handleCloseModal}
                centered 
                className="my-popup"
                dialogClassName="modal-dialog-edit"
            >
                <div className="modal-content clearfix" style={{maxWidth:"450px"}}>
                    <div className="modal-heading">
                        <h2>Confirmation</h2>
                        <button type="button" className="close close-btn-front" onClick={handleCloseModal} aria-label="Close">
                            <span aria-hidden="true">
                                <img src="/images/cross-pop.svg" alt="" />
                            </span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="delete-pop-wrap">
                            <form>
                                <div className="delete-pop-inner">
                                    <p><b>Have you answered all your questions?</b></p>
                                    <p>
                                        Completing them can help you feel more confident and reduce stress. Keep going you're doing great!
                                    </p>
                                </div>
                                <div className="delete-pop-btn">
                                    <a href="lesson-detail.html" className="active" onClick={handleCloseModal} aria-label="Close">Review</a>
                                    <Link to="#" onClick={(e) => { 
                                        e.preventDefault(); 
                                        navigate(`/teacher/subject-detail/${subjectId}`); 
                                        }}>Continue</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default SubjectLessonDetail

const ShowContents = ({ data, type }) => {
  if (!data) return null;

  return (
    <div className="less-details-in">
      {/* TEXT */}
      {type === 'text' && (
        <>
          <h2 dangerouslySetInnerHTML={{__html :data.title}}></h2>
          <p dangerouslySetInnerHTML={{__html :data.desc}}></p>
          {data.image && <img src={data.image} alt="text-img" />}
        </>
      )}

      {/* VIDEO */}
      {type === 'video' && (
        <>
          <h2 dangerouslySetInnerHTML={{__html : data.title}}></h2>
          <video controls width="100%">
            <source src={data.video_link} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p dangerouslySetInnerHTML={{__html : data.desc}}></p>
        </>
      )}

      {/* IMAGE */}
      {type === 'image' && (
        <>
          <p dangerouslySetInnerHTML={{__html : data.desc}}></p>
          <img src={data.img_name} alt="lesson-image" />
        </>
      )}

      {/* PDF */}
      {type === 'pdf' && (
        <>
          <h2 dangerouslySetInnerHTML={{__html : data.title}}></h2>
          <a href={data.file_name} target="_blank" rel="noopener noreferrer">
            Open PDF
          </a>
        </>
      )}

      {/* QUIZ - STANDARD */}
      {type === 'quiz' && (data.quiz_subtype === 'standard' || data.quiz_subtype === 'fill_blank') && (
        <>
          <h2 dangerouslySetInnerHTML={{__html : data.question}}></h2>
          <div className="baseline-ass-q-a b-line">
            {data.options?.map((opt, i) => (
              <label key={i}>
                <input disabled type="radio" name={`answer-${data.id}`} value={i + 1} />
                {opt.option}
              </label>
            ))}
          </div>
        </>
      )}

      {/* QUIZ - fill_points */}
      {type === 'quiz' && (data.quiz_subtype === 'fill_points' || data.quiz_subtype === 'points') && (
        <>
          <h2 dangerouslySetInnerHTML={{__html : data.question}}></h2>
          <div className="baseline-ass-q-a b-line">
            {data.options?.map((opt, i) => (
                <div key={i} style={{display:"flex", gap:"10px"}}>
                    <label >
                        <input disabled type="radio" name={`answer-${data.id}`} value={i + 1} />
                        {opt.option}
                    </label>
                    <label style={{width:"5%", justifyContent:"center"}}>
                        {opt.points}
                    </label>
                </div>
            ))}
          </div>
        </>
      )}

      {/* QUIZ - MATCHING */}
      {type === 'quiz' && data.quiz_subtype === 'matching' && (
        <>
          <h2 dangerouslySetInnerHTML={{__html : data.question}}></h2>
          <div className="baseline-ass-q-a">
            {data.matching_pairs?.map((pair, index) => (
                <React.Fragment key={index}>
                    <label>
                        <input disabled type="radio" name={`answer-${data.id}`} value={index + 1} />{pair.left_item}
                    </label>
                    <label>
                        <input disabled type="radio" name={`answer-${data.id}`} value={index + 1} />{pair.right_item}
                    </label>
                </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
