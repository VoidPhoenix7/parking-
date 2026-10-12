/* =========================================================
   SmartPark Puducherry - JavaScript (app.js)
   LocalStorage Database Management:
   - "ParkingData"  -> Parking lots & spots
   - "reports"      -> Citizen violation reports
   - "Current User" -> Logged in role: 'citizen', 'police', 'admin'
   ========================================================= */

// LocalStorage Keys
const PARKING_STORAGE_KEY = "ParkingData";
const PARKING_LAST_UPDATED_KEY = "ParkingLastUpdatedTimestamp"; // 1-Hour dynamic interval tracker
const REPORTS_STORAGE_KEY = "reports";
const USER_STORAGE_KEY = "Current User"; // As requested by user
const PROFILE_STORAGE_KEY = "UserProfileData"; // User profile details
const TRAFFIC_STORAGE_KEY = "TrafficData"; // Traffic Monitoring Area Data
const USERS_STORAGE_KEY = "UsersData"; // Admin users management
const POLICE_ACCOUNTS_KEY = "PoliceAccountsData"; // Police IDs & Credentials
const ADMIN_ACCOUNTS_KEY = "AdminAccountsData"; // Admin IDs & Credentials

// Default Sample Official Accounts (stored in LocalStorage)
const DEFAULT_POLICE_ACCOUNTS = [
  { id: "POL-101", name: "Inspector Vijay", email: "traffic.police@puducherry.gov.in", password: "police1234" },
  { id: "POL-102", name: "SI Ramesh Kumar", email: "ramesh.police@puducherry.gov.in", password: "police1234" }
];

const DEFAULT_ADMIN_ACCOUNTS = [
  { id: "ADM-201", name: "Muthu Raman", email: "muthu.admin@puducherry.gov.in", password: "admin1234" },
  { id: "ADM-202", name: "Municipal Commissioner", email: "admin@puducherry.gov.in", password: "admin1234" }
];

// Demo Registered Users for Hackathon Admin Dashboard
const SAMPLE_USERS_LIST = [
  { id: "USR-101", name: "Arun Kumar", email: "arun.k@smartpark.in", role: "Citizen", phone: "9876543210", joined: "2026-09-12" },
  { id: "USR-102", name: "Priya Sundaram", email: "priya.s@smartpark.in", role: "Citizen", phone: "9845123456", joined: "2026-09-20" },
  { id: "USR-103", name: "Inspector Vijay", email: "traffic.police@puducherry.gov.in", role: "Police", phone: "9443210987", joined: "2026-08-15" },
  { id: "USR-104", name: "Muthu Raman", email: "muthu.admin@puducherry.gov.in", role: "Admin", phone: "9487654321", joined: "2026-07-01" },
  { id: "USR-105", name: "Ananya Deshmukh", email: "ananya.d@gmail.com", role: "Citizen", phone: "9789012345", joined: "2026-10-02" }
];

// Initial Sample Traffic Monitoring Data
const SAMPLE_TRAFFIC_AREAS = [
  { area: "White Town", trafficLevel: "High", parkingAvailability: "Medium", reportsCount: 6 },
  { area: "Mission Street", trafficLevel: "Medium", parkingAvailability: "Low", reportsCount: 4 },
  { area: "MG Road", trafficLevel: "High", parkingAvailability: "Low", reportsCount: 8 },
  { area: "Heritage Town", trafficLevel: "Medium", parkingAvailability: "Medium", reportsCount: 3 },
  { area: "Lawspet", trafficLevel: "Low", parkingAvailability: "High", reportsCount: 1 },
  { area: "Beach Road", trafficLevel: "High", parkingAvailability: "Low", reportsCount: 5 }
];

// Default Profile Details (Empty so user fills manually)
const DEFAULT_USER_PROFILE = {
  name: "",
  dob: "",
  email: "",
  phone: "",
  city: "Puducherry"
};


// Initial Sample Parking Data List for Puducherry
const SAMPLE_PARKING_LIST = [
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
    totalSpaces: 40,
    availableSpaces: 22,
    twoWheelerPrice: 15,
    fourWheelerPrice: 30,
    price: 15,
    status: "OPEN",
    landmark: "Near Sengunthar Public Hall",
    timings: "06:00 AM - 09:30 PM",
    managedBy: "Muthialpet Police Station Traffic Division"
  },
  {
    id: "PK-6",
    name: "Lawspet Parking",
    location: "Lawspet Main Road, Near Puducherry Airport Junction, Lawspet, Puducherry - 605008",
    totalSpaces: 50,
    availableSpaces: 6,
    twoWheelerPrice: 15,
    fourWheelerPrice: 30,
    price: 15,
    status: "OPEN",
    landmark: "Opposite Rajiv Gandhi Indoor Stadium",
    timings: "07:00 AM - 10:00 PM",
    managedBy: "Lawspet Traffic Regulatory Unit"
  }
];

// Initial Seed Reports for Puducherry
const SAMPLE_INITIAL_REPORTS = [
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
];

/* =========================================================
   1. LOCALSTORAGE & DYNAMIC REST API SYNC
   - Bi-directional sync with Node.js dynamic backend
   - Real-time persistence to database.json
   - Resilient fallback to LocalStorage if offline
   ========================================================= */
const API_BASE = window.location.origin;

async function syncWithDynamicBackend() {
  try {
    const res = await fetch(`${API_BASE}/api/data`);
    if (res.ok) {
      const data = await res.json();
      if (data.parking && data.parking.length > 0) {
        localStorage.setItem(PARKING_STORAGE_KEY, JSON.stringify(data.parking));
      }
      if (data.reports && data.reports.length > 0) {
        localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(data.reports));
      }
      if (data.traffic && data.traffic.length > 0) {
        localStorage.setItem(TRAFFIC_STORAGE_KEY, JSON.stringify(data.traffic));
      }
      if (data.users && data.users.length > 0) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(data.users));
      }
      if (data.profile) {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data.profile));
      }
      return true;
    }
  } catch (err) {
    // Running statically or offline, fallback to LocalStorage seamlessly
  }
  return false;
}

function initLocalStorage() {
  if (!localStorage.getItem(PARKING_STORAGE_KEY)) {
    localStorage.setItem(PARKING_STORAGE_KEY, JSON.stringify(SAMPLE_PARKING_LIST));
  }

  if (!localStorage.getItem(REPORTS_STORAGE_KEY)) {
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(SAMPLE_INITIAL_REPORTS));
  }

  if (!localStorage.getItem(POLICE_ACCOUNTS_KEY)) {
    localStorage.setItem(POLICE_ACCOUNTS_KEY, JSON.stringify(DEFAULT_POLICE_ACCOUNTS));
  }

  if (!localStorage.getItem(ADMIN_ACCOUNTS_KEY)) {
    localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify(DEFAULT_ADMIN_ACCOUNTS));
  }

  // Background sync from server
  syncWithDynamicBackend();
}

