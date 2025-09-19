import React, { useEffect, useState, useCallback, useMemo, useRef, } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { getLessionDetailSlice } from "../../redux/slices/student/lessionSlice";
import PdfViewer from "../student/PdfViewer";
import { getLessonQuizAnswers, setLessonQuizName, } from "../../redux/slices/teacher/dashboardSlice";

// --- Utility function to cyclically shift an array ---
function cyclicallyShiftArray(array) {
  if (!array || array.length <= 1) {
    return array;
  }
  const lastElement = array[array.length - 1];
  const shiftedArray = [lastElement, ...array.slice(0, array.length - 1)];
  return shiftedArray;
}

const MatchingLeftOption = ({
  pair, quizId, isCurrentlySelected,
  isRecolored, // New prop for correct match final color
  isCorrect, // New prop for temporary correct feedback
  isIncorrect, // New prop for temporary incorrect feedback
  handleMatchingLeftRadioChange, isAlreadySelected,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getBackgroundColor = () => {
    if (isCorrect) return "#16A34A"; // Correct feedback (green)
    if (isIncorrect) return "#16A34A"; // Incorrect feedback (red)
    if (isRecolored) return "#1B0866"; // Final correct color
    if (isCurrentlySelected) return "#4126A8"; // Currently selected (purple)
    if (isAlreadySelected) return "#4126A8";
    if (isHovered) return "#4126A8"; // Hover
    return "#fff"; // Default
  };

  const getColor = () => {
    if (isIncorrect) return "#fff";
    if ( isHovered || isCurrentlySelected || isCorrect || isRecolored || isAlreadySelected ) return "#fff";
    return "#333";
  };

  const isTemporarilyDisabled = isCorrect || isIncorrect;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "8px",
        cursor:
          isTemporarilyDisabled || isAlreadySelected
            ? "not-allowed"
            : "pointer", // Update cursor style
        backgroundColor: getBackgroundColor(),
        color: getColor(),
        border: `1px solid ${
          isRecolored
            ? "#1B0866"
            : isCorrect
            ? "#16A34A"
            : isIncorrect
            ? "#B00020"
            : "#e0e0e0"
        }`,
        transition:
          "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
      }}
      onMouseEnter={ () => !(isTemporarilyDisabled || isAlreadySelected) && !isCurrentlySelected
        // && setIsHovered(true) // Add condition
      }
      onMouseLeave={ () => !(isTemporarilyDisabled || isAlreadySelected) && !isCurrentlySelected
        // && setIsHovered(false) // Add condition
      }
      onClick={() => !(isTemporarilyDisabled || isAlreadySelected) && // Add condition
        handleMatchingLeftRadioChange(quizId, pair.id)
      } >
      <input
        type="radio"
        id={`left-${pair.id}-${quizId}`}
        name={`quiz-${quizId}-left`}
        value={pair.id}
        checked={isCurrentlySelected}
        onChange={() =>
          !(isTemporarilyDisabled || isAlreadySelected) && // Add condition
          handleMatchingLeftRadioChange(quizId, pair.id)
        }
        disabled={isTemporarilyDisabled || isAlreadySelected} // Add condition
        style={{ marginRight: "10px", transform: "scale(1.2)" }}
      />
      <label htmlFor={`left-${pair.id}-${quizId}`} style={{
          flex: 1,
          cursor: isTemporarilyDisabled || isAlreadySelected ? "not-allowed" : "pointer", // Update cursor style
          fontWeight: "normal",
        }} >
        {pair.left_item}
      </label>
    </div>
  );
};

