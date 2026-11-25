const router = require('express').Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const validate = require('../middleware/validate');
const V = require('../validators');

const auth = require('../controllers/auth.controller');
const village = require('../controllers/village.controller');
const farmer = require('../controllers/farmer.controller');
const crop = require('../controllers/crop.controller');
const resource = require('../controllers/resource.controller');
const dashboard = require('../controllers/dashboard.controller');
const analysis = require('../controllers/analysis.controller');

router.get('/health', (_req, res) => res.json({ status: 'ok' }));

// --- Public auth ---
router.post('/auth/register', validate(V.register), auth.register);
router.post('/auth/login', validate(V.login), auth.login);

// --- Everything below needs a valid JWT ---
router.use(requireAuth);
router.get('/auth/me', auth.me);

const admin = requireRole('admin');
const id = validate(V.idParam, 'params');

// Villages
router.get('/villages', village.list);
router.post('/villages', validate(V.villageCreate), village.create);
router.get('/villages/:id', id, village.get);
router.get('/villages/:id/summary', id, village.summary);
router.put('/villages/:id', id, validate(V.villageUpdate), village.update);
router.delete('/villages/:id', id, admin, village.remove);

// Farmers (also serves Search & Filter via ?search=&minLand=&maxLand=&village=)
router.get('/farmers', validate(V.farmerQuery, 'query'), farmer.list);
router.post('/farmers', validate(V.farmerCreate), farmer.create);
router.get('/farmers/:id', id, farmer.get);
router.put('/farmers/:id', id, validate(V.farmerUpdate), farmer.update);
router.delete('/farmers/:id', id, admin, farmer.remove);

// Crops (Agriculture page)
router.get('/crops', validate(V.cropQuery, 'query'), crop.list);
router.post('/crops', validate(V.cropCreate), crop.create);
router.put('/crops/:id', id, validate(V.cropUpdate), crop.update);
router.delete('/crops/:id', id, admin, crop.remove);

// Water & resources
router.get('/resources', validate(V.resourceQuery, 'query'), resource.list);
router.post('/resources', validate(V.resourceCreate), resource.create);
router.put('/resources/:id', id, validate(V.resourceUpdate), resource.update);
router.delete('/resources/:id', id, admin, resource.remove);

// Dashboard & analysis
router.get('/dashboard', validate(V.scopeQuery, 'query'), dashboard.overview);
router.get('/analysis/yield-trends', validate(V.yieldQuery, 'query'), analysis.yieldTrends);
router.get('/analysis/village-comparison', analysis.villageComparison);

module.exports = router;
