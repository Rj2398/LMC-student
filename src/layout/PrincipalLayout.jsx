import { Outlet } from 'react-router-dom';

const PrincipalLayout = () => {
  return (
    <div>
      <header>Principal Panel Header</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PrincipalLayout;
