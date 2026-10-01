import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function DataAnalysis() {
  const yieldTrends = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [{
      label: 'Average Wheat Yield (Qt/Acre)',
      data: [12, 13.5, 13, 14.2, 15],
      borderColor: '#16a34a',
      backgroundColor: 'rgba(22, 163, 74, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const assetDistribution = {
    labels: ['Shirur', 'Wagholi', 'Kharadi'],
    datasets: [
      { label: 'Avg Land (Acres)', data: [4.2, 3.1, 5.0], backgroundColor: '#d97706' },
      { label: 'Avg Livestock', data: [3.5, 2.0, 4.1], backgroundColor: '#2563eb' }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Data Analysis & Insights</h2>
        <p className="text-sm text-slate-500">Identify patterns, trends, and gaps in rural data.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Historical Yield Trends</h3>
          <div className="h-72">
            <Line data={yieldTrends} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Village Asset Comparison</h3>
          <div className="h-72">
            <Bar data={assetDistribution} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
}