// Component for a single Matching Right Option
const MatchingRightOption = ({
  rightOption,
  idx,
  quizId,
  isCurrentlySelected,
  isRecolored, // New prop for correct match final color
  isCorrect, // New prop for temporary correct feedback
  isIncorrect, // New prop for temporary incorrect feedback
  handleMatchingRightRadioChange,
  isAlreadySelected,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getBackgroundColor = () => {
    if (isCorrect) return "#16A34A";
    if (isIncorrect) return "#EF4343";
    if (isRecolored) return "#1B0866";
    if (isCurrentlySelected) return "#4126A8";
    if (isAlreadySelected) return "#4126A8";
    if (isHovered) return "#4126A8";
    return "#fff";
  };

  const getColor = () => {
    if (isIncorrect) return "#fff";
    if ( isHovered || isCurrentlySelected || isCorrect || isRecolored || isAlreadySelected ) return "#fff";
    return "#333";
  };

  const isTemporarilyDisabled = isCorrect || isIncorrect;

  return (
    <div
      key={`right-${rightOption}-${quizId}-${idx}`}
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "8px",
        cursor:
          isTemporarilyDisabled || isAlreadySelected
            ? "not-allowed"
            : "pointer", // Update cursor style
        backgroundColor: getBackgroundColor(),
        color: getColor(),
        border: `1px solid ${
          isRecolored
            ? "#1B0866"
            : isCorrect
            ? "#16A34A"
            : isIncorrect
            ? "#B00020"
            : "#e0e0e0"
        }`,
        transition:
          "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
      }}
      onMouseEnter={ () => !(isTemporarilyDisabled || isAlreadySelected) && !isCurrentlySelected
        // && setIsHovered(true) // Add condition 
      }
      onMouseLeave={ () => !(isTemporarilyDisabled || isAlreadySelected) && !isCurrentlySelected
        //  && setIsHovered(false) // Add condition
      }
      onClick={() => !(isTemporarilyDisabled || isAlreadySelected) && // Add condition 
        handleMatchingRightRadioChange(quizId, rightOption)
      } >
      <input
        type="radio"
        id={`right-${rightOption}-${quizId}-${idx}`}
        name={`quiz-${quizId}-right`}
        value={rightOption}
        checked={isCurrentlySelected}
        onChange={() =>
          !(isTemporarilyDisabled || isAlreadySelected) && // Add condition
          handleMatchingRightRadioChange(quizId, rightOption)
        }
        disabled={isTemporarilyDisabled || isAlreadySelected} // Add condition
        style={{ marginRight: "10px", transform: "scale(1.2)" }}
      />
      <label
        htmlFor={`right-${rightOption}-${quizId}-${idx}`}
        style={{
          flex: 1,
          cursor: isTemporarilyDisabled || isAlreadySelected ? "not-allowed" : "pointer", // Update cursor style
          fontWeight: "normal",
        }} >
        {rightOption}
      </label>
    </div>
  );
};

// Component for a single Single Choice Option
const SingleChoiceOption = ({
  option,
  optionIndex,
  quizId,
  isSelected,
  handleSingleChoiceQuizChange,
  isAlreadySelected,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={`option-${option.id}-${quizId}-${optionIndex}`}
      className="quiz-option-item"
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "8px",
        pointerEvents: isAlreadySelected ? "none" : "auto",
        // cursor: "pointer",
        backgroundColor: isSelected
          ? "#4126A8"
          : isHovered && !isSelected
          ? "#4126A8"
          : "#fff",
        color: isHovered && !isSelected ? "#fff" : isSelected ? "#fff" : "#333",
        border: `1px solid ${isSelected ? "#6a5acd" : "#e0e0e0"}`,
        boxShadow: isSelected
          ? "0 2px 5px rgba(106,90,205,0.2)"
          : "0 1px 3px rgba(0,0,0,0.05)",
        transition:
          "background-color 0.01s ease, border-color 0.2s ease, color 0.2s ease",
      }}
      // onMouseEnter={() => !isSelected && setIsHovered(true)}
      // onMouseLeave={() => !isSelected && setIsHovered(false)}
      onMouseEnter={() => !isSelected}
      onMouseLeave={() => !isSelected}
      onClick={() => handleSingleChoiceQuizChange(quizId, option.id)}
    >
      <input
        type="radio"
        id={`option-${option.id}-${quizId}-${optionIndex}`}
        name={`quiz-${quizId}`}
        value={option.id}
        checked={isSelected}
        onChange={() => handleSingleChoiceQuizChange(quizId, option.id)}
        style={{
          marginRight: "10px",
          transform: "scale(1.2)",
        }}
        // disabled={isAlreadySelected}
      />
      <label
        htmlFor={`option-${option.id}-${quizId}-${optionIndex}`}
        style={{
          flex: 1,
          cursor: "pointer",
          fontWeight: "normal",
        }}
      >
        {option.option}
      </label>
    </div>
  );
};

const StudentLessonQuiz = () => {
  const { lessonQuizAnswer } = useSelector((state) => state.dashboard);

  const lessionWiseDetailsFromStore = useSelector(
    ({ lession }) => lession.lessionWiseDetails
  );
  const [searchParams1] = useSearchParams();

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const [lessionWiseDetails, setLessonWiseDetails] = useState();

  const toastShownRef = useRef(false);
  const toastShowerrRef = useRef(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lessonId = searchParams1.get("lessonId");
  const studentId = searchParams1.get("studentId");
  const paramData = location.state?.param;

  const isCompletedFromSession = sessionStorage.getItem("isCompleted");

  // If sessionStorage has a value, use it. Otherwise, fall back to location.state.
  var simulateMatchingQuizAnswered = isCompletedFromSession
    ? isCompletedFromSession === "true"
    : location.state?.simulateMatchingQuizAnswered;

  // const isReload = location.state?.isReload;
  const [selectedData, setSelectedData] = useState();

  const [searchParams] = useSearchParams();
  // const lessonId = searchParams.get("lessonId");
  const attemptId = searchParams.get("attemptId");
  const subjectId = searchParams.get("subjectId");

  const [showModal, setShowModal] = useState(false);

  const [quizAnswers, setQuizAnswers] = useState({});
  const [correctMatchState, setCorrectMatchState] = useState({}); // New state for temporary correct feedback

  const [incorrectMatchState, setIncorrectMatchState] = useState({}); // New state for temporary incorrect feedback

  const handleClosePopup = () => setShowModal(false);

  useEffect(() => {
    dispatch(setLessonQuizName(lessonQuizAnswer?.lesson?.title));
  }, [lessonQuizAnswer]);

  // useEffect(() => {
  //   window.history.pushState(null, document.title, window.location.href);
  //   window.addEventListener("popstate", function (event) {
  //     window.history.pushState(null, document.title, window.location.href);
  //   });
  // }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

  useEffect(() => {
    setLessonWiseDetails(lessionWiseDetailsFromStore);
  }, [lessionWiseDetailsFromStore]);

  useEffect(() => {
    setSelectedData(lessonQuizAnswer);
  }, [lessonQuizAnswer]);

  useEffect(() => {
    if (lessonId) {
      dispatch(getLessionDetailSlice({ lesson_id: lessonId }));
    }
  }, [lessonId]);

  useEffect(() => {
    dispatch(
      getLessonQuizAnswers({ lesson_id: lessonId, student_id: studentId })
    );
  }, [lessonId]);

  const sortedContents = useMemo(() => {
    const rawContents = simulateMatchingQuizAnswered
      ? lessonQuizAnswer?.lesson?.contents
      : lessonQuizAnswer?.lesson?.contents;
    const contents = Array.isArray(rawContents) ? rawContents : [];
    return [...contents].sort(
      (a, b) => (a?.order ?? Infinity) - (b?.order ?? Infinity)
    );
  }, [lessionWiseDetails?.lesson?.contents]);

  // const sortedContents = useMemo(() => {
  //   const rawContents = simulateMatchingQuizAnswered
  //     ? selectedData?.lesson?.contents
  //     : "";
  //   const contents = Array.isArray(rawContents) ? rawContents : [];
  //   return [...contents].sort(
  //     (a, b) => (a?.order ?? Infinity) - (b?.order ?? Infinity)
  //   );
  // }, []);

  const getQuizContentById = useCallback(
    (id) => {
      return sortedContents.find(
        (item) => item.type === "quiz" && item.id === id
      );
    },
    [sortedContents]
  );

  // This check is no longer needed since items can be re-matched
  const isLeftItemMatched = useCallback(
    (quizId, leftItemId) => {
      return quizAnswers[quizId]?.completedMatches?.some(
        (match) => match.leftId === leftItemId
      );
    },
    [quizAnswers]
  );

  const isRightItemMatched = useCallback(
    (quizId, rightItemValue) => {
      return quizAnswers[quizId]?.completedMatches?.some(
        (match) => match.rightValue === rightItemValue
      );
    },
    [quizAnswers]
  );

  const checkAndCommitMatch = useCallback(
    (quizId, currentQuizState) => {
      const currentLeftSelection =
        currentQuizState?.currentLeftSelection || null;
      const currentRightSelection =
        currentQuizState?.currentRightSelection || null;

      if (currentLeftSelection !== null && currentRightSelection !== null) {
        const originalQuizContent = getQuizContentById(quizId);
        if (!originalQuizContent || !originalQuizContent.matching_pairs) return;

        const correctPair = originalQuizContent.matching_pairs.find(
          (pair) =>
            pair.id === currentLeftSelection &&
            pair.right_item === currentRightSelection
        );

        // Temporarily disable all clicks during feedback
        const feedbackDelay = 2000;

        if (correctPair) {
          // New logic for correct match
          if (!toastShownRef.current) {
            toast.success("Correct match!");
            toastShownRef.current = true;
          }

          setCorrectMatchState({
            leftId: currentLeftSelection,
            rightValue: currentRightSelection,
            quizId: quizId,
          });

          setTimeout(() => {
            setQuizAnswers((prev) => ({
              ...prev,
              [quizId]: {
                ...(prev[quizId] || { recoloredMatches: [] }),
                recoloredMatches: [
                  ...new Set([
                    ...(prev[quizId]?.recoloredMatches || []),
                    {
                      leftId: currentLeftSelection,
                      rightValue: currentRightSelection,
                    },
                  ]),
                ],
                currentLeftSelection: null,
                currentRightSelection: null,
              },
            }));
            setCorrectMatchState({});
          }, feedbackDelay);
        } else {
          // Logic for incorrect match
          if (!toastShowerrRef.current) {
            toast.error("Incorrect match. Please try again.");
            toastShownRef.current = true;
          }

          setIncorrectMatchState({
            leftId: currentLeftSelection,
            rightValue: currentRightSelection,
            quizId: quizId,
          });

          setTimeout(() => {
            setQuizAnswers((prev) => ({
              ...prev,
              [quizId]: {
                ...(prev[quizId] || { recoloredMatches: [] }),
                currentLeftSelection: null,
                currentRightSelection: null,
              },
            }));
            setIncorrectMatchState({});
          }, feedbackDelay);
        }
      }
    },
    [getQuizContentById]
  );

  const handleSingleChoiceQuizChange = (quizId, selectedOptionId) => {
    setQuizAnswers((prevAnswers) => ({
      ...prevAnswers,
      [quizId]: selectedOptionId,
    }));
  };

  const handleMatchingLeftRadioChange = (quizId, leftItemId) => {
    // Clear feedback if a new selection is made
    if (
      correctMatchState.quizId === quizId ||
      incorrectMatchState.quizId === quizId
    ) {
      setCorrectMatchState({});
      setIncorrectMatchState({});
    }

    setQuizAnswers((prevAnswers) => {
      const newQuizState = {
        ...(prevAnswers[quizId] || { recoloredMatches: [] }),
      };
      newQuizState.currentLeftSelection = leftItemId;

      const potentialState = {
        ...newQuizState,
        currentLeftSelection: leftItemId,
      };
      checkAndCommitMatch(quizId, potentialState);

      return {
        ...prevAnswers,
        [quizId]: newQuizState,
      };
    });
  };

  const handleMatchingRightRadioChange = (quizId, rightItemValue) => {
    // Clear feedback if a new selection is made
    if (
      correctMatchState.quizId === quizId ||
      incorrectMatchState.quizId === quizId
    ) {
      setCorrectMatchState({});
      setIncorrectMatchState({});
    }

    setQuizAnswers((prevAnswers) => {
      const newQuizState = {
        ...(prevAnswers[quizId] || { recoloredMatches: [] }),
      };
      newQuizState.currentRightSelection = rightItemValue;

      const potentialState = {
        ...newQuizState,
        currentRightSelection: rightItemValue,
      };
      checkAndCommitMatch(quizId, potentialState);

      return {
        ...prevAnswers,
        [quizId]: newQuizState,
      };
    });
  };

  const handleMultipleSelectChange = (quizId, optionId) => {
    setQuizAnswers((prevAnswers) => {
      const currentAnswers = prevAnswers[quizId] || [];
      const isSelected = currentAnswers.includes(optionId);
      
      if (isSelected) {
        // Remove the option if it's already selected
        return {
          ...prevAnswers,
          [quizId]: currentAnswers.filter(id => id !== optionId)
        };
      } else {
        // Add the option if it's not selected
        return {
          ...prevAnswers,
          [quizId]: [...currentAnswers, optionId]
        };
      }
    });
  };

  if (!Array.isArray(lessionWiseDetails?.lesson?.contents)) {
    console.warn(
      "lessionWiseDetails?.lesson?.contents is not an array or is missing. Using empty array for content."
    );
  }

  const handleVideoClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <div className="baseline-ass-wrp">
        {/* <div className="back-btn mb-3">
            <Link
              to={`/student/subject-detail?subjectId=${subjectId}`}
              onClick={() => {
                sessionStorage.removeItem("isCompleted");
              }}
            >
              <img src="/images/baseline-assessment/back-icon.svg" alt="icon" />{" "}
              Back to the Subject
            </Link>
          </div> */}
        <div className="less-details">
          <h1>{lessionWiseDetails?.lesson?.title}</h1>
          <div className="less-details-in">
            {sortedContents?.map((contentItem, index) => {
              const itemKey = `${contentItem.type || "unknown"}-${
                contentItem.id || "noId"
              }-${contentItem.order || "noOrder"}-${index}`;

              return (
                <React.Fragment key={itemKey}>
                  {(() => {
                    switch (contentItem.type) {
                      case "text":
                        return (
                          <div className="lesson-content-item text-content">
                            {contentItem.title && (
                              <h3
                                dangerouslySetInnerHTML={{
                                  __html: contentItem.title,
                                }}
                              ></h3>
                            )}

                            {contentItem.desc && (
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: contentItem.desc,
                                }}
                              ></p>
                            )}
                            {!contentItem.title && !contentItem.desc && (
                              <p>
                                Text content available but no title or
                                description provided.
                              </p>
                            )}
                          </div>
                        );

                      case "video":
                        return (
                          <div className="lesson-content-item video-content">
                            {contentItem.desc && (
                              <p dangerouslySetInnerHTML={{ __html: contentItem.desc,}} ></p>
                            )}
                            {contentItem.video_link && (
                              // <iframe src={contentItem.video_link.replace("/view","/preview")}
                              //   width="100%"
                              //   height="554px"
                              //   frameBorder="0"
                              //   allowFullScreen
                              //   style={{ border: 0 }}
                              //   title="Embedded Google Drive Video Player"
                              // ></iframe>
                              <video width="100%" height="554px" controls controlsList="nodownload noremoteplayback" disablePictureInPicture style={{ border: 0 }} title={contentItem?.title || "Lesson Video"}>
                                  <source src={contentItem?.video_link} type="video/mp4" />
                                  Your browser does not support the video tag.
                              </video>
                            )}
                            
                          </div>
                        );

                      case "pdf":
                        return (
                          <div
                            className="lesson-content-item pdf-content"
                            style={{ width: "40%" }}
                          >
                            {contentItem.file_name ? (
                              <PdfViewer
                                pdfUrl={contentItem.file_name}
                                pdfName={contentItem.title || "Document.pdf"}
                              />
                            ) : (
                              <p>
                                PDF content available but no PDF link provided.
                              </p>
                            )}
                            {contentItem.desc && (
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: contentItem.desc,
                                }}
                              ></p>
                            )}
                          </div>
                        );

                      case "image":
                        return (
                          <div className="lesson-content-item ">
                            {contentItem.image ? (
                              <img
                                src={contentItem.image}
                                alt={
                                  contentItem.desc ||
                                  `Lesson image ${contentItem.id}`
                                }
                                style={{ maxWidth: "100%", height: "554px" }}
                              />
                            ) : (
                              <p>
                                Image content available but no image name
                                provided.
                              </p>
                            )}
                            {contentItem.desc && (
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: contentItem.desc,
                                }}
                              ></p>
                            )}
                          </div>
                        );
                      case "quiz":
                        const quizId = contentItem.id;
                        let quizState;

                        if (contentItem.quiz_subtype === "multiple_select") {
                          // Render multiple select quiz
                          const selectedOptionIds = contentItem.user_answer
                            ? contentItem.user_answer.map(ans => ans.selected_option_id)
                            : quizAnswers[quizId] || [];

                          return (
                            <div className="lesson-content-item quiz-content" key={`quiz-${quizId}`}>
                              {contentItem.question ? (
                                <h4>{contentItem.question}</h4>
                              ) : (
                                <p>Quiz content available but no question provided.</p>
                              )}

                              {contentItem.options &&
                              Array.isArray(contentItem.options) &&
                              contentItem.options.length > 0 ? (
                                <div className="quiz-options">
                                  {contentItem.options.map((option, optionIndex) => {
                                    if (!option || !option.id || !option.option) {
                                      console.warn(
                                        `Missing data for a quiz option in quiz ID: ${contentItem.id}. Skipping option.`
                                      );
                                      return null;
                                    }
                                    const isSelected = selectedOptionIds.includes(option.id);
                                    return (
                                      <MultipleSelectOption
                                        key={`option-${option.id}-${quizId}-${optionIndex}`}
                                        option={option}
                                        optionIndex={optionIndex}
                                        quizId={quizId}
                                        isSelected={isSelected}
                                        handleMultipleSelectChange={handleMultipleSelectChange}
                                        isAlreadySelected={simulateMatchingQuizAnswered}
                                      />
                                    );
                                  })}
                                </div>
                              ) : (
                                <p>No options available for this quiz.</p>
                              )}
                            </div>
                          );
                        }

                        if (contentItem.quiz_subtype === "matching") {
                          if (simulateMatchingQuizAnswered) {
                            quizState = {
                              completedMatches:
                                contentItem.matching_pairs || [],
                              currentLeftSelection: null,
                              currentRightSelection: null,
                            };
                          } else {
                            quizState = {
                              completedMatches: [],
                              currentLeftSelection: null,
                              currentRightSelection: null,
                            };
                          }
                        }

                        if (contentItem.quiz_subtype === "matching") {
                          const allLeftItems = contentItem.matching_pairs
                            ? contentItem.matching_pairs
                            : [];

                          let allRightItems = Array.from(
                            new Set(
                              contentItem.matching_pairs
                                ? contentItem.matching_pairs.map(
                                    (p) => p.right_item
                                  )
                                : []
                            )
                          );

                          allRightItems = cyclicallyShiftArray(allRightItems);

                          const isRecoloredLeft = (pairId) => {
                            return quizAnswers[quizId]?.recoloredMatches?.some(
                              (match) => match.leftId === pairId
                            );
                          };
                          const isRecoloredRight = (rightValue) => {
                            return quizAnswers[quizId]?.recoloredMatches?.some(
                              (match) => match.rightValue === rightValue
                            );
                          };

                          return (
                            <div className="lesson-content-item quiz-content">
                              {contentItem.question ? (
                                <h4>{contentItem.question}</h4>
                              ) : (
                                <p>
                                  Quiz content available but no question
                                  provided.
                                </p>
                              )}

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                  gap: "20px",
                                  borderRadius: "8px",
                                  backgroundColor: "white",
                                  margin: "0 auto",
                                }}
                              >
                                {/* Left Column: Left Items */}
                                <div style={{ flex: 1 }}>
                                  {allLeftItems && allLeftItems.length > 0 ? (
                                    allLeftItems.map((pair) => {
                                      const isCurrentlySelected =
                                        quizAnswers[quizId]
                                          ?.currentLeftSelection === pair.id;
                                      const isRecolored = isRecoloredLeft(
                                        pair.id
                                      );
                                      const isCorrect =
                                        correctMatchState.quizId === quizId &&
                                        correctMatchState.leftId === pair.id;
                                      const isIncorrect =
                                        incorrectMatchState.quizId === quizId &&
                                        incorrectMatchState.leftId === pair.id;

                                      return (
                                        <MatchingLeftOption
                                          key={`left-${pair.id}-${quizId}`}
                                          pair={pair}
                                          quizId={quizId}
                                          isCurrentlySelected={
                                            isCurrentlySelected
                                          }
                                          isRecolored={isRecolored}
                                          isCorrect={isCorrect}
                                          isIncorrect={isIncorrect}
                                          handleMatchingLeftRadioChange={
                                            handleMatchingLeftRadioChange
                                          }
                                          isAlreadySelected={true}
                                        />
                                      );
                                    })
                                  ) : (
                                    <p>No left items available.</p>
                                  )}
                                </div>

                                {/* Right Column: Right Options */}
                                <div style={{ flex: 1 }}>
                                  {allRightItems && allRightItems.length > 0 ? (
                                    allRightItems.map((rightOption, idx) => {
                                      const isCurrentlySelected =
                                        quizAnswers[quizId]
                                          ?.currentRightSelection ===
                                        rightOption;
                                      const isRecolored =
                                        isRecoloredRight(rightOption);
                                      const isCorrect =
                                        correctMatchState.quizId === quizId &&
                                        correctMatchState.rightValue ===
                                          rightOption;
                                      const isIncorrect =
                                        incorrectMatchState.quizId === quizId &&
                                        incorrectMatchState.rightValue ===
                                          rightOption;

                                      return (
                                        <MatchingRightOption
                                          key={`right-${rightOption}-${quizId}-${idx}`}
                                          rightOption={rightOption}
                                          idx={idx}
                                          quizId={quizId}
                                          isCurrentlySelected={
                                            isCurrentlySelected
                                          }
                                          isRecolored={isRecolored}
                                          isCorrect={isCorrect}
                                          isIncorrect={isIncorrect}
                                          handleMatchingRightRadioChange={
                                            handleMatchingRightRadioChange
                                          }
                                          isAlreadySelected={true}
                                        />
                                      );
                                    })
                                  ) : (
                                    <p>No right items available.</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        }

                        if(contentItem.quiz_subtype == "subjective"){
                          return (<div className="lesson-content-item quiz-content">
                              {contentItem.question ? (
                                <h4>{contentItem.question}</h4>
                              ) : (
                                <p>
                                  Quiz content available but no question
                                  provided.
                                </p>
                              )} 

                              <p dangerouslySetInnerHTML={{__html: contentItem?.subjective_answer?.[0]?.subjective_answer || '', }} className="subjective-p"></p>
                          </div>)
                        }

                        if(contentItem.quiz_subtype == "whiteboard"){
                          return (<div className="lesson-content-item quiz-content">
                              {contentItem.question ? (
                                <h4>{contentItem.question}</h4>
                              ) : (
                                <p>
                                  Quiz content available but no question
                                  provided.
                                </p>
                              )} 

                              {contentItem?.whiteboard_answer ? <div className="quiz-option-img">
                                <img src={contentItem?.whiteboard_answer} alt="drwaing" />
                                </div> : "No Answer"}
                          </div>)
                        }
                        
                        else {
                          const selectedOptionId = contentItem.user_answer?.[0]?.selected_option_id
                            ? contentItem.user_answer?.[0]?.selected_option_id
                            : quizAnswers[quizId];
                          return (
                            <div className="lesson-content-item quiz-content">
                              {contentItem.question ? (
                                <h4>{contentItem.question}</h4>
                              ) : (
                                <p>
                                  Quiz content available but no question
                                  provided.
                                </p>
                              )}

                              {contentItem.options &&
                              Array.isArray(contentItem.options) &&
                              contentItem.options.length > 0 ? (
                                <div className="quiz-options">
                                  {contentItem.options.map(
                                    (option, optionIndex) => {
                                      if (
                                        !option ||
                                        !option.id ||
                                        !option.option
                                      ) {
                                        console.warn(
                                          `Missing data for a quiz option in quiz ID: ${contentItem.id}. Skipping option.`
                                        );
                                        return null;
                                      }
                                      const isSelected =
                                        selectedOptionId === option.id;
                                      return (
                                        <SingleChoiceOption
                                          key={`option-${option.id}-${quizId}-${optionIndex}`}
                                          option={option}
                                          optionIndex={optionIndex}
                                          quizId={quizId}
                                          isSelected={isSelected}
                                          handleSingleChoiceQuizChange={
                                            handleSingleChoiceQuizChange
                                          }
                                          isAlreadySelected={
                                            simulateMatchingQuizAnswered
                                              ? true
                                              : false
                                          }
                                        />
                                      );
                                    }
                                  )}
                                </div>
                              ) : (
                                <p>No options available for this quiz.</p>
                              )}
                            </div>
                          );
                        }

                      default:
                        return null;
                    }
                  })()}
                  {contentItem.type !== "pdf" &&
                    index < sortedContents?.length - 1 && <hr />}
                </React.Fragment>
              );
            })}
          </div>
          <hr />
        </div>
        <div className="bottom-cta justify-content-end">
          <Link
            // to={`/student/lesson-detail?lessonId=${lessonId}&attemptId=${attemptId}&subjectId=${subjectId}`}
            to={paramData ? paramData : "/teacher/student-profile"}
            state={{ studentId: studentId, subjectId: subjectId }}
            className="next-cta"
            // onClick={
            //   () =>
            //   navigate(-1)
            // }
          >
            {/* Next Lesson <i className="fa-regular fa-arrow-right"></i> */}
            Return to Profile <i className="fa-regular fa-arrow-right"></i>
          </Link>

          {/* <div className="bottom-cta justify-content-end">
  <Link
    to={`/teacher/student-profile`}
    className="next-cta"
  >
    Return to Profile <i className="fa-regular fa-arrow-right"></i>
  </Link>
</div> */}
        </div>
      </div>
    </>
  );
};

