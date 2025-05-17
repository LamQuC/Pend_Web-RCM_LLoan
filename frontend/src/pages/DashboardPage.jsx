import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../axiosConfig';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserInfo from '../components/UserInfo';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';

// Product code to name mapping for display
const PRODUCT_CODE_MAP = {
  'ind_ahor_fin_ult1': 'Savings Account',
  'ind_aval_fin_ult1': 'Guarantees',
  'ind_cco_fin_ult1': 'Current Account',
  'ind_cder_fin_ult1': 'Derivatives Account',
  'ind_cno_fin_ult1': 'Payroll Account',
  'ind_ctju_fin_ult1': 'Junior Account',
  'ind_ctma_fin_ult1': 'Más Particular Account',
  'ind_ctop_fin_ult1': 'Particular Account',
  'ind_ctpp_fin_ult1': 'Particular Plus Account',
  'ind_deco_fin_ult1': 'Short-Term Deposits',
  'ind_deme_fin_ult1': 'Medium-Term Deposits',
  'ind_dela_fin_ult1': 'Long-Term Deposits',
  'ind_ecue_fin_ult1': 'e-Account',
  'ind_fond_fin_ult1': 'Funds',
  'ind_hip_fin_ult1': 'Mortgage',
  'ind_plan_fin_ult1': 'Pension Plan',
  'ind_pres_fin_ult1': 'Loans',
  'ind_reca_fin_ult1': 'Taxes',
  'ind_tjcr_fin_ult1': 'Credit Card',
  'ind_valo_fin_ult1': 'Securities',
  'ind_viv_fin_ult1': 'Home Account',
  'ind_nomina_ult1': 'Payroll',
  'ind_nom_pens_ult1': 'Pensions',
  'ind_recibo_ult1': 'Direct Debit'
};

