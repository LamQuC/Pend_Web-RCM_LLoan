import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-discover-blue">Bank Product Recommendation</h1>
        <nav className="flex items-center space-x-4">
          <a href="/" className="text-gray-600 hover:text-discover-blue">Home</a>
          {user ? (
            <>
              <a href="/dashboard" className="text-gray-600 hover:text-discover-blue">Dashboard</a>
              <span className="text-gray-600">Welcome, {user.username}</span>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="text-gray-600 hover:text-discover-blue">Login</a>
              <a href="/register" className="text-gray-600 hover:text-discover-blue">Register</a>
              <button
                onClick={() => navigate('/login')}
                className="bg-discover-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Check Your Rate
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;