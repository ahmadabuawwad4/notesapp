# 📝 Notes App

A modern **Notes Management System** built as a full-stack web application using **ASP.NET Core Web API** and a lightweight **HTML, CSS, and JavaScript** frontend.

The application allows users to securely log in and manage their personal notes through a simple and responsive interface.

## 🚀 Features

- 🔐 User Authentication using JWT
- 📝 Create new notes
- ✏️ Edit existing notes
- 🗑️ Delete notes
- 📋 View all personal notes
- 🔎 Retrieve individual notes by ID
- 👤 User-based note management
- 🌐 RESTful API architecture
- 📱 Responsive web interface
- 🔒 Protected API endpoints
- 🗄️ SQL Server database integration

## 🛠️ Technologies

### Backend
- **C#**
- **ASP.NET Core Web API**
- **Entity Framework Core**
- **RESTful APIs**
- **JWT Authentication**
- **SQL Server**

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript (ES6 Modules)**
- **Fetch API**
- **Session Storage**

## 🏗️ Project Architecture

The project follows a layered architecture to keep the application organized and maintainable.

```text
Notes App
│
├── Backend
│   ├── API
│   ├── Application
│   └── Data
│
└── Frontend
    ├── pages
    ├── services
    ├── scripts
    └── styles
```

## 📂 Main Features

### Authentication

Users can log in securely using their credentials. After successful authentication, the API returns a JWT token that is used to authorize protected requests.

```text
Login
  ↓
JWT Token
  ↓
Authenticated Requests
  ↓
Notes API
```

### Notes Management

Authenticated users can:

- Create notes
- View their notes
- View a specific note
- Update notes
- Delete notes

Each note is associated with its owner to ensure users can only manage their own notes.

## 🔌 API

The backend exposes RESTful endpoints for authentication and note management.

Example endpoints:

```http
POST /api/User/Login

GET /api/Note/GetAllNotes

GET /api/Note/GetNoteById

POST /api/Note/AddNote

PUT /api/Note/UpdateNote

DELETE /api/Note/DeleteNote
```

Protected endpoints use the JWT token:

```http
Authorization: Bearer <token>
```

## 🗄️ Database

The application uses **Microsoft SQL Server** for data persistence.

Main entities include:

```text
Users
  │
  └── Notes
```

Each note is linked to a specific user.

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [.NET SDK](https://dotnet.microsoft.com/download)
- SQL Server
- SQL Server Management Studio
- Visual Studio or Visual Studio Code
- A modern web browser

### 1. Clone the Repository

```bash
git clone https://github.com/ahmadabuawwad4/notes-app.git
```

```bash
cd notes-app
```

### 2. Configure the Database

Update the connection string in:

```text
appsettings.json
```

Example:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=NotesAppDb;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

### 3. Apply Database Migrations

If the project uses Entity Framework Core migrations:

```bash
dotnet ef database update
```

### 4. Run the API

```bash
dotnet run
```

The API will start on the configured HTTP/HTTPS port.

### 5. Run the Frontend

Open the frontend using a local development server such as **Live Server** in Visual Studio Code.

## 🔐 Authentication Flow

The application uses JWT-based authentication.

```text
User Login
     ↓
Validate Credentials
     ↓
Generate JWT
     ↓
Store Token
     ↓
Send Token with API Requests
     ↓
Authorize Request
```

The frontend stores the authentication token in `sessionStorage` and sends it with protected API requests.

## 📱 Responsive Design

The frontend is designed to work across different screen sizes, including:

- 💻 Desktop
- 💻 Laptop
- 📱 Tablet
- 📱 Mobile

The application maintains the same visual design while adapting the layout to smaller screens.

## 📸 Screens

The application contains four main screens:

1. **Login**
2. **Register**
3. **Notes Dashboard**
4. **Note Editor**

## 🎯 Project Goals

This project was developed to practice and demonstrate real-world software development concepts, including:

- Building RESTful APIs
- Authentication and authorization
- Database design and integration
- Entity Framework Core
- CRUD operations
- Frontend-to-backend communication
- JavaScript ES6 modules
- API service organization
- Responsive web design
- Clean and maintainable project structure

## 🔮 Future Improvements

Possible future improvements include:

- ⭐ Favorite notes
- 🔍 Search and filtering
- 🏷️ Note categories and tags
- 📌 Pin important notes
- 🌙 Dark mode
- 📄 Pagination
- 🔄 Refresh token authentication
- ☁️ Cloud deployment
- 📎 File and image attachments

## 👨‍💻 Author

**Ahmad Abuawwad**

Software Engineering Graduate | .NET Developer

### Technologies & Skills

`C#` `ASP.NET Core` `Web API` `Entity Framework Core` `SQL Server` `JavaScript` `HTML` `CSS` `REST APIs` `Git` `GitHub`

---

⭐ If you find this project useful, consider giving it a star!
