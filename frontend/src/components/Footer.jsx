function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Bank Product Recommendation</h3>
            <p className="text-sm">
              Offering personal loans from $2,500 to $40,000 with no origination fees.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/login" className="hover:underline">Login</a></li>
              <li><a href="/register" className="hover:underline">Register</a></li>
              <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">Phone: 1-800-123-4567</p>
            <p className="text-sm">Email: support@bankrecommend.com</p>
          </div>
        </div>
        <div className="mt-6 text-center text-sm">
          <p>© 2025 Bank Product Recommendation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;