function getReports() {
  const data = localStorage.getItem(REPORTS_STORAGE_KEY);
  try {
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveReports(reportsList) {
  localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reportsList));
  // Async sync to server
  try {
    fetch(`${API_BASE}/api/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportsList[0] || {})
    }).catch(() => {});
  } catch (e) {}
}

function getParkingData() {
  const data = localStorage.getItem(PARKING_STORAGE_KEY);
  try {
    return data ? JSON.parse(data) : SAMPLE_PARKING_LIST;
  } catch (e) {
    return SAMPLE_PARKING_LIST;
  }
}

function saveParkingData(parkingList) {
  localStorage.setItem(PARKING_STORAGE_KEY, JSON.stringify(parkingList));
}


/* =========================================================
   USER PROFILE MANAGEMENT (LocalStorage)
   ========================================================= */
function initUserProfile() {
  // Only initialize if not already set, using empty fields
  if (!localStorage.getItem(PROFILE_STORAGE_KEY)) {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_USER_PROFILE));
  }
}

function getUserProfile() {
  const data = localStorage.getItem(PROFILE_STORAGE_KEY);
  try {
    return data ? JSON.parse(data) : DEFAULT_USER_PROFILE;
  } catch (e) {
    return DEFAULT_USER_PROFILE;
  }
}

function saveUserProfile(event) {
  if (event) event.preventDefault();

  const name = document.getElementById("inputProfileName").value.trim();
  const dob = document.getElementById("inputProfileDob").value.trim();
  const email = document.getElementById("inputProfileEmail").value.trim();
  const phone = document.getElementById("inputProfilePhone").value.trim();

  // Save the profile entered by the user
  const profile = {
    name: name,
    dob: dob,
    email: email || "citizen@smartpark.in",
    phone: phone,
    city: "Puducherry"
  };

  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));

  // Update UI Displays
  renderProfilePage();

  // Show Success Alert
  const alertBox = document.getElementById("saveSuccessAlert");
  if (alertBox) {
    alertBox.classList.remove("hidden");
    setTimeout(() => {
      alertBox.classList.add("hidden");
    }, 3500);
  }
}

function renderProfilePage() {
  const profileNameDisplay = document.getElementById("profileNameDisplay");
  if (!profileNameDisplay) return; // Not on profile.html

  const role = getCurrentUserRole();
  const authPrompt = document.getElementById("profileAuthPrompt");
  const contentGrid = document.getElementById("profileContentGrid");

  // If user is not logged in, display 'Please login to access' prompt
  if (!role) {
    if (authPrompt) authPrompt.classList.remove("hidden");
    if (contentGrid) contentGrid.classList.add("hidden");
    return;
  }

  // If user is logged in, show the profile grid
  if (authPrompt) authPrompt.classList.add("hidden");
  if (contentGrid) contentGrid.classList.remove("hidden");

  const profile = getUserProfile();

  const profileEmailDisplay = document.getElementById("profileEmailDisplay");
  const profileDobDisplay = document.getElementById("profileDobDisplay");
  const profileRoleBadge = document.getElementById("profileRoleBadge");
  const avatarDisplay = document.getElementById("avatarDisplay");

  const inputName = document.getElementById("inputProfileName");
  const inputDob = document.getElementById("inputProfileDob");
  const inputEmail = document.getElementById("inputProfileEmail");
  const inputPhone = document.getElementById("inputProfilePhone");

  let formattedDob = profile.dob;
  if (profile.dob) {
    const parts = profile.dob.split("-");
    if (parts.length === 3) {
      const d = new Date(parts[0], parseInt(parts[1], 10) - 1, parts[2]);
      formattedDob = d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
    }
  }

  profileNameDisplay.textContent = profile.name || "Citizen (Not Set)";
  if (profileEmailDisplay) profileEmailDisplay.textContent = profile.email || "citizen@smartpark.in";
  if (profileDobDisplay) profileDobDisplay.textContent = formattedDob || "Not specified";

  if (profileRoleBadge) {
    if (role === "police") {
      profileRoleBadge.textContent = "Police Officer";
      profileRoleBadge.style.backgroundColor = "#d97706";
      if (avatarDisplay) avatarDisplay.textContent = "👮‍♂️";
    } else if (role === "admin") {
      profileRoleBadge.textContent = "System Admin";
      profileRoleBadge.style.backgroundColor = "#dc2626";
      if (avatarDisplay) avatarDisplay.textContent = "⚙️";
    } else {
      profileRoleBadge.textContent = "Citizen";
      profileRoleBadge.style.backgroundColor = "#0066cc";
      if (avatarDisplay) avatarDisplay.textContent = "👤";
    }
  }

  if (inputName) inputName.value = profile.name;
  if (inputDob) inputDob.value = profile.dob;
  if (inputEmail) inputEmail.value = profile.email;
  if (inputPhone) inputPhone.value = profile.phone;
}

/* =========================================================
   2. AUTHENTICATION & ROLE MANAGEMENT ("Current User")
   Roles: 'citizen', 'police', 'admin'
   ========================================================= */
function getCurrentUserRole() {
  return localStorage.getItem(USER_STORAGE_KEY);
}

function setCurrentUserRole(role) {
  localStorage.setItem(USER_STORAGE_KEY, role);
}

/**
 * Citizen Login handler from Quick Login buttons
 */
function loginAsRole(role) {
  if (role === 'police' || role === 'admin') {
    openStaffLoginModal(role);
    return;
  }
  setCurrentUserRole('citizen');
  window.location.href = "profile.html";
}

/**
 * Standard Citizen form login
 */
function handleDefaultLogin(event) {
  if (event) event.preventDefault();
  const emailInput = document.getElementById("loginEmail");
  const email = emailInput ? emailInput.value.toLowerCase().trim() : "";

  // If user entered police or admin email in citizen form, prompt official modal
  if (email.includes("police")) {
    openStaffLoginModal("police");
    return;
  } else if (email.includes("admin")) {
    openStaffLoginModal("admin");
    return;
  }

  // Otherwise login as citizen
  setCurrentUserRole("citizen");
  window.location.href = "profile.html";
}

/**
 * Get Official Accounts from LocalStorage
 */
function getStaffAccounts(role) {
  const key = role === 'admin' ? ADMIN_ACCOUNTS_KEY : POLICE_ACCOUNTS_KEY;
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return role === 'admin' ? DEFAULT_ADMIN_ACCOUNTS : DEFAULT_POLICE_ACCOUNTS;
    }
  }
  const fallback = role === 'admin' ? DEFAULT_ADMIN_ACCOUNTS : DEFAULT_POLICE_ACCOUNTS;
  localStorage.setItem(key, JSON.stringify(fallback));
  return fallback;
}

function saveStaffAccounts(role, accounts) {
  const key = role === 'admin' ? ADMIN_ACCOUNTS_KEY : POLICE_ACCOUNTS_KEY;
  localStorage.setItem(key, JSON.stringify(accounts));
}

/**
 * Official Login Modal Controls
 */
let currentModalRole = "police";

function openStaffLoginModal(role) {
  currentModalRole = role || "police";
  const modal = document.getElementById("staffAuthModal");
  if (!modal) {
    // If not on login.html, redirect to login page
    window.location.href = "login.html";
    return;
  }

  const roleTarget = document.getElementById("staffRoleTarget");
  if (roleTarget) roleTarget.value = currentModalRole;

  const titleElem = document.getElementById("staffModalTitle");
  const badgeElem = document.getElementById("staffModalBadge");

  if (currentModalRole === 'admin') {
    if (titleElem) titleElem.textContent = "Admin Login";
    if (badgeElem) badgeElem.textContent = "Administrative Control Access";
  } else {
    if (titleElem) titleElem.textContent = "Traffic Police Login";
    if (badgeElem) badgeElem.textContent = "Law Enforcement Access";
  }

  // Clear previous errors and reset inputs
  const errElem = document.getElementById("staffLoginError");
  if (errElem) {
    errElem.textContent = "";
    errElem.classList.remove("visible");
  }

  switchToStaffLoginView();
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

/**
 * Toggle Password Visibility (Eye symbol in corner)
 */
function togglePasswordVisibility(inputId, buttonElem) {
  const input = document.getElementById(inputId);
  if (!input) return;

  if (input.type === "password") {
    input.type = "text";
    if (buttonElem) {
      buttonElem.textContent = "🙈"; // Eye closed / crossed
      buttonElem.title = "Hide password";
    }
  } else {
    input.type = "password";
    if (buttonElem) {
      buttonElem.textContent = "👁️"; // Eye open
      buttonElem.title = "Show password";
    }
  }
}

function closeStaffAuthModal() {
  const modal = document.getElementById("staffAuthModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

function switchToStaffLoginView() {
  const loginView = document.getElementById("staffLoginView");
  const registerView = document.getElementById("staffRegisterView");
  if (loginView) loginView.classList.remove("hidden");
  if (registerView) registerView.classList.add("hidden");
}

function switchToStaffRegisterView() {
  const loginView = document.getElementById("staffLoginView");
  const registerView = document.getElementById("staffRegisterView");
  if (loginView) loginView.classList.add("hidden");
  if (registerView) registerView.classList.remove("hidden");

  const regErr = document.getElementById("staffRegError");
  if (regErr) {
    regErr.textContent = "";
    regErr.classList.remove("visible");
  }
}

/**
 * Handle Official Login Submission with strict credentials verification
 */
function handleStaffLoginSubmit(event) {
  if (event) event.preventDefault();
  const role = currentModalRole || "police";

  const idInput = document.getElementById("staffLoginId");
  const emailInput = document.getElementById("staffLoginEmail");
  const passInput = document.getElementById("staffLoginPassword");
  const errElem = document.getElementById("staffLoginError");

  const idVal = idInput ? idInput.value.trim() : "";
  const emailVal = emailInput ? emailInput.value.trim().toLowerCase() : "";
  const passVal = passInput ? passInput.value : "";

  if (!idVal || !emailVal || !passVal) {
    if (errElem) {
      errElem.textContent = "Please fill in all fields (ID, Email, and Password).";
      errElem.classList.add("visible");
    }
    return;
  }

  const accounts = getStaffAccounts(role);

  // Match ID, Email, and Password
  const matched = accounts.find(acc => 
    acc.id.toLowerCase() === idVal.toLowerCase() &&
    acc.email.toLowerCase() === emailVal &&
    acc.password === passVal
  );

  if (!matched) {
    if (errElem) {
      errElem.textContent = "Invalid Official ID, Email, or Password. If you don't have an ID, please click 'Create New ID & Account' below.";
      errElem.classList.add("visible");
    }
    return;
  }

  // Successful Login
  setCurrentUserRole(role);
  closeStaffAuthModal();

  if (role === 'admin') {
    window.location.href = "admin-dashboard.html";
  } else {
    window.location.href = "police-dashboard.html";
  }
}

/**
 * Handle Official Account Registration (stores new ID in LocalStorage)
 */
function handleStaffRegisterSubmit(event) {
  if (event) event.preventDefault();
  const role = currentModalRole || "police";

  const idInput = document.getElementById("staffRegId");
  const nameInput = document.getElementById("staffRegName");
  const emailInput = document.getElementById("staffRegEmail");
  const passInput = document.getElementById("staffRegPassword");
  const errElem = document.getElementById("staffRegError");

  const idVal = idInput ? idInput.value.trim().toUpperCase() : "";
  const nameVal = nameInput ? nameInput.value.trim() : "";
  const emailVal = emailInput ? emailInput.value.trim().toLowerCase() : "";
  const passVal = passInput ? passInput.value : "";

  if (!idVal || !nameVal || !emailVal || !passVal) {
    if (errElem) {
      errElem.textContent = "All fields are required to register an official account.";
      errElem.classList.add("visible");
    }
    return;
  }

  const accounts = getStaffAccounts(role);

  // Check if ID already exists
  if (accounts.some(acc => acc.id.toUpperCase() === idVal)) {
    if (errElem) {
      errElem.textContent = `Official ID "${idVal}" already exists! Please choose another ID or sign in.`;
      errElem.classList.add("visible");
    }
    return;
  }

  // Create new account
  const newAccount = {
    id: idVal,
    name: nameVal,
    email: emailVal,
    password: passVal
  };

  accounts.push(newAccount);
  saveStaffAccounts(role, accounts);

  // Also sync to Admin UsersData so they appear in admin table
  const allUsers = getUsersData();
  const roleLabel = role === 'admin' ? 'Admin' : 'Police';
  allUsers.push({
    id: idVal,
    name: nameVal,
    email: emailVal,
    role: roleLabel,
    phone: "9845000000",
    joined: new Date().toISOString().split("T")[0]
  });
  saveUsersData(allUsers);

  alert(`Account successfully created for ${nameVal} (ID: ${idVal})! Logging in now...`);
  setCurrentUserRole(role);
  closeStaffAuthModal();

  if (role === 'admin') {
    window.location.href = "admin-dashboard.html";
  } else {
    window.location.href = "police-dashboard.html";
  }
}

/**
 * Logout User: Remove 'Current User' from LocalStorage & return to Home (index.html)
 */
function logoutUser() {
  localStorage.removeItem(USER_STORAGE_KEY);
  alert("You have been logged out successfully.");
  window.location.href = "index.html"; // Returns directly to home page as requested
}

/**
 * Update Navbar display according to login state
 */
function syncNavbarLoginStatus() {
  const role = getCurrentUserRole();
  const navLinks = document.getElementById("navLinks");
  if (!navLinks) return;

  const loginLink = navLinks.querySelector(".nav-btn-login");
  const navLogoutBtn = navLinks.querySelector(".btn-logout");

  if (role) {
    if (loginLink) {
      loginLink.textContent = "👤 My Profile";
      loginLink.href = "profile.html";
    }
    if (navLogoutBtn) {
      navLogoutBtn.style.display = "inline-flex";
    }
  } else {
    if (loginLink) {
      loginLink.textContent = "Login";
      loginLink.href = "login.html";
    }
    if (navLogoutBtn) {
      navLogoutBtn.style.display = "none";
    }
  }
}

/* =========================================================
   3. POLICE DASHBOARD LOGIC
   - View citizen reports table
   - Inspect details and photos
   - Change report status directly in LocalStorage
   ========================================================= */
function renderPoliceReports() {
  const tbody = document.getElementById("policeReportsTbody");
  const cardsContainer = document.getElementById("policeReportsCards");
  if (!tbody && !cardsContainer) return; // Not on police-dashboard.html

  const filterSelect = document.getElementById("policeStatusFilter");
  const currentFilter = filterSelect ? filterSelect.value : "all";

  const allReports = getReports();

  // Four Statistics requested:
  // 1. Total Reports
  // 2. Pending Reports (Submitted or Under Review)
  // 3. Verified Reports
  // 4. Resolved Reports
  const totalElem = document.getElementById("dashTotalReports");
  const pendingElem = document.getElementById("dashPendingReports");
  const verifiedElem = document.getElementById("dashVerifiedReports");
  const resolvedElem = document.getElementById("dashResolvedReports");

  if (totalElem) totalElem.textContent = allReports.length;
  if (pendingElem) pendingElem.textContent = allReports.filter(r => r.status === "Submitted" || r.status === "Under Review").length;
  if (verifiedElem) verifiedElem.textContent = allReports.filter(r => r.status === "Verified").length;
  if (resolvedElem) resolvedElem.textContent = allReports.filter(r => r.status === "Resolved").length;

  // Filter Reports List
  const filtered = allReports.filter(r => {
    return (currentFilter === "all") || (r.status === currentFilter);
  });

  const emptyHtml = `<div style="text-align:center; padding: 30px; color:#64748b; font-weight:600;">No reports found for this filter.</div>`;

  // 1. Populate Desktop Table
  if (tbody) {
    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 30px; color:#64748b;">No reports found for this filter.</td></tr>`;
    } else {
      tbody.innerHTML = filtered.map(r => {
        const statusCfg = getStatusBadgeConfig(r.status);
        const formattedDate = formatReportDate(r.date);
        return `
          <tr>
            <td><strong>${r.id}</strong></td>
            <td>${r.type}</td>
            <td>📍 ${r.location}</td>
            <td><code>${r.vehicleNumber || 'N/A'}</code></td>
            <td>${formattedDate}</td>
            <td>
              <span class="status-badge ${statusCfg.badgeClass}">
                ${statusCfg.text}
              </span>
            </td>
            <td>
              <button class="btn btn-sm btn-police-view" onclick="openReportDetailsModal('${r.id}')">
                View
              </button>
            </td>
          </tr>
        `;
      }).join("");
    }
  }

  // 2. Populate Mobile Cards
  if (cardsContainer) {
    if (filtered.length === 0) {
      cardsContainer.innerHTML = emptyHtml;
    } else {
      cardsContainer.innerHTML = filtered.map(r => {
        const statusCfg = getStatusBadgeConfig(r.status);
        const formattedDate = formatReportDate(r.date);
        return `
          <div class="police-report-card">
            <div class="police-card-header">
              <span class="police-card-id">${r.id}</span>
              <span class="status-badge ${statusCfg.badgeClass}">
                ${statusCfg.text}
              </span>
            </div>
            <div class="police-card-body">
              <div class="police-card-row">
                <span class="card-label">Problem:</span>
                <span class="card-val"><strong>${r.type}</strong></span>
              </div>
              <div class="police-card-row">
                <span class="card-label">Location:</span>
                <span class="card-val">📍 ${r.location}</span>
              </div>
              <div class="police-card-row">
                <span class="card-label">Vehicle:</span>
                <span class="card-val"><code>${r.vehicleNumber || 'N/A'}</code></span>
              </div>
              <div class="police-card-row">
                <span class="card-label">Date:</span>
                <span class="card-val">${formattedDate}</span>
              </div>
            </div>
            <div class="police-card-footer">
              <button class="btn btn-police-view" style="width: 100%;" onclick="openReportDetailsModal('${r.id}')">
                View
              </button>
            </div>
          </div>
        `;
      }).join("");
    }
  }
}

