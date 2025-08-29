import WelcomeDashboard from "../../components/student/WelcomeDashboard";
import YourSubjects from "../../components/student/YourSubjects";

const Dashboard = () => {
  return (
    <>
      <WelcomeDashboard />
      <div className="subjects-lesson-progress">
        <div className="row">
          <YourSubjects />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
