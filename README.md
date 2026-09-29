# 🌾 Smart Agriculture and Rural Data Intelligence Platform

![Status](https://img.shields.io/badge/status-in%20development-orange)
![Frontend](https://img.shields.io/badge/frontend-React.js-61DAFB?logo=react&logoColor=white)
![Backend](https://img.shields.io/badge/backend-Node.js%20%7C%20Express.js-339933?logo=node.js&logoColor=white)
![Database](https://img.shields.io/badge/database-PostgreSQL%20%7C%20MongoDB-336791?logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

A centralized, web-based platform to **collect, organize, manage, visualize, and analyze** comprehensive village-level information, from a bird's-eye view of a whole village down to individual farmers, households, land, crops, and livestock.

> Developed as an academic project for the **Master of Computer Applications (MCA)** program at **G.H. Raisoni College of Engineering and Management, Wagholi, Pune**.

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Problem Statement](#-problem-statement)
- [Objectives](#-objectives)
- [Key Features](#-key-features)
- [Data Hierarchy](#-data-hierarchy)
- [Major Modules](#-major-modules)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Proposed Project Structure](#-proposed-project-structure)
- [Scope and Future Enhancements](#-scope-and-future-enhancements)
- [Expected Outcomes](#-expected-outcomes)
- [Team](#-team)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 About the Project

Rural areas generate a large amount of information related to agriculture, farmers, land, livestock, water resources, households, income, and other socio-economic aspects. This information is often scattered across different records, surveys, documents, and sources, making it difficult to get a complete picture of a village in one place.

The **Smart Agriculture and Rural Data Intelligence Platform** solves this by providing a single system where authorized users can select a village, view a consolidated overview, and drill down into detailed farmer-level data. It is intended to help organizations such as **BAIF** access relevant village information efficiently and use it for:

- Research and data analysis
- Rural development planning
- Agricultural analysis
- Future data-driven decision-making

---

## ❗ Problem Statement

Organizations working in rural development need comprehensive information about villages to understand their agricultural, economic, social, and natural-resource conditions. However, this information is spread across multiple records and sources, making it time-consuming to gather and analyze.

There is a need for a **centralized platform** that brings village and farmer information together and presents it in an organized, understandable manner.

---

## 🎯 Objectives

- Create a centralized repository for village-level information
- Maintain detailed information about farmers and households
- Organize agricultural, land, livestock, water, and socio-economic data
- Provide an overall summary of a selected village in one place
- Enable analysis of village-level and farmer-level data
- Present key information through dashboards, tables, charts, and visualizations
- Support research, rural development planning, and agricultural analysis
- Provide a reliable information base for future decision-making

---

## ✨ Key Features

- 🏘️ **Village Management**: maintain geographical and administrative details of villages
- 👨‍🌾 **Farmer and Household Records**: detailed profiles for individual farmers and households
- 🌱 **Land and Agriculture**: land ownership, utilization, cultivated area, and crops
- 🐄 **Livestock Tracking**: animals associated with farmers or households
- 💧 **Water and Resources**: water sources, irrigation facilities, and natural resources
- 📊 **Dashboards and Visualization**: statistics, tables, and charts for quick understanding
- 🔍 **Data Analysis**: identify patterns, trends, and gaps at village and farmer levels
- 🔎 **Search and Filtering**: find villages, farmers, and records using flexible filters
- 📄 **Reports and Summaries**: generate useful summaries from organized data
- 🔐 **Authorized Access**: access restricted to authorized users

---

## 🗂️ Data Hierarchy

The platform organizes information in a hierarchical structure so users can move from summary to detail:

```
Village
 └── Household / Farmer
      └── Land
           ├── Crops
           ├── Livestock
           ├── Income
           └── Other Information
```

Selecting a village shows totals such as number of farmers, households, agricultural land, crops, livestock, and water resources. Users can then drill down into any individual farmer's records.

---

## 🧩 Major Modules

| # | Module | Description |
|---|--------|-------------|
| 1 | **Village Management** | Basic geographical, administrative, and village-level information |
| 2 | **Land and Agricultural Information** | Land ownership, land utilization, cultivated area, crops, and agricultural activities |
| 3 | **Livestock Information** | Livestock and animals associated with farmers or households |
| 4 | **Water and Resource Information** | Water resources, irrigation facilities, and other natural resources |
| 5 | **Dashboard and Visualization** | Summarized statistics, tables, charts, and visual representations |
| 6 | **Data Analysis** | Village-level and farmer-level analysis of patterns, trends, and gaps |
| 7 | **Search and Filtering** | Search villages, farmers, and records; filter by available parameters |

---

## 🛠️ Technology Stack

> The final stack will be confirmed during the system design phase based on detailed requirements.

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL / MongoDB |
| **Data Visualization** | Charting and dashboard libraries (e.g., Chart.js, Recharts) |
| **Dev Tools** | Git, GitHub, VS Code, Postman |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm or yarn
- PostgreSQL or MongoDB (depending on the chosen database)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```

2. **Set up the backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env   # then update the values
   npm run dev
   ```

3. **Set up the frontend**

   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Open the app** at `http://localhost:3000`

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
DB_URL=your_database_connection_string
JWT_SECRET=your_secret_key
```

---

## 📁 Proposed Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── app.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
├── docs/
└── README.md
```

---

## 🔭 Scope and Future Enhancements

**Current scope**

- Collection and management of village, farmer, household, agricultural, livestock, and resource data
- Village-level and farmer-level dashboards
- Data visualization and analysis
- Search, filtering, and report generation

**Planned future extensions**

- [ ] Advanced analytical capabilities
- [ ] Predictive models
- [ ] Integration of external datasets
- [ ] Environmental analysis
- [ ] Additional domain-specific requirements

---

## 📈 Expected Outcomes

- Reduced effort in collecting information from multiple sources
- Village information available in a single, centralized location
- Large volumes of data made easier to understand
- Improved accessibility of farmer and agricultural information
- Better support for research, analysis, and rural development planning
- A foundation for future data-driven decision-making
- Reduced dependency on scattered or manually maintained records

---

## 👥 Team

| Roll No | Name |
|---------|------|
| 25MCA56 | Nikhil Wankhede |
| 25MCA64 | Prashant Dandge |
| 25MCA74 | Ritesh Hood |
| 25MCA89 | Shivraj Jagtap |
| 25MCA94 | Siddharth Kapadne |
| 25MCA100 | Sujeet Muley |

**Under the guidance of:** Asst. Prof. Sachin Zurunge
**Department:** MCA, G.H. Raisoni College of Engineering and Management, Wagholi, Pune

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Update this section if your institution or organization requires a different license.

---

<p align="center">Made with ❤️ by the MCA Team, G.H. Raisoni College of Engineering and Management</p>