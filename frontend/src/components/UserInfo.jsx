function UserInfo({ userInfo }) {
    const formatAgeGroup = (ageGrouped) => {
        const ageGroupMap = {
            '<25': 'Under 25',
            '25-35': '25 to 34',
            '35-45': '35 to 44',
            '45+': '45 and Over'
        };
        return ageGroupMap[ageGrouped] || ageGrouped || 'N/A';
    };

    const formatIncomeGroup = (incomeGrouped) => {
        const incomeGroupMap = {
            'Unknown': 'Unknown',
            '<50k': 'Under $50,000',
            '50k-100k': '$50,000 - $99,999',
            '100k+': '$100,000 and Over'
        };
        return incomeGroupMap[incomeGrouped] || incomeGrouped || 'N/A';
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">User Information</h2>
            <p><strong>Email:</strong> {userInfo.email || 'N/A'}</p>
            <p><strong>Age:</strong> {userInfo.age || 'N/A'}</p>
            <p><strong>Sex:</strong> {userInfo.sex === 'M' ? 'Male' : userInfo.sex === 'F' ? 'Female' : 'N/A'}</p>
            <p><strong>Income:</strong> ${userInfo.income?.toLocaleString() || 'N/A'}</p>
            <p><strong>Segment:</strong> {userInfo.segment || 'N/A'}</p>
            <p><strong>Age Group:</strong> {formatAgeGroup(userInfo.ageGrouped)}</p>
            <p><strong>Income Group:</strong> {formatIncomeGroup(userInfo.incomeGrouped)}</p>
        </div>
    );
}

export default UserInfo;