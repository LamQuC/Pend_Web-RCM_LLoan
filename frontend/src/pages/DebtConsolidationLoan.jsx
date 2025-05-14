import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function DebtConsolidationLoan() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Simplify Your Finances with Debt Consolidation</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Combine high-interest debts into one affordable loan with lower payments and faster payoff.
            </p>
            <Link
              to="/login"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Consolidate Now
            </Link>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits of Debt Consolidation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">💳</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Lower Interest Rates</h3>
                <p className="text-gray-600">
                  Save money with APRs as low as 7.99% compared to high credit card rates.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">📉</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">One Simple Payment</h3>
                <p className="text-gray-600">
                  Replace multiple bills with a single, predictable monthly payment.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Pay Off Debt Faster</h3>
                <p className="text-gray-600">
                  Reduce total interest and shorten your repayment timeline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <span className="text-blue-600 text-3xl mr-4">1</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Check Your Rate</h3>
                  <p className="text-gray-600">
                    Get a personalized rate in minutes without affecting your credit score.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 text-3xl mr-4">2</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Combine Your Debts</h3>
                  <p className="text-gray-600">
                    Use your loan to pay off credit cards, medical bills, or other debts.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 text-3xl mr-4">3</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Enjoy One Payment</h3>
                  <p className="text-gray-600">
                    Make a single monthly payment at a lower rate.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 text-3xl mr-4">4</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Save and Simplify</h3>
                  <p className="text-gray-600">
                    Save on interest and streamline your finances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Take Control of Your Debt</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto">
              Start saving today with a debt consolidation loan tailored to your needs.
            </p>
            <Link
              to="/login"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">What debts can I consolidate?</h3>
                <p className="text-gray-600">
                  You can consolidate credit card debt, medical bills, personal loans, and more.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Will consolidation hurt my credit?</h3>
                <p className="text-gray-600">
                  Checking your rate won’t affect your score, and consolidation can improve it over time.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">How much can I save?</h3>
                <p className="text-gray-600">
                  Use our Debt Consolidation Calculator to estimate your savings based on your debts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Hear from Our Customers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-4">
                  “Consolidating my credit card debt saved me thousands and simplified my life.”
                </p>
                <p className="font-semibold">James K.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-4">
                  “One payment instead of five? Best decision I ever made!”
                </p>
                <p className="font-semibold">Lisa M.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-4">
                  “The process was quick, and the lower rate made a huge difference.”
                </p>
                <p className="font-semibold">David P.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default DebtConsolidationLoan;