import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const Navbar = ({setShowSidebar}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [headerTitle, setHeaderTitle] = useState("")

  useEffect(() => {
    if(pathname == "/student/dashboard"){
      setHeaderTitle("Student Dashboard")
      
    }
    else if (pathname == "/student/progress-and-score"){
      setHeaderTitle("Progress & Score")
    }
    else if (pathname == "/student/profile") {
      setHeaderTitle("Profile")
    }
    // else if(pathname == "/student/subject-detail"){
    //   setHeaderTitle("DashBoard > Life Dream");
    // } 
     else {
      setHeaderTitle(""); 
    }
  },[pathname])

  return (
    <nav>
      {/* <div className="nav-toggle" onClick={() => setShowSidebar((prev) => !prev)}>
        <div className="bx bx-menu">
          <img src="/images/sidebar-collapse.svg" alt="" />
        </div>
        {headerTitle}
      </div> */}
      
      <div className="nav-toggle" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
       <div
        onClick={() => setShowSidebar((prev) => !prev)}
        
      >
        <div className="bx bx-menu">
          <img src="/images/sidebar-collapse.svg" alt="menu" />
        </div>
        </div> 

        {pathname === "/student/subject-detail" ? (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/student/dashboard")}
            >
              Dashboard
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000",}}>Life Dream</span>
          </div>
        ) : (
          <span>{headerTitle}</span>
        )}
      </div>
      <div className="notification-btn">
        {/* <a href="#">
          <img src="/images/notification.svg" alt="" />
        </a> */}
      </div>
      <div className="admin-icon">
        <img src="/images/user.svg" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;


// const Navbar = ({setShowSidebar}) => {
//   return (
//     <nav>
//       <div className="nav-toggle" onClick={() => setShowSidebar((prev) => !prev)}>
//         <div className="bx bx-menu">
//           <img src="/images/sidebar-collapse.svg" alt="" />
//         </div>
//         Student Dashboard
//       </div>
//       <div className="notification-btn">
//         {/* <a href="#">
//           <img src="/images/notification.svg" alt="" />
//         </a> */}
//       </div>
//       <div className="admin-icon">
//         <img src="/images/user.svg" alt="" />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