function changeReportStatusFromPolice(reportId, newStatus) {
  const reports = getReports();
  const report = reports.find(r => r.id === reportId);
  if (report) {
    report.status = newStatus;
    saveReports(reports);
    renderPoliceReports();
    renderPoliceAnalyticsCharts();
    renderMyReports(); // Keep synced
    console.log(`Updated report ${reportId} status to ${newStatus} in LocalStorage.`);
  }
}

/* =========================================================
   3.1 POLICE DASHBOARD ANALYTICS CHARTS (Chart.js)
   1. Reports by Problem Type
   2. Reports by Status
   3. Parking Availability
   ========================================================= */
let policeProblemChart = null;
let policeStatusChart = null;
let policeParkingChart = null;

function renderPoliceAnalyticsCharts() {
  const canvasProblem = document.getElementById("chartProblemType");
  const canvasStatus = document.getElementById("chartReportStatus");
  const canvasParking = document.getElementById("chartParkingAvailability");

  if (!canvasProblem || !canvasStatus || !canvasParking) return; // Not on police-dashboard.html
  if (typeof Chart === 'undefined') return; // Chart.js not loaded

  const reports = getReports();
  const parkingLots = getParkingData();

  // 1. Problem Types Counts
  const problemLabels = ["Illegal Parking", "No Parking", "Road Obstruction", "Traffic Congestion", "Other"];
  const problemCounts = {
    "Illegal Parking": 0,
    "No Parking": 0,
    "Road Obstruction": 0,
    "Traffic Congestion": 0,
    "Other": 0
  };

  if (reports.length > 0) {
    reports.forEach(r => {
      const type = r.type || "Other";
      if (problemCounts.hasOwnProperty(type)) {
        problemCounts[type]++;
      } else {
        problemCounts["Other"]++;
      }
    });
  } else {
    // Sample fallback data if no reports
    problemCounts["Illegal Parking"] = 4;
    problemCounts["No Parking"] = 3;
    problemCounts["Road Obstruction"] = 2;
    problemCounts["Traffic Congestion"] = 5;
    problemCounts["Other"] = 1;
  }

  // 2. Status Counts
  const statusLabels = ["Submitted", "Under Review", "Verified", "Resolved"];
  const statusCounts = {
    "Submitted": 0,
    "Under Review": 0,
    "Verified": 0,
    "Resolved": 0
  };

  if (reports.length > 0) {
    reports.forEach(r => {
      if (statusCounts.hasOwnProperty(r.status)) {
        statusCounts[r.status]++;
      }
    });
  } else {
    // Sample fallback data
    statusCounts["Submitted"] = 3;
    statusCounts["Under Review"] = 2;
    statusCounts["Verified"] = 4;
    statusCounts["Resolved"] = 6;
  }

  // 3. Parking Availability
  let availableSpaces = 0;
  let totalSpaces = 0;
  parkingLots.forEach(p => {
    totalSpaces += (p.totalSpaces || 0);
    availableSpaces += (p.availableSpaces || 0);
  });
  let occupiedSpaces = Math.max(0, totalSpaces - availableSpaces);
  if (totalSpaces === 0) {
    availableSpaces = 95;
    occupiedSpaces = 135;
  }

  // Destroy previous charts if re-rendering
  if (policeProblemChart) policeProblemChart.destroy();
  if (policeStatusChart) policeStatusChart.destroy();
  if (policeParkingChart) policeParkingChart.destroy();

  // Chart 1: Reports by Problem Type (Bar Chart)
  policeProblemChart = new Chart(canvasProblem, {
    type: 'bar',
    data: {
      labels: problemLabels,
      datasets: [{
        label: 'Number of Reports',
        data: problemLabels.map(l => problemCounts[l]),
        backgroundColor: ['#155EEF', '#F5C542', '#F79009', '#D92D20', '#667085'],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { precision: 0 }
        }
      }
    }
  });

  // Chart 2: Reports by Status (Doughnut Chart)
  policeStatusChart = new Chart(canvasStatus, {
    type: 'doughnut',
    data: {
      labels: statusLabels,
      datasets: [{
        data: statusLabels.map(s => statusCounts[s]),
        backgroundColor: ['#155EEF', '#F5C542', '#F79009', '#12B76A'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { boxWidth: 12, font: { size: 11 } }
        }
      }
    }
  });

  // Chart 3: Parking Availability (Pie Chart)
  policeParkingChart = new Chart(canvasParking, {
    type: 'pie',
    data: {
      labels: ['Available', 'Occupied'],
      datasets: [{
        data: [availableSpaces, occupiedSpaces],
        backgroundColor: ['#12B76A', '#D92D20'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { boxWidth: 12, font: { size: 11 } }
        }
      }
    }
  });
}

/* =========================================================
   3.2 TRAFFIC MONITORING PAGE LOGIC
   - Areas: White Town, Mission Street, MG Road, Heritage Town, Lawspet, Beach Road
   - Traffic Level: Low (Green), Medium (Yellow), High (Red)
   - Parking Availability: Low, Medium, High
   - Number of Reports
   - Traffic Overview: Total Reports, High Traffic Areas, Available Parking
   ========================================================= */
function getTrafficData() {
  const stored = localStorage.getItem(TRAFFIC_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return SAMPLE_TRAFFIC_AREAS;
    }
  }
  localStorage.setItem(TRAFFIC_STORAGE_KEY, JSON.stringify(SAMPLE_TRAFFIC_AREAS));
  return SAMPLE_TRAFFIC_AREAS;
}

function renderTrafficMonitoringPage() {
  const container = document.getElementById("trafficAreasGrid");
  const accessDeniedBox = document.getElementById("trafficAccessDenied");
  const mainContent = document.getElementById("trafficMainContent");
  if (!container && !accessDeniedBox) return; // Not on traffic-monitoring.html

  const role = getCurrentUserRole();
  const isAuthorized = role === "police" || role === "admin";

  // Enforce access control: only police and admin allowed
  if (!isAuthorized) {
    if (accessDeniedBox) accessDeniedBox.classList.remove("hidden");
    if (mainContent) mainContent.classList.add("hidden");
    return;
  }

  // If authorized, show main content and hide access denied banner
  if (accessDeniedBox) accessDeniedBox.classList.add("hidden");
  if (mainContent) mainContent.classList.remove("hidden");

  // Sync dashboard link and user badge for Police vs Admin
  const dashLink = document.getElementById("trafficNavDashboardLink");
  const roleBadge = document.getElementById("trafficRoleBadge");
  if (role === "admin") {
    if (dashLink) dashLink.href = "admin-dashboard.html";
    if (roleBadge) {
      roleBadge.textContent = "⚙️ Logged in as: System Admin";
      roleBadge.className = "user-role-badge badge-admin";
    }
  } else {
    if (dashLink) dashLink.href = "police-dashboard.html";
    if (roleBadge) {
      roleBadge.textContent = "👮 Logged in as: Police Officer";
      roleBadge.className = "user-role-badge badge-police";
    }
  }

  const trafficAreas = getTrafficData();
  const reports = getReports();
  const parkingLots = getParkingData();

  // Compute live overview numbers
  const totalReportsCount = reports.length || trafficAreas.reduce((sum, a) => sum + (a.reportsCount || 0), 0);
  const highTrafficCount = trafficAreas.filter(a => a.trafficLevel === "High").length;
  
  let totalAvailableSpaces = 0;
  parkingLots.forEach(p => {
    totalAvailableSpaces += (p.availableSpaces || 0);
  });
  if (totalAvailableSpaces === 0) totalAvailableSpaces = 95;

  const totalReportsElem = document.getElementById("overviewTotalReports");
  const highTrafficElem = document.getElementById("overviewHighTraffic");
  const availParkingElem = document.getElementById("overviewAvailableParking");

  if (totalReportsElem) totalReportsElem.textContent = totalReportsCount;
  if (highTrafficElem) highTrafficElem.textContent = highTrafficCount;
  if (availParkingElem) availParkingElem.textContent = totalAvailableSpaces;

  // Render Area Cards
  container.innerHTML = trafficAreas.map(area => {
    // Traffic Level Class: Green = Low, Yellow = Medium, Red = High
    let badgeClass = "traffic-level-low";
    let dotClass = "bar-low";
    let icon = "🟢";

    if (area.trafficLevel === "Medium") {
      badgeClass = "traffic-level-medium";
      dotClass = "bar-medium";
      icon = "🟡";
    } else if (area.trafficLevel === "High") {
      badgeClass = "traffic-level-high";
      dotClass = "bar-high";
      icon = "🔴";
    }

    return `
      <div class="traffic-area-card">
        <div class="traffic-card-header">
          <h3 class="traffic-area-name">📍 ${area.area}</h3>
          <span class="traffic-badge ${badgeClass}">
            ${icon} ${area.trafficLevel} Traffic
          </span>
        </div>

        <div class="traffic-indicator-bar ${dotClass}"></div>

        <div class="traffic-card-metrics">
          <div class="traffic-metric-item">
            <span class="traffic-metric-label">🚦 Traffic Level:</span>
            <span class="traffic-metric-value" style="font-weight: 800;">${area.trafficLevel}</span>
          </div>
          <div class="traffic-metric-item">
            <span class="traffic-metric-label">🅿️ Parking Availability:</span>
            <span class="traffic-metric-value">${area.parkingAvailability}</span>
          </div>
          <div class="traffic-metric-item">
            <span class="traffic-metric-label">⚠️ Active Reports:</span>
            <span class="traffic-metric-value" style="color: #0066cc;">${area.reportsCount} Complaints</span>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/* =========================================================
   4. ADMIN DASHBOARD LOGIC
   - Statistics: Total Users, Total Parking Locations, Total Reports, Resolved Reports
   - Sections: Manage Parking (Add, Edit, Delete), Manage Reports (View, Delete), Manage Users (Demo users)
   - Reset Demo Data: Confirmation -> Delete all LocalStorage -> Recreate sample data
   ========================================================= */
function getUsersData() {
  const data = localStorage.getItem(USERS_STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return SAMPLE_USERS_LIST;
    }
  }
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(SAMPLE_USERS_LIST));
  return SAMPLE_USERS_LIST;
}

function saveUsersData(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function renderAdminDashboard() {
  const lotsTbody = document.getElementById("adminParkingTbody");
  const reportsTbody = document.getElementById("adminReportsTbody");
  const usersTbody = document.getElementById("adminUsersTbody");
  if (!lotsTbody && !reportsTbody && !usersTbody) return; // Not on admin-dashboard.html

  const lots = getParkingData();
  const reports = getReports();
  const users = getUsersData();

  // 1. Four Overview Statistics:
  // - Total Users
  // - Total Parking Locations
  // - Total Reports
  // - Resolved Reports
  const totalUsersElem = document.getElementById("adminTotalUsers");
  const totalLotsElem = document.getElementById("adminTotalLots");
  const totalReportsElem = document.getElementById("adminTotalReports");
  const resolvedReportsElem = document.getElementById("adminResolvedReports");

  if (totalUsersElem) totalUsersElem.textContent = users.length;
  if (totalLotsElem) totalLotsElem.textContent = lots.length;
  if (totalReportsElem) totalReportsElem.textContent = reports.length;
  if (resolvedReportsElem) resolvedReportsElem.textContent = reports.filter(r => r.status === "Resolved").length;

  // 2. Manage Parking: Desktop Table & Mobile Cards
  const parkingCards = document.getElementById("adminParkingCards");
  if (lotsTbody) {
    if (lots.length === 0) {
      lotsTbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color:#64748b;">No parking lots found. Click "Add Parking" to create one.</td></tr>`;
    } else {
      lotsTbody.innerHTML = lots.map(lot => {
        return `
          <tr>
            <td><strong>${lot.id}</strong></td>
            <td><strong>${lot.name}</strong></td>
            <td>📍 ${lot.location}</td>
            <td>${lot.totalSpaces} slots</td>
            <td><strong style="color:#0066cc;">${lot.availableSpaces}</strong> available</td>
            <td><span class="status-badge badge-status-resolved">${lot.status || 'OPEN'}</span></td>
            <td>
              <div style="display: flex; gap: 6px;">
                <button class="btn btn-sm" style="background:#0066cc; color:#fff;" onclick="openEditParkingModal('${lot.id}')">✏️ Edit</button>
                <button class="btn btn-sm" style="background:#ef4444; color:#fff;" onclick="deleteParkingLocation('${lot.id}')">🗑️ Delete</button>
              </div>
            </td>
          </tr>
        `;
      }).join("");
    }
  }

  if (parkingCards) {
    if (lots.length === 0) {
      parkingCards.innerHTML = `<div style="text-align:center; padding: 20px; color:#64748b;">No parking locations available.</div>`;
    } else {
      parkingCards.innerHTML = lots.map(lot => {
        return `
          <div class="admin-item-card">
            <div class="admin-card-header">
              <strong>${lot.name} (${lot.id})</strong>
              <span class="status-badge badge-status-resolved">${lot.status || 'OPEN'}</span>
            </div>
            <div class="admin-card-body">
              <div>📍 ${lot.location}</div>
              <div><strong>Capacity:</strong> ${lot.totalSpaces} slots | <strong>Available:</strong> ${lot.availableSpaces}</div>
            </div>
            <div class="admin-card-actions">
              <button class="btn btn-sm" style="background:#0066cc; color:#fff;" onclick="openEditParkingModal('${lot.id}')">✏️ Edit</button>
              <button class="btn btn-sm" style="background:#ef4444; color:#fff;" onclick="deleteParkingLocation('${lot.id}')">🗑️ Delete</button>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // 3. Manage Reports: Desktop Table & Mobile Cards
  const reportsCards = document.getElementById("adminReportsCards");
  if (reportsTbody) {
    if (reports.length === 0) {
      reportsTbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color:#64748b;">No reports submitted yet.</td></tr>`;
    } else {
      reportsTbody.innerHTML = reports.map(r => {
        const statusCfg = getStatusBadgeConfig(r.status);
        const formattedDate = formatReportDate(r.date);
        return `
          <tr>
            <td><strong>${r.id}</strong></td>
            <td>${r.type}</td>
            <td>📍 ${r.location}</td>
            <td><code>${r.vehicleNumber || 'N/A'}</code></td>
            <td>${formattedDate}</td>
            <td><span class="status-badge ${statusCfg.badgeClass}">${statusCfg.text}</span></td>
            <td>
              <div style="display: flex; gap: 6px;">
                <button class="btn btn-sm btn-police-view" onclick="openReportDetailsModal('${r.id}')">View</button>
                <button class="btn btn-sm" style="background:#ef4444; color:#fff;" onclick="deleteAdminReport('${r.id}')">Delete</button>
              </div>
            </td>
          </tr>
        `;
      }).join("");
    }
  }

  if (reportsCards) {
    if (reports.length === 0) {
      reportsCards.innerHTML = `<div style="text-align:center; padding: 20px; color:#64748b;">No reports submitted yet.</div>`;
    } else {
      reportsCards.innerHTML = reports.map(r => {
        const statusCfg = getStatusBadgeConfig(r.status);
        const formattedDate = formatReportDate(r.date);
        return `
          <div class="admin-item-card">
            <div class="admin-card-header">
              <strong>${r.id}: ${r.type}</strong>
              <span class="status-badge ${statusCfg.badgeClass}">${statusCfg.text}</span>
            </div>
            <div class="admin-card-body">
              <div>📍 ${r.location}</div>
              <div><code>Vehicle: ${r.vehicleNumber || 'N/A'}</code> | Date: ${formattedDate}</div>
            </div>
            <div class="admin-card-actions">
              <button class="btn btn-sm btn-police-view" onclick="openReportDetailsModal('${r.id}')">View Details</button>
              <button class="btn btn-sm" style="background:#ef4444; color:#fff;" onclick="deleteAdminReport('${r.id}')">Delete</button>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // 4. Manage Users: Demo Users Table & Mobile Cards
  const usersCards = document.getElementById("adminUsersCards");
  if (usersTbody) {
    if (users.length === 0) {
      usersTbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px; color:#64748b;">No registered users found.</td></tr>`;
    } else {
      usersTbody.innerHTML = users.map(u => {
        let roleBadgeClass = "#e0f2fe";
        let roleTextColor = "#0369a1";
        if (u.role === "Police") {
          roleBadgeClass = "#fef3c7";
          roleTextColor = "#b45309";
        } else if (u.role === "Admin") {
          roleBadgeClass = "#fee2e2";
          roleTextColor = "#b91c1c";
        }

        return `
          <tr>
            <td><strong>${u.id}</strong></td>
            <td><strong>${u.name}</strong></td>
            <td>${u.email}</td>
            <td><span class="status-badge" style="background:${roleBadgeClass}; color:${roleTextColor};">${u.role}</span></td>
            <td>${u.phone || 'N/A'}</td>
            <td>${u.joined || 'N/A'}</td>
            <td>
              <div style="display: flex; gap: 6px;">
                <button class="btn btn-sm btn-police-view" onclick="openEditUserModal('${u.id}')">Edit</button>
                <button class="btn btn-sm" style="background:#ef4444; color:#fff;" onclick="deleteAdminUser('${u.id}')">Delete</button>
              </div>
            </td>
          </tr>
        `;
      }).join("");
    }
  }

  if (usersCards) {
    if (users.length === 0) {
      usersCards.innerHTML = `<div style="text-align:center; padding: 20px; color:#64748b;">No registered users found.</div>`;
    } else {
      usersCards.innerHTML = users.map(u => {
        let roleBadgeClass = "#e0f2fe";
        let roleTextColor = "#0369a1";
        if (u.role === "Police") {
          roleBadgeClass = "#fef3c7";
          roleTextColor = "#b45309";
        } else if (u.role === "Admin") {
          roleBadgeClass = "#fee2e2";
          roleTextColor = "#b91c1c";
        }

        return `
          <div class="admin-item-card">
            <div class="admin-card-header">
              <strong>${u.name} (${u.id})</strong>
              <span class="status-badge" style="background:${roleBadgeClass}; color:${roleTextColor};">${u.role}</span>
            </div>
            <div class="admin-card-body">
              <div>📧 ${u.email}</div>
              <div>📞 ${u.phone || 'N/A'} | Joined: ${u.joined || 'N/A'}</div>
            </div>
            <div class="admin-card-actions">
              <button class="btn btn-sm btn-police-view" onclick="openEditUserModal('${u.id}')">Edit User</button>
              <button class="btn btn-sm" style="background:#ef4444; color:#fff;" onclick="deleteAdminUser('${u.id}')">Delete</button>
            </div>
          </div>
        `;
      }).join("");
    }
  }
}

// Admin Users CRUD Actions (Add, Edit, Update, Delete)
function openAddUserModal() {
  document.getElementById("userModalTitle").textContent = "Add New User";
  document.getElementById("inputUserId").value = "";
  document.getElementById("inputUserName").value = "";
  document.getElementById("inputUserEmail").value = "";
  document.getElementById("inputUserRole").value = "Citizen";
  document.getElementById("inputUserPhone").value = "";
  document.getElementById("adminUserModal").classList.remove("hidden");
}

function openEditUserModal(userId) {
  const users = getUsersData();
  const user = users.find(u => u.id === userId);
  if (!user) return;

  document.getElementById("userModalTitle").textContent = "Update User Details";
  document.getElementById("inputUserId").value = user.id;
  document.getElementById("inputUserName").value = user.name;
  document.getElementById("inputUserEmail").value = user.email;
  document.getElementById("inputUserRole").value = user.role;
  document.getElementById("inputUserPhone").value = user.phone || "";
  document.getElementById("adminUserModal").classList.remove("hidden");
}

function closeAdminUserModal() {
  const modal = document.getElementById("adminUserModal");
  if (modal) modal.classList.add("hidden");
}

function saveAdminUserForm(event) {
  if (event) event.preventDefault();
  const idInput = document.getElementById("inputUserId").value.trim();
  const nameInput = document.getElementById("inputUserName").value.trim();
  const emailInput = document.getElementById("inputUserEmail").value.trim().toLowerCase();
  const roleInput = document.getElementById("inputUserRole").value;
  const phoneInput = document.getElementById("inputUserPhone").value.trim();

  if (!nameInput || !emailInput || !phoneInput) {
    alert("Please fill in all required user fields.");
    return;
  }

  const users = getUsersData();

  if (idInput) {
    // Update existing user
    const userIndex = users.findIndex(u => u.id === idInput);
    if (userIndex !== -1) {
      users[userIndex].name = nameInput;
      users[userIndex].email = emailInput;
      users[userIndex].role = roleInput;
      users[userIndex].phone = phoneInput;
      saveUsersData(users);

      // If user is Police or Admin, also update their credentials in official accounts
      if (roleInput === "Police") {
        const policeAccounts = getStaffAccounts("police");
        const idx = policeAccounts.findIndex(p => p.id === idInput || p.email === emailInput);
        if (idx !== -1) {
          policeAccounts[idx].name = nameInput;
          policeAccounts[idx].email = emailInput;
          saveStaffAccounts("police", policeAccounts);
        }
      } else if (roleInput === "Admin") {
        const adminAccounts = getStaffAccounts("admin");
        const idx = adminAccounts.findIndex(a => a.id === idInput || a.email === emailInput);
        if (idx !== -1) {
          adminAccounts[idx].name = nameInput;
          adminAccounts[idx].email = emailInput;
          saveStaffAccounts("admin", adminAccounts);
        }
      }

      alert(`User "${nameInput}" (${idInput}) updated successfully.`);
    }
  } else {
    // Add new user
    const newId = "USR-" + (Math.floor(100 + Math.random() * 900));
    const newUser = {
      id: newId,
      name: nameInput,
      email: emailInput,
      role: roleInput,
      phone: phoneInput,
      joined: new Date().toISOString().split("T")[0]
    };
    users.push(newUser);
    saveUsersData(users);

    // If new role is Police or Admin, also create credentials entry in LocalStorage
    if (roleInput === "Police") {
      const policeAccounts = getStaffAccounts("police");
      policeAccounts.push({
        id: newId,
        name: nameInput,
        email: emailInput,
        password: "police1234"
      });
      saveStaffAccounts("police", policeAccounts);
    } else if (roleInput === "Admin") {
      const adminAccounts = getStaffAccounts("admin");
      adminAccounts.push({
        id: newId,
        name: nameInput,
        email: emailInput,
        password: "admin1234"
      });
      saveStaffAccounts("admin", adminAccounts);
    }

    alert(`User "${nameInput}" (${newId}) added successfully.`);
  }

  closeAdminUserModal();
  renderAdminDashboard();
}

function deleteAdminUser(userId) {
  if (!confirm(`Are you sure you want to delete user ${userId}? This will remove the user permanently from LocalStorage.`)) {
    return;
  }

  let users = getUsersData();
  const deletedUser = users.find(u => u.id === userId);
  users = users.filter(u => u.id !== userId);
  saveUsersData(users);

  // If user was Police or Admin, remove their credentials as well
  if (deletedUser) {
    if (deletedUser.role === "Police") {
      let policeAccounts = getStaffAccounts("police");
      policeAccounts = policeAccounts.filter(p => p.id !== userId && p.email !== deletedUser.email);
      saveStaffAccounts("police", policeAccounts);
    } else if (deletedUser.role === "Admin") {
      let adminAccounts = getStaffAccounts("admin");
      adminAccounts = adminAccounts.filter(a => a.id !== userId && a.email !== deletedUser.email);
      saveStaffAccounts("admin", adminAccounts);
    }
  }

  alert(`User ${userId} deleted successfully.`);
  renderAdminDashboard();
}

// Admin Parking CRUD Actions
function openAddParkingModal() {
  document.getElementById("parkingModalTitle").textContent = "Add Parking Location";
  document.getElementById("inputParkingId").value = "";
  document.getElementById("inputParkingName").value = "";
  document.getElementById("inputParkingLocation").value = "";
  document.getElementById("inputParkingTotal").value = "";
  document.getElementById("inputParkingAvailable").value = "";
  document.getElementById("adminParkingModal").classList.remove("hidden");
}

function openEditParkingModal(parkingId) {
  const lots = getParkingData();
  const lot = lots.find(l => l.id === parkingId);
  if (!lot) return;

  document.getElementById("parkingModalTitle").textContent = "Edit Parking Location";
  document.getElementById("inputParkingId").value = lot.id;
  document.getElementById("inputParkingName").value = lot.name;
  document.getElementById("inputParkingLocation").value = lot.location;
  document.getElementById("inputParkingTotal").value = lot.totalSpaces;
  document.getElementById("inputParkingAvailable").value = lot.availableSpaces;
  document.getElementById("adminParkingModal").classList.remove("hidden");
}

function closeAdminParkingModal() {
  const modal = document.getElementById("adminParkingModal");
  if (modal) modal.classList.add("hidden");
}

function saveAdminParkingForm(event) {
  if (event) event.preventDefault();
  const idInput = document.getElementById("inputParkingId").value.trim();
  const name = document.getElementById("inputParkingName").value.trim();
  const location = document.getElementById("inputParkingLocation").value.trim();
  const total = parseInt(document.getElementById("inputParkingTotal").value, 10) || 50;
  const available = parseInt(document.getElementById("inputParkingAvailable").value, 10) || 20;

  const lots = getParkingData();

  if (idInput) {
    // Edit existing parking
    const lot = lots.find(l => l.id === idInput);
    if (lot) {
      lot.name = name;
      lot.location = location;
      lot.totalSpaces = total;
      lot.availableSpaces = Math.min(total, available);
    }
  } else {
    // Add new parking
    const nextId = "PK-" + (lots.length + 1);
    lots.push({
      id: nextId,
      name: name || "New Parking Zone",
      location: location || "Puducherry Central",
      totalSpaces: total,
      availableSpaces: Math.min(total, available),
      twoWheelerPrice: 20,
      fourWheelerPrice: 40,
      price: 20,
      status: "OPEN",
      landmark: "City center area",
      timings: "06:00 AM - 11:00 PM",
      managedBy: "Puducherry Municipality"
    });
  }

  saveParkingData(lots);
  closeAdminParkingModal();
  renderAdminDashboard();
  renderParkingCards(); // Keep citizen portal in sync
  alert("Parking location successfully updated in LocalStorage!");
}

function deleteParkingLocation(parkingId) {
  if (confirm(`Are you sure you want to delete parking location "${parkingId}"?`)) {
    let lots = getParkingData();
    lots = lots.filter(l => l.id !== parkingId);
    saveParkingData(lots);
    renderAdminDashboard();
    renderParkingCards();
    alert(`Parking location ${parkingId} removed from LocalStorage.`);
  }
}

// Admin Reports Actions
function deleteAdminReport(reportId) {
  if (confirm(`Are you sure you want to permanently delete report "${reportId}"?`)) {
    let reports = getReports();
    reports = reports.filter(r => r.id !== reportId);
    saveReports(reports);
    renderAdminDashboard();
    renderPoliceReports();
    renderMyReports();
    alert(`Report ${reportId} deleted from LocalStorage.`);
  }
}

// Reset Data
function resetAdminDemoData() {
  const confirmed = confirm("Are you sure you want to reset all data? This will restore the default records.");
  if (confirmed) {
    // 1. Delete application data
    localStorage.removeItem(PARKING_STORAGE_KEY);
    localStorage.removeItem(REPORTS_STORAGE_KEY);
    localStorage.removeItem(TRAFFIC_STORAGE_KEY);
    localStorage.removeItem(USERS_STORAGE_KEY);
    localStorage.removeItem(POLICE_ACCOUNTS_KEY);
    localStorage.removeItem(ADMIN_ACCOUNTS_KEY);

    // 2. Recreate initial sample data
    localStorage.setItem(PARKING_STORAGE_KEY, JSON.stringify(SAMPLE_PARKING_LIST));
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(SAMPLE_INITIAL_REPORTS));
    localStorage.setItem(TRAFFIC_STORAGE_KEY, JSON.stringify(SAMPLE_TRAFFIC_AREAS));
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(SAMPLE_USERS_LIST));
    localStorage.setItem(POLICE_ACCOUNTS_KEY, JSON.stringify(DEFAULT_POLICE_ACCOUNTS));
    localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify(DEFAULT_ADMIN_ACCOUNTS));

    // 3. Re-render UI
    renderAdminDashboard();
    renderParkingCards();
    renderPoliceReports();
    renderMyReports();
    renderTrafficMonitoringPage();

    alert("✓ Database has been reset to default state.");
  }
}

/* =========================================================
   5. STATUS BADGE HELPER
   ========================================================= */
function getStatusBadgeConfig(status) {
  const normalized = (status || "").toLowerCase().trim();

  if (normalized === "submitted") {
    return { text: "Submitted", badgeClass: "badge-status-submitted", topBarClass: "card-top-bar-blue" };
  } else if (normalized === "under review" || normalized === "in review") {
    return { text: "Under Review", badgeClass: "badge-status-under-review", topBarClass: "card-top-bar-yellow" };
  } else if (normalized === "verified") {
    return { text: "Verified", badgeClass: "badge-status-verified", topBarClass: "card-top-bar-orange" };
  } else if (normalized === "resolved") {
    return { text: "Resolved", badgeClass: "badge-status-resolved", topBarClass: "card-top-bar-green" };
  } else if (normalized === "rejected") {
    return { text: "Rejected", badgeClass: "badge-status-rejected", topBarClass: "card-top-bar-red" };
  } else {
    return { text: status || "Submitted", badgeClass: "badge-status-submitted", topBarClass: "card-top-bar-blue" };
  }
}

function formatReportDate(dateString) {
  if (!dateString) return "Date not specified";
  try {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const year = parts[0];
      const month = parseInt(parts[1], 10) - 1;
      const day = parts[2];
      const dateObj = new Date(year, month, day);
      return dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
    }
  } catch (e) {}
  return dateString;
}

/* =========================================================
   6. MY REPORTS PAGE
   ========================================================= */
let currentReportFilter = "all";
let currentReportSearch = "";

function renderMyReports() {
  const grid = document.getElementById("reportsGrid");
  const countSpan = document.getElementById("reportsCount");
  const noReportsMsg = document.getElementById("noReportsFound");

  if (!grid) return;

  const allReports = getReports();

  const filtered = allReports.filter(report => {
    const matchesStatus = (currentReportFilter === "all") || 
      (report.status && report.status.toLowerCase() === currentReportFilter.toLowerCase());

    const q = currentReportSearch.toLowerCase().trim();
    const matchesSearch = !q ||
      (report.id && report.id.toLowerCase().includes(q)) ||
      (report.type && report.type.toLowerCase().includes(q)) ||
      (report.location && report.location.toLowerCase().includes(q)) ||
      (report.vehicleNumber && report.vehicleNumber.toLowerCase().includes(q));

    return matchesStatus && matchesSearch;
  });

  if (countSpan) {
    countSpan.textContent = `Showing ${filtered.length} of ${allReports.length} reports`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = "";
    if (noReportsMsg) noReportsMsg.classList.remove("hidden");
    return;
  } else {
    if (noReportsMsg) noReportsMsg.classList.add("hidden");
  }

  grid.innerHTML = filtered.map(report => {
    const statusCfg = getStatusBadgeConfig(report.status);
    const formattedDate = formatReportDate(report.date);

    return `
      <div class="report-card" onclick="openReportDetailsModal('${report.id}')">
        <div class="card-top-bar ${statusCfg.topBarClass}"></div>
        <div class="report-card-content">
          <div class="report-card-header">
            <span class="report-id-badge">${report.id}</span>
            <span class="status-badge ${statusCfg.badgeClass}">
              ${statusCfg.text}
            </span>
          </div>

          <h3 class="report-problem-title">${report.type}</h3>

          <div class="report-info-list">
            <div class="info-item">
              <span class="info-label">Location:</span>
              <span class="info-value" title="${report.location}">📍 ${report.location}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Vehicle:</span>
              <span class="info-value">🚗 ${report.vehicleNumber || 'Not specified'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Date:</span>
              <span class="info-value">🗓️ ${formattedDate}</span>
            </div>
          </div>

          ${report.photo ? `
            <div class="report-photo-indicator">
              <span>📷</span> <span>Photo Evidence Attached</span>
            </div>
          ` : ''}

          <div class="report-card-footer">
            <button class="btn-view-report" type="button">
              View Complete Details →
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function openReportDetailsModal(reportId) {
  const reports = getReports();
  const report = reports.find(r => r.id === reportId);
  if (!report) return;

  const modal = document.getElementById("reportDetailsModal");
  const modalTitle = document.getElementById("modalReportTitle");
  const modalBody = document.getElementById("modalReportBody");

  if (!modal || !modalTitle || !modalBody) return;

  const statusCfg = getStatusBadgeConfig(report.status);
  const formattedDate = formatReportDate(report.date);

  modalTitle.textContent = `Report ${report.id}: ${report.type}`;

  modalBody.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <div>
        <span style="font-size: 0.8rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Reference Case ID</span>
        <h4 style="font-size: 1.3rem; font-weight: 800; color: #0b192c;">${report.id}</h4>
      </div>
      <div>
        <span class="status-badge ${statusCfg.badgeClass}" style="font-size: 0.85rem; padding: 6px 14px;">
          ${statusCfg.text}
        </span>
      </div>
    </div>

    <div style="background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; padding: 16px; margin-bottom: 16px;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; font-size: 0.9rem;">
        <div>
          <span style="color: #64748b; font-weight: 600;">Problem Category:</span>
          <p style="color: #0f172a; font-weight: 700;">${report.type}</p>
        </div>
        <div>
          <span style="color: #64748b; font-weight: 600;">Vehicle Registration:</span>
          <p style="color: #0f172a; font-weight: 700;">${report.vehicleNumber || 'Not specified'}</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; font-size: 0.9rem;">
        <div>
          <span style="color: #64748b; font-weight: 600;">Incident Date:</span>
          <p style="color: #0f172a; font-weight: 700;">${formattedDate}</p>
        </div>
        <div>
          <span style="color: #64748b; font-weight: 600;">Reported Time:</span>
          <p style="color: #0f172a; font-weight: 700;">${report.time || 'N/A'}</p>
        </div>
      </div>

      <div style="font-size: 0.9rem;">
        <span style="color: #64748b; font-weight: 600;">Violation Location:</span>
        <p style="color: #0f172a; font-weight: 700;">📍 ${report.location}</p>
      </div>
    </div>

    <div style="margin-bottom: 16px;">
      <span style="font-size: 0.82rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Citizen Description</span>
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-top: 6px; font-size: 0.92rem; color: #334155; line-height: 1.6;">
        ${report.description || 'No additional description provided.'}
      </div>
    </div>

    ${report.photo ? `
      <div class="modal-evidence-photo-box">
        <span style="font-size: 0.82rem; font-weight: 700; color: #0066cc; text-transform: uppercase;">
          📷 Uploaded Photo Evidence
        </span>
        <div class="modal-photo-img-wrap">
          <img src="${report.photo}" alt="Evidence photo for ${report.id}" />
        </div>
      </div>
    ` : `
      <div style="background: #f1f5f9; padding: 12px; border-radius: 6px; text-align: center; color: #64748b; font-size: 0.85rem;">
        ℹ️ No photographic evidence was attached to this report.
      </div>
    `}

    <!-- POLICE STATUS ACTION BUTTONS (Only when viewed by Police or Admin) -->
    ${(getCurrentUserRole() === 'police' || getCurrentUserRole() === 'admin') ? `
      <div class="police-modal-actions-box">
        <span style="font-size: 0.82rem; font-weight: 800; color: #0b192c; text-transform: uppercase; display: block; margin-bottom: 8px;">
          Police Action / Update Status:
        </span>
        <div class="police-action-buttons-row">
          <button type="button" class="btn btn-action-verify" onclick="updateReportStatusAndRefresh('${report.id}', 'Verified')">
            ✓ Verify Report
          </button>
          <button type="button" class="btn btn-action-reject" onclick="updateReportStatusAndRefresh('${report.id}', 'Rejected')">
            ✕ Reject Report
          </button>
          <button type="button" class="btn btn-action-resolve" onclick="updateReportStatusAndRefresh('${report.id}', 'Resolved')">
            ★ Mark as Resolved
          </button>
        </div>
      </div>
    ` : ''}
  `;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function updateReportStatusAndRefresh(reportId, newStatus) {
  const reports = getReports();
  const report = reports.find(r => r.id === reportId);
  if (report) {
    report.status = newStatus;
    saveReports(reports);
    alert(`Report ${reportId} has been updated to "${newStatus}".`);
    closeReportModal();
    renderPoliceReports();
    renderPoliceAnalyticsCharts();
    renderMyReports();
  }
}

function closeReportModal() {
  const modal = document.getElementById("reportDetailsModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

function setupMyReportsEvents() {
  const searchInput = document.getElementById("reportSearchInput");
  const filterBtns = document.querySelectorAll(".filter-btn[data-status]");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentReportSearch = e.target.value;
      renderMyReports();
    });
  }

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentReportFilter = btn.getAttribute("data-status");
        renderMyReports();
      });
    });
  }
}

