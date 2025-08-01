import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Roles } from '../utils/roles';
import RoleBasedRoute from './RoleBasedRoute';

// Layouts
import StudentLayout from '../layout/StudentLayout';
import PrincipalLayout from '../layout/PrincipalLayout';

// Dashboards
import StudentDashboard from '../pages/student/Dashboard';
import PrincipalDashboard from '../pages/principal/Dashboard';
import NotFound from '../pages/common/NotFound';
import Login from '../pages/common/Login';
import StudentProfile from '../pages/student/Profile';
import StudentProgressAndScore from '../pages/student/ProgressAndScore';
import BaselineAssessment from '../pages/student/BaselineAssessment';
import SubjectDetail from '../pages/student/SubjectDetail';
import LessonDetail from '../pages/student/LessonDetail';
import SummativeAssessment from '../pages/student/SummativeAssessment';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Student */}
      <Route element={<RoleBasedRoute allowedRoles={[Roles.STUDENT]} />}>
        <Route element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          {/* <Route path="/student/baseline-assignment" element={<BaselineAssessment />} /> */}
          <Route path="/student/baseline-assignment/:subject_id" element={<BaselineAssessment />} />

          <Route path="/student/subject-detail" element={<SubjectDetail />} />
          <Route path="/student/lesson-detail" element={<LessonDetail />} />
          <Route path="/student/summative-assessment" element={<SummativeAssessment />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/progress-and-score" element={<StudentProgressAndScore />} />
        </Route>
      </Route>

      {/* Principal */}
      <Route element={<RoleBasedRoute allowedRoles={[Roles.PRINCIPAL]} />}>
        <Route element={<PrincipalLayout />}>
          <Route path="/principal/dashboard" element={<PrincipalDashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;
