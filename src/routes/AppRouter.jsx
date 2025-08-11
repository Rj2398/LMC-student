import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Roles } from '../utils/roles';
import RoleBasedRoute from './RoleBasedRoute';

// Layouts
import StudentLayout from '../layout/StudentLayout';
import TeacherLayout from '../layout/TeacherLayout';
import PrincipalLayout from '../layout/PrincipalLayout';

// Student Panel Pages
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

// Teacher Panel Pages
import TeacherDashboard from '../pages/teacher/Dashboard';
import TeacherMwlLibrary from '../pages/teacher/MwlLibrary';
import TeacherProgressAndScore from '../pages/teacher/ProgressAndScore';
import TeacherProfile from '../pages/teacher/Profile';
import TeacherStudentProfile from '../pages/teacher/StudentProfile';
import TeacherClassDetail from '../pages/teacher/ClassDetail';
import TeacherSubjectDetail from '../pages/teacher/SubjectDetail';
import TeacherSubjectSummativeDetail from '../pages/teacher/SubjectSummativeDetail';
import TeacherSubjectLessonDetail from '../pages/teacher/SubjectLessonDetail';
import TeacherMwlMicroCredentialsDomainTraining from '../pages/teacher/MwlMicroCredentialsDomainTraining';
import TeacherMwlMicroCredentialsDomainTrainingSubject from '../pages/teacher/MwlMicroCredentialsDomainTrainingSubject';
import TeacherMwlOnboarding from '../pages/teacher/MwlOnboarding';
import TeacherMwlParentTraining from '../pages/teacher/MwlParentTraining';
import TeacherSubjectBaselineDetail from '../pages/teacher/SubjectBaselineDetail';
import TeacherMwlLessonPrep from '../pages/teacher/MwlLessonPrep';
import TeacherMwlLessonPrepSubject from '../pages/teacher/MwlLessonPrepSubject';
import TeacherMwlMicroCredentialsDomainTrainingLesson from '../pages/teacher/MwlMicroCredentialsDomainTrainingLesson';
import TeacherMwlLessonPrepLesson from '../pages/teacher/MwlLessonPrepLesson';
import TeacherStudentLessonQuiz from '../pages/teacher/StudentLessonQuiz';
import TeacherStudentBaselineAssessment from '../pages/teacher/StudentBaselineAssessment';
import TeacherStudentSummativeAssessment from '../pages/teacher/StudentSummativeAssessment';



const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Student */}
      <Route element={<RoleBasedRoute allowedRoles={[Roles.STUDENT]} />}>
        <Route element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/baseline-assignment/:subject_id" element={<BaselineAssessment />} />

          <Route path="/student/subject-detail" element={<SubjectDetail />} />
          <Route path="/student/lesson-detail" element={<LessonDetail />} />
          <Route path="/student/summative-assessment/:subject_id" element={<SummativeAssessment />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/progress-and-score" element={<StudentProgressAndScore />} />
        </Route>
      </Route>

      {/* Teacher */}
      <Route element={<RoleBasedRoute allowedRoles={[Roles.TEACHER]} />}>
        <Route element={<TeacherLayout />}>
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/mwl-library" element={<TeacherMwlLibrary />} />
          <Route path="/teacher/progress-and-score" element={<TeacherProgressAndScore />} />
          <Route path="/teacher/profile" element={<TeacherProfile />} />
          <Route path="/teacher/class-detail/:subjectId" element={<TeacherClassDetail />} />
          <Route path="/teacher/student-profile" element={<TeacherStudentProfile />} />

          <Route path="/teacher/subject-baseline-detail/:subjectId" element={<TeacherSubjectBaselineDetail />} />
          <Route path="/teacher/subject-detail/:subjectId" element={<TeacherSubjectDetail />} />
          <Route path="/teacher/subject-summative-detail/:subjectId" element={<TeacherSubjectSummativeDetail />} />
          <Route path="/teacher/subject-lesson-detail/:subjectId/:lessonId" element={<TeacherSubjectLessonDetail />} />
          <Route path="/teacher/mwl-micro-credentials-domain-training" element={<TeacherMwlMicroCredentialsDomainTraining />} />
          <Route path="/teacher/mwl-micro-credentials-domain-training-subject" element={<TeacherMwlMicroCredentialsDomainTrainingSubject />} />
          <Route path="/teacher/mwl-onboarding" element={<TeacherMwlOnboarding />} />
          <Route path="/teacher/mwl-parent-training" element={<TeacherMwlParentTraining />} />
          <Route path="/teacher/mwl-lesson-prep" element={<TeacherMwlLessonPrep />} />
          <Route path="/teacher/mwl-lesson-prep-subject" element={<TeacherMwlLessonPrepSubject />} />
          <Route path="/teacher/mwl-lesson-prep-lesson" element={<TeacherMwlLessonPrepLesson />} />
          <Route path="/teacher/mwl-micro-credentials-domain-training-lesson" element={<TeacherMwlMicroCredentialsDomainTrainingLesson />} />
          <Route path="/teacher/student-lesson-quiz" element={<TeacherStudentLessonQuiz />} />
          <Route path="/teacher/student-baseline-assessment" element={<TeacherStudentBaselineAssessment />} />
          <Route path="/teacher/student-summative-assessment" element={<TeacherStudentSummativeAssessment />} />
          <Route path="/teacher/mwl-micro-credentials-domain-training-lesson" element={<TeacherMwlMicroCredentialsDomainTrainingLesson />} />
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