/* =========================================================
   7. REPORT A PROBLEM FORM
   ========================================================= */
let currentUploadedPhotoBase64 = "";

function generateNextReportId() {
  const reports = getReports();
  if (reports.length === 0) return "PS-001";

  let maxNum = 0;
  reports.forEach(r => {
    if (r.id && r.id.startsWith("PS-")) {
      const numPart = parseInt(r.id.replace("PS-", ""), 10);
      if (!isNaN(numPart) && numPart > maxNum) {
        maxNum = numPart;
      }
    }
  });

  const nextNum = maxNum + 1;
  return "PS-" + String(nextNum).padStart(3, "0");
}

function compressImageToBase64(file, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      const MAX_WIDTH = 600;
      const MAX_HEIGHT = 600;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
      const sizeInKB = Math.round((compressedBase64.length * 3 / 4) / 1024);
      callback(compressedBase64, sizeInKB);
    };

    img.onerror = () => {
      alert("Could not process the selected image file. Please try another image.");
    };
  };
}

function setupReportingPage() {
  const violationGrid = document.getElementById("violationGrid");
  const problemTypeInput = document.getElementById("problemType");
  const dateInput = document.getElementById("dateInput");
  const timeInput = document.getElementById("timeInput");
  const photoInput = document.getElementById("photoInput");
  const photoPreviewContainer = document.getElementById("photoPreviewContainer");
  const photoPreviewImg = document.getElementById("photoPreviewImg");
  const photoSizeBadge = document.getElementById("photoSizeBadge");
  const btnRemovePhoto = document.getElementById("btnRemovePhoto");
  const violationForm = document.getElementById("violationForm");

  if (!violationForm) return;

  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split("T")[0];
  }
  if (timeInput && !timeInput.value) {
    const now = new Date();
    timeInput.value = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  }

  if (violationGrid) {
    const cards = violationGrid.querySelectorAll(".violation-card");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        cards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        const type = card.getAttribute("data-type");
        if (problemTypeInput) {
          problemTypeInput.value = type;
          hideError("problemTypeError");
          problemTypeInput.classList.remove("input-error");
        }
        const formSection = document.getElementById("reportFormSection");
        if (formSection && window.innerWidth <= 768) {
          formSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  if (photoInput) {
    photoInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        compressImageToBase64(file, (base64Result, sizeInKB) => {
          currentUploadedPhotoBase64 = base64Result;
          if (photoPreviewImg && photoPreviewContainer) {
            photoPreviewImg.src = base64Result;
            photoPreviewContainer.classList.remove("hidden");
            if (photoSizeBadge) {
              photoSizeBadge.textContent = `Optimized for LocalStorage (~${sizeInKB} KB)`;
            }
          }
        });
      }
    });
  }

  if (btnRemovePhoto) {
    btnRemovePhoto.addEventListener("click", () => {
      currentUploadedPhotoBase64 = "";
      if (photoInput) photoInput.value = "";
      if (photoPreviewImg) photoPreviewImg.src = "";
      if (photoPreviewContainer) photoPreviewContainer.classList.add("hidden");
    });
  }

  violationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const type = problemTypeInput ? problemTypeInput.value.trim() : "";
    const locationVal = document.getElementById("locationInput").value.trim();
    const vehicleVal = document.getElementById("vehicleInput").value.trim();
    const dateVal = document.getElementById("dateInput").value.trim();
    const timeVal = document.getElementById("timeInput").value.trim();
    const descVal = document.getElementById("descInput").value.trim();

    let isValid = true;

    if (!type) {
      showError("problemTypeError");
      if (problemTypeInput) problemTypeInput.classList.add("input-error");
      isValid = false;
    } else {
      hideError("problemTypeError");
      if (problemTypeInput) problemTypeInput.classList.remove("input-error");
    }

    const locationInput = document.getElementById("locationInput");
    if (!locationVal) {
      showError("locationError");
      locationInput.classList.add("input-error");
      isValid = false;
    } else {
      hideError("locationError");
      locationInput.classList.remove("input-error");
    }

    const descInput = document.getElementById("descInput");
    if (!descVal) {
      showError("descError");
      descInput.classList.add("input-error");
      isValid = false;
    } else {
      hideError("descError");
      descInput.classList.remove("input-error");
    }

    if (!dateVal) { showError("dateError"); isValid = false; } else { hideError("dateError"); }
    if (!timeVal) { showError("timeError"); isValid = false; } else { hideError("timeError"); }

    if (!isValid) return;

    const newReportId = generateNextReportId();

    const newReport = {
      id: newReportId,
      type: type,
      location: locationVal,
      vehicleNumber: vehicleVal ? vehicleVal.toUpperCase() : "NOT SPECIFIED",
      description: descVal,
      date: dateVal,
      time: timeVal,
      photo: currentUploadedPhotoBase64,
      status: "Submitted"
    };

    const allReports = getReports();
    allReports.unshift(newReport);
    saveReports(allReports);

    showSuccessModal(newReport);

    violationForm.reset();
    currentUploadedPhotoBase64 = "";
    if (photoPreviewContainer) photoPreviewContainer.classList.add("hidden");
    const cards = document.querySelectorAll(".violation-card");
    cards.forEach(c => c.classList.remove("selected"));

    dateInput.value = new Date().toISOString().split("T")[0];
    const now = new Date();
    timeInput.value = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  });
}

