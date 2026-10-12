const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'database.json');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

// Initial default state
const DEFAULT_DATABASE = {
  parking: [
    {
      id: "PK-1",
      name: "White Town Parking",
      location: "Rue Romain Rolland, Near Promenade Beach, White Town, Puducherry - 605001",
      totalSpaces: 80,
      availableSpaces: 32,
      twoWheelerPrice: 20,
      fourWheelerPrice: 40,
      price: 20,
      status: "OPEN",
      landmark: "Behind French Institute, 2 mins walk to Rock Beach",
      timings: "06:00 AM - 11:00 PM (All Days)",
      managedBy: "Puducherry Traffic Police & Municipality"
    },
    {
      id: "PK-2",
      name: "Heritage Town Parking",
      location: "Vysial Street, Near Sri Manakula Vinayagar Temple, Heritage Town, Puducherry - 605001",
      totalSpaces: 50,
      availableSpaces: 8,
      twoWheelerPrice: 15,
      fourWheelerPrice: 30,
      price: 15,
      status: "OPEN",
      landmark: "Opposite Calve College High School",
      timings: "07:00 AM - 10:00 PM",
      managedBy: "Puducherry Smart City Development Ltd"
    },
    {
      id: "PK-3",
      name: "MG Road Parking",
      location: "Mahatma Gandhi Road, Near Rangapillai Street Junction, Puducherry - 605001",
      totalSpaces: 100,
      availableSpaces: 45,
      twoWheelerPrice: 30,
      fourWheelerPrice: 50,
      price: 30,
      status: "OPEN",
      landmark: "Near Goubert Market Commercial Complex",
      timings: "24 Hours (Round the Clock)",
      managedBy: "Traffic Police Enforcement Wing"
    },
    {
      id: "PK-4",
      name: "Mission Street Parking",
      location: "Mission Street, Opposite Immaculate Conception Cathedral, Puducherry - 605001",
      totalSpaces: 60,
      availableSpaces: 0,
      twoWheelerPrice: 20,
      fourWheelerPrice: 40,
      price: 20,
      status: "OPEN",
      landmark: "Near Cathedral School Crossing",
      timings: "08:00 AM - 10:30 PM",
      managedBy: "Puducherry Municipality"
    },
    {
      id: "PK-5",
      name: "Muthialpet Parking",
      location: "Mahatma Gandhi Road North, Muthialpet Clock Tower Junction, Puducherry - 605003",
      totalSpaces: 70,
      availableSpaces: 22,
      twoWheelerPrice: 15,
      fourWheelerPrice: 30,
      price: 15,
      status: "OPEN",
      landmark: "Near Muthialpet Police Station",
      timings: "07:00 AM - 10:00 PM",
      managedBy: "Traffic Police Sub-Division"
    },
    {
      id: "PK-6",
      name: "Lawspet Main Road Parking",
      location: "Airport Road, Lawspet, Puducherry - 605008",
      totalSpaces: 40,
      availableSpaces: 6,
      twoWheelerPrice: 15,
      fourWheelerPrice: 30,
      price: 15,
      status: "OPEN",
      landmark: "Near Lawspet Post Office & Stadium",
      timings: "06:30 AM - 09:30 PM",
      managedBy: "Puducherry Smart City"
    }
  ],
  reports: [
    {
      id: "PS-001",
      type: "Illegal Parking",
      location: "Mission Street, near Calve College",
      vehicleNumber: "PY-01-AB-1234",
      description: "Black SUV parked directly on the pedestrian walkway, obstructing elderly pedestrians.",
      date: "2026-10-08",
      time: "10:30",
      photo: "",
      status: "Under Review"
    },
    {
      id: "PS-002",
      type: "Double Parking",
      location: "Bussy Street Corner, White Town",
      vehicleNumber: "PY-01-CD-5678",
      description: "Two commercial vans parked side-by-side causing heavy traffic bottleneck for 25 minutes.",
      date: "2026-10-09",
      time: "11:15",
      photo: "",
      status: "Resolved"
    },
    {
      id: "PS-003",
      type: "Road Obstruction",
      location: "Goubert Avenue, Promenade Beach",
      vehicleNumber: "TN-32-EF-9012",
      description: "Delivery truck parked blocking access road to Rock Beach promenade.",
      date: "2026-10-10",
      time: "16:45",
      photo: "",
      status: "Submitted"
    },
    {
      id: "PS-004",
      type: "No Parking",
      location: "Rangapillai Street, Heritage Town",
      vehicleNumber: "PY-01-GH-3456",
      description: "Sedan left in clearly marked Yellow No-Parking Zone near municipal hospital.",
      date: "2026-10-11",
      time: "09:20",
      photo: "",
      status: "Rejected"
    }
  ],
  traffic: [
    { area: "White Town", trafficLevel: "High", parkingAvailability: "Medium", reportsCount: 6 },
    { area: "Mission Street", trafficLevel: "Medium", parkingAvailability: "Low", reportsCount: 4 },
    { area: "MG Road", trafficLevel: "High", parkingAvailability: "Low", reportsCount: 8 },
    { area: "Heritage Town", trafficLevel: "Medium", parkingAvailability: "Medium", reportsCount: 3 },
    { area: "Lawspet", trafficLevel: "Low", parkingAvailability: "High", reportsCount: 1 },
    { area: "Beach Road", trafficLevel: "High", parkingAvailability: "Low", reportsCount: 5 }
  ],
  users: [
    { id: "USR-101", name: "Arun Kumar", email: "arun.k@smartpark.in", role: "Citizen", phone: "9876543210", joined: "2026-09-12" },
    { id: "USR-102", name: "Priya Sundaram", email: "priya.s@smartpark.in", role: "Citizen", phone: "9845123456", joined: "2026-09-20" },
    { id: "USR-103", name: "Inspector Vijay", email: "traffic.police@puducherry.gov.in", role: "Police", phone: "9443210987", joined: "2026-08-15" },
    { id: "USR-104", name: "Muthu Raman", email: "muthu.admin@puducherry.gov.in", role: "Admin", phone: "9487654321", joined: "2026-07-01" },
    { id: "USR-105", name: "Ananya Deshmukh", email: "ananya.d@gmail.com", role: "Citizen", phone: "9789012345", joined: "2026-10-02" }
  ],
  policeAccounts: [
    { id: "POL-101", name: "Inspector Vijay", email: "traffic.police@puducherry.gov.in", password: "police1234" },
    { id: "POL-102", name: "SI Ramesh Kumar", email: "ramesh.police@puducherry.gov.in", password: "police1234" }
  ],
  adminAccounts: [
    { id: "ADM-201", name: "Muthu Raman", email: "muthu.admin@puducherry.gov.in", password: "admin1234" },
    { id: "ADM-202", name: "Municipal Commissioner", email: "admin@puducherry.gov.in", password: "admin1234" }
  ],
  profile: {
    name: "",
    dob: "",
    email: "",
    phone: "",
    city: "Puducherry"
  }
};

// Ensure JSON database exists
function loadDatabase() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_DATABASE, null, 2));
      return JSON.parse(JSON.stringify(DEFAULT_DATABASE));
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return JSON.parse(JSON.stringify(DEFAULT_DATABASE));
  }
}

function saveDatabase(db) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error('Failed to write database:', err);
  }
}

// Background Dynamic Parking Fluctuation Engine (Runs every 1 hour)
const ONE_HOUR_MS = 60 * 60 * 1000;

function runHourlyServerUpdate() {
  const db = loadDatabase();
  if (db && db.parking && db.parking.length > 0) {
    db.parking.forEach(lot => {
      const maxShift = Math.max(2, Math.round(lot.totalSpaces * 0.15));
      const randomChange = Math.floor(Math.random() * (maxShift * 2 + 1)) - maxShift;
      let newAvailable = lot.availableSpaces + randomChange;
      lot.availableSpaces = Math.max(0, Math.min(lot.totalSpaces, newAvailable));
    });

    if (db.traffic && db.traffic.length > 0) {
      const levels = ["Low", "Medium", "High"];
      db.traffic.forEach(area => {
        if (Math.random() > 0.5) {
          area.parkingAvailability = levels[Math.floor(Math.random() * levels.length)];
        }
      });
    }

    saveDatabase(db);
    console.log(`[SmartPark Backend] Hourly parking availability updated across Puducherry at ${new Date().toLocaleTimeString()}`);
  }
}

setInterval(runHourlyServerUpdate, ONE_HOUR_MS);

// Helper to parse JSON request body
function parseRequestBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  const pathname = parsedUrl.pathname;

  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  // ==========================================
  // DYNAMIC BACKEND REST API ENDPOINTS
  // ==========================================

  // 1. GET /api/data (Full live sync)
  if (pathname === '/api/data' && req.method === 'GET') {
    return sendJSON(res, 200, loadDatabase());
  }

  // 2. GET /api/parking
  if (pathname === '/api/parking' && req.method === 'GET') {
    const db = loadDatabase();
    return sendJSON(res, 200, db.parking || []);
  }

  // 3. POST /api/parking (Add / Update)
  if (pathname === '/api/parking' && req.method === 'POST') {
    const body = await parseRequestBody(req);
    const db = loadDatabase();
    db.parking = db.parking || [];

    const existingIndex = db.parking.findIndex(p => p.id === body.id);
    if (existingIndex !== -1) {
      db.parking[existingIndex] = { ...db.parking[existingIndex], ...body };
    } else {
      const newId = body.id || `PK-${db.parking.length + 1}`;
      db.parking.push({ ...body, id: newId });
    }
    saveDatabase(db);
    return sendJSON(res, 200, { success: true, parking: db.parking });
  }

  // 4. DELETE /api/parking/:id
  if (pathname.startsWith('/api/parking/') && req.method === 'DELETE') {
    const lotId = pathname.split('/').pop();
    const db = loadDatabase();
    db.parking = (db.parking || []).filter(p => p.id !== lotId);
    saveDatabase(db);
    return sendJSON(res, 200, { success: true, parking: db.parking });
  }

  // 5. GET /api/reports
  if (pathname === '/api/reports' && req.method === 'GET') {
    const db = loadDatabase();
    return sendJSON(res, 200, db.reports || []);
  }

  // 6. POST /api/reports (Submit new violation report)
  if (pathname === '/api/reports' && req.method === 'POST') {
    const body = await parseRequestBody(req);
    const db = loadDatabase();
    db.reports = db.reports || [];

    const newId = body.id || `PS-${String(db.reports.length + 1).padStart(3, '0')}`;
    const reportItem = {
      ...body,
      id: newId,
      status: body.status || 'Submitted',
      date: body.date || new Date().toISOString().split('T')[0],
      time: body.time || new Date().toTimeString().slice(0, 5)
    };
    db.reports.unshift(reportItem);
    saveDatabase(db);
    return sendJSON(res, 201, { success: true, report: reportItem, reports: db.reports });
  }

  // 7. PUT /api/reports/status (Update status: Verified, Resolved, etc.)
  if (pathname === '/api/reports/status' && req.method === 'PUT') {
    const body = await parseRequestBody(req);
    const db = loadDatabase();
    const report = (db.reports || []).find(r => r.id === body.id);
    if (report) {
      report.status = body.status;
      saveDatabase(db);
      return sendJSON(res, 200, { success: true, report });
    }
    return sendJSON(res, 404, { error: 'Report not found' });
  }

  // 8. DELETE /api/reports/:id
  if (pathname.startsWith('/api/reports/') && req.method === 'DELETE') {
    const repId = pathname.split('/').pop();
    const db = loadDatabase();
    db.reports = (db.reports || []).filter(r => r.id !== repId);
    saveDatabase(db);
    return sendJSON(res, 200, { success: true, reports: db.reports });
  }

  // 9. GET & POST /api/traffic
  if (pathname === '/api/traffic' && req.method === 'GET') {
    const db = loadDatabase();
    return sendJSON(res, 200, db.traffic || []);
  }
  if (pathname === '/api/traffic' && req.method === 'POST') {
    const body = await parseRequestBody(req);
    const db = loadDatabase();
    db.traffic = body;
    saveDatabase(db);
    return sendJSON(res, 200, { success: true, traffic: db.traffic });
  }

  // 10. GET, POST, DELETE /api/users
  if (pathname === '/api/users' && req.method === 'GET') {
    const db = loadDatabase();
    return sendJSON(res, 200, db.users || []);
  }
  if (pathname === '/api/users' && req.method === 'POST') {
    const body = await parseRequestBody(req);
    const db = loadDatabase();
    db.users = db.users || [];
    const idx = db.users.findIndex(u => u.id === body.id);
    if (idx !== -1) {
      db.users[idx] = { ...db.users[idx], ...body };
    } else {
      const newId = body.id || `USR-${Math.floor(100 + Math.random() * 900)}`;
      db.users.push({ ...body, id: newId });
    }
    saveDatabase(db);
    return sendJSON(res, 200, { success: true, users: db.users });
  }
  if (pathname.startsWith('/api/users/') && req.method === 'DELETE') {
    const uId = pathname.split('/').pop();
    const db = loadDatabase();
    db.users = (db.users || []).filter(u => u.id !== uId);
    saveDatabase(db);
    return sendJSON(res, 200, { success: true, users: db.users });
  }

  // 11. POST /api/reset (Database Reset)
  if (pathname === '/api/reset' && req.method === 'POST') {
    const freshDb = JSON.parse(JSON.stringify(DEFAULT_DATABASE));
    saveDatabase(freshDb);
    return sendJSON(res, 200, { success: true, database: freshDb });
  }

  // 12. GET & POST /api/profile
  if (pathname === '/api/profile' && req.method === 'GET') {
    const db = loadDatabase();
    return sendJSON(res, 200, db.profile || {});
  }
  if (pathname === '/api/profile' && req.method === 'POST') {
    const body = await parseRequestBody(req);
    const db = loadDatabase();
    db.profile = { ...db.profile, ...body };
    saveDatabase(db);
    return sendJSON(res, 200, { success: true, profile: db.profile });
  }

  // ==========================================
  // STATIC FILE SERVING WITH FALLBACK
  // ==========================================
  let reqPath = pathname === '/' ? '/index.html' : pathname;
  let filePath = path.join(__dirname, reqPath);

  let ext = path.extname(filePath).toLowerCase();
  let contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  SmartPark Puducherry - Dynamic Full-Stack Server Running`);
  console.log(`  URL: http://localhost:${PORT}/`);
  console.log(`  Dynamic REST APIs: /api/parking, /api/reports, /api/users, /api/traffic`);
  console.log(`  Simulated Real-Time IoT Telemetry Stream: ACTIVE (5s)`);
  console.log(`=======================================================`);
});
