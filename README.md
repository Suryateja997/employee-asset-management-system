# Employee Asset Management System

## 📌 Project Overview

Employee Asset Management System is a Salesforce-based application designed to manage company assets, employee assignments, asset maintenance, and asset lifecycle tracking.

The system helps organizations efficiently track laptops, mobile devices, monitors, software licenses, and other company assets while improving visibility and automation.

---

# 🚀 Features

## 👨‍💼 Employee Management

- Create and manage employee records
- Store employee details
- Track department, designation, and employment status

---

## 💻 Asset Management

- Maintain company asset inventory
- Track asset information:
  - Asset Name
  - Asset Number
  - Asset Type
  - Brand
  - Model
  - Purchase Details
  - Warranty Information
  - Current Status

Asset Status Tracking:

- Available
- Assigned
- Repair
- Lost
- Retired

---

## 🔄 Asset Assignment Management

- Assign assets to employees
- Maintain assignment history
- Track assigned date and return date
- Monitor asset ownership

---

## 🛠 Maintenance Management

- Create maintenance requests
- Track repair status
- Assign technicians
- Maintain asset service history

---

# ⚙️ Salesforce Automation

Implemented automation using:

- Record Triggered Flows
- Apex Logic

Automation Examples:

✅ Automatically update asset status when assigned

✅ Change asset status when returned

✅ Move assets to repair status during maintenance

✅ Update asset availability after repair completion

---

# 💻 Lightning Web Components (LWC)

Custom Lightning Web Components developed:

- Asset Search Component
- Asset Dashboard Cards
- Asset Data Table
- Employee Asset Dashboard
- Asset Assignment Wizard

---

# 🏗️ Salesforce Architecture

Employee
 |
 |
 Asset Assignment
 |
 |
 Company Asset
 |
 |
 Maintenance Request
Automation Layer:
 Flows + Apex
User Interface:
 Lightning Web Components

---

# 🛠️ Technologies Used

| Technology | Usage |
|---|---|
| Salesforce Platform | Application Development |
| Salesforce DX | Project Structure |
| Apex | Backend Logic |
| SOQL | Data Queries |
| Lightning Web Components | User Interface |
| Salesforce Flows | Automation |
| Git | Version Control |
| GitHub | Source Management |

---

# 📂 Project Structure

force-app
 └── main
 └── default
 ├── classes
 ├── lwc
 ├── objects
 ├── flows
 └── permissionsets
config
 scripts
 sfdx-project.json
 package.json

---

# 📦 Deployment

Clone the repository:

git clone https://github.com/Suryateja997/employee-asset-management-system.git

Authorize Salesforce org:

sf org login web

Deploy source:

sf project deploy start

---

# 👨‍💻 Developer

**Surya Teja**

Salesforce Developer  
Skills:

- Salesforce Administration
- Apex Development
- Lightning Web Components
- Salesforce Automation
- SOQL
- Git & GitHub

---

# 📸 Screenshots

Screenshots of the application will be added here.

---

⭐ If you find this project useful, feel free to explore and learn.



# 🏗️ Salesforce Architecture

## Data Model


            Employee
                |
                |
                |
      Asset Assignment
                |
      -----------------
      |               |
      |               |
 Company Asset   Maintenance Request


---

## Automation Layer


            Salesforce Flow

                  |
                  |

  --------------------------------
  |              |               |

Asset Assigned Asset Return Maintenance
 |
  |

Update Asset Status Automatically

---

## Application Layer


            Users

               |
               |

      Lightning Experience

               |
    -------------------------
    |                       |
   LWC                   Reports
    |
    |

Apex Controllers
|
|
Salesforce Objects

---

## Technology Architecture


Frontend
Lightning Web Components (LWC)
Backend
Apex Classes
SOQL
Automation
Record Triggered Flows
Database
Salesforce Custom Objects