function showError(elemId) {
  const el = document.getElementById(elemId);
  if (el) el.classList.add("visible");
}

function hideError(elemId) {
  const el = document.getElementById(elemId);
  if (el) el.classList.remove("visible");
}

function showSuccessModal(report) {
  const modal = document.getElementById("successModal");
  const idElem = document.getElementById("generatedReportId");
  const summaryElem = document.getElementById("successSummary");

  if (!modal) return;
  if (idElem) idElem.textContent = report.id;

  if (summaryElem) {
    summaryElem.innerHTML = `
      <div><strong>Problem Type:</strong> ${report.type}</div>
      <div><strong>Location:</strong> ${report.location}</div>
      <div><strong>Vehicle Number:</strong> ${report.vehicleNumber}</div>
      <div><strong>Timestamp:</strong> ${formatReportDate(report.date)} at ${report.time}</div>
      <div><strong>Status:</strong> <span style="color:#0066cc; font-weight:700;">${report.status}</span></div>
      ${report.photo ? `<div style="margin-top:6px; color:#059669;"><strong>Photo Evidence:</strong> Attached</div>` : ''}
    `;
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeSuccessModal() {
  const modal = document.getElementById("successModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

/* =========================================================
   8. FIND PARKING PAGE
   ========================================================= */
let currentParkingFilter = "all";
let currentParkingSearch = "";

function renderParkingCards() {
  const grid = document.getElementById("parkingGrid");
  const countSpan = document.getElementById("resultsCount");
  const noResultsMsg = document.getElementById("noResultsMsg");

  if (!grid) return;

  const parkingLots = getParkingData();

  const filtered = parkingLots.filter(lot => {
    const isAvail = lot.availableSpaces > 10;
    const isLimit = lot.availableSpaces > 0 && lot.availableSpaces <= 10;
    const isFull = lot.availableSpaces === 0;

    let tier = "available";
    if (isFull) tier = "full";
    else if (isLimit) tier = "limited";

    const matchesFilter = (currentParkingFilter === "all") || (tier === currentParkingFilter);

    const q = currentParkingSearch.toLowerCase().trim();
    const matchesSearch = !q || 
      lot.name.toLowerCase().includes(q) || 
      lot.location.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  if (countSpan) {
    countSpan.textContent = `Showing ${filtered.length} of ${parkingLots.length} locations`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = "";
    if (noResultsMsg) noResultsMsg.classList.remove("hidden");
    return;
  } else {
    if (noResultsMsg) noResultsMsg.classList.add("hidden");
  }

  grid.innerHTML = filtered.map(lot => {
    let colorClass = "text-green";
    let topBarClass = "card-top-green";
    let barColor = "#10B981";

    if (lot.availableSpaces === 0) {
      colorClass = "text-red";
      topBarClass = "card-top-red";
      barColor = "#EF4444";
    } else if (lot.availableSpaces <= 10) {
      colorClass = "text-yellow";
      topBarClass = "card-top-yellow";
      barColor = "#FFB200";
    }

    const percent = Math.min(100, Math.round((lot.availableSpaces / lot.totalSpaces) * 100));

    return `
      <div class="parking-card" id="card-${lot.id}">
        <div class="card-top-bar ${topBarClass}"></div>
        <div class="card-content">
          <div class="card-header-row">
            <h3 class="card-title">${lot.name}</h3>
            <span class="status-badge ${lot.status === 'OPEN' ? 'badge-open' : 'badge-closed'}">
              ${lot.status}
            </span>
          </div>

          <p class="card-location">
            <span>📍</span>
            <span>${lot.location}</span>
          </p>

          <div class="card-metrics-box">
            <div class="metric-row">
              <span class="metric-label">Total Spaces:</span>
              <span class="metric-value">${lot.totalSpaces}</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Available Spaces:</span>
              <span class="metric-value metric-highlight ${colorClass}">
                ${lot.availableSpaces} Available
              </span>
            </div>
            
            <div class="space-meter" role="progressbar" aria-valuenow="${lot.availableSpaces}" aria-valuemax="${lot.totalSpaces}">
              <div class="space-fill" style="width: ${percent}%; background-color: ${barColor};"></div>
            </div>
          </div>

          <div class="card-pricing-block">
            <div class="pricing-item">
              <span class="pricing-type">🏍️ 2-Wheeler</span>
              <span class="pricing-rate">₹${lot.twoWheelerPrice || 20}<small style="font-size:0.7rem; font-weight:normal; color:#64748b;">/hr</small></span>
            </div>
            <div class="pricing-divider"></div>
            <div class="pricing-item">
              <span class="pricing-type">🚗 4-Wheeler</span>
              <span class="pricing-rate">₹${lot.fourWheelerPrice || 40}<small style="font-size:0.7rem; font-weight:normal; color:#64748b;">/hr</small></span>
            </div>
          </div>

          <div class="card-footer-row">
            <button class="btn-details" onclick="openDetailsModal('${lot.id}')">
              View Details
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function updateMapPins() {
  const parkingLots = getParkingData();
  parkingLots.forEach((lot, index) => {
    const pin = document.querySelector(`.pin-${index + 1}`);
    if (pin) {
      const badge = pin.querySelector(".pin-badge");
      if (badge) {
        badge.textContent = lot.availableSpaces;
        let color = "marker-green";
        if (lot.availableSpaces === 0) color = "marker-red";
        else if (lot.availableSpaces <= 10) color = "marker-yellow";
        badge.className = `pin-badge ${color}`;
      }
    }
  });
}

function openDetailsModal(lotId) {
  const parkingLots = getParkingData();
  const lot = parkingLots.find(item => item.id === lotId);
  if (!lot) return;

  const modal = document.getElementById("detailsModal");
  const modalName = document.getElementById("modalName");
  const modalBody = document.getElementById("modalBody");

  if (!modal || !modalName || !modalBody) return;

  modalName.textContent = lot.name;
  modalBody.innerHTML = `
    <div style="margin-bottom: 16px;">
      <span style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Official Address</span>
      <p style="color: #0f172a; font-size: 0.95rem; font-weight: 600; margin-top: 2px;">
        📍 ${lot.location}
      </p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px; font-size: 0.88rem;">
        <div><span style="color: #64748b;"><strong>Landmark:</strong></span><p>${lot.landmark || 'City Center'}</p></div>
        <div><span style="color: #64748b;"><strong>Timings:</strong></span><p>${lot.timings || '06:00 AM - 11:00 PM'}</p></div>
      </div>
    </div>
    <div style="background: #f8fafc; padding: 14px 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 14px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="color: #475569;">Total Capacity:</span><strong>${lot.totalSpaces} Slots</strong>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: #475569;">Available Now:</span>
        <strong style="color: ${lot.availableSpaces === 0 ? '#dc2626' : (lot.availableSpaces <= 10 ? '#d97706' : '#15803d')};">
          ${lot.availableSpaces} Spots
        </strong>
      </div>
    </div>
    <div class="modal-pricing-grid">
      <div class="modal-price-card">
        <div class="modal-price-title">🏍️ Two-Wheeler</div>
        <div class="modal-price-value">₹${lot.twoWheelerPrice || 20}/hr</div>
      </div>
      <div class="modal-price-card">
        <div class="modal-price-title">🚗 Four-Wheeler</div>
        <div class="modal-price-value">₹${lot.fourWheelerPrice || 40}/hr</div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("detailsModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

function focusParkingCard(lotId) {
  currentParkingFilter = "all";
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allBtn) allBtn.classList.add("active");
  
  renderParkingCards();

  const card = document.getElementById(`card-${lotId}`);
  if (card) {
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.add("highlight-card");
    setTimeout(() => {
      card.classList.remove("highlight-card");
    }, 2000);
  }
}

function setupSearchAndFilters() {
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearchBtn");
  const filterBtns = document.querySelectorAll(".filter-btn[data-filter]");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentParkingSearch = e.target.value;
      if (clearBtn) clearBtn.style.display = currentParkingSearch ? "flex" : "none";
      renderParkingCards();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      currentParkingSearch = "";
      clearBtn.style.display = "none";
      renderParkingCards();
      searchInput.focus();
    });
  }

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentParkingFilter = btn.getAttribute("data-filter");
        renderParkingCards();
      });
    });
  }
}

/* =========================================================
   9. GLOBAL NAVIGATION & MODALS
   ========================================================= */
function setupNavbar() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navLinks = document.getElementById("navLinks");

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("open");
      navLinks.classList.toggle("active");
    });

    const links = navLinks.querySelectorAll(".nav-link");
    links.forEach(link => {
      link.addEventListener("click", () => {
        hamburgerBtn.classList.remove("open");
        navLinks.classList.remove("active");
      });
    });
  }
}

