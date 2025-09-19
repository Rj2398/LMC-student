import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/slices/authSlice'; // optional for real sign-in
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { email, password };
    dispatch(signIn(loginData));
  };

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      switch (user.role) {
        case "teacher":
          document.title = "PMSC Teacher Panel";
          break;
        case "principal":
          document.title = "PMSC Principal Panel";
          break;
        case "district_admin":
          document.title = "PMSC District Admin Panel";
          break;
        default:
          document.title = "PMSC Student Panel";
          break;
      }

      navigate(`/${user.role?.replace("_", "-")}/dashboard`);
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-sm p-4">
              <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  {error && <div className="text-danger mb-3 d-flex justify-content-center">{error}</div>}
                  <div className="d-grid">
                    <Button variant="primary" type="submit" size="lg">
                      Login
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

// import { useDispatch, useSelector } from "react-redux";
// import { getMyDetails, signIn } from "../../redux/slices/authSlice"; // optional for real sign-in
// import { useLocation, useNavigate } from "react-router-dom";
// import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isAuthenticated, user, error } = useSelector((state) => state.auth);
//   //clever details

//   const redirectUri = import.meta.env.VITE_REDIRECT_URL;
//   const backendApi = `${import.meta.env.VITE_API_URL}/get-clever-token`;
//   const clientId = import.meta.env.VITE_CLIENT_ID;
//   const defaultDistrictId = import.meta.env.VITE_DEFAULT_DISTRICT_ID;

//   const redirectToClever = () => {
//     window.location.href = `https://clever.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&district_id=${defaultDistrictId}`;
//   };
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const code = params.get("code");

//     if (code) {
//       // Process the authorization code
//       axios
//         .post(backendApi, { code })
//         .then((response) => {
//           dispatch(getMyDetails({ token: response.data?.access_token }));
//           if (response.data.user) {
//             // alert(`Logged in as: ${JSON.stringify(response.data.user.data)}`);
//           }
//         })
//         .catch((err) => console.error("Error sending code to backend:", err));
//     } else {
//       // Check if this is the first visit (no previous redirect attempt)
//       const hasRedirected = sessionStorage.getItem("clever_redirect_attempt");

//       if (!hasRedirected) {
//         // Mark that we've attempted redirect and then redirect
//         sessionStorage.setItem("clever_redirect_attempt", "true");
//         redirectToClever();
//       }
//       // If hasRedirected exists, do nothing (stay on the page)
//     }
//   }, []);

//   useEffect(() => {
//     return () => {
//       sessionStorage.removeItem("clever_redirect_attempt");
//     };
//   }, []);

//   useEffect(() => {
//     if (isAuthenticated && user?.role) {
//       switch (user.role) {
//         case "teacher":
//           document.title = "PMSC Teacher Panel";
//           break;
//         case "principal":
//           document.title = "PMSC Principal Panel";
//           break;
//         default:
//           document.title = "PMSC Student Panel";
//           break;
//       }

//       navigate(`/${user.role}/dashboard`);
//     }
//   }, [isAuthenticated, user, navigate, location.key]);

//   return (
//     <div className="d-flex vh-100 align-items-center justify-content-center bg-light">
//       <Container className="text-center">
//         <h1 className="display-4 text-primary mb-3">Welcome to PMSC</h1>
//         <p className="lead text-muted mb-4">
//           Redirecting to login with Clever...
//         </p>
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <div className="mt-4">
//           <p className="text-secondary small">
//             If you are not redirected automatically, click the button below:
//           </p>
//           <button
//             onClick={redirectToClever}
//             className="btn btn-primary btn-lg mt-2"
//           >
//             <i className="fas fa-sign-in-alt me-2"></i>
//             Login with Clever
//           </button>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Login;


//login next requirement 



// import { useDispatch, useSelector } from "react-redux";
// import { getMyDetails, signIn } from "../../redux/slices/authSlice"; // optional for real sign-in
// import { useLocation, useNavigate } from "react-router-dom";
// import { Container, Row, Col, Button, Card, Form, Modal, } from "react-bootstrap";
// import { useEffect, useState } from "react";
// import axios from "axios";
 
// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isAuthenticated, user, error } = useSelector((state) => state.auth);
 
//   // State for the modal
//   const [showModal, setShowModal] = useState(false);
//   const [isAgreed, setIsAgreed] = useState(false);
//   const [validationError, setValidationError] = useState("");
 
