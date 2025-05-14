import React from 'react';

function UserInfo({ userInfo }) {
  // Format age_grouped
  const formatAgeGroup = (ageGrouped) => {
    const ageGroupMap = {
      '<25': 'Under 25',
      '25-35': '25 to 34',
      '35-45': '35 to 44',
      '45+': '45 and Over',
    };
    return ageGroupMap[ageGrouped] || ageGrouped || 'N/A';
  };

  // Format income_grouped
  const formatIncomeGroup = (incomeGrouped) => {
    const incomeGroupMap = {
      'Unknown': 'Unknown',
      '<50k': 'Under $50,000',
      '50k-100k': '$50,000 - $99,999',
      '100k+': '$100,000 and Over',
    };
    return incomeGroupMap[incomeGrouped] || incomeGrouped || 'N/A';
  };

  // Format sex
  const formatSex = (sex) => {
    return sex === 'M' ? 'Male' : sex === 'F' ? 'Female' : sex || 'N/A';
  };

  // Format binary fields
  const formatBinary = (value) => {
    return value === 1 || value === '1' || value === true ? 'Yes' : 'No';
  };

  // Format currency
  const formatCurrency = (value) => {
    return value ? `$${Number(value).toLocaleString()}` : 'N/A';
  };

  // Format date
  const formatDate = (value) => {
    return value ? new Date(value).toLocaleDateString() : 'N/A';
  };

  // Hàm kiểm tra giá trị hợp lệ
  const hasValue = (key, value) => {
    if (value === null || value === undefined || value === '') return false;
    if (typeof value === 'number' && value === 0) return false;
    if ([
      'indAhorFinUlt1', 'indAvalFinUlt1', 'indCcoFinUlt1', 'indCderFinUlt1',
      'indCnoFinUlt1', 'indCtjuFinUlt1', 'indCtmaFinUlt1', 'indCtopFinUlt1',
      'indCtppFinUlt1', 'indDecoFinUlt1', 'indDemeFinUlt1', 'indDelaFinUlt1',
      'indEcueFinUlt1', 'indFondFinUlt1', 'indHipFinUlt1', 'indPlanFinUlt1',
      'indPresFinUlt1', 'indRecaFinUlt1', 'indTjcrFinUlt1', 'indValoFinUlt1',
      'indVivFinUlt1', 'indNominaUlt1', 'indNomPensUlt1', 'indReciboUlt1',
      'indNuevo', 'indActividadCliente', 'indresi', 'indext', 'indfall'
    ].includes(key)) {
      return value === 1 || value === '1' || value === true;
    }
    return true;
  };

  // Định nghĩa các section và trường
  const sections = [
    {
      title: 'Personal Information',
      fields: [
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'age', label: 'Age' },
        { key: 'sex', label: 'Sex', format: formatSex },
        { key: 'sexo', label: 'Sex (Original)', format: formatSex },
        { key: 'paisResidencia', label: 'Country of Residence' },
      ],
    },
    {
      title: 'Account Information',
      fields: [
        { key: 'fechaDato', label: 'Data Date', format: formatDate },
        { key: 'fechaAlta', label: 'Registration Date', format: formatDate },
        { key: 'indNuevo', label: 'New Customer', format: formatBinary },
        { key: 'antiguedad', label: 'Customer Seniority (Months)' },
        { key: 'indrel', label: 'Customer Relationship Type' },
        { key: 'ultFecCli1t', label: 'Last Primary Customer Date', format: formatDate },
        { key: 'indrel1mes', label: 'Customer Type (Month Start)' },
        { key: 'tiprel1mes', label: 'Customer Relation Type (Month Start)' },
        { key: 'indresi', label: 'Resident Indicator', format: formatBinary },
        { key: 'indext', label: 'Foreigner Indicator', format: formatBinary },
        { key: 'conyuemp', label: 'Spouse Employee Indicator' },
        { key: 'canalEntrada', label: 'Channel of Entry' },
        { key: 'indfall', label: 'Deceased Indicator', format: formatBinary },
        { key: 'tipodom', label: 'Address Type' },
        { key: 'codProv', label: 'Province Code' },
        { key: 'nomprov', label: 'Province Name' },
        { key: 'indActividadCliente', label: 'Customer Activity', format: formatBinary },
      ],
    },
    {
      title: 'Financial Information',
      fields: [
        { key: 'income', label: 'Income', format: formatCurrency },
        { key: 'renta', label: 'Gross Household Income', format: formatCurrency },
        { key: 'segment', label: 'Segment' },
        { key: 'segmento', label: 'Segment (Original)' },
        { key: 'ageGrouped', label: 'Age Group', format: formatAgeGroup },
        { key: 'incomeGrouped', label: 'Income Group', format: formatIncomeGroup },
      ],
    },
    {
      title: 'Financial Products',
      fields: [
        { key: 'indAhorFinUlt1', label: 'Savings Account', format: formatBinary },
        { key: 'indAvalFinUlt1', label: 'Guarantees', format: formatBinary },
        { key: 'indCcoFinUlt1', label: 'Current Account', format: formatBinary },
        { key: 'indCderFinUlt1', label: 'Derivative Account', format: formatBinary },
        { key: 'indCnoFinUlt1', label: 'Payroll Account', format: formatBinary },
        { key: 'indCtjuFinUlt1', label: 'Junior Account', format: formatBinary },
        { key: 'indCtmaFinUlt1', label: 'Más Particular Account', format: formatBinary },
        { key: 'indCtopFinUlt1', label: 'Particular Account', format: formatBinary },
        { key: 'indCtppFinUlt1', label: 'Particular Plus Account', format: formatBinary },
        { key: 'indDecoFinUlt1', label: 'Short-Term Deposits', format: formatBinary },
        { key: 'indDemeFinUlt1', label: 'Medium-Term Deposits', format: formatBinary },
        { key: 'indDelaFinUlt1', label: 'Long-Term Deposits', format: formatBinary },
        { key: 'indEcueFinUlt1', label: 'e-Account', format: formatBinary },
        { key: 'indFondFinUlt1', label: 'Funds', format: formatBinary },
        { key: 'indHipFinUlt1', label: 'Mortgage', format: formatBinary },
        { key: 'indPlanFinUlt1', label: 'Pension Plan', format: formatBinary },
        { key: 'indPresFinUlt1', label: 'Loans', format: formatBinary },
        { key: 'indRecaFinUlt1', label: 'Taxes', format: formatBinary },
        { key: 'indTjcrFinUlt1', label: 'Credit Card', format: formatBinary },
        { key: 'indValoFinUlt1', label: 'Securities', format: formatBinary },
        { key: 'indVivFinUlt1', label: 'Home Account', format: formatBinary },
        { key: 'indNominaUlt1', label: 'Payroll', format: formatBinary },
        { key: 'indNomPensUlt1', label: 'Pensions', format: formatBinary },
        { key: 'indReciboUlt1', label: 'Direct Debit', format: formatBinary },
      ],
    },
    {
      title: 'Recent Activity',
      fields: [
        { key: 'lastLogin', label: 'Last Login', format: formatDate },
        { key: 'createdAt', label: 'Account Created', format: formatDate },
      ],
    },
  ];

  // Lọc sections có ít nhất một trường hợp lệ
  const filteredSections = sections
    .map(section => ({
      ...section,
      fields: section.fields.filter(({ key }) => hasValue(key, userInfo[key])),
    }))
    .filter(section => section.fields.length > 0);

  return (
    <div className="space-y-6">
      {filteredSections.map(section => (
        <div key={section.title} className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-blue-600">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map(({ key, label, format }) => (
              <div key={key} className="mb-2">
                <strong className="text-gray-700">{label}:</strong>{' '}
                <span className="text-gray-600">
                  {format ? format(userInfo[key]) : userInfo[key]}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserInfo;