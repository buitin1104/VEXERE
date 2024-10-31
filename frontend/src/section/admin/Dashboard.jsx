import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS, // Import LineElement
  Filler,
  Legend,
  LinearScale, // Import PointElement
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Đăng ký các thành phần Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement, // Đăng ký PointElement
  LineElement, // Đăng ký LineElement
  Filler, // Đăng ký Filler
);

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'right',
      align: 'center', // Căn chỉnh label
      labels: {
        boxWidth: 20, // Kích thước ô màu bên cạnh label
        padding: 15, // Khoảng cách giữa các label
      },
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.label + ': ' + tooltipItem.raw;
        },
      },
    },
  },
};

const Dashboard = () => {
  // Dữ liệu doanh thu theo tháng
  const revenueData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Doanh Thu (VNĐ)',
        data: [50000000, 70000000, 30000000, 90000000, 60000000, 80000000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Dữ liệu số lượng lượt đặt xe
  const bookingData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Số Lượt Đặt Xe',
        data: [120, 150, 90, 200, 160, 180],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Dữ liệu biểu đồ tròn
  const pieData = {
    labels: ['Nhà Xe A', 'Nhà Xe B', 'Nhà Xe C'],
    datasets: [
      {
        label: 'Tỷ Lệ Doanh Thu',
        data: [300000000, 200000000, 100000000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
      },
    ],
  };

  // Dữ liệu biểu đồ đường
  const lineData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Doanh Thu (VNĐ)',
        data: [50000000, 70000000, 30000000, 90000000, 60000000, 80000000],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 p-4">
        <p className="text-2xl mb-2 font-bold">Số liệu tháng này</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold">Số Lượt Đặt Vé</h2>
            <p className="text-2xl">
              <i className="fas fa-ticket-alt mr-2"></i> 1500
            </p>
          </div>
          <div className="bg-white border rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold">Số Chuyến Xe </h2>
            <p className="text-2xl">
              <i className="fas fa-bus mr-2"></i> 300
            </p>
          </div>
          <div className="bg-white border rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold">Số Tiền</h2>
            <p className="text-2xl">
              <i className="fas fa-dollar-sign mr-2"></i> 500,000,000 VNĐ
            </p>
          </div>
        </div>

        <p className="text-2xl mb-2 font-bold mt-6">Biểu đồ thống kê</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold">Doanh Thu Theo Tháng</h2>
            <Bar data={revenueData} options={{ responsive: true }} />
          </div>
          <div className="bg-white border rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold">Số Lượt Đặt Xe Theo Tháng</h2>
            <Bar data={bookingData} options={{ responsive: true }} />
          </div>
          <div className="bg-white border rounded-lg p-4 shadow h-[450px] ">
            <h2 className="text-lg font-semibold">
              Tỷ Lệ Doanh Thu Theo Nhà Xe
            </h2>
            <Pie data={pieData} options={pieOptions} />
          </div>
          <div className="bg-white border rounded-lg p-4 shadow h-[450px]">
            <h2 className="text-lg font-semibold">
              Xu Hướng Doanh Thu Theo Tháng
            </h2>
            <Line data={lineData} options={{ responsive: true }} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
