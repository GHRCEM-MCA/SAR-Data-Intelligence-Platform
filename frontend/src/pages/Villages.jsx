import { useState, useEffect } from 'react';
import { MapPin, Users, Tractor, X } from 'lucide-react';
import { getVillages, addVillage } from '../services/storage';

export default function Villages() {
  const [villages, setVillages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', taluka: '', district: '', population: '', land: '' });

  // Load data on component mount
  useEffect(() => {
    setVillages(getVillages());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVillage = addVillage({
      ...formData,
      population: Number(formData.population),
      land: Number(formData.land)
    });
    setVillages([...villages, newVillage]); // Update UI
    setIsModalOpen(false); // Close modal
    setFormData({ name: '', taluka: '', district: '', population: '', land: '' }); // Reset form
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Village Management</h2>
          <p className="text-sm text-slate-500">Centralized repository for village-level administrative data.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm cursor-pointer"
        >
          + Add New Village
        </button>
      </div>

      {/* Village Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {villages.map(village => (
          <div key={village.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-600" />
                {village.name}
              </h3>
              <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-medium">
                {village.district}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Taluka:</span>
                <span className="font-medium text-slate-800">{village.taluka}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-1"><Users className="w-4 h-4"/> Population:</span>
                <span className="font-medium text-slate-800">{village.population}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-1"><Tractor className="w-4 h-4"/> Ag. Land (Acres):</span>
                <span className="font-medium text-slate-800">{village.land}</span>
              </div>
            </div>
          </div>
        ))}
        {villages.length === 0 && <p className="text-slate-500 col-span-3">No villages found. Add one to get started.</p>}
      </div>

      {/* Add Village Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Add New Village</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Village Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Taluka</label>
                  <input required type="text" value={formData.taluka} onChange={e => setFormData({...formData, taluka: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">District</label>
                  <input required type="text" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Population</label>
                  <input required type="number" value={formData.population} onChange={e => setFormData({...formData, population: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ag. Land (Acres)</label>
                  <input required type="number" step="0.1" value={formData.land} onChange={e => setFormData({...formData, land: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                </div>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-lg transition-colors cursor-pointer">
                  Save Village
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}