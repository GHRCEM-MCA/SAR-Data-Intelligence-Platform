import { useState, useRef, useEffect } from 'react';
import { 
  Users, 
  Tractor, 
  Home, 
  Droplet,
  ChevronDown,
  Check
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Mock Data
const summaryStats = [
  { title: 'Total Households', value: '452', icon: Home, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Total Farmers', value: '894', icon: Users, color: 'text-brand-600', bg: 'bg-brand-50' },
  { title: 'Agricultural Land', value: '1,240 Acres', icon: Tractor, color: 'text-amber-600', bg: 'bg-amber-50' },
  { title: 'Water Resources', value: '18 Active', icon: Droplet, color: 'text-cyan-600', bg: 'bg-cyan-50' },
];

const cropDistributionData = {
  labels: ['Wheat', 'Cotton', 'Soybean', 'Maize', 'Vegetables'],
  datasets: [{
    label: 'Cultivated Area (Acres)',
    data: [350, 420, 210, 150, 110],
    backgroundColor: 'rgba(22, 163, 74, 0.8)',
    borderRadius: 4,
  }],
};

const landUtilizationData = {
  labels: ['Cultivated', 'Barren', 'Residential', 'Forest'],
  datasets: [{
    data: [70, 10, 5, 15],
    backgroundColor: ['#16a34a', '#d97706', '#2563eb', '#059669'],
    borderWidth: 0,
  }],
};

const VILLAGES = ['Shirur', 'Wagholi', 'Kharadi', 'Chalisgaon'];

export default function Dashboard() {
  const [selectedVillage, setSelectedVillage] = useState('Shirur');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center relative z-20">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Village Overview</h1>
          <p className="text-slate-500 text-sm mt-1">
            Consolidated summary for currently selected village: <strong className="text-brand-700">{selectedVillage}</strong>
          </p>
        </div>
        
        {/* Custom Attractive Dropdown */}
        <div className="relative w-48" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between bg-white border border-slate-200 hover:border-brand-300 text-slate-700 rounded-lg px-4 py-2.5 text-sm font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
          >
            {selectedVillage}
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-full bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
              {VILLAGES.map((village) => (
                <button
                  key={village}
                  onClick={() => {
                    setSelectedVillage(village);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors cursor-pointer
                    ${selectedVillage === village 
                      ? 'bg-brand-50 text-brand-700 font-semibold' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  {village}
                  {selectedVillage === village && <Check className="w-4 h-4 text-brand-600" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Summary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {summaryStats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`p-4 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Crop Distribution</h3>
          <div className="h-72">
            <Bar data={cropDistributionData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Land Utilization (%)</h3>
          <div className="h-72 flex items-center justify-center">
            <Doughnut data={landUtilizationData} options={{ responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'bottom' } } }} />
          </div>
        </div>
      </div>
    </div>
  );
}