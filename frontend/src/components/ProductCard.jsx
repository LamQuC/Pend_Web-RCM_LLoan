function ProductCard({ product = {} }) {
  if (!product || typeof product !== 'object') {
    // Return a placeholder card if product is invalid
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h3 className="text-lg font-bold text-blue-600">Product Information</h3>
        <p className="text-gray-500 text-sm mt-2">Product details unavailable</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Browse Products
        </button>
      </div>
    );
  }

  // Check if the product code starts with 'ind_' or similar pattern
  const shouldDisplayCode = product.productCode && !product.productCode.startsWith('ind_');
  
  // Ensure amount is displayed properly even if it's missing
  const displayAmount = product.amount ? `$${product.amount.toLocaleString()}` : 'Call for details';
  
  // Ensure interest rate is displayed properly
  const displayRate = product.interestRate ? `${product.interestRate}%` : 'Variable rate';
  
  // Ensure name is handled properly
  const displayName = product.productName || 'Financial Product';
  
  // Ensure description is handled properly
  const displayDescription = product.description 
    ? product.description.slice(0, 100) + (product.description.length > 100 ? '...' : '')
    : 'Contact us for more information about this product.';
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <h3 className="text-lg font-bold text-blue-600">{displayName}</h3>
      {shouldDisplayCode && (
        <p className="text-gray-600">Code: {product.productCode}</p>
      )}
      <p className="text-gray-600">Interest Rate: {displayRate}</p>
      <p className="text-gray-600">Amount: {displayAmount}</p>
      <p className="text-gray-500 text-sm mt-2">{displayDescription}</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Learn More
      </button>
    </div>
  );
}

export default ProductCard;