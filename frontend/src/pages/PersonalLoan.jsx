import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function PersonalLoan() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Personal Loans Tailored to You</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Get the funds you need for any purpose, from big purchases to unexpected expenses, with flexible terms and competitive rates.
            </p>
            <Link
              to="/login"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Check Your Rate
            </Link>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Personal Loans?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">💸</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">No Hidden Fees</h3>
                <p className="text-gray-600">
                  Enjoy transparent pricing with no origination fees or prepayment penalties.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Approval</h3>
                <p className="text-gray-600">
                  Apply online and get a decision in minutes, with funds available the next day.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">📅</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Repayment</h3>
                <p className="text-gray-600">
                  Choose terms from 36 to 84 months to fit your budget.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <span className="text-blue-600 text-3xl mr-4">✓</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Competitive Rates</h3>
                  <p className="text-gray-600">
                    APRs from 7.99% to 24.99%, based on your credit profile.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 text-3xl mr-4">✓</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Loan Amounts Up to $40,000</h3>
                  <p className="text-gray-600">
                    Borrow what you need, from $2,500 to $40,000.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 text-3xl mr-4">✓</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">No Collateral Required</h3>
                  <p className="text-gray-600">
                    Unsecured loans mean you don’t risk your assets.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 text-3xl mr-4">✓</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                  <p className="text-gray-600">
                    Our team is here to help anytime, day or night.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto">
              Apply for your personal loan today and take control of your finances.
            </p>
            <Link
              to="/login"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">What can I use a personal loan for?</h3>
                <p className="text-gray-600">
                  You can use it for anything—debt consolidation, medical bills, weddings, or major purchases.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">How long does it take to get approved?</h3>
                <p className="text-gray-600">
                  Most applicants receive a decision within minutes after applying online.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Will applying affect my credit score?</h3>
                <p className="text-gray-600">
                  Checking your rate involves a soft inquiry, which won’t impact your credit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-4">
                  “The application was so easy, and I got my funds the next day! No hidden fees, just what I needed.”
                </p>
                <p className="font-semibold">Sarah T.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-4">
                  “I used my loan to pay off credit cards and saved thousands in interest. Highly recommend!”
                </p>
                <p className="font-semibold">Michael R.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-4">
                  “Great customer service and flexible terms. Made my big purchase stress-free.”
                </p>
                <p className="font-semibold">Emily L.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default PersonalLoan;