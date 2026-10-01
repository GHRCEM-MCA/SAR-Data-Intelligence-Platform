// Existing Seed Data (Villages, Farmers)...
const SEED_VILLAGES = [
  { id: 'V1', name: 'Shirur', taluka: 'Shirur', district: 'Pune', population: 4500, land: 1240 },
  { id: 'V2', name: 'Wagholi', taluka: 'Haveli', district: 'Pune', population: 12000, land: 850 },
];

const SEED_FARMERS = [
  { id: 'F001', name: 'Ramesh Patil', village: 'Shirur', land: 4.5, livestock: 3, familySize: 5 },
  { id: 'F002', name: 'Suresh Deshmukh', village: 'Shirur', land: 2.0, livestock: 1, familySize: 3 },
  { id: 'F003', name: 'Vijay Kale', village: 'Wagholi', land: 6.2, livestock: 5, familySize: 6 },
];

// New Seed Data
const SEED_CROPS = [
  { id: 'C1', crop: 'Wheat', season: 'Rabi', area: '350', yield: '15 Qt/Acre', status: 'Growing' },
  { id: 'C2', crop: 'Cotton', season: 'Kharif', area: '420', yield: '8 Qt/Acre', status: 'Harvested' },
  { id: 'C3', crop: 'Soybean', season: 'Kharif', area: '210', yield: '10 Qt/Acre', status: 'Harvested' },
  { id: 'C4', crop: 'Vegetables', season: 'Zaid', area: '110', yield: 'Varies', status: 'Growing' },
];

const SEED_RESOURCES = [
  { id: 'R1', name: 'Ghod River Canal', type: 'Canal', status: 'Active', capacity: 'High', beneficiaries: 120 },
  { id: 'R2', name: 'Village Central Well', type: 'Groundwater', status: 'Depleted', capacity: 'Low', beneficiaries: 45 },
];

export const initializeStorage = () => {
  if (!localStorage.getItem('sar_villages')) localStorage.setItem('sar_villages', JSON.stringify(SEED_VILLAGES));
  if (!localStorage.getItem('sar_farmers')) localStorage.setItem('sar_farmers', JSON.stringify(SEED_FARMERS));
  if (!localStorage.getItem('sar_crops')) localStorage.setItem('sar_crops', JSON.stringify(SEED_CROPS));
  if (!localStorage.getItem('sar_resources')) localStorage.setItem('sar_resources', JSON.stringify(SEED_RESOURCES));
};

// Existing Village/Farmer functions...
export const getVillages = () => JSON.parse(localStorage.getItem('sar_villages')) || [];
export const addVillage = (data) => { const v = getVillages(); const nv = { ...data, id: `V${Date.now()}` }; v.push(nv); localStorage.setItem('sar_villages', JSON.stringify(v)); return nv; };

export const getFarmers = () => JSON.parse(localStorage.getItem('sar_farmers')) || [];
export const addFarmer = (data) => { const f = getFarmers(); const nf = { ...data, id: `F${Date.now()}` }; f.push(nf); localStorage.setItem('sar_farmers', JSON.stringify(f)); return nf; };

// New Crop API
export const getCrops = () => JSON.parse(localStorage.getItem('sar_crops')) || [];
export const addCrop = (cropData) => {
  const crops = getCrops();
  const newCrop = { ...cropData, id: `C${Date.now()}` };
  crops.push(newCrop);
  localStorage.setItem('sar_crops', JSON.stringify(crops));
  return newCrop;
};

// New Resources API
export const getResources = () => JSON.parse(localStorage.getItem('sar_resources')) || [];
export const addResource = (resData) => {
  const resources = getResources();
  const newRes = { ...resData, id: `R${Date.now()}` };
  resources.push(newRes);
  localStorage.setItem('sar_resources', JSON.stringify(resources));
  return newRes;
};

export const registerUser = (userData) => {
  const users = JSON.parse(localStorage.getItem('sar_users')) || [];
  
  // Check if user already exists
  if (users.find(u => u.email === userData.email)) {
    return { success: false, message: 'Email is already registered.' };
  }
  
  users.push(userData);
  localStorage.setItem('sar_users', JSON.stringify(users));
  return { success: true };
};

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem('sar_users')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Set a mock token and store current user details
    localStorage.setItem('jwt_token', `secure_token_${Date.now()}`);
    localStorage.setItem('current_user', JSON.stringify({ name: user.name, email: user.email }));
    return { success: true };
  }
  return { success: false, message: 'Invalid email or password.' };
};