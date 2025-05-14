import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Homepage from './pages/Homepage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PersonalLoan from './pages/PersonalLoan';
import DebtConsolidationLoan from './pages/DebtConsolidationLoan';
import HomeImprovementLoan from './pages/HomeImprovementLoan';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products/personal-loan" element={<PersonalLoan />} />
          <Route path="/products/debt-consolidation" element={<DebtConsolidationLoan />} />
          <Route path="/products/home-improvement" element={<HomeImprovementLoan />} />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;