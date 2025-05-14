import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function HomeImprovementLoan() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-200; text-align: center;">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Transform Your Home with a Home Improvement Loan</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Finance your dream renovations, from kitchen remodels to backyard upgrades, with affordable loans.
            </p>
            <Link
              to="/login"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Your Project
            </Link>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Finance Your Home Improvements?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">🏠</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Increase Home Value</h3>
                <p className="text-gray-600">
                  Renovations can boost your property’s market value and appeal.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Affordable Financing</h3>
                <p className="text-gray-600">
                  Low APRs from 7.99% make your projects budget-friendly.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">🛠️</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Any Project Size</h3>
                <p className="text-gray-600">
                  Borrow $2,500 to $40,000 for small upgrades or major remodels.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What You Can Finance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <span className="text-blue-600 text-3xl mr-4">✓</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Kitchen & Bath Remodels</h3>
                  <p className="text-gray-600">
                    Upgrade your home’s heart with modern fixtures and designs.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 text-3xl mr-4">✓</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Outdoor Spaces</h3>
                  <p className="text-gray-600">
                    Create a stunning backyard with decks, patios, or landscaping.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 text-3xl mr-4">✓</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Energy Efficiency</h3>
                  <p className="text-gray-600">
                    Install solar panels or energy-efficient windows to save long-term.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 text-3xl mr-4">✓</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Additions & Expansions</h3>
                  <p className="text-gray-600">
                    Add rooms or expand living spaces for growing families.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Build Your Dream Home</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto">
              Get the financing you need to make your home improvement dreams a reality.
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
                <h3 className="text-xl font-semibold mb-2">Do I need a contractor?</h3>
                <p className="text-gray-600">
                  No, you can use the funds for DIY projects or hire a contractor.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">How soon can I start my project?</h3>
                <p className="text-gray-600">
                  Funds are available as soon as the next business day after approval.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Can I pay off early?</h3>
                <p className="text-gray-600">
                  Yes, there are no penalties for early repayment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Customer Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-4">
                  “Our new kitchen is a dream come true, thanks to this loan!”
                </p>
                <p className="font-semibold">Jennifer S.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-4">
                  “We added a deck and couldn’t be happier. The process was seamless.”
                </p>
                <p className="font-semibold">Mark T.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-4">
                  “Affordable rates made our home expansion possible.”
                </p>
                <p className="font-semibold">Laura B.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default HomeImprovementLoan;