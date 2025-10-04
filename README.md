Here’s a cleaner version of the README **without the folder structure**:

---

# Ooodo - Expense Management System

## Overview

**Ooodo** is a modern expense management backend system built with **Node.js**, designed to automate expense tracking, receipt parsing, and user management. It allows users and admins to upload receipts, extract expense details using OCR, and manage employee accounts securely.

This backend is implemented using **Express.js** and provides REST APIs for various expense and user operations.

---

## Features

* **User Management**

  * Admin can create employees with randomly generated passwords.
  * Users can change their password after first login.
  * Role-based access: `manager` and `employee`.

* **Expense & Receipt Management**

  * Upload receipts (image/PDF) via API.
  * OCR-based text extraction using **Tesseract.js**.
  * Parse receipts to extract:

    * Vendor name
    * Date
    * Total amount
    * Currency
    * Tax/GST
    * Itemized list
  * Returns structured JSON response with parsed details.

* **Security**

  * Passwords hashed with **bcrypt**.
  * JWT authentication for secure API access.

* **Email Notifications**

  * Automatically send employee credentials to their email using **Nodemailer**.
  * Supports Gmail SMTP with App Passwords.

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (via Mongoose)
* **Authentication:** bcrypt, jsonwebtoken
* **OCR:** tesseract.js
* **File Uploads:** multer
* **Email:** nodemailer

---

## Installation

1. **Clone the repository:**

```bash
git clone <repository_url>
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Setup environment variables** in `.env`:

```env
PORT=4000
MONGO_URI=<your_mongodb_connection_string>
EMAIL_USER=<your_gmail_address>
EMAIL_PASS=<your_gmail_app_password>
JWT_SECRET=<your_jwt_secret>
```

4. **Run the server:**

```bash
npm start
```

Server will run at: `http://localhost:4000`

---

## API Endpoints

### **User Management**

* **POST** `/api/users/create`
  Create a new employee and send credentials via email.

  **Body Example (JSON):**

  ```json
  {
    "companyId": "64f1e3f1a1234abcd5678ef",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "employee",
    "managerId": "64f1e3f1a1234abcd5678aa"
  }
  ```

* **POST** `/api/users/change-password`
  Change user password.

  **Body Example:**

  ```json
  {
    "email": "john.doe@example.com",
    "oldPassword": "old12345",
    "newPassword": "new12345"
  }
  ```

---

### **Receipt Management**

* **POST** `/api/receipts/upload`
  Upload a receipt image and get parsed expense details.

  **Form-Data Parameters:**

  * `receipt` → (file) Upload image/PDF of receipt.

  **Response Example:**

  ```json
  {
    "success": true,
    "parsed": {
      "vendor": "SuperMart",
      "date": "2025-09-28",
      "total": 1234.56,
      "currency": "₹",
      "tax": 123.45,
      "gstin": "27ABCDE1234F1Z5",
      "items": ["Item1 - 100", "Item2 - 200"],
      "rawText": "Full OCR extracted text..."
    }
  }
  ```

---

## Dependencies

* **bcrypt** – Password hashing
* **jsonwebtoken** – JWT authentication
* **tesseract.js** – OCR engine for receipt parsing
* **multer** – File upload handling
* **nodemailer** – Email sending
* **cors** – Cross-Origin Resource Sharing
* **dotenv** – Environment variable management

---

## Notes

* Use a **Gmail App Password** for sending emails securely.
* Ensure MongoDB is accessible via the connection string provided in `.env`.
* Only English receipts are supported by default in `tesseract.js` (`eng` language). Additional languages can be added.

---

ScreenShots
<img width="1856" height="961" alt="image" src="https://github.com/user-attachments/assets/e48860b0-06e7-4e59-b702-1ad074cdf427" />
<img width="1828" height="850" alt="image" src="https://github.com/user-attachments/assets/0d0533b1-b740-4542-b655-fada33545944" />
<img width="1846" height="921" alt="image" src="https://github.com/user-attachments/assets/153ea866-887e-412d-9b49-b9566979a9ab" />
<img width="1860" height="853" alt="image" src="https://github.com/user-attachments/assets/4095934f-e31a-4af6-8e23-b02c6b674f55" />
<img width="1837" height="916" alt="image" src="https://github.com/user-attachments/assets/d81c97c5-e28e-41de-b960-332cb6179f00" />
<img width="1845" height="916" alt="image" src="https://github.com/user-attachments/assets/8601f541-606a-4b53-afc3-237f2165a904" />
<img width="1837" height="846" alt="image" src="https://github.com/user-attachments/assets/e46fa235-382f-43a4-9287-d9e24590880a" />
<img width="1835" height="918" alt="image" src="https://github.com/user-attachments/assets/57d12eb9-12d1-4c0c-b02c-4f18af5fd5b2" />
<img width="1857" height="821" alt="image" src="https://github.com/user-attachments/assets/142fd38f-e0f4-4c0f-a991-594916d80f94" />


