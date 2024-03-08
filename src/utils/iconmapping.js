export const getCategoryIcon = (categoryName) => {
    const iconMappings = {
      Housing: 'home',
      Transportation: 'car',
      Food: 'pizza',
      Healthcare: 'medkit',
      'Clothing and Personal Care': 'shirt',
      Education: 'school',
      Utilities: 'water',
      Insurance: 'shield',
      'Savings and Investments': 'cash',
      'Gifts and Donations': 'gift',
      Salary: 'cash',
      Bonuses: 'gift',
      Commissions: 'trending-up',
      Dividends: 'stats-chart',
      'Interest Income': 'pie-chart',
      'Rental Income': 'home',
      'Investment Income': 'trending-up',
      Royalties: 'trophy',
      'Pension or Retirement Income': 'happy',
      'Gifts and Inheritances': 'gift',
      Others: 'ellipsis-horizontal-sharp',
    };

    return iconMappings[categoryName] || 'ellipsis-horizontal-sharp';
  };