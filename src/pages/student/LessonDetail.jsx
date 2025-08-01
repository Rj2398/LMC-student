import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect,
} from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

import {
  completeLesson,
  getLessionDetailSlice,
  getLessionSlice,
  lessionSubmit,
  retriveLesson,
} from "../../redux/slices/student/lessionSlice";

// Component for a single Matching Left Option
const MatchingLeftOption = ({
  pair,
  quizId,
  isDisabled,
  isCurrentlySelected,
  handleMatchingLeftRadioChange,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "8px",
        cursor: isDisabled ? "not-allowed" : "pointer",
        backgroundColor: isDisabled
          ? "#16A34A" // Disabled color
          : isCurrentlySelected
          ? "#4126A8" // Currently selected
          : isHovered && !isDisabled // Apply hover if not disabled and not selected
          ? "#4126A8" // User's requested hover color
          : "#fff", // Default white
        color:
          isHovered && !isCurrentlySelected && !isDisabled
            ? "#fff"
            : isDisabled || isCurrentlySelected
            ? "#fff"
            : "#333",
        border: `1px solid ${
          isDisabled
            ? "#ced4da"
            : isCurrentlySelected
            ? "#28a745" // Border remains green for currently selected matching item
            : "#e0e0e0"
        }`,
        boxShadow: isCurrentlySelected
          ? "0 2px 5px rgba(40,167,69,0.2)"
          : "0 1px 3px rgba(0,0,0,0.05)",
        opacity: isDisabled ? 0.6 : 1,
        transition:
          "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
      }}
      onMouseEnter={() =>
        !isDisabled && !isCurrentlySelected && setIsHovered(true)
      }
      onMouseLeave={() =>
        !isDisabled && !isCurrentlySelected && setIsHovered(false)
      }
      onClick={() =>
        !isDisabled && handleMatchingLeftRadioChange(quizId, pair.id)
      }
    >
      <input
        type="radio"
        id={`left-${pair.id}-${quizId}`}
        name={`quiz-${quizId}-left`}
        value={pair.id}
        checked={isCurrentlySelected}
        onChange={() =>
          !isDisabled && handleMatchingLeftRadioChange(quizId, pair.id)
        }
        disabled={isDisabled}
        style={{ marginRight: "10px", transform: "scale(1.2)" }}
      />
      <label
        htmlFor={`left-${pair.id}-${quizId}`}
        style={{
          flex: 1,
          cursor: isDisabled ? "not-allowed" : "pointer",
          fontWeight: "normal",
        }}
      >
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
  isDisabled,
  isCurrentlySelected,
  handleMatchingRightRadioChange,
}) => {
  const [isHovered, setIsHovered] = useState(false); // Hook called at the top level of this component

  return (
    <div
      key={`right-${rightOption}-${quizId}-${idx}`}
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "8px",
        cursor: isDisabled ? "not-allowed" : "pointer",
        backgroundColor: isDisabled
          ? "#16A34A" // Disabled color
          : isCurrentlySelected
          ? "#4126A8" // Currently selected
          : isHovered && !isDisabled // Apply hover if not disabled and not selected
          ? "#4126A8" // User's requested hover color
          : "#fff", // Default white
        color:
          isHovered && !isCurrentlySelected && !isDisabled
            ? "#fff"
            : isDisabled || isCurrentlySelected
            ? "#fff"
            : "#333",
        border: `1px solid ${
          isDisabled
            ? "#ced4da"
            : isCurrentlySelected
            ? "#28a745" // Border remains green for currently selected matching item
            : "#e0e0e0"
        }`,
        boxShadow: isCurrentlySelected
          ? "0 2px 5px rgba(40,167,69,0.2)"
          : "0 1px 3px rgba(0,0,0,0.05)",
        opacity: isDisabled ? 0.6 : 1,
        transition:
          "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
      }}
      onMouseEnter={() =>
        !isDisabled && !isCurrentlySelected && setIsHovered(true)
      }
      onMouseLeave={() =>
        !isDisabled && !isCurrentlySelected && setIsHovered(false)
      }
      onClick={() =>
        !isDisabled && handleMatchingRightRadioChange(quizId, rightOption)
      }
    >
      <input
        type="radio"
        id={`right-${rightOption}-${quizId}-${idx}`}
        name={`quiz-${quizId}-right`}
        value={rightOption}
        checked={isCurrentlySelected}
        onChange={() =>
          !isDisabled && handleMatchingRightRadioChange(quizId, rightOption)
        }
        disabled={isDisabled}
        style={{ marginRight: "10px", transform: "scale(1.2)" }}
      />
      <label
        htmlFor={`right-${rightOption}-${quizId}-${idx}`}
        style={{
          flex: 1,
          cursor: isDisabled ? "not-allowed" : "pointer",
          fontWeight: "normal",
        }}
      >
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
}) => {
  const [isHovered, setIsHovered] = useState(false); // Hook called at the top level of this component

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
        cursor: "pointer",
        backgroundColor: isSelected
          ? "#4126A8" // Selected single-choice
          : isHovered && !isSelected // Apply hover if not selected
          ? "#4126A8" // User's requested hover color
          : "#fff", // Default white
        color: isHovered && !isSelected ? "#fff" : isSelected ? "#fff" : "#333",
        border: `1px solid ${isSelected ? "#6a5acd" : "#e0e0e0"}`, // Purple border if selected
        boxShadow: isSelected
          ? "0 2px 5px rgba(106,90,205,0.2)"
          : "0 1px 3px rgba(0,0,0,0.05)",
        transition:
          "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
      }}
      onMouseEnter={() => !isSelected && setIsHovered(true)}
      onMouseLeave={() => !isSelected && setIsHovered(false)}
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

const LessonDetail = () => {
  // const { lessionWiseDetails } = useSelector(({ lession }) => lession);

  const lessionWiseDetailsFromStore = useSelector(
    ({ lession }) => lession.lessionWiseDetails
  );
  const { retriveLessonResponse } = useSelector(({ lession }) => lession);

  const [lessionWiseDetails, setLessonWiseDetails] = useState();

  const toastShownRef = useRef(false);
  const toastShowerrRef = useRef(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var simulateMatchingQuizAnswered =
    location.state?.simulateMatchingQuizAnswered;

  const [selectedData, setSelectedData] = useState();
  // console.log(selectedData, "selected data comes fomh ere");

  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("lessonId");
  const attemptId = searchParams.get("attemptId");
  const subjectId = searchParams.get("subjectId");

  const [showModal, setShowModal] = useState(false);

  const [quizAnswers, setQuizAnswers] = useState({});

  const handleClosePopup = () => setShowModal(false);

  //  retrive previos saved data

  // browser route handle

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, [location]);

  // shake the data

  useEffect(() => {
    setLessonWiseDetails(lessionWiseDetailsFromStore);
  }, [lessionWiseDetailsFromStore]);

  useEffect(() => {
    setSelectedData(retriveLessonResponse);
  }, [retriveLessonResponse]);
  //
  useEffect(() => {
    if (lessonId) {
      dispatch(getLessionDetailSlice({ lesson_id: lessonId }));
    }
  }, [lessonId]);

  useEffect(() => {
    dispatch(retriveLesson({ lesson_id: lessonId }));

    // .then((apiResponse) => {
    //   // Renamed parameter to apiResponse
    //   const responseData = apiResponse.payload; // Using a new variable name
    //   setSelectedData(responseData);
    // });
  }, [lessonId]);

  // Memoize sortedContents to avoid re-sorting on every render
  const sortedContents = useMemo(() => {
    const rawContents = simulateMatchingQuizAnswered
      ? selectedData?.lesson?.contents
      : lessionWiseDetails?.lesson?.contents;
    const contents = Array.isArray(rawContents) ? rawContents : [];
    return [...contents].sort(
      (a, b) => (a?.order ?? Infinity) - (b?.order ?? Infinity)
    );
  }, [lessionWiseDetails?.lesson?.contents]);

  // Helper to get quiz content by ID
  const getQuizContentById = useCallback(
    (id) => {
      return sortedContents.find(
        (item) => item.type === "quiz" && item.id === id
      );
    },
    [sortedContents]
  );

  // Function to check if a left item is already part of a completed match
  const isLeftItemMatched = useCallback(
    (quizId, leftItemId) => {
      return quizAnswers[quizId]?.completedMatches?.some(
        (match) => match.leftId === leftItemId
      );
    },
    [quizAnswers]
  );

  // Function to check if a right item is already part of a completed match
  const isRightItemMatched = useCallback(
    (quizId, rightItemValue) => {
      return quizAnswers[quizId]?.completedMatches?.some(
        (match) => match.rightValue === rightItemValue
      );
    },
    [quizAnswers]
  );

  // Common function to check and commit a match
  const checkAndCommitMatch = useCallback(
    (quizId, currentQuizState) => {
      // const { currentLeftSelection, currentRightSelection } = currentQuizState;

      const currentLeftSelection =
        currentQuizState?.currentLeftSelection || null;
      const currentRightSelection =
        currentQuizState?.currentRightSelection || null;

      // console.log(
      //   JSON.stringify(currentLeftSelection),
      //   "ASDFASDFASDFASDFASDFASFSADFSA",
      //   JSON.stringify(currentRightSelection)
      // );
      if (currentLeftSelection !== null && currentRightSelection !== null) {
        const originalQuizContent = getQuizContentById(quizId);
        if (!originalQuizContent || !originalQuizContent.matching_pairs) return;

        // Find the correct pair based on both left ID and right value
        const correctPair = originalQuizContent.matching_pairs.find(
          (pair) =>
            pair.id === currentLeftSelection &&
            pair.right_item === currentRightSelection
        );

        setQuizAnswers((prevAnswers) => {
          const newQuizState = {
            ...(prevAnswers[quizId] || { completedMatches: [] }),
          };

          if (correctPair) {
            // Check if this specific pair (leftId, rightValue) has already been correctly matched
            const isDuplicateMatch = newQuizState.completedMatches.some(
              (match) =>
                match.leftId === currentLeftSelection &&
                match.rightValue === currentRightSelection
            );

            if (!isDuplicateMatch) {
              if (!toastShownRef.current) {
                toast.success("Correct match!");
                toastShownRef.current = true; // Prevents future toasts on re-renders
              }

              newQuizState.completedMatches = [
                ...(newQuizState.completedMatches || []),
                {
                  leftId: currentLeftSelection,
                  rightValue: currentRightSelection,
                },
              ];
              newQuizState.currentLeftSelection = null; // Clear current selections after a successful match
              newQuizState.currentRightSelection = null;
            } else {
              // If it's a correct duplicate selection, just clear active selection without toast
              newQuizState.currentLeftSelection = null;
              newQuizState.currentRightSelection = null;
            }
          } else {
            // If incorrect, clear current selections for a new attempt

            if (!toastShowerrRef.current) {
              toast.error("Incorrect match. Please try again.");
              toastShownRef.current = true; // Prevents future toasts on re-renders
            }

            newQuizState.currentLeftSelection = null;
            newQuizState.currentRightSelection = null;
          }

          return {
            ...prevAnswers,
            [quizId]: newQuizState,
          };
        });
      }
    },
    [getQuizContentById]
  );

  // Handler for single-choice radio button quizzes
  const handleSingleChoiceQuizChange = (quizId, selectedOptionId) => {
    setQuizAnswers((prevAnswers) => ({
      ...prevAnswers,
      [quizId]: selectedOptionId,
    }));
  };

  // Handler for matching quizzes - selecting a left item
  const handleMatchingLeftRadioChange = (quizId, leftItemId) => {
    // Only proceed if this left item is not already matched
    if (isLeftItemMatched(quizId, leftItemId)) {
      toast.info("This item has already been matched correctly!");
      return;
    }

    setQuizAnswers((prevAnswers) => {
      const newQuizState = {
        ...(prevAnswers[quizId] || { completedMatches: [] }),
      };
      newQuizState.currentLeftSelection = leftItemId;

      // Check for a match immediately if a right selection already exists
      // We pass the potentially updated state to checkAndCommitMatch
      const potentialState = {
        ...newQuizState,
        currentLeftSelection: leftItemId, // Ensure the latest left selection is used
      };
      checkAndCommitMatch(quizId, potentialState);

      return {
        ...prevAnswers,
        [quizId]: newQuizState,
      };
    });
  };

  const handleMatchingRightRadioChange = (quizId, rightItemValue) => {
    // Only proceed if this right item is not already matched
    if (isRightItemMatched(quizId, rightItemValue)) {
      toast.info("This item has already been matched correctly!");
      return;
    }

    setQuizAnswers((prevAnswers) => {
      const newQuizState = {
        ...(prevAnswers[quizId] || { completedMatches: [] }),
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

  const handleSubmitQuizAnswers = () => {
    const answersToSubmit = [];

    Object.keys(quizAnswers).forEach((quizId) => {
      const currentQuizId = parseInt(quizId, 10);
      const quizAnswerData = quizAnswers[quizId];

      const originalQuizContent = getQuizContentById(currentQuizId);

      if (!originalQuizContent) {
        console.warn(
          `Quiz content for ID ${currentQuizId} not found in lesson details.`
        );
        return;
      }

      if (originalQuizContent.quiz_subtype === "matching") {
        const completedMatchesData = quizAnswerData?.completedMatches || [];

        const submittedMatches = completedMatchesData.map((match, index) => {
          const originalLeftItem = originalQuizContent.matching_pairs.find(
            (p) => p.id === match.leftId
          );
          return {
            id: match.leftId,
            left_item: originalLeftItem
              ? originalLeftItem.left_item
              : "Unknown Left Item",
            right_item: match.rightValue,
            match_key: String.fromCharCode(65 + index),
          };
        });

        answersToSubmit.push({
          quiz_id: currentQuizId,
          matching: submittedMatches,
        });
      } else {
        // Only include non-matching quiz answers if an option was actually selected
        if (quizAnswerData !== null && quizAnswerData !== undefined) {
          answersToSubmit.push({
            quiz_id: currentQuizId,
            selected_option_id: parseInt(quizAnswerData, 10),
          });
        }
      }
    });

    const params = {
      attempt_id: attemptId,
      answers: answersToSubmit,
    };

    // dispatch(lessionSubmit(params)).then((response) => {
    //   const data = response.payload;
    //   // console.log(data, "data comes form here***");
    //   if (data) {
    //     dispatch(completeLesson({ lesson_id: lessonId }));
    //     // navigate(`/student/subject-detail?subjectId=${subjectId}`);
    //   }
    // });

      dispatch(lessionSubmit(params)).then((response) => {
      const data = response.payload;
      // console.log(data, "data comes form here***");
      if (data) {
        dispatch(completeLesson({ lesson_id: lessonId })).then((response) => {
          const data = response?.payload;
 
          if (data) {
            dispatch(getLessionSlice({ subject_id: subjectId }));
          }
        }); // Corrected: Added closing parenthesis for the .then() block
      }
    });
    ha

    handleClosePopup();
  };

  // UPDATED: Validation logic to ONLY apply to matching quizzes
  const handleOpenPopup = () => {
    // e.preventdefault();
    let allMatchingQuizzesCompleted = true; // Flag specifically for matching quizzes
    let validationMessage = "";

    for (const contentItem of sortedContents) {
      // ONLY check if it's both a "quiz" AND "matching" subtype
      if (
        contentItem.type === "quiz" &&
        contentItem.quiz_subtype === "matching"
      ) {
        const quizId = contentItem.id;
        const currentQuizAnswers = quizAnswers[quizId];
        const quizQuestion = contentItem.question || `Quiz ID: ${quizId}`;

        const totalPairs = contentItem.matching_pairs
          ? contentItem.matching_pairs.length
          : 0;
        const completedMatchesCount =
          currentQuizAnswers?.completedMatches?.length || 0;

        // Apply validation only if there are actual pairs to match
        if (totalPairs > 0) {
          if (completedMatchesCount === 0) {
            allMatchingQuizzesCompleted = false;
            validationMessage = `Please select all options for the matching quiz: "${quizQuestion}".`;
            break; // Found an uncompleted matching quiz, stop checking
          } else if (completedMatchesCount < totalPairs) {
            allMatchingQuizzesCompleted = false;
            validationMessage = `Please match all options for the matching quiz: "${quizQuestion}" before proceeding.`;
            break; // Found an incomplete matching quiz, stop checking
          }
        }
      }
    }

    if (!allMatchingQuizzesCompleted) {
      toast.error(validationMessage); // Use the specific validation message
    } else {
      setShowModal(true);
    }
  };

  // useEffect(() => {
  //   if (lessonId) {
  //     dispatch(getLessionDetailSlice({ lesson_id: lessonId })).then(
  //       (response) => {
  //         const data = response.payload;

  //         setLessonWiseDetails(data);
  //       }
  //     );
  //   }
  // }, [lessonId, dispatch]);

  if (!Array.isArray(lessionWiseDetails?.lesson?.contents)) {
    console.warn(
      "lessionWiseDetails?.lesson?.contents is not an array or is missing. Using empty array for content."
    );
  }
  // if (sortedContents.length === 0) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       No lesson content available to display.
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="baseline-ass-wrp">
        <div className="back-btn mb-3">
          <Link to={`/student/subject-detail?subjectId=${subjectId}`}>
            <img src="/images/baseline-assessment/back-icon.svg" alt="icon" />{" "}
            Back to the Subject
          </Link>
        </div>
        <div className="less-details">
          <h1>{lessionWiseDetails?.lesson?.title}</h1>
          <div className="less-details-in">
            {sortedContents?.map((contentItem, index) => {
              const itemKey = `${contentItem.type || "unknown"}-${
                contentItem.id || "noId"
              }-${contentItem.order || "noOrder"}-${index}`;
              // console.log(contentItem, "content item ********");
              return (
                <React.Fragment key={itemKey}>
                  {(() => {
                    switch (contentItem.type) {
                      case "text":
                        return (
                          <div className="lesson-content-item text-content">
                            {contentItem.title && <h3>{contentItem.title}</h3>}
                            {contentItem.desc && <p>{contentItem.desc}</p>}
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
                            {contentItem.video_link ? (
                              <video
                                controls
                                width="100%"
                                style={{ height: "554px" }}
                              >
                                <source
                                  src={contentItem.video_link}
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>
                            ) : (
                              <p>
                                Video content available but no video link
                                provided.
                              </p>
                            )}
                            {contentItem.desc && <p>{contentItem.desc}</p>}
                          </div>
                        );

                      case "image":
                        return (
                          <div className="lesson-content-item ">
                            {contentItem.img_name ? (
                              <img
                                src={contentItem.img_name}
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
                            {contentItem.desc && <p>{contentItem.desc}</p>}
                          </div>
                        );
                      case "quiz":
                        const quizId = contentItem.id;
                        // const quizState =
                        //   quizAnswers[quizId] ||
                        //   (contentItem.quiz_subtype === "matching"
                        //     ? {
                        //         completedMatches: [],
                        //         currentLeftSelection: null,
                        //         currentRightSelection: null,
                        //       }
                        //     : null);
                        // const simulateMatchingQuizAnswered =
                        let quizState;
                        if (contentItem.quiz_subtype === "matching") {
                          if (simulateMatchingQuizAnswered) {
                            // If the static flag is true, pre-populate completedMatches with all pairs.
                            // In a real app, `user_answer` for matching quizzes would contain specific matches.
                            quizState = {
                              completedMatches:
                                contentItem.matching_pairs || [], // Assume all pairs are matched
                              currentLeftSelection: null,
                              currentRightSelection: null,
                            };
                            // console.log(quizState, "quiz state***********");
                          } else {
                            // Default initial state for a new/unanswered matching quiz
                            quizState = {
                              completedMatches: [],
                              currentLeftSelection: null,
                              currentRightSelection: null,
                            };
                          }
                        }

                        //
                        if (contentItem.quiz_subtype === "matching") {
                          const allLeftItems = contentItem.matching_pairs
                            ? contentItem.matching_pairs
                            : [];
                          const allRightItems = Array.from(
                            new Set(
                              contentItem.matching_pairs
                                ? contentItem.matching_pairs.map(
                                    (p) => p.right_item
                                  )
                                : []
                            )
                          );

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
                                      // const isDisabled = isLeftItemMatched(
                                      //   quizId,
                                      //   pair.id
                                      // );

                                      const isDisabled =
                                        simulateMatchingQuizAnswered
                                          ? quizState.completedMatches.some(
                                              (match) => match.id === pair.id
                                            )
                                          : isLeftItemMatched(quizId, pair.id);
                                      const isCurrentlySelected =
                                        quizState.currentLeftSelection ===
                                        pair.id;

                                      return (
                                        <MatchingLeftOption
                                          key={`left-${pair.id}-${quizId}`}
                                          pair={pair}
                                          quizId={quizId}
                                          isDisabled={isDisabled}
                                          isCurrentlySelected={
                                            isCurrentlySelected
                                          }
                                          handleMatchingLeftRadioChange={
                                            handleMatchingLeftRadioChange
                                          }
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
                                      // const isDisabled = isRightItemMatched(
                                      //   quizId,
                                      //   rightOption
                                      // );

                                      ///

                                      const isDisabled =
                                        simulateMatchingQuizAnswered
                                          ? quizState.completedMatches.some(
                                              (match) =>
                                                match.right_item === rightOption
                                            )
                                          : isRightItemMatched(
                                              quizId,
                                              rightOption
                                            );
                                      const isCurrentlySelected =
                                        quizState.currentRightSelection ===
                                        rightOption;

                                      return (
                                        <MatchingRightOption
                                          key={`right-${rightOption}-${quizId}-${idx}`}
                                          rightOption={rightOption}
                                          idx={idx}
                                          quizId={quizId}
                                          isDisabled={isDisabled}
                                          isCurrentlySelected={
                                            isCurrentlySelected
                                          }
                                          handleMatchingRightRadioChange={
                                            handleMatchingRightRadioChange
                                          }
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
                        } else {
                          // RENDER OTHER QUIZ TYPES (e.g., single-choice) - NO VALIDATION APPLIED HERE AT NEXT BUTTON CLICK
                          // const selectedOptionId = quizAnswers[quizId];

                          const selectedOptionId = contentItem.user_answer
                            ?.selected_option_id
                            ? contentItem.user_answer.selected_option_id
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

         
 
{simulateMatchingQuizAnswered ? (
            // Render a disabled button with the same styling class
            <span
              className="next-cta disabled"
              disabled
              style={{
                backgroundColor: "#4126A8",
                color: "white",
                width: "160px",
                height: "40px",
                borderRadius: "10px",
                justifyContent: "space-around",
                alignItems: "center",
                display: "flex",
                opacity: 0.8,
              }}
            >
              Next Lesson <i className="fa-regular fa-arrow-right"></i>
            </span>
          ) : (
            // Render the active Link
            <Link
              to={`/student/lesson-detail?lessonId=${lessonId}&attemptId=${attemptId}&subjectId=${subjectId}`}
              onClick={handleOpenPopup}
              className="next-cta"
            >
              Next Lesson <i className="fa-regular fa-arrow-right"></i>
            </Link>
          )}
 
          {/* <Link
            to={`/student/lesson-detail?lessonId=${lessonId}&attemptId=${attemptId}&subjectId=${subjectId}`}
            onClick={handleOpenPopup}
            className="next-cta"
          >
            Next Lesson <i className="fa-regular fa-arrow-right"></i>
          </Link> */}
        </div>
      </div>

      <QuitPopup
        show={showModal}
        onHide={handleClosePopup}
        onSubmitQuiz={() => handleSubmitQuizAnswers()}
        lessonId={lessonId}
        attemptId={attemptId}
        subjectId={subjectId}
      />
    </>
  );
};

export default React.memo(LessonDetail);

const QuitPopup = ({
  show,
  onHide,
  onSubmitQuiz,
  lessonId,
  attemptId,
  subjectId,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      id="#quit-popup"
      className="my-popup"
    >
      <div className="modal-content clearfix">
        <div className="modal-heading d-flex justify-content-between align-items-center p-3">
          <h2 className="mb-0">Confirmation</h2>
          <Button
            variant="link"
            onClick={onHide}
            className="close close-btn-front p-0 m-0"
          >
            <img src="/images/cross-pop.svg" alt="close" />
          </Button>
        </div>
        <Modal.Body>
          <div className="delete-pop-wrap">
            <form>
              <div className="delete-pop-inner">
                <p>
                  <strong>Have you answered all your questions?</strong>
                </p>
                <p>
                  Completing them can help you feel more confident and reduce
                  stress. Keep going you're doing great!
                </p>
              </div>
              <div className="delete-pop-btn d-flex gap-3">
                <Link
                  to={`/student/lesson-detail?lessonId=${lessonId}&attemptId=${attemptId}&subjectId=${subjectId}`}
                  onClick={onHide}
                  className="btn btn-primary"
                >
                  Review
                </Link>
                <Link
                  to={`/student/subject-detail?subjectId=${subjectId}`}
                  onClick={onSubmitQuiz}
                  className="btn btn-outline-secondary"
                >
                  Continue
                </Link>
              </div>
            </form>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};
