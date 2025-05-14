import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../axiosConfig';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserInfo from '../components/UserInfo';
import { toast } from 'react-toastify';

function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log('User on mount:', user);
    if (!user) {
      console.log('No user, redirecting to login');
      navigate('/login');
      return;
    }
    console.log('Fetching /api/user for:', user.username);

    const fetchUserInfo = async () => {
      try {
        const response = await api.get(`/api/user/${user.username}`);
        console.log('User info response:', response.data);
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        if (!response.data || Object.keys(response.data).length === 0) {
          console.warn('API returned empty data');
        }
        setUserInfo(response.data || {});
      } catch (error) {
        console.error('Failed to fetch user info:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        toast.error('Error loading user info: ' + (error.response?.data?.message || error.message));
        if (error.response?.status === 401) {
          console.log('Unauthorized, redirecting to login');
          navigate('/login');
        }
      }
    };

    fetchUserInfo();
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-grow">
        {/* Welcome Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome, {user?.username || 'User'}!</h1>
            <p className="text-lg max-w-2xl mx-auto">
              View and manage your profile information below.
            </p>
          </div>
        </section>

        {/* User Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Profile</h2>
            <div className="max-w-4xl mx-auto">
              <UserInfo userInfo={userInfo} />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardPage;