import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../axiosConfig';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';

function Homepage() {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (user) {
          // Lấy danh sách sản phẩm của người dùng
          const prodResponse = await api.get(`/api/products/${user.userId}`);
          setProducts(prodResponse.data);

          // Lấy gợi ý
          const recResponse = await api.get(`/api/recommend/${user.username}`);
          const recProductCodes = recResponse.data.slice(0, 4); // Lấy 4 gợi ý đầu tiên
          // Lọc sản phẩm khớp với productCode từ gợi ý
          const recProducts = prodResponse.data.filter((product) =>
            recProductCodes.includes(product.productCode)
          );
          setRecommendations(recProducts);
        }
      } catch (error) {
        toast.error('Error loading recommendations: ' + (error.response?.data || error.message));
      }
    };

    fetchRecommendations();
  }, [user]);

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

        {/* Recommended Products Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Recommended Products for You
            </h2>
            {user && recommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendations.map((product) => (
                  <ProductCard key={product.productId} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  {user
                    ? 'No recommendations available. Try checking back later!'
                    : 'Log in to see personalized product recommendations.'}
                </p>
                {!user && (
                  <button
                    onClick={() => window.location.href = '/login'}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                  >
                    Log In
                  </button>
                )}
              </div>
            )}
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
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;