//   const redirectUri = import.meta.env.VITE_REDIRECT_URL;
//   const backendApi = `${import.meta.env.VITE_API_URL}/get-clever-token`;
//   const clientId = import.meta.env.VITE_CLIENT_ID;
//   const defaultDistrictId = import.meta.env.VITE_DEFAULT_DISTRICT_ID;
 
//   const redirectToClever = () => {
//     window.location.href = `https://clever.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&district_id=${defaultDistrictId}`;
//   };
 
//   const handleModalClose = () => {
//     if (isAgreed) {
//       setShowModal(false);
//       setValidationError(""); // Clear validation error on successful close
//       // Navigate to the dashboard after the user agrees and clicks "Okay"
//       if (user?.role) {
//         navigate(`/${user.role}/dashboard`);
//       }
//     } else {
//       setValidationError("You must agree to the terms.");
//     }
//   };
 
//   const handleCheckboxChange = (e) => {
//     setIsAgreed(e.target.checked);
//     if (e.target.checked) {
//       setValidationError(""); // Clear error when checkbox is checked
//     }
//   };
 
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const code = params.get("code");
 
//     if (code) {
//       axios
//         .post(backendApi, { code })
//         .then((response) => {
//           dispatch(getMyDetails({ token: response.data?.access_token }));
//         })
//         .catch((err) => console.error("Error sending code to backend:", err));
//     } else {
//       const hasRedirected = sessionStorage.getItem("clever_redirect_attempt");
//       if (!hasRedirected) {
//         sessionStorage.setItem("clever_redirect_attempt", "true");
//         redirectToClever();
//       }
//     }
//   }, []);
 
//   useEffect(() => {
//     return () => {
//       sessionStorage.removeItem("clever_redirect_attempt");
//     };
//   }, []);
 
//   useEffect(() => {
//     if (isAuthenticated && user?.role) {
//       // Show the modal instead of navigating immediately
//       setShowModal(true);
//       switch (user.role) {
//         case "teacher":
//           document.title = "PMSC Teacher Panel";
//           break;
//         case "principal":
//           document.title = "PMSC Principal Panel";
//           break;
//         default:
//           document.title = "PMSC Student Panel";
//           break;
//       }
//     }
//   }, [isAuthenticated, user, navigate, location.key]);
 
//   return (
//     <div className="d-flex vh-100 align-items-center justify-content-center bg-light">
//       <Container className="text-center">
//         <h1 className="display-4 text-primary mb-3">Welcome to PMSC</h1>
//         <p className="lead text-muted mb-4">
//           Redirecting to login with Clever...
//         </p>
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <div className="mt-4">
//           <p className="text-secondary small">
//             If you are not redirected automatically, click the button below:
//           </p>
//           <button
//             onClick={redirectToClever}
//             className="btn btn-primary btn-lg mt-2"
//           >
//             <i className="fas fa-sign-in-alt me-2"></i>
//             Login with Clever
//           </button>
//         </div>
//       </Container>
//       {/* The Modal Component with updated props */}
//       {/* <Modal show={showModal} backdrop="static" keyboard={false} centered>
//         <Modal.Header>
//           <Modal.Title>Terms and Conditions</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>This is the required text for the terms and conditions.</p>
//           <Form.Group controlId="formBasicCheckbox" className="mt-3">
//             <Form.Check
//               type="checkbox"
//               label="I agree to the terms and conditions."
//               checked={isAgreed}
//               onChange={handleCheckboxChange}
//             />
//           </Form.Group>
//           {validationError && (
//             <p className="text-danger mt-2">{validationError}</p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={handleModalClose}>
//             Okay
//           </Button>
//         </Modal.Footer>
//       </Modal> */}

//  <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" size="lg" centered >
//         <Modal.Header closeButton style={{ backgroundColor: "#5a2ecf", color: "white" }} >
//           <Modal.Title style={{fontSize:"18px", fontWeight:"500"}}>
//             ⚠️ Important - Please Read
//           </Modal.Title>
//         </Modal.Header>

//         {/* Scrollable body */}
//         <Modal.Body style={{fontSize:"14px", paddingBottom:"0px"}}>
//           <div style={{ 
//             border: "1px solid #ccc", 
//             padding: "10px", 
//             borderRadius: "5px", 
//             maxHeight: "250px",
//             overflowY: "auto",
//             whiteSpace: "pre-wrap",
//             fontFamily: "Arial, sans-serif",
//             fontSize: "14px",
//             lineHeight: "1.5",
//             color: "#333"
//           }} >
//             <strong>
//               These are NOT the full Terms & Conditions. You must read and accept the
//               complete agreement before using Holpentech's services. Below is a short recap
//               of key rules unique to our platform:
//             </strong>
//             <br />
//             <br />
//             <ul style={{ paddingLeft: "20px", marginTop: 0, marginBottom: "10px" }}>
//               <li>
//                 <strong>One account, one person - </strong> Your login is just for you. Sharing access
//                 is not allowed.
//               </li>
//               <li>
//                 <strong>No external posting or AI use - </strong> Do not upload PMSC® content to Course Hero,
//                 Chegg, ChatGPT, CoPilot, or any other third-party site or tool.
//               </li>
//               <li>
//                 <strong>No copying or redistribution - </strong> You may not copy, print, paraphrase, or distribute
//                 PMSC® content, except as expressly permitted.
//               </li>
//               <li>
//                 <strong>Facilitators only - </strong> Teachers may display limited facilitator content in class,
//                 but cannot distribute it to students outside the system.
//               </li>
//               <li>
//                 <strong>Rule violations may lead to termination - </strong> Breaking these rules may immediately
//                 end your license.
//               </li>
//               <li>
//                 <strong>Your feedback is sent to Holpentech - </strong> Holpentech may use any suggestions or
//                 ideas provided without payment or credit.
//               </li>
//               <li>
//                 <strong>“As is” service - </strong> Holpentech does not guarantee the Service will be error-free,
//                 and liability is limited to the cost of your seat/license.
//               </li>
//               <li>
//                 <strong>Dispute process - </strong> Disputes must first go to mediation. By agreeing, you also waive
//                 the right to file or join a class action.
//               </li>
//               <li>
//                 <strong>Student data is protected - </strong> PMSC® complies with FERPA and COPPA. We never sell your
//                 data.
//               </li>
//             </ul>
//             <p>
//               👉 Please click <strong>“View Full Terms & Conditions”</strong> below to read the entire
//               agreement before accepting.
//             </p>

//             {/* Explains what personal information PMSC® collects, how it is used, who it is shared with, and the rights of students, teachers, parents, and administrators.
//             <br /><br />
//             Covers all users (students, teachers, administrators, parents/guardians).<br />
//             Collects only limited personal data (e.g., name, email, role) from single sign-on systems like Clever—no historical grades are pulled in.<br />
//             Creates its own learning records (quizzes, scores) within PMSC®, separate from school records.<br />
//             Uses cookies and device data for sessions and analytics.<br />
//             Information is shared only with authorized school staff, service providers, or as required by law.<br />
//             Complies with COPPA and FERPA; treats PMSC® as a “school official.”<br />
//             Users (or parents/schools) can request access, correction, or deletion of data.
//             <br /><br />
//             Sets the rules for how individual users can access and use PMSC® content and software through licenses purchased by their schools.
//             <br /><br />
//             Each seat purchased by a school equals a single-user license; accounts and logins cannot be shared.<br />
//             Strictly prohibits copying, distributing, uploading content to sites (e.g., Course Hero, Chegg), or using AI tools (e.g., ChatGPT, CoPilot) to reproduce content.<br />
//             Teachers may adapt facilitator content for their classrooms but cannot share it outside their school.<br />
//             Violations can lead to immediate license termination and possible federal penalties for copyright misuse.<br />
//             Includes disclaimers of warranties, limits Holpentech's liability, and requires disputes to go to mediation first under California law. */}
//           </div>


//           {/* Checkbox */}
//           <Form.Group controlId="formBasicCheckbox" className="mt-3">
//             {/* <Form.Check type="checkbox" label="By checking this box, you are agreeing to our terms of service." */}
//             <Form.Check type="checkbox" 
//               label={
//                 <span>
//                   By checking this box, you agree to our{" "}
//                   <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
//                     Terms and Conditions
//                   </Link>{" "}
//                   and{" "}
//                   <Link to="/privacy-and-policy" target="_blank" rel="noopener noreferrer">
//                     Privacy Policy
//                   </Link>.
//                 </span>
//               }
//               checked={isAgreed} onChange={handleCheckboxChange} />
//           </Form.Group>
//           {validationError && (
//             <p className="text-danger mt-2">{validationError}</p>
//           )}

//         </Modal.Body>

//         {/* Footer */}
//         <Modal.Footer className="border-0 pt-0">
//           <Button style={{ backgroundColor: "#5a2ecf", border: "none" }} onClick={handleModalClose}>
//             Go to website
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };
 
// export default Login;
 
 