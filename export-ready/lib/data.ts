// ─── DATA ──────────────────────────────────────────────────────────────────────
export const MARKETS = [
  { code: "EU", name: "European Union", flag: "🇪🇺", complexity: "High", rejections: 127 },
  { code: "US", name: "United States", flag: "🇺🇸", complexity: "High", rejections: 89 },
  { code: "UAE", name: "UAE / Gulf", flag: "🇦🇪", complexity: "Medium", rejections: 43 },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧", complexity: "Medium", rejections: 38 },
];

export const CATEGORIES = ["Spices & Masalas", "Pickles & Preserves", "Rice & Grains", "Dairy Products", "Frozen Foods", "Beverages", "Snacks & Namkeen", "Oils & Fats"];

export const COMPLIANCE_DATA = {
  EU: {
    score: 52,
    items: [
      { id: 1, category: "Labelling", req: "Allergen Declaration (14 allergens per EU 1169/2011)", status: "fail", fix: "Add all 14 EU allergens in bold within ingredient list. Missing: sulphites, celery.", critical: true },
      { id: 2, category: "Labelling", req: "Nutritional Info per 100g in EU format (kJ + kcal)", status: "fail", fix: "Current label shows kcal only. EU requires kJ AND kcal side by side.", critical: true },
      { id: 3, category: "Labelling", req: "Best Before date format (DD/MM/YYYY)", status: "fail", fix: "Current format MM/YYYY not accepted by EU customs. Must show full DD/MM/YYYY.", critical: false },
      { id: 4, category: "Labelling", req: "EU Importer name & address on label", status: "fail", fix: "Name and address of EU-based importer/distributor is mandatory on physical label.", critical: true },
      { id: 5, category: "Certification", req: "FSSAI Export Certificate", status: "pass", fix: null, critical: true },
      { id: 6, category: "Certification", req: "Country of Origin clearly stated", status: "pass", fix: null, critical: true },
      { id: 7, category: "Testing", req: "Pesticide residue test (EU MRL compliance)", status: "pending", fix: "Get tested at NABL-accredited lab. Estimated cost: ₹8,000–12,000. Turnaround: 10 days.", critical: true },
      { id: 8, category: "Testing", req: "Heavy metals report (lead, cadmium, arsenic)", status: "pending", fix: "Required for all food products. Recommended labs: SGS India, Eurofins, Intertek.", critical: false },
      { id: 9, category: "Certification", req: "Net weight in metric units (g/kg/ml/L)", status: "pass", fix: null, critical: false },
      { id: 10, category: "Labelling", req: "Minimum font size 1.2mm for mandatory info", status: "pass", fix: null, critical: false },
    ]
  },
  US: {
    score: 61,
    items: [
      { id: 1, category: "Labelling", req: "FDA Nutrition Facts Panel (21 CFR 101.9)", status: "fail", fix: "US format differs from FSSAI. Serving size, calories, daily value % all mandatory.", critical: true },
      { id: 2, category: "Registration", req: "FDA Food Facility Registration (FSMA)", status: "fail", fix: "Every food facility exporting to US must register with FDA. Free but mandatory.", critical: true },
      { id: 3, category: "Labelling", req: "Major Food Allergen labelling (FALCPA)", status: "pass", fix: null, critical: true },
      { id: 4, category: "Testing", req: "HACCP Food Safety Plan documentation", status: "pending", fix: "Required under FDA FSMA Preventive Controls rule. Need documented food safety plan.", critical: true },
      { id: 5, category: "Registration", req: "Prior Notice to FDA before each shipment", status: "fail", fix: "Submit FDA Prior Notice via PN System Interface minimum 2 hours before arrival.", critical: true },
      { id: 6, category: "Testing", req: "Aflatoxin testing (mandatory for spices/grains)", status: "pending", fix: "FDA frequently detects aflatoxin in Indian spices. Mandatory testing before shipment.", critical: true },
      { id: 7, category: "Labelling", req: "English-only labelling", status: "pass", fix: null, critical: false },
    ]
  },
  UAE: {
    score: 74,
    items: [
      { id: 1, category: "Certification", req: "Halal Certification (for processed foods)", status: "pass", fix: null, critical: true },
      { id: 2, category: "Labelling", req: "Arabic translation of all label information", status: "fail", fix: "UAE requires Arabic translation of all label info directly on product label.", critical: true },
      { id: 3, category: "Registration", req: "ESMA product registration", status: "pending", fix: "Emirates Standards & Metrology Authority registration needed before import.", critical: true },
      { id: 4, category: "Labelling", req: "Shelf life minimum 50% remaining on import", status: "pass", fix: null, critical: false },
      { id: 5, category: "Certification", req: "FSSAI Export Certificate", status: "pass", fix: null, critical: true },
      { id: 6, category: "Labelling", req: "Country of Origin in English & Arabic", status: "fail", fix: "Arabic translation of country of origin mandatory alongside English.", critical: false },
    ]
  },
  UK: {
    score: 68,
    items: [
      { id: 1, category: "Labelling", req: "Post-Brexit UK labelling (UKCA rules)", status: "fail", fix: "GB importer address now required separately. Post-Brexit requirement since Jan 2022.", critical: true },
      { id: 2, category: "Certification", req: "FSSAI Export Certificate", status: "pass", fix: null, critical: true },
      { id: 3, category: "Testing", req: "Allergen testing documentation", status: "pass", fix: null, critical: true },
      { id: 4, category: "Labelling", req: "Nutritional declaration per 100g/100ml", status: "pass", fix: null, critical: false },
      { id: 5, category: "Registration", req: "UK IPAFFS import pre-notification", status: "fail", fix: "Import of Products, Animals, Food and Feed System — notify 1 day before UK arrival.", critical: true },
    ]
  }
};

export const EXPORT_HOUSES = [
  { id: 1, name: "Agrostar Exports Ltd", city: "Rajkot", products: 42, markets: ["EU", "UAE", "UK"], score: 71, status: "active" },
  { id: 2, name: "Bharat Foods International", city: "Ludhiana", products: 28, markets: ["US", "UAE"], score: 54, status: "critical" },
  { id: 3, name: "Sunrise Agro Exports", city: "Nashik", products: 67, markets: ["EU", "US", "UAE", "UK"], score: 83, status: "healthy" },
];

export const PARSE_STEPS = [
  { pct: 8, msg: "Reading uploaded label image...", icon: "🖼️" },
  { pct: 18, msg: "Extracting ingredient list from label...", icon: "📋" },
  { pct: 28, msg: "Detecting allergen declarations...", icon: "⚠️" },
  { pct: 38, msg: "Parsing nutritional information format...", icon: "🔬" },
  { pct: 48, msg: "Verifying FSSAI certificate authenticity...", icon: "📄" },
  { pct: 58, msg: "Checking lab test report dates & scope...", icon: "🧪" },
  { pct: 68, msg: "Cross-referencing EU Regulation 178/2002...", icon: "🇪🇺" },
  { pct: 76, msg: "Checking labelling against EU 1169/2011...", icon: "🏷️" },
  { pct: 84, msg: "Validating date format compliance...", icon: "📅" },
  { pct: 91, msg: "Identifying missing certifications...", icon: "🔍" },
  { pct: 96, msg: "Generating compliance gap report...", icon: "📊" },
  { pct: 100, msg: "Report ready!", icon: "✅" },
];
