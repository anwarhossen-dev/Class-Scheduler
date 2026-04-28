# Class Scheduler - Complete Project Documentation

## 📋 Project Overview
A full-stack class scheduling application allowing teachers to create and manage time slots, and students to book available sessions. Built with React 18, Vite, and localStorage for persistence.

---

## ✨ Features Implemented

### 1. **Authentication System**
- ✅ User registration (Email, Password, Name, Role selection)
- ✅ Login functionality
- ✅ Role-based access (Teacher/Student)
- ✅ Session persistence using localStorage
- ✅ Logout functionality
- ✅ Form validation

### 2. **Teacher Dashboard**
- ✅ Create 15-minute time slots
- ✅ View all created slots with status (Available/Booked)
- ✅ Overlap detection for slot creation
- ✅ Cannot create slots in the past
- ✅ Display teacher name and total slots created
- ✅ Real-time slot updates

### 3. **Student View**
- ✅ View available slots only
- ✅ Book slots with one-click
- ✅ See instructor information
- ✅ Display time and date information
- ✅ Confirmation message after booking

### 4. **Navigation**
- ✅ Sticky navbar with brand
- ✅ Navigation links for Teacher Dashboard and Student View
- ✅ Display current user email
- ✅ Logout button

### 5. **Styling & UX**
- ✅ Modern, responsive design
- ✅ Gradient buttons and typography
- ✅ Smooth hover effects and animations
- ✅ Color-coded status badges (Available/Booked)
- ✅ Mobile-responsive layout
- ✅ Custom CSS variables for theming

---

## 📁 Project Structure

```
Class Scheduler/
├── package.json                 # Project dependencies & scripts
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point
├── public/                     # Static assets
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Main app component with routing
│   ├── App.css                # Global styles
│   ├── index.css              # Global CSS variables
│   ├── firebase.js            # Firebase configuration (for future use)
│   ├── assets/                # Image/media assets
│   ├── Components/
│   │   ├── Auth.jsx           # Login/Signup component
│   │   ├── TeacherDashboard.jsx # Teacher interface
│   │   ├── StudentView.jsx    # Student booking interface
│   │   └── navbar.jsx         # Navigation component
│   └── contexts/
│       ├── AuthContext.jsx    # Authentication state & methods
│       └── SlotContext.jsx    # Slots state & booking logic
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation & Running

```bash
# Navigate to project directory
cd "Class Scheduler"

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

The app will be available at `http://localhost:5173`

---

## 🔐 User Roles & Workflows

### Teacher Workflow
1. **Sign Up** → Select "Teacher" role
2. **Login** → Navigate to Teacher Dashboard
3. **Create Slots** → Set datetime for new 15-minute sessions
4. **Manage Slots** → View all created slots with booking status
5. **View Stats** → See name and total slots created

### Student Workflow
1. **Sign Up** → Select "Student" role
2. **Login** → Navigate to Student View
3. **Browse Slots** → See all available slots by instructor
4. **Book Slot** → Click "Reserve Spot" button
5. **Confirmation** → Receive booking confirmation

---

## 💾 Data Storage

### localStorage Keys
- **`app_users`** - Array of all registered users
- **`current_session`** - Currently logged-in user
- **`class-slots`** - All created slots

### User Object
```javascript
{
  id: number,
  email: string,
  password: string,
  name: string,
  role: "Teacher" | "Student"
}
```

### Slot Object
```javascript
{
  id: string (UUID),
  startTime: ISO timestamp,
  endTime: ISO timestamp,
  status: "Available" | "Booked",
  teacherName: string
}
```

---

## 🎨 Design System

### Color Palette
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#10b981` (Green)
- **Danger**: `#f43f5e` (Red)
- **Warning**: `#f59e0b` (Amber)
- **Background**: `#fcfcfd`

### Typography
- **Font**: Plus Jakarta Sans
- **Headings**: 800 weight, -0.05em spacing
- **Body**: 400-600 weight

---

## 🔄 Routing Structure

| Route | Component | Access |
|-------|-----------|--------|
| `/login` | Auth | Public |
| `/teacher` | TeacherDashboard | Teacher only |
| `/student` | StudentView | Student only |
| `/` | Redirect to `/login` | - |

---

## ⚙️ Technologies Used

- **React 18.3** - UI framework
- **Vite 8.0** - Build tool
- **React Router 6.3** - Routing
- **Firebase 12.12** - Backend (config ready)
- **ESLint** - Code quality
- **CSS3** - Styling with custom properties

---

## 🐛 Testing the App

### Test Accounts (After Running)
Since the app uses localStorage, you can:

1. **Create a Teacher Account**
   - Email: `teacher@example.com`
   - Password: `test123`
   - Name: `Dr. Smith`

2. **Create a Student Account**
   - Email: `student@example.com`
   - Password: `test123`
   - Name: `John Doe`

### Test Workflow
1. Log in as Teacher → Create a slot
2. Log out
3. Log in as Student → Book the slot
4. Switch back to Teacher → See booking status

---

## 🚀 Future Enhancements

- [ ] Firebase Realtime Database integration
- [ ] Email notifications for bookings
- [ ] Slot cancellation/rescheduling
- [ ] Rating and reviews system
- [ ] Calendar view integration
- [ ] Admin panel
- [ ] Payment integration
- [ ] Attendance tracking
- [ ] Dark mode toggle
- [ ] Multi-language support

---

## 📝 Notes

- **No Backend Required**: Currently uses localStorage for data persistence
- **Firebase Ready**: Config is set up but not actively used
- **Mobile Friendly**: Responsive design works on all screen sizes
- **Demo Data**: Create test accounts to explore features

---

## ✅ Project Status: COMPLETE & FUNCTIONAL

All core features are implemented and tested. The application is ready for use and further customization.

**Last Updated**: April 28, 2026
