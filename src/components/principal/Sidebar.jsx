import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({showSidebar}) => {
	const location = useLocation();

	const menuItems = [
		{ name: 'Dashboard', path: '/principal/dashboard', icon: '/images/menu/1.svg' },
		{ name: 'Teacher & Students', path: '/principal/teachers-students', icon: '/images/menu/7.svg' },
		{ name: 'Profile', path: '/principal/profile', icon: '/images/menu/8.svg' }
	];

	// const isActive = (path) => location.pathname === path;
	const isActive = (path) => location.pathname === path || (path === '/principal/dashboard' && location.pathname.startsWith('/principal/subject-detail'));

	return (
		<section id="sidebar" className={`${showSidebar ? '' : ' hide'}`}>
			<Link to="/principal/dashboard" className="brand">
				<img src="/images/logo.svg" alt="Brand Logo" />
				<img src="/images/coll-logo.svg" alt="" className="collapsed"></img>
			</Link>

			<ul className="side-menu">
				<h2>Navigation</h2>

				{menuItems.map((item, index) => (
					<li key={index} className={isActive(item.path) ? 'active' : ''}>
						<Link to={item.path}>
							<img src={item.icon} alt={item.name} />
							<span className="text">{item.name}</span>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

export default Sidebar;