window.addEventListener("click", (e) => {
  const detailsModal = document.getElementById("detailsModal");
  if (e.target === detailsModal) closeModal();

  const successModal = document.getElementById("successModal");
  if (e.target === successModal) closeSuccessModal();

  const reportModal = document.getElementById("reportDetailsModal");
  if (e.target === reportModal) closeReportModal();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeSuccessModal();
    closeReportModal();
  }
});

// Dynamic App-like Bottom Navigation for iOS & Android Mobile
function injectBottomNavigation() {
  // Avoid duplicate injection
  if (document.getElementById("appBottomNav")) return;

  const currentPath = window.location.pathname;
  const isHome = currentPath.endsWith("index.html") || currentPath.endsWith("/") || currentPath === "";
  const isParking = currentPath.endsWith("find-parking.html");
  const isReport = currentPath.endsWith("report.html");
  const isMyReports = currentPath.endsWith("my-reports.html");

  const bottomNav = document.createElement("nav");
  bottomNav.id = "appBottomNav";
  bottomNav.className = "bottom-nav-bar";
  bottomNav.setAttribute("aria-label", "Mobile Bottom Navigation");

  bottomNav.innerHTML = `
    <a href="index.html" class="bottom-nav-item ${isHome ? 'active' : ''}">
      <span class="bnav-icon">🏠</span>
      <span>Home</span>
    </a>
    <a href="find-parking.html" class="bottom-nav-item ${isParking ? 'active' : ''}">
      <span class="bnav-icon">🅿️</span>
      <span>Parking</span>
    </a>
    <a href="report.html" class="bottom-nav-item bnav-report ${isReport ? 'active' : ''}" aria-label="Report Problem">
      <span class="bnav-icon">🚨</span>
      <span>Report</span>
    </a>
    <a href="my-reports.html" class="bottom-nav-item ${isMyReports ? 'active' : ''}">
      <span class="bnav-icon">📋</span>
      <span>My Reports</span>
    </a>
  `;

  document.body.appendChild(bottomNav);
}

