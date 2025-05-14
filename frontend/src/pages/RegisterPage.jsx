import Header from '../components/Header';
import Footer from '../components/Footer';
import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
}

export default RegisterPage;