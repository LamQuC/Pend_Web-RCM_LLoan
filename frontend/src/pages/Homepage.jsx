import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../axiosConfig';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Homepage() {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State cho Estimate Payments
  const [formData, setFormData] = useState({
    loanAmount: 2500,
    loanTerm: 36,
    creditScore: 720,
  });
  const [result, setResult] = useState(null);

  // State cho Debt Consolidation
  const [debtFormData, setDebtFormData] = useState({
    creditScore: 720,
    debts: [{ balance: 0, interestRate: 0, monthlyPayment: 0 }],
  });
  const [debtResult, setDebtResult] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (user) {
          // Fetch recommendations
          const recResponse = await api.get(`/api/recommend/${user.username}`);
          console.log('Recommendations:', recResponse.data); // Debug
          setRecommendations(recResponse.data.slice(0, 4)); // Get top 4 recommendations

          // Open modal if recommendations are available
          if (recResponse.data.length > 0) {
            setIsModalOpen(true);
          } else {
            console.log('No recommendations found'); // Debug
            setIsModalOpen(true); // Show fallback message
          }
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error.response || error.message);
        toast.error('Error loading recommendations: ' + (error.response?.data || error.message));
      }
    };

    fetchRecommendations();
  }, [user]);

  // Xử lý thay đổi form Estimate Payments
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value) });
  };

  // Xử lý submit form Estimate Payments
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/loan/calculate', formData);
      setResult(response.data);
      toast.success('Calculation successful!');
    } catch (error) {
      console.error('Error calculating loan:', error);
      toast.error('Error calculating loan: ' + (error.response?.data || error.message));
    }
  };

  // Xử lý thay đổi form Debt Consolidation
  const handleDebtChange = (index, field, value) => {
    const newDebts = [...debtFormData.debts];
    newDebts[index][field] = parseFloat(value) || 0;
    setDebtFormData({ ...debtFormData, debts: newDebts });
  };

  const handleCreditScoreChange = (e) => {
    setDebtFormData({ ...debtFormData, creditScore: parseInt(e.target.value) });
  };

  // Thêm khoản nợ mới
  const addDebt = () => {
    setDebtFormData({
      ...debtFormData,
      debts: [...debtFormData.debts, { balance: 0, interestRate: 0, monthlyPayment: 0 }],
    });
  };

  // Xóa khoản nợ
  const removeDebt = (index) => {
    if (debtFormData.debts.length > 1) {
      const newDebts = debtFormData.debts.filter((_, i) => i !== index);
      setDebtFormData({ ...debtFormData, debts: newDebts });
    }
  };

  // Xử lý submit form Debt Consolidation
  const handleDebtSubmit = async (e) => {
    e.preventDefault();
    const totalBalance = debtFormData.debts.reduce((sum, debt) => sum + debt.balance, 0);
    if (totalBalance > 40000) {
      toast.error('Total debt balance cannot exceed $40,000');
      return;
    }
    try {
      const response = await api.post('/api/loan/debt-consolidation', debtFormData);
      setDebtResult(response.data);
      toast.success('Debt consolidation calculation successful!');
    } catch (error) {
      console.error('Error calculating debt consolidation:', error);
      toast.error('Error calculating debt consolidation: ' + (error.response?.data || error.message));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Personal Loans from $2,500 to $40,000
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Consolidate debt, make large purchases, or cover unexpected expenses with a fixed-rate loan.
            </p>
            <button
              onClick={() => window.location.href = user ? '/dashboard' : '/login'}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              {user ? 'View Your Dashboard' : 'Check Your Rate'}
            </button>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">No Origination Fees</h3>
                <p className="text-gray-600">
                  Save money with no upfront fees or costs at closing.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Fast Funding</h3>
                <p className="text-gray-600">
                  Get your funds as soon as the next business day.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Flexible Terms</h3>
                <p className="text-gray-600">
                  Choose repayment terms from 36 to 84 months to fit your budget.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Estimate Your Payments and Interest Rate Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Estimate Your Payments and Interest Rate</h2>
            <div className="max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Loan Amount ($2,500 - $40,000)</label>
                  <input
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    min="2500"
                    max="40000"
                    step="100"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Loan Term (Months)</label>
                  <select
                    name="loanTerm"
                    value={formData.loanTerm}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="36">36 Months</option>
                    <option value="48">48 Months</option>
                    <option value="60">60 Months</option>
                    <option value="72">72 Months</option>
                    <option value="84">84 Months</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Credit Score</label>
                  <select
                    name="creditScore"
                    value={formData.creditScore}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="720">Excellent (720+)</option>
                    <option value="660">Good (660-719)</option>
                    <option value="600">Fair (600-659)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Calculate
                </button>
              </form>
              {result && (
                <div className="mt-6 p-4 bg-gray-200 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Estimated Results</h3>
                  <p><strong>Monthly Payment:</strong> ${result.monthlyPayment.toFixed(2)}</p>
                  <p><strong>APR:</strong> {result.apr.toFixed(2)}%</p>
                  <p><strong>Total Interest:</strong> ${result.totalInterest.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Debt Consolidation Calculator Section */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Debt Consolidation Calculator</h2>
            <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
              Enter your credit score and details for each debt balance you hold (up to a total of $40,000) — and we'll show you how much you might be able to save.
            </p>
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
              <form onSubmit={handleDebtSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Credit Score</label>
                  <select
                    value={debtFormData.creditScore}
                    onChange={handleCreditScoreChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="720">Excellent (720+)</option>
                    <option value="660">Good (660-719)</option>
                    <option value="600">Fair (600-659)</option>
                  </select>
                </div>
                {debtFormData.debts.map((debt, index) => (
                  <div key={index} className="mb-4 border p-4 rounded-lg relative">
                    <h3 className="font-semibold mb-2">Debt #{index + 1}</h3>
                    <div className="mb-2">
                      <label className="block text-gray-700">Balance ($)</label>
                      <input
                        type="number"
                        value={debt.balance}
                        onChange={(e) => handleDebtChange(index, 'balance', e.target.value)}
                        min="0"
                        step="100"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700">Interest Rate (%)</label>
                      <input
                        type="number"
                        value={debt.interestRate}
                        onChange={(e) => handleDebtChange(index, 'interestRate', e.target.value)}
                        min="0"
                        step="0.1"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700">Monthly Payment ($)</label>
                      <input
                        type="number"
                        value={debt.monthlyPayment}
                        onChange={(e) => handleDebtChange(index, 'monthlyPayment', e.target.value)}
                        min="0"
                        step="10"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    {debtFormData.debts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDebt(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDebt}
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors mb-4"
                >
                  Add Another Debt
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Calculate Savings
                </button>
              </form>
              {debtResult && (
                <div className="mt-6 p-4 bg-gray-200 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Debt Consolidation Results</h3>
                  <p><strong>Current Payoff Time:</strong> {debtResult.currentPayoffTime} months</p>
                  <p><strong>Current Total Interest:</strong> ${debtResult.currentTotalInterest.toFixed(2)}</p>
                  <p><strong>Consolidated Payoff Time:</strong> {debtResult.consolidatedPayoffTime} months</p>
                  <p><strong>Consolidated Total Interest:</strong> ${debtResult.consolidatedTotalInterest.toFixed(2)}</p>
                  <p><strong>Estimated Savings:</strong> ${debtResult.estimatedSavings.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Our Loan Products Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Explore Our Loan Products</h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              Discover the perfect loan for your needs, from consolidating debt to funding home improvements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-blue-500 text-white text-center py-4">
                  <h3 className="text-xl font-semibold">Personal Loan</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Flexible loans from $2,500 to $40,000 for any purpose, with fixed rates and no hidden fees.
                  </p>
                  <Link
                    to="/products/personal-loan"
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-blue-500 text-white text-center py-4">
                  <h3 className="text-xl font-semibold">Debt Consolidation Loan</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Combine multiple debts into one manageable payment and save on interest.
                  </p>
                  <Link
                    to="/products/debt-consolidation"
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-blue-500 text-white text-center py-4">
                  <h3 className="text-xl font-semibold">Home Improvement Loan</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Fund your home renovation projects with affordable, fixed-rate financing.
                  </p>
                  <Link
                    to="/products/home-improvement"
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendations Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 p-6 transform transition-all">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-discover-blue">
                  Recommended Products for You
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              {user && recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 text-lg mb-4">
                    {user
                      ? 'No recommendations available at the moment. Check back later!'
                      : 'Log in to see personalized product recommendations.'}
                  </p>
                  {!user && (
                    <button
                      onClick={() => window.location.href = '/login'}
                      className="bg-discover-blue text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                    >
                      Log In
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;