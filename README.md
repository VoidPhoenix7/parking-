# SmartPark Puducherry 🚦🅿️

A modern, responsive Civic & Traffic Enforcement Web Portal built as a **first-year engineering hackathon prototype**. SmartPark Puducherry streamlines urban parking discovery, empowers citizens to report traffic violations with photographic evidence, and provides specialized command dashboards for Traffic Police and Municipal Administrators.

---

## 🌟 Key Features

### 👤 Citizen Portal
- **Real-Time Spot Finder**: Search and filter live parking spaces across 30+ Puducherry zones (White Town, Heritage Town, MG Road, Beach Road, etc.).
- **Interactive City Map**: Visual pins with live capacity indicators and availability statuses.
- **Violation Reporting**: Submit reports for illegal parking, blocked footpaths, road obstructions, or vehicle abandonment with photo evidence and vehicle number plates.
- **My Reports Tracker**: Real-time status updates (*Submitted* ➔ *Under Review* ➔ *Verified* ➔ *Resolved* / *Rejected*).
- **Profile Management**: Fill and save personal citizen records (Name, DOB, Phone, Email) saved securely.

### 👮‍♂️ Traffic Police Command Dashboard
- **Live Statistics Overview**: Real-time counters for *Total Reports*, *Pending Reports*, *Verified Reports*, and *Resolved Reports*.
- **Interactive Analytics**: Chart.js data visualizations breakdown by problem type, report status, and overall parking occupancy.
- **Recent Reports Feed**: Adaptive desktop table view that converts to card view on mobile screens.
- **Case Review & Action Controls**: Inspect uploaded citizen photo evidence and update report status directly (*Verify*, *Reject*, *Resolve*).
- **Restricted Traffic Monitoring**: Live traffic congestion levels, parking availability, and active complaints across core corridors.

### ⚙️ Admin Portal
- **Infrastructure Metrics**: High-level overview of users, parking lots, total reports, and resolutions.
- **Manage Parking (CRUD)**: Add new parking zones with total and available spaces, edit capacities, or delete entries.
- **Manage Users (CRUD)**: Create new user accounts, update details, assign roles (*Citizen*, *Police*, *Admin*), or remove users.
- **Database Operations**: Restore default data state at any time.

---

## 🔐 Authentication & Role Management

- **Role-Based Routing**: Fast login for **Citizen**, **Police**, and **Admin**.
- **Credentials Verification for Officials**:
  - Police and Admin access require an **Official ID**, **Email**, and **Password**.
  - Includes a built-in **"Create New ID & Account"** modal for officials.
  - Interactive **password visibility toggle (👁️)** on all password inputs.
- **Zero Heavy Backend Needed**: Everything is persisted client-side via browser `LocalStorage`.

---

## 📱 Mobile-First Responsive Design

Tested and optimized across all major screen sizes:
- **Mobile (320px – 480px)**: 1-column layouts, touch-friendly buttons (min 44px height), full-width forms, and an app-like **Bottom Navigation Bar** (*Home*, *Parking*, *Report*, *My Reports*).
- **Tablet (768px – 900px)**: Responsive grids, adaptive cards, and collapsible hamburger menu.
- **Desktop & Laptop (1024px – 1440px+)**: Multi-column statistics, side-by-side data tables, and analytics charts.

---

## 🎨 Design System & Palette

Crafted with a clean, professional Smart City aesthetic:
- **Dark Navy (`#0B1F3A`)**: Navbar, headers, hero banners, and brand accents.
- **Blue (`#155EEF`)**: Primary buttons, links, and search highlights.
- **Yellow (`#F5C542`)**: Contrast borders, live alerts, and warnings.
- **Green (`#12B76A`)**: Available spots and resolved indicators.
- **Red (`#D92D20`)**: High traffic alerts and violation actions.
- **Background (`#F7F9FC`)**: Clean modern canvas.

---

## 📂 Project Structure

```text
├── index.html              # Landing page with hero section & overview
├── find-parking.html       # Parking search, filters & interactive map
├── report.html             # Citizen violation reporting form with photo upload
├── my-reports.html         # Track submitted reports and status updates
├── profile.html            # Citizen profile and details management
├── login.html              # Multi-role authentication & registration portal
├── traffic-monitoring.html # Official traffic monitoring (Police & Admin restricted)
├── police-dashboard.html   # Traffic Police dashboard with Chart.js analytics
├── admin-dashboard.html    # Admin management portal (Parking & Users CRUD)
├── style.css               # Clean Smart City stylesheet with responsive rules
├── app.js                  # Complete application logic & LocalStorage database
├── server.js               # Lightweight Node.js static preview server
└── README.md               # Documentation & setup guide
```

---

## 🚀 Getting Started

No build tools, compilers, or database installations required.

### Option 1: Open Directly in Browser
Simply double-click `index.html` in your file explorer to open it in any web browser.

### Option 2: Run with Node.js
```bash
# Clone the repository
git clone https://github.com/your-username/smartpark-puducherry.git

# Navigate to project directory
cd smartpark-puducherry

# Start the static local server
node server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Demo Credentials

| Role | Official ID | Email | Password |
|---|---|---|---|
| **Citizen** | — | `citizen@smartpark.in` | Any |
| **Police Officer** | `POL-101` | `traffic.police@puducherry.gov.in` | `police1234` |
| **Admin** | `ADM-201` | `muthu.admin@puducherry.gov.in` | `admin1234` |

*Note: You can also use **"Create New ID & Account"** directly inside the login modal to register your own ID.*

---

## 👥 Authors
Developed as a **First-Year Engineering Hackathon Project** for Puducherry Smart City & Traffic Enforcement initiatives.
