import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map, Tractor, Droplet, LineChart, Users, Search, LogOut, User } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Village Management', path: '/villages', icon: Map },
  { name: 'Households & Farmers', path: '/farmers', icon: Users },
  { name: 'Land & Agriculture', path: '/agriculture', icon: Tractor },
  { name: 'Water & Resources', path: '/resources', icon: Droplet },
  { name: 'Data Analysis', path: '/analysis', icon: LineChart },
  { name: 'Search & Filter', path: '/search', icon: Search },
];

export default function Layout() {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('current_user'));
    if (user) setCurrentUser(user);
  }, []);

  const confirmLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('current_user');
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-brand-900 leading-tight">SAR Data Intelligence</h1>
          <p className="text-xs text-slate-500 mt-1">Village & Farmer Platform</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-8 shadow-sm sticky top-0 z-30">
          <h2 className="text-lg font-semibold text-slate-800">BAIF Rural Development Hub</h2>
          
          <div className="flex items-center gap-4">
            {currentUser && (
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
                <User className="w-4 h-4 text-brand-600" />
                {currentUser.name}
              </div>
            )}
            <button 
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>
        
        <div className="p-8">
          <Outlet />
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Confirm Logout</h3>
            <p className="text-sm text-slate-500 mb-6">Are you sure you want to sign out of your account?</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={confirmLogout}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}