export default React.memo(StudentLessonQuiz);


const MultipleSelectOption = ({
  option,
  optionIndex,
  quizId,
  isSelected,
  handleMultipleSelectChange,
  isAlreadySelected,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={`option-${option.id}-${quizId}-${optionIndex}`}
      className="quiz-option-item"
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "8px",
        pointerEvents: isAlreadySelected ? "none" : "auto",
        backgroundColor: isSelected
          ? "#4126A8"
          : isHovered && !isSelected
          ? "#4126A8"
          : "#fff",
        color: isHovered && !isSelected ? "#fff" : isSelected ? "#fff" : "#333",
        border: `1px solid ${isSelected ? "#6a5acd" : "#e0e0e0"}`,
        boxShadow: isSelected
          ? "0 2px 5px rgba(106,90,205,0.2)"
          : "0 1px 3px rgba(0,0,0,0.05)",
        transition:
          "background-color 0.01s ease, border-color 0.2s ease, color 0.2s ease",
      }}
      onMouseEnter={() => !isSelected && setIsHovered(true)}
      onMouseLeave={() => !isSelected && setIsHovered(false)}
      // onClick={() => handleMultipleSelectChange(quizId, option.id)}
    >
      <input
        type="checkbox"
        id={`option-${option.id}-${quizId}-${optionIndex}`}
        name={`quiz-${quizId}`}
        value={option.id}
        checked={isSelected}
        onChange={() => handleMultipleSelectChange(quizId, option.id)}
        style={{
          marginRight: "10px",
          transform: "scale(1.2)",
        }}
        disabled={isAlreadySelected}
      />
      <label
        htmlFor={`option-${option.id}-${quizId}-${optionIndex}`}
        style={{
          flex: 1,
          cursor: "pointer",
          fontWeight: "normal",
        }}
      >
        {option.option}
      </label>
    </div>
  );
};