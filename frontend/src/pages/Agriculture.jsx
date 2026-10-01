import { useState, useEffect } from 'react';
import { Sprout, Sun, CloudRain, X } from 'lucide-react';
import { getCrops, addCrop } from '../services/storage';

export default function Agriculture() {
  const [crops, setCrops] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ crop: '', season: 'Kharif', area: '', yield: '', status: 'Growing' });

  useEffect(() => {
    setCrops(getCrops());
  }, []);

  const handleAddCrop = (e) => {
    e.preventDefault();
    const newCrop = addCrop(formData);
    setCrops([...crops, newCrop]);
    setIsModalOpen(false);
    setFormData({ crop: '', season: 'Kharif', area: '', yield: '', status: 'Growing' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Land & Agricultural Data</h2>
          <p className="text-sm text-slate-500">Track cultivated areas, crop types, and seasonal yields.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm cursor-pointer"
        >
          Update Crop Records
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 rounded-lg"><Sun className="w-6 h-6 text-orange-500" /></div>
          <div><p className="text-sm font-medium text-slate-500">Kharif (Monsoon)</p><h3 className="text-xl font-bold text-slate-900 mt-1">630 Acres</h3></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg"><CloudRain className="w-6 h-6 text-blue-500" /></div>
          <div><p className="text-sm font-medium text-slate-500">Rabi (Winter)</p><h3 className="text-xl font-bold text-slate-900 mt-1">350 Acres</h3></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-lg"><Sprout className="w-6 h-6 text-emerald-500" /></div>
          <div><p className="text-sm font-medium text-slate-500">Zaid (Summer)</p><h3 className="text-xl font-bold text-slate-900 mt-1">110 Acres</h3></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-semibold text-slate-800">Current Crop Distribution</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white border-b border-slate-200 text-slate-500">
              <tr>
                <th className="p-4 font-medium">Crop Type</th>
                <th className="p-4 font-medium">Season</th>
                <th className="p-4 font-medium">Cultivated Area</th>
                <th className="p-4 font-medium">Expected/Past Yield</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {crops.map(record => (
                <tr key={record.id} className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-800">{record.crop}</td>
                  <td className="p-4 text-slate-600">{record.season}</td>
                  <td className="p-4 text-slate-600">{record.area} Acres</td>
                  <td className="p-4 text-slate-600">{record.yield}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      record.status === 'Growing' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>{record.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Update Crop Record</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleAddCrop} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Crop Type</label>
                <input required type="text" value={formData.crop} onChange={e => setFormData({...formData, crop: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Season</label>
                  <select value={formData.season} onChange={e => setFormData({...formData, season: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none">
                    <option>Kharif</option>
                    <option>Rabi</option>
                    <option>Zaid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none">
                    <option>Growing</option>
                    <option>Harvested</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Area (Acres)</label>
                  <input required type="number" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Yield (Qt/Acre)</label>
                  <input required type="text" placeholder="e.g. 15 Qt/Acre" value={formData.yield} onChange={e => setFormData({...formData, yield: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                </div>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-lg transition-colors cursor-pointer">
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}