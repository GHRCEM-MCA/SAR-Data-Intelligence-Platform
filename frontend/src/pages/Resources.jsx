import { useState, useEffect } from 'react';
import { Droplets, Activity, Plus, X } from 'lucide-react';
import { getResources, addResource } from '../services/storage';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: 'Groundwater', status: 'Active', capacity: 'Medium', beneficiaries: '' });

  useEffect(() => {
    setResources(getResources());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const newRes = addResource({...formData, beneficiaries: Number(formData.beneficiaries)});
    setResources([...resources, newRes]);
    setIsModalOpen(false);
    setFormData({ name: '', type: 'Groundwater', status: 'Active', capacity: 'Medium', beneficiaries: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Water & Resource Information</h2>
          <p className="text-sm text-slate-500">Manage natural resources and irrigation facilities.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-2">
          <Plus className="w-4 h-4"/> Add Resource
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="p-4 font-semibold">Resource Name</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">Capacity</th>
              <th className="p-4 font-semibold">Beneficiary Farmers</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {resources.map(res => (
              <tr key={res.id} className="hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-800 flex items-center gap-2"><Droplets className="w-4 h-4 text-cyan-600"/> {res.name}</td>
                <td className="p-4 text-slate-600">{res.type}</td>
                <td className="p-4 text-slate-600">{res.capacity}</td>
                <td className="p-4 text-slate-600">{res.beneficiaries}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 w-max ${
                    res.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <Activity className="w-3 h-3"/> {res.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="flex justify-between p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">Add Natural Resource</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Resource Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-brand-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                    <option>Groundwater</option>
                    <option>Canal</option>
                    <option>River</option>
                    <option>Rainwater Harvesting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                    <option>Active</option>
                    <option>Depleted</option>
                    <option>Maintenance</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2.5 rounded-lg cursor-pointer">Save Resource</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}