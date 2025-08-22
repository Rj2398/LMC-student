import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

const Navbar = ({setShowSidebar}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { currentSubject } = useSelector((state) => state.subject)
  const [headerTitle, setHeaderTitle] = useState("")

  useEffect(() => {
    if(pathname == "/principal/dashboard"){
      setHeaderTitle("Principal Dashboard")
      
    }
    else if (pathname == "/principal/teachers-students"){
      setHeaderTitle("Teachers & students")
    }
    else if (pathname == "/principal/profile") {
      setHeaderTitle("Profile")
    }
    // else if(pathname == "/principal/subject-detail"){
    //   setHeaderTitle("DashBoard > Life Dream");
    // } 
     else {
      setHeaderTitle(""); 
    }
  },[pathname])

  return (
    <nav>
      <div className="nav-toggle" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
       <div onClick={() => setShowSidebar((prev) => !prev)} >
        <div className="bx bx-menu">
          <img src="/images/sidebar-collapse.svg" alt="menu" />
        </div>
        </div> 

        {pathname === "/principal/subject-detail" ? (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/principal/dashboard")}
            >
              Dashboard
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000",}}>{currentSubject && currentSubject || "Life Dream"}</span>
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
      <div className="admin-icon" style={{cursor: "pointer"}} onClick={() => navigate("/principal/profile")}>
        <img src="/images/user.svg" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;