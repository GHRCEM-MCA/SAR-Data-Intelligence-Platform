import { useState, useEffect } from 'react';
import { Search, Eye, X, Tractor, Home, Users } from 'lucide-react';
import { getFarmers, addFarmer } from '../services/storage';

export default function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', village: '', land: '', livestock: '', familySize: '' });

  useEffect(() => {
    setFarmers(getFarmers());
  }, []);

  const handleAddFarmer = (e) => {
    e.preventDefault();
    const newFarmer = addFarmer({
      ...formData,
      land: Number(formData.land),
      livestock: Number(formData.livestock),
      familySize: Number(formData.familySize)
    });
    setFarmers([...farmers, newFarmer]);
    setIsModalOpen(false);
    setFormData({ name: '', village: '', land: '', livestock: '', familySize: '' });
  };

  const filteredFarmers = farmers.filter(farmer => 
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Farmers & Households</h2>
          <p className="text-sm text-slate-500">Manage individual farmer profiles and agricultural assets.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
          >
            + Add Farmer
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[600px]">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Village</th>
              <th className="p-4 font-semibold">Land (Acres)</th>
              <th className="p-4 font-semibold">Livestock</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredFarmers.map(farmer => (
              <tr key={farmer.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-slate-500">{farmer.id}</td>
                <td className="p-4 font-medium text-slate-800">{farmer.name}</td>
                <td className="p-4 text-slate-600">{farmer.village}</td>
                <td className="p-4 text-slate-600">{farmer.land}</td>
                <td className="p-4 text-slate-600">{farmer.livestock} Animals</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => setSelectedFarmer(farmer)}
                    className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-800 font-medium cursor-pointer"
                  >
                    <Eye className="w-4 h-4" /> View
                  </button>
                </td>
              </tr>
            ))}
            {filteredFarmers.length === 0 && (
              <tr><td colSpan="6" className="p-4 text-center text-slate-500">No farmers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Farmer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Add New Farmer</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddFarmer} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Village</label>
                <input required type="text" value={formData.village} onChange={e => setFormData({...formData, village: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Land (Acres)</label>
                  <input required type="number" step="0.1" value={formData.land} onChange={e => setFormData({...formData, land: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Livestock</label>
                  <input required type="number" value={formData.livestock} onChange={e => setFormData({...formData, livestock: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Family Size</label>
                  <input required type="number" value={formData.familySize} onChange={e => setFormData({...formData, familySize: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                </div>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-lg transition-colors cursor-pointer">
                  Save Farmer Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Drill-Down Modal remains the same as previously defined... */}
      {selectedFarmer && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Farmer Profile: {selectedFarmer.name}</h3>
              <button onClick={() => setSelectedFarmer(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg flex items-start gap-3 border border-slate-100">
                  <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Household</p>
                    <p className="text-sm text-slate-800 mt-1">Village: {selectedFarmer.village}</p>
                    <p className="text-sm text-slate-800">Family Size: {selectedFarmer.familySize} members</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg flex items-start gap-3 border border-slate-100">
                  <Tractor className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Agriculture & Assets</p>
                    <p className="text-sm text-slate-800 mt-1">Total Land: {selectedFarmer.land} Acres</p>
                    <p className="text-sm text-slate-800">Livestock Count: {selectedFarmer.livestock}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}