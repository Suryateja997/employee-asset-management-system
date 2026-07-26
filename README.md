# 🚀 Employee Asset Management System

A Salesforce-based Employee Asset Management System developed using **Salesforce Administration**, **Apex**, **Lightning Web Components (LWC)**, **Flows**, **Reports**, and **Dashboards**.

This application helps organizations manage company assets, assign them to employees, track maintenance requests, and monitor asset availability through a modern Lightning interface.

---

# 📋 Project Overview

The Employee Asset Management System is designed to simplify the tracking and management of company-owned assets such as laptops, mobiles, monitors, printers, software licenses, and more.

The application provides:

- Employee Management
- Company Asset Management
- Asset Assignment
- Maintenance Tracking
- Lightning Dashboard
- Asset Search
- Reports & Dashboards
- Automation using Flows

---

# 🛠 Technologies Used

- Salesforce CRM
- Salesforce DX
- Apex
- SOQL
- Lightning Web Components (LWC)
- Salesforce Flow
- Validation Rules
- Reports
- Dashboards
- VS Code
- Salesforce CLI
- Git
- GitHub

---

# 📦 Custom Objects

## Employee

Stores employee information.

### Fields

- Employee Number
- Employee Name
- Email
- Phone
- Department
- Designation
- Joining Date
- Status
- Address

---

## Company Asset

Stores company-owned assets.

### Fields

- Asset Number
- Asset Name
- Asset Type
- Brand
- Model
- Serial Number
- Purchase Date
- Warranty End Date
- Cost
- Status
- Location
- Vendor
- Assigned To

---

## Asset Assignment

Tracks asset allocation history.

### Fields

- Employee
- Asset
- Assignment Date
- Return Date
- Assignment Status

---

## Maintenance Request

Tracks maintenance requests.

### Fields

- Company Asset
- Issue Description
- Priority
- Status
- Technician
- Request Date
- Completion Date

---

# 💻 Apex Components

## AssetManagementService.cls

Provides backend business logic.

Methods included:

- searchAssets()
- getAvailableAssets()
- assignAssetToEmployee()
- getEmployeeDashboardData()

---

# ⚡ Lightning Web Components

### Asset Search

Search company assets using:

- Asset Name
- Asset Number

---

### Asset Dashboard Cards

Displays:

- Total Employees
- Total Assets
- Available Assets
- Assigned Assets
- Repair Assets
- Open Maintenance Requests

---

### Asset Data Table

Interactive data table with:

- Search
- Sorting
- Refresh
- Lightning Datatable

---

### Employee Asset Dashboard

Displays:

- Assigned Assets
- Maintenance Requests

for each employee.

---

### Asset Assignment Wizard

Guided asset assignment process.

---

# 🔄 Automation

Implemented using Record Triggered Flows.

### Flow 1

Assign Asset

Automatically changes asset status to:

Assigned

---

### Flow 2

Return Asset

Automatically changes asset status to:

Available

---

### Flow 3

Maintenance Request Created

Automatically changes asset status to:

Repair

---

### Flow 4

Maintenance Completed

Automatically changes asset status back to:

Available

---

# ✅ Validation Rules

Implemented validations for:

- Warranty Date
- Assignment Date
- Return Date
- Required fields

---

# 📊 Reports

Created reports for:

- Employee Assets
- Available Assets
- Assigned Assets
- Maintenance Requests

---

# 📈 Dashboards

Dashboard includes:

- Employee Count
- Asset Count
- Available Assets
- Assigned Assets
- Repair Assets
- Open Maintenance Requests

---

# 🏗 Project Architecture

```
                    Employee Asset Management System

                        Lightning App
                              │
      ┌───────────────────────┼───────────────────────┐
      │                       │                       │
      ▼                       ▼                       ▼
 Asset Search         Dashboard Cards        Asset Data Table
      │                       │                       │
      └────────────── Apex Service ───────────────────┘
                              │
      ┌───────────────────────┼───────────────────────┐
      ▼                       ▼                       ▼
 Employee__c          Company_Asset__c      Maintenance_Request__c
                              │
                              ▼
                     Asset Assignment
```

---

# 📁 Project Structure

```
EmployeeAssetManagement
│
├── force-app
│   └── main
│       └── default
│           ├── classes
│           │      AssetManagementService.cls
│           │
│           ├── lwc
│           │      assetSearch
│           │      assetDashboardCards
│           │      assetDataTable
│           │      assetAssignmentWizard
│           │      employeeAssetDashboard
│           │
│           ├── objects
│           ├── flows
│           ├── reports
│           └── dashboards
│
├── manifest
├── README.md
└── sfdx-project.json
```

---

# 📸 Screenshots

Add screenshots here after deployment.

- Home Dashboard
- Asset Search
- Asset Dashboard Cards
- Asset Assignment Wizard
- Employee Dashboard
- Asset Data Table
- Reports
- Dashboards

---

# 🚀 Future Enhancements

- Barcode / QR Code Support
- Email Notifications
- Scheduled Maintenance
- Mobile Optimization
- Experience Cloud Portal
- Approval Process
- Asset Reservation
- Analytics Dashboard

---

# 👨‍💻 Skills Demonstrated

- Salesforce Administration
- Apex Programming
- SOQL
- Lightning Web Components (LWC)
- Salesforce Flow
- Validation Rules
- Reports & Dashboards
- VS Code
- Salesforce CLI
- Git & GitHub

---

# 📌 Resume Description

Developed a Salesforce-based Employee Asset Management System using Apex, Lightning Web Components (LWC), SOQL, Flows, Validation Rules, Reports, and Dashboards. The application manages company assets, employee assignments, maintenance requests, and provides interactive dashboards and search capabilities to improve operational efficiency.

---

# 📄 License

This project is developed for learning and portfolio purposes.

---

## ⭐ If you found this project useful, consider giving it a star on GitHub.