/* =========================================================
   8. HACKATHON LIVE FUTURE-TECH ENGINE:
   - Dynamic simulated IoT ultrasonic parking sensors
   - Real-time traffic congestion telemetry ticks
   - Live AI predictive parking recommendation badge
   - Live stream ticker & Presentation Mode toggle
   ========================================================= */
let isLiveSimRunning = true;
/* =========================================================
   8. HOURLY PARKING AVAILABILITY UPDATE ENGINE (LocalStorage)
   - Parking availability changes every 1 hour (3600000 ms)
   - Saves all updated slot counts in LocalStorage ("ParkingData")
   - Tracks timestamp in LocalStorage ("ParkingLastUpdatedTimestamp")
   - Displays dynamic countdown in find-parking.html
   ========================================================= */
const ONE_HOUR_MS = 60 * 60 * 1000; // 3,600,000 milliseconds = 1 Hour

function performHourlyParkingUpdate() {
  const parkingLots = getParkingData();
  if (!parkingLots || parkingLots.length === 0) return;

  // Simulate realistic hourly fluctuation across Puducherry parking locations
  parkingLots.forEach(lot => {
    // Determine realistic occupancy shift (-15% to +15% of total capacity)
    const maxShift = Math.max(2, Math.round(lot.totalSpaces * 0.15));
    const randomChange = Math.floor(Math.random() * (maxShift * 2 + 1)) - maxShift;
    
    // Calculate new available spaces within valid boundaries [0, totalSpaces]
    let newAvailable = lot.availableSpaces + randomChange;
    newAvailable = Math.max(0, Math.min(lot.totalSpaces, newAvailable));
    lot.availableSpaces = newAvailable;
  });

  // Save new parking data into LocalStorage
  saveParkingData(parkingLots);

  // Record current update timestamp in LocalStorage
  const now = Date.now();
  localStorage.setItem(PARKING_LAST_UPDATED_KEY, now.toString());

  // Re-render UI components if currently viewing pages
  if (document.getElementById("parkingGrid")) {
    renderParkingCards();
    updateMapPins();
  }
  if (document.getElementById("adminParkingTbody")) {
    renderAdminDashboard();
  }
  if (document.getElementById("trafficGrid")) {
    renderTrafficMonitoringPage();
  }

  console.log(`[SmartPark] Hourly parking availability update applied and saved to LocalStorage at ${new Date().toLocaleTimeString()}`);
}

