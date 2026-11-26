const { z } = require('zod');

const str = (max = 160) => z.string().trim().min(1, 'is required').max(max);
const num = z.coerce.number().finite().nonnegative();
const int = z.coerce.number().int().nonnegative();
const id = z.coerce.number().int().positive();
const optId = z.preprocess((v) => (v === '' || v === null ? undefined : v), id.optional());

const SEASONS = ['Kharif', 'Rabi', 'Zaid'];
const CROP_STATUS = ['Growing', 'Harvested', 'Planned', 'Failed'];
const CAPACITY = ['Low', 'Medium', 'High'];

exports.idParam = z.object({ id });

exports.register = z.object({
  name: str(120),
  email: z.string().trim().toLowerCase().email().max(255),
  password: z.string().min(6, 'must be at least 6 characters').max(100),
});
exports.login = z.object({ email: z.string().trim().toLowerCase().email(), password: z.string().min(1) });

// Each entity schema is built twice: with defaults (create) and without (update/PUT),
// because zod 4's .partial() would still apply defaults and overwrite fields not sent.
const withDef = (on) => (schema, val) => (on ? schema.default(val) : schema.optional());

const villageShape = (on) => { const d = withDef(on); return z.object({
  name: str(120), taluka: str(120), district: str(120),
  population: d(int, 0), land: d(num, 0), households: d(int, 0),
  barrenLand: d(num, 0), residentialLand: d(num, 0), forestLand: d(num, 0),
}); };
exports.villageCreate = villageShape(true);
exports.villageUpdate = villageShape(false).partial();

// Frontend sends the village NAME as free text; villageId is also accepted.
const farmerShape = (on) => { const d = withDef(on); return z.object({
  name: str(120), village: str(120).optional(), villageId: optId,
  land: d(num, 0), livestock: d(int, 0), familySize: d(int, 1),
}); };
exports.farmerCreate = farmerShape(true).refine((x) => x.village || x.villageId, { message: 'village or villageId is required', path: ['village'] });
exports.farmerUpdate = farmerShape(false).partial();
exports.farmerQuery = z.object({
  search: z.string().trim().optional(), name: z.string().trim().optional(),
  village: z.string().trim().optional(), villageId: optId,
  minLand: z.coerce.number().optional(), maxLand: z.coerce.number().optional(),
});

const cropShape = (on) => { const d = withDef(on); return z.object({
  crop: str(120), season: d(z.enum(SEASONS), 'Kharif'), area: d(num, 0),
  yield: d(z.string().trim().max(60), ''), status: d(z.enum(CROP_STATUS), 'Growing'),
  village: str(120).optional(), villageId: optId, farmerId: optId,
  year: z.coerce.number().int().min(1900).max(2100).optional(),
}); };
exports.cropCreate = cropShape(true);
exports.cropUpdate = cropShape(false).partial();
exports.cropQuery = z.object({
  village: z.string().trim().optional(), villageId: optId,
  season: z.enum(SEASONS).optional(), status: z.enum(CROP_STATUS).optional(),
  year: z.coerce.number().int().optional(),
});

const resourceShape = (on) => { const d = withDef(on); return z.object({
  name: str(160), type: d(str(40), 'Groundwater'), status: d(str(20), 'Active'),
  capacity: d(z.enum(CAPACITY), 'Medium'), beneficiaries: d(int, 0),
  village: str(120).optional(), villageId: optId,
}); };
exports.resourceCreate = resourceShape(true);
exports.resourceUpdate = resourceShape(false).partial();
exports.resourceQuery = z.object({
  village: z.string().trim().optional(), villageId: optId,
  type: z.string().trim().optional(), status: z.string().trim().optional(),
});

exports.scopeQuery = z.object({ village: z.string().trim().optional(), villageId: optId });
exports.yieldQuery = z.object({
  village: z.string().trim().optional(), villageId: optId, crop: z.string().trim().default('Wheat'),
});
