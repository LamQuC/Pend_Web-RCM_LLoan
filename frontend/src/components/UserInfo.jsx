function UserInfo({ userInfo }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">User Information</h2>
      <p><strong>Email:</strong> {userInfo.email || 'N/A'}</p>
      <p><strong>Age:</strong> {userInfo.age || 'N/A'}</p>
      <p><strong>Sex:</strong> {userInfo.sex === 'M' ? 'Male' : userInfo.sex === 'F' ? 'Female' : 'N/A'}</p>
      <p><strong>Income:</strong> ${userInfo.income?.toLocaleString() || 'N/A'}</p>
      <p><strong>Segment:</strong> {userInfo.segment || 'N/A'}</p>
      <p><strong>Age Group:</strong> {userInfo.ageGrouped || 'N/A'}</p>
      <p><strong>Income Group:</strong> {userInfo.incomeGrouped || 'N/A'}</p>
    </div>
  );
}

export default UserInfo;