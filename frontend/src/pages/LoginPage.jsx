import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;