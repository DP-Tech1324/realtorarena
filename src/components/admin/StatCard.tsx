import React from 'react';

const StatCard = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className="text-xl font-semibold text-gray-900">{value}</div>
    </div>
  );
};

export default StatCard;