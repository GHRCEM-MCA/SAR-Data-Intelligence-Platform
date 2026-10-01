import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { getFarmers } from '../services/storage';

export default function SearchFilter() {
  const [farmers, setFarmers] = useState([]);
  
  // State for all filter inputs
  const [filters, setFilters] = useState({ name: '', minLand: '', maxLand: '' });

  useEffect(() => {
    setFarmers(getFarmers());
  }, []);

  // Function to reset all filters to their default empty state
  const handleReset = () => {
    setFilters({ name: '', minLand: '', maxLand: '' });
  };

  const filteredResults = farmers.filter(f => {
    const matchName = f.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchMin = filters.minLand === '' || f.land >= Number(filters.minLand);
    const matchMax = filters.maxLand === '' || f.land <= Number(filters.maxLand);
    return matchName && matchMin && matchMax;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Advanced Search & Filtering</h2>
        <p className="text-sm text-slate-500">Query the central repository using custom parameters.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            <Search className="inline w-4 h-4 mr-1"/> Name / ID
          </label>
          <input 
            type="text" 
            value={filters.name} 
            onChange={e => setFilters({...filters, name: e.target.value})} 
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" 
            placeholder="Search..." 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Min Land (Acres)</label>
          <input 
            type="number" 
            value={filters.minLand} 
            onChange={e => setFilters({...filters, minLand: e.target.value})} 
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none w-32" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Max Land (Acres)</label>
          <input 
            type="number" 
            value={filters.maxLand} 
            onChange={e => setFilters({...filters, maxLand: e.target.value})} 
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none w-32" 
          />
        </div>
        
        {/* Updated Reset Button with onClick handler */}
        <button 
          onClick={handleReset}
          className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 flex items-center gap-2 h-[42px] cursor-pointer transition-colors"
        >
          <Filter className="w-4 h-4"/> Reset
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Village</th>
              <th className="p-4 font-semibold">Land Area</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredResults.length > 0 ? (
              filteredResults.map(f => (
                <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-800">{f.name}</td>
                  <td className="p-4 text-slate-600">{f.village}</td>
                  <td className="p-4 text-slate-600">{f.land} Acres</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-8 text-center text-slate-500">
                  No records found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}