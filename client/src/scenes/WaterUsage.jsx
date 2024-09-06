// src/scenes/WaterUsage.jsx

import React, { useEffect, useState } from 'react';
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import './WaterUsage.css';

const WaterUsage = () => {
  const [data, setData] = useState({
    hourly: { time: [], waterUsage: [] },
    qualityDistribution: [],
    usersAffected: { low: 0, medium: 0, high: 0 },
    totalWaterUsage: 0,
    leakagePercentage: 0
  });

  useEffect(() => {
    const generateMockData = () => {
      const mockHourly = {
        time: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM'],
        waterUsage: [10, 20, 15, 25, 30, 40, 45, 60, 50, 65, 70, 80, 90]
      };

      const mockQualityDistribution = [60, 30, 10];  // 60% Good, 30% Moderate, 10% Poor Quality

      const mockUsersAffected = {
        low: 150,
        medium: 100,
        high: 50
      };

      const mockTotalWaterUsage = 1200; // Total water usage in liters
      const mockLeakagePercentage = 5;  // 5% water leakage

      setData({
        hourly: mockHourly,
        qualityDistribution: mockQualityDistribution,
        usersAffected: mockUsersAffected,
        totalWaterUsage: mockTotalWaterUsage,
        leakagePercentage: mockLeakagePercentage
      });
    };

    generateMockData();
  }, []);

  const lineChartData = {
    labels: data.hourly.time,
    datasets: [
      {
        label: 'Water Usage (liters)',
        data: data.hourly.waterUsage,
        fill: false,
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        tension: 0.1
      }
    ]
  };

  const pieChartData = {
    labels: ['Good Quality', 'Moderate Quality', 'Poor Quality'],
    datasets: [
      {
        data: data.qualityDistribution,
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
      }
    ]
  };

  const barChartData = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [
      {
        label: 'Users Affected by Water Supply Issues',
        data: [data.usersAffected.low, data.usersAffected.medium, data.usersAffected.high],
        backgroundColor: ['#81D4FA', '#0288D1', '#01579B'],
        borderColor: '#01579B',
        borderWidth: 1
      }
    ]
  };

  const doughnutChartData = {
    labels: ['Usage', 'Leakage'],
    datasets: [
      {
        data: [100 - data.leakagePercentage, data.leakagePercentage],
        backgroundColor: ['#4CAF50', '#F44336']
      }
    ]
  };

  return (
    <div className="water-usage-dashboard">
      <h1 className="dashboard-title">Water Usage and Management Dashboard</h1>

      <div className="dashboard-grid">
        {/* Line Chart for Water Usage Over Time */}
        <div className="chart-container">
          <h2>Water Usage Over Time</h2>
          <Line data={lineChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>

        {/* Pie Chart for Water Quality Distribution */}
        <div className="chart-container">
          <h2>Water Quality Distribution</h2>
          <Pie data={pieChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>

        {/* Bar Chart for Users Affected by Water Supply Issues */}
        <div className="chart-container">
          <h2>Users Affected by Water Supply Issues</h2>
          <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: function (tooltipItem) { return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`; } } } } }} />
        </div>

        {/* Doughnut Chart for Water Usage vs Leakage */}
        <div className="chart-container">
          <h2>Water Usage vs Leakage</h2>
          <Doughnut data={doughnutChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>

        {/* Circle Display for Total Water Usage */}
        <div className="circle-container">
          <div className="circle-content">
            <h2>Total Water Usage</h2>
            <p className="circle-number">{data.totalWaterUsage} Liters</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterUsage;