function checkAndTriggerHourlyParkingUpdate() {
  const now = Date.now();
  const lastUpdatedStr = localStorage.getItem(PARKING_LAST_UPDATED_KEY);

  if (!lastUpdatedStr) {
    // First time setup: set timestamp and perform initial baseline update
    localStorage.setItem(PARKING_LAST_UPDATED_KEY, now.toString());
  } else {
    const lastUpdated = parseInt(lastUpdatedStr, 10);
    const elapsed = now - lastUpdated;

    if (elapsed >= ONE_HOUR_MS) {
      // 1 hour or more has passed: perform dynamic update
      performHourlyParkingUpdate();
    }
  }

  // Update hourly countdown banner on find-parking.html
  updateHourlyCountdownUI();
}

function updateHourlyCountdownUI() {
  const badgeElem = document.getElementById("hourlyCountdownBadge");
  const textElem = document.getElementById("hourlySyncText");
  if (!badgeElem) return; // Not on find-parking.html

  const now = Date.now();
  const lastUpdatedStr = localStorage.getItem(PARKING_LAST_UPDATED_KEY) || now.toString();
  const lastUpdated = parseInt(lastUpdatedStr, 10);
  const elapsed = now - lastUpdated;
  const remaining = Math.max(0, ONE_HOUR_MS - (elapsed % ONE_HOUR_MS));

  const minutes = Math.floor(remaining / (60 * 1000));
  const seconds = Math.floor((remaining % (60 * 1000)) / 1000);

  badgeElem.textContent = `Next update in: ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;

  if (textElem) {
    const lastUpdateDate = new Date(lastUpdated);
    const timeFormatted = lastUpdateDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    textElem.textContent = `Availability updates hourly (Last synced: ${timeFormatted})`;
  }
}

function startHourlyParkingTimer() {
  // Check immediately upon loading
  checkAndTriggerHourlyParkingUpdate();

  // Tick every 1 second to update the countdown badge and detect 1-hour expiry
  setInterval(() => {
    checkAndTriggerHourlyParkingUpdate();
  }, 1000);
}


function injectSmartCityLiveTicker() {
  // Inject a sleek futuristic status bar at the very top of each page
  if (document.getElementById("smartCityLiveBanner")) return;

  const banner = document.createElement("div");
  banner.id = "smartCityLiveBanner";
  banner.className = "smart-city-ticker-bar";
  banner.innerHTML = `
    <div class="ticker-content">
      <div class="ticker-badge">
        <span class="live-dot" id="liveIoTPulse"></span>
        <span class="ticker-title">PUDUCHERRY SMART SENSOR GRID</span>
      </div>
      <div class="ticker-stream" id="tickerText">
        <span>📡 <strong>IoT Telemetry:</strong> 120+ ultrasonic sensors active in White Town & MG Road</span>
        <span class="ticker-sep">•</span>
        <span>🤖 <strong>AI Flow:</strong> Predictive parking routing active</span>
        <span class="ticker-sep">•</span>
        <span>⏱️ <strong>Update Rate:</strong> Hourly dynamic sync</span>
      </div>
      <div class="ticker-actions">
        <span class="tech-tag">PROTOTYPE 2.0</span>
      </div>
    </div>
  `;

  document.body.insertBefore(banner, document.body.firstChild);
}

// Document Ready Initialization
document.addEventListener("DOMContentLoaded", () => {
  initLocalStorage();
  initUserProfile();
  setupNavbar();
  injectSmartCityLiveTicker();
  startHourlyParkingTimer();
  injectBottomNavigation();
  syncNavbarLoginStatus();
  setupSearchAndFilters();
  renderParkingCards();
  updateMapPins();
  setupReportingPage();
  setupMyReportsEvents();
  renderMyReports();
  renderPoliceReports();
  renderPoliceAnalyticsCharts();
  renderTrafficMonitoringPage();
  renderAdminDashboard();
  renderProfilePage();
  console.log("Smartpark Puducherry - Ready with Hourly Parking Sync Engine. Role:", getCurrentUserRole());
});

