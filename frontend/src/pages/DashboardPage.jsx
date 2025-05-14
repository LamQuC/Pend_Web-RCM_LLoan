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
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await api.get(`/api/user/${user.username}`);
        setUserInfo(response.data);
      } catch (error) {
        toast.error('Error loading user info: ' + (error.response?.data || error.message));
      }
    };

    fetchUserInfo();
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>
        <div className="max-w-lg mx-auto">
          <UserInfo userInfo={userInfo} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardPage;