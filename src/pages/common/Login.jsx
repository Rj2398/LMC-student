// import { useDispatch, useSelector } from 'react-redux';
// import { signIn } from '../../redux/slices/authSlice'; // optional for real sign-in
// import { useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
// import { useEffect, useState } from 'react';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, user, error } = useSelector((state) => state.auth);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const loginData = { email, password };
//     dispatch(signIn(loginData));
//   };

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
//   }, [isAuthenticated, user, navigate]);

//   return (
//     <div className="d-flex vh-100 align-items-center justify-content-center bg-light">
//       <Container>
//         <Row className="justify-content-center">
//           <Col md={6} lg={5}>
//             <Card className="shadow-sm p-4">
//               <Card.Body>
//                 <h2 className="text-center mb-4">Login</h2>
//                 <Form onSubmit={handleSubmit}>
//                   <Form.Group controlId="formEmail" className="mb-3">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control
//                       type="email"
//                       placeholder="Enter email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </Form.Group>

//                   <Form.Group controlId="formPassword" className="mb-4">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                       type="password"
//                       placeholder="Enter password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </Form.Group>
//                   {error && <div className="text-danger mb-3 d-flex justify-content-center">{error}</div>}
//                   <div className="d-grid">
//                     <Button variant="primary" type="submit" size="lg">
//                       Login
//                     </Button>
//                   </div>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Login;
//clever integration
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

//
import { useDispatch, useSelector } from "react-redux";
import { getMyDetails, signIn } from "../../redux/slices/authSlice"; // optional for real sign-in
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Modal,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, error } = useSelector((state) => state.auth);

  // State for the modal
  const [showModal, setShowModal] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [validationError, setValidationError] = useState("");

  const redirectUri = import.meta.env.VITE_REDIRECT_URL;
  const backendApi = `${import.meta.env.VITE_API_URL}/get-clever-token`;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const defaultDistrictId = import.meta.env.VITE_DEFAULT_DISTRICT_ID;

  const redirectToClever = () => {
    window.location.href = `https://clever.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&district_id=${defaultDistrictId}`;
  };

  const handleModalClose = () => {
    if (isAgreed) {
      setShowModal(false);
      setValidationError(""); // Clear validation error on successful close
      // Navigate to the dashboard after the user agrees and clicks "Okay"
      if (user?.role) {
        navigate(`/${user.role}/dashboard`);
      }
    } else {
      setValidationError("You must agree to the terms.");
    }
  };

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
    if (e.target.checked) {
      setValidationError(""); // Clear error when checkbox is checked
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      axios
        .post(backendApi, { code })
        .then((response) => {
          dispatch(getMyDetails({ token: response.data?.access_token }));
        })
        .catch((err) => console.error("Error sending code to backend:", err));
    } else {
      const hasRedirected = sessionStorage.getItem("clever_redirect_attempt");
      if (!hasRedirected) {
        sessionStorage.setItem("clever_redirect_attempt", "true");
        redirectToClever();
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("clever_redirect_attempt");
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      // Show the modal instead of navigating immediately
      setShowModal(true);
      switch (user.role) {
        case "teacher":
          document.title = "PMSC Teacher Panel";
          break;
        case "principal":
          document.title = "PMSC Principal Panel";
          break;
        default:
          document.title = "PMSC Student Panel";
          break;
      }
    }
  }, [isAuthenticated, user, navigate, location.key]);

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center bg-light">
      <Container className="text-center">
        <h1 className="display-4 text-primary mb-3">Welcome to PMSC</h1>
        <p className="lead text-muted mb-4">
          Redirecting to login with Clever...
        </p>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="mt-4">
          <p className="text-secondary small">
            If you are not redirected automatically, click the button below:
          </p>
          <button
            onClick={redirectToClever}
            className="btn btn-primary btn-lg mt-2"
          >
            <i className="fas fa-sign-in-alt me-2"></i>
            Login with Clever
          </button>
        </div>
      </Container>
      {/* The Modal Component with updated props */}
      <Modal show={showModal} backdrop="static" keyboard={false} centered>
        <Modal.Header>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This is the required text for the terms and conditions.</p>
          <Form.Group controlId="formBasicCheckbox" className="mt-3">
            <Form.Check
              type="checkbox"
              label="I agree to the terms and conditions."
              checked={isAgreed}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
          {validationError && (
            <p className="text-danger mt-2">{validationError}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