function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch user info
        const userResponse = await api.get(`/api/user/${user.username}`);
        setUserInfo(userResponse.data || {});
        
        // Fetch recommendations
        try {
          const recResponse = await api.get(`/api/recommend/${user.username}`);
          
          // Process recommendations to ensure they have proper names
          const processedRecommendations = recResponse.data.map(product => {
            // If product has raw code in name or missing name, fix it
            if (!product.productName || product.productName.startsWith('ind_')) {
              const code = product.productCode || product.productName;
              return {
                ...product,
                productName: PRODUCT_CODE_MAP[code] || 'Financial Product',
                description: product.description || `Our ${PRODUCT_CODE_MAP[code] || 'financial product'} designed to meet your needs.`
              };
            }
            return product;
          });
          
          setRecommendations(processedRecommendations.slice(0, 3)); // Top 3 recommendations
        } catch (recError) {
          console.error('Failed to fetch recommendations:', recError);
          // Don't show error toast for recommendations - non-critical
        }
      } catch (error) {
        console.error('Failed to fetch user info:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        toast.error('Error loading user info: ' + (error.response?.data?.message || error.message));
        if (error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  // Calculate summary data from user info
  const getSummaryData = () => {
    // Count active products with fallback
    const productKeys = [
      'indAhorFinUlt1', 'indAvalFinUlt1', 'indCcoFinUlt1', 'indCderFinUlt1',
      'indCnoFinUlt1', 'indCtjuFinUlt1', 'indCtmaFinUlt1', 'indCtopFinUlt1',
      'indCtppFinUlt1', 'indDecoFinUlt1', 'indDemeFinUlt1', 'indDelaFinUlt1',
      'indEcueFinUlt1', 'indFondFinUlt1', 'indHipFinUlt1', 'indPlanFinUlt1',
      'indPresFinUlt1', 'indRecaFinUlt1', 'indTjcrFinUlt1', 'indValoFinUlt1',
      'indVivFinUlt1', 'indNominaUlt1', 'indNomPensUlt1', 'indReciboUlt1'
    ];
    
    // Count active products, or provide a default of 1 for basic account
    let activeProducts = productKeys.filter(key => 
      userInfo[key] === 1 || userInfo[key] === '1' || userInfo[key] === true
    ).length;
    
    // If no active products found but user exists, assume at least 1
    if (activeProducts === 0 && user) {
      activeProducts = 1; // Assume user has at least one product
    }
    
    // Calculate customer since with fallbacks
    let customerSince = 'New Customer';
    
    if (userInfo.antiguedad && userInfo.antiguedad > 0) {
      // First choice: use antiguedad field
      customerSince = `${userInfo.antiguedad} months`;
    } else if (userInfo.fechaAlta) {
      // Second choice: use registration date
      const regDate = new Date(userInfo.fechaAlta);
      const today = new Date();
      const diffTime = Math.abs(today - regDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      customerSince = diffDays > 30 ? `${Math.floor(diffDays/30)} months` : `${diffDays} days`;
    } else if (userInfo.createdAt) {
      // Third choice: use account creation date
      const regDate = new Date(userInfo.createdAt);
      const today = new Date();
      const diffTime = Math.abs(today - regDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      customerSince = diffDays > 30 ? `${Math.floor(diffDays/30)} months` : `${diffDays} days`;
    }
    
    return {
      activeProducts,
      customerSince,
      segment: userInfo.segment || userInfo.segmento || 'Basic',
      lastActivity: userInfo.lastLogin ? new Date(userInfo.lastLogin).toLocaleDateString() : 'Today'
    };
  };

  const summaryData = getSummaryData();

  // Get user's financial activities
  const getFinancialActivities = () => {
    // This would ideally come from an API, but we'll simulate with static data
    // In a real app, you would replace this with actual transaction data
    return [
      { 
        id: 1, 
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        description: 'Monthly Account Maintenance',
        amount: -5.99,
        type: 'fee'
      },
      { 
        id: 2, 
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        description: 'Direct Deposit',
        amount: 1250.00,
        type: 'deposit'
      },
      { 
        id: 3, 
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        description: 'Loan Payment',
        amount: -350.00,
        type: 'payment'
      }
    ];
  };

  const activities = getFinancialActivities();

  // Render different tab contents
  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="max-w-4xl mx-auto">
            <UserInfo userInfo={userInfo} />
          </div>
        );
      case 'recommendations':
        return (
          <div className="max-w-4xl mx-auto">
            {recommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendations.map(product => (
                  <ProductCard key={product.productId || product.productCode} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-600 text-lg">No personalized recommendations available at the moment.</p>
              </div>
            )}
          </div>
        );
      case 'activity':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
              {activities.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Date</th>
                        <th className="py-3 px-6 text-left">Description</th>
                        <th className="py-3 px-6 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                      {activities.map(activity => (
                        <tr key={activity.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-3 px-6 text-left whitespace-nowrap">{activity.date}</td>
                          <td className="py-3 px-6 text-left">{activity.description}</td>
                          <td className={`py-3 px-6 text-right ${activity.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            ${Math.abs(activity.amount).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 text-center py-4">No recent activities found.</p>
              )}
            </div>
          </div>
        );
      default: // overview
        return (
          <div className="max-w-4xl mx-auto">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-gray-500 text-sm uppercase">Products</h3>
                <p className="text-3xl font-bold text-blue-600">{summaryData.activeProducts}</p>
                <p className="text-gray-600 text-sm">Active products</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-gray-500 text-sm uppercase">Customer Since</h3>
                <p className="text-3xl font-bold text-blue-600">{summaryData.customerSince}</p>
                <p className="text-gray-600 text-sm">Relationship age</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-gray-500 text-sm uppercase">Segment</h3>
                <p className="text-3xl font-bold text-blue-600">{summaryData.segment}</p>
                <p className="text-gray-600 text-sm">Customer segment</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-gray-500 text-sm uppercase">Last Activity</h3>
                <p className="text-3xl font-bold text-blue-600">{summaryData.lastActivity}</p>
                <p className="text-gray-600 text-sm">Recent login</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link to="/products/personal-loan" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 text-center transition-colors">
                  <div className="text-blue-600 text-2xl mb-2">💰</div>
                  <div className="text-gray-700 font-medium">Personal Loan</div>
                </Link>
                <Link to="/products/debt-consolidation" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 text-center transition-colors">
                  <div className="text-blue-600 text-2xl mb-2">💳</div>
                  <div className="text-gray-700 font-medium">Debt Consolidation</div>
                </Link>
                <Link to="/products/home-improvement" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 text-center transition-colors">
                  <div className="text-blue-600 text-2xl mb-2">🏠</div>
                  <div className="text-gray-700 font-medium">Home Improvement</div>
                </Link>
                <Link to="/" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 text-center transition-colors">
                  <div className="text-blue-600 text-2xl mb-2">🔍</div>
                  <div className="text-gray-700 font-medium">Explore More</div>
                </Link>
              </div>
            </div>

            {/* Top Recommendations */}
            {recommendations.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Top Recommendations</h3>
                  <Link to="#" onClick={() => setActiveTab('recommendations')} className="text-blue-600 hover:underline">View All</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendations.map(product => (
                    <ProductCard key={product.productId || product.productCode} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Recent Activity Preview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Recent Activity</h3>
                <Link to="#" onClick={() => setActiveTab('activity')} className="text-blue-600 hover:underline">View All</Link>
              </div>
              {activities.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Date</th>
                        <th className="py-3 px-6 text-left">Description</th>
                        <th className="py-3 px-6 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                      {activities.slice(0, 3).map(activity => (
                        <tr key={activity.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-3 px-6 text-left whitespace-nowrap">{activity.date}</td>
                          <td className="py-3 px-6 text-left">{activity.description}</td>
                          <td className={`py-3 px-6 text-right ${activity.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            ${Math.abs(activity.amount).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 text-center py-4">No recent activities found.</p>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-grow">
        {/* Welcome Section */}
        <section className="bg-blue-600 text-white py-12">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome, {user?.username || 'User'}!</h1>
            <p className="text-lg max-w-2xl mx-auto">
              View your dashboard, recommended products, and account information.
            </p>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-6">
            <div className="flex overflow-x-auto">
              <button 
                onClick={() => setActiveTab('overview')} 
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('profile')} 
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Profile
              </button>
              <button 
                onClick={() => setActiveTab('recommendations')} 
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${activeTab === 'recommendations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Recommendations
              </button>
              <button 
                onClick={() => setActiveTab('activity')} 
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${activeTab === 'activity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Activity
              </button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              renderTabContent()
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardPage;