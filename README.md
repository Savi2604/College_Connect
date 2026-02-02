# College Connect

A comprehensive web-based platform designed to streamline college management and communication. College Connect bridges the gap between students, advisors, and administrators with an intuitive interface for academic management.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [User Roles](#user-roles)
- [Technologies Used](#technologies-used)
- [File Descriptions](#file-descriptions)

## ✨ Features

### For Students
- **View Academic Records** - Access marks and course information
- **Attendance Tracking** - Check attendance records and statistics
- **Notes & Materials** - Download course materials and lecture notes
- **Leave Management** - Submit and track leave requests with status updates
- **Announcements** - Receive and view important college announcements
- **Responsive Dashboard** - Modern UI with easy navigation

### For Administrators
- **Manage Announcements** - Post college-wide announcements
- **Attendance Management** - Upload and manage student attendance records
- **Marks Management** - Upload and maintain student grade records
- **Course Materials** - Upload and distribute lecture notes
- **Leave Approval** - Review and approve/reject leave requests
- **Admin Dashboard** - Comprehensive management interface

### For Advisors
- **Leave Tracking** - Monitor and approve advisor leave requests
- **Status Management** - Track leave statuses and history

## 📁 Project Structure

```
College-Connect/
├── index.html                 # Homepage
├── login.html                # Authentication page
├── register.html             # User registration
├── css/
│   └── modern-ui.css         # Main stylesheet with modern design
├── js/
│   ├── auth.js               # Authentication and authorization logic
│   ├── firebase-config.js    # Firebase configuration and initialization
│   └── ui.js                 # UI interactions and DOM manipulation
├── admin/                    # Administrator dashboard
│   ├── index.html            # Admin home dashboard
│   ├── manage-leave.html     # Leave management interface
│   ├── advisor-leave.html    # Advisor leave tracking
│   ├── post-announcement.html# Announcement posting
│   ├── upload-attendance.html# Attendance upload
│   ├── upload-marks.html     # Marks upload
│   └── upload-notes.html     # Course notes upload
└── student/                  # Student portal
    ├── index.html            # Student dashboard
    ├── view-marks.html       # View grades
    ├── attendance.html       # Attendance records
    ├── view-notes.html       # Download materials
    ├── leave-request.html    # Submit leave request
    ├── leave-status.html     # Check leave status
    ├── announcements.html    # View announcements
    └── firebase-messaging-sw.js # Push notification support
```

## 🔧 Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for Firebase services
- No backend server required (Firebase Realtime Database)

## 📥 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd College-Connect
   ```

2. **No additional dependencies required** - The project uses CDN links for:
   - Font Awesome icons
   - EmailJS for email functionality
   - Firebase SDK for backend services
   - Google Fonts

3. **Open the application**
   - Open `index.html` in your web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

## ⚙️ Configuration

### Firebase Setup

The application is pre-configured with Firebase Realtime Database. Configuration details are in [js/firebase-config.js](js/firebase-config.js):

```javascript
- Project ID: college-connect-2cd42
- Database: asia-southeast1
- Storage: Enabled for file uploads
- Messaging: Push notifications configured
```

### Email Service

Email functionality is powered by EmailJS with public key: `neW5TN-qwxGTzjJrE`

## 🚀 Usage

### For Students

1. **Login/Register** - Create account or login with credentials
2. **Dashboard** - View quick access to all features
3. **View Marks** - Check grades and academic progress
4. **Track Attendance** - Monitor your attendance percentage
5. **Download Notes** - Access course materials
6. **Submit Leave** - Request leave with approval workflow
7. **View Announcements** - Stay updated on college news

### For Administrators

1. **Login** with admin credentials
2. **Dashboard** - Access all management features
3. **Post Announcements** - Share important updates
4. **Upload Attendance** - Batch upload attendance records
5. **Upload Marks** - Batch upload grade records
6. **Upload Notes** - Add course materials
7. **Manage Leave** - Review and process leave requests

### For Advisors

1. **Login** with advisor credentials
2. **Track Leave** - Monitor advisor leave requests
3. **Manage Status** - Update and track leave statuses

## 👥 User Roles

| Role | Access Level | Key Functions |
|------|--------------|---|
| **Student** | Limited | View marks, attendance, notes, submit leave requests, view announcements |
| **Administrator** | Full | Upload marks/attendance/notes, post announcements, manage leave, manage users |
| **Advisor** | Medium | Manage student leave, track leave status, upload materials |

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase Realtime Database
- **Authentication**: Firebase Authentication
- **Notifications**: Firebase Cloud Messaging
- **UI Framework**: Custom modern CSS with glass-morphism design
- **Icons**: Font Awesome 6.0
- **Fonts**: Google Fonts (Inter family)
- **Email**: EmailJS
- **Storage**: Firebase Cloud Storage

## 📄 File Descriptions

### HTML Files

| File | Purpose |
|------|---------|
| `index.html` | Landing page with navigation and welcome screen |
| `login.html` | User authentication interface |
| `register.html` | User registration form |
| `admin/index.html` | Admin dashboard hub |
| `student/index.html` | Student dashboard hub |

### JavaScript Files

| File | Purpose |
|------|---------|
| `js/auth.js` | Handles login, registration, and session management |
| `js/firebase-config.js` | Firebase initialization and configuration |
| `js/ui.js` | DOM manipulation and UI interactions |

### CSS Files

| File | Purpose |
|------|---------|
| `css/modern-ui.css` | Global styles, glass-morphism effects, responsive design |

## 🔐 Security Notes

- Store sensitive credentials in environment variables (not in config files)
- Enable Firebase security rules in production
- Validate all user inputs on the client and server side
- Use HTTPS in production
- Implement proper authentication tokens and session management

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop browsers (1920px and above)
- Tablets (768px - 1024px)
- Mobile devices (320px - 767px)

## 🎨 Design Features

- **Glass-morphism** effects for modern aesthetics
- **Dark theme** with purple accents
- **Smooth animations** and transitions
- **Accessibility** considerations
- **Intuitive navigation** across all roles

## 🚀 Future Enhancements

- Real-time notifications
- Video conferencing integration
- Advanced analytics dashboard
- Mobile app (React Native/Flutter)
- Multi-language support
- Dark/Light mode toggle
- Offline functionality (PWA)

## 📞 Support

For issues, questions, or feature requests, please contact the development team or create an issue in the repository.

## 📄 License

This project is the property of the College Connect initiative. All rights reserved.

---

**Last Updated**: January 2026  
**Version**: 1.0.0
