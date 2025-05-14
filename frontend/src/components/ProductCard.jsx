function ProductCard({ product }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <h3 className="text-lg font-bold text-blue-600">{product.productName}</h3>
      <p className="text-gray-600">Code: {product.productCode}</p>
      <p className="text-gray-600">Interest Rate: {product.interestRate}%</p>
      <p className="text-gray-600">Amount: ${product.amount.toLocaleString()}</p>
      <p className="text-gray-500 text-sm mt-2">{product.description.slice(0, 100)}...</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Learn More
      </button>
    </div>
  );
}

export default ProductCard;