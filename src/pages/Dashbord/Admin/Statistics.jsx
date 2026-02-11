import React from 'react';
import StatisticsPage from './Statistics/StatisticsPage';
import TotalUsersCard from './Statistics/TotalUsersCard';
import PendingPaymentsCard from './Statistics/PendingPaymentsCard';
import DeliveredOrdersCard from './Statistics/DeliveredOrdersCard';

const Statistics = () => {
  return (
    <div className="p-6">
   
      <StatisticsPage />

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <TotalUsersCard />
        <PendingPaymentsCard />
        <DeliveredOrdersCard />
      </div>
    </div>
  );
};

export default Statistics;
