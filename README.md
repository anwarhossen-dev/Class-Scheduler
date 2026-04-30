# Academic Atelier - Mini Class Scheduling System

A simple, real-world scheduling system for institutions where teachers can manage their availability and students can book 15-minute learning sessions. Built with a focus on clean logic, responsive UI/UX, and robust validation.

## 🚀 Live Demo
[https://class-scheduler-navy.vercel.app/]
email: anowar.gtrbd@gmail.com
pass: Kabir@1234

## 🛠️ Technology Stack
- **Frontend:** React.js (Vite)
- **Routing:** React Router Dom
- **State Management:** React Context API (Auth & Slots)
- **Styling:** Vanilla CSS (Glassmorphism & 3D Interactive UI)
- **UX:** SweetAlert2 (Confirmations) & Lucide-style iconography
- **Data Handling:** LocalStorage (Persists data across refreshes)

## ✨ Features Implemented

### 1. Teacher Dashboard
- **Profile Hub:** Displays the teacher's name and a live stats summary (Total, Available, Booked, Completed).
- **15-Min Slot Generator:** A clean form to add new sessions. The system automatically sets the duration to exactly 15 minutes.
- **Schedule Management:** A newest-first list of all created slots with status badges and deletion capabilities.

### 2. Student View
- **Personalized Portal:** Greets the student by name and tracks their total bookings.
- **Smart Catalog:** Shows only **upcoming available** slots. Past sessions are automatically filtered out for a clean experience.
- **One-Click Booking:** Claiming a slot instantly updates the global state and moves the session to the student's personal "My Bookings" section.

### 3. Smart Slot Rules (Business Logic)
- **Conflict Prevention:** Logic ensures that no two slots can overlap in time.
- **Time Validation:** Prevents adding sessions in the past.
- **Dynamic Availability:** Once booked, a slot instantly disappears from the available pool for all users.

## 🔑 Test Credentials
| Role | Email | Password |
| :--- | :--- | :--- |
| **Teacher** | teacher@atelier.com | 123456 |
| **Student** | student@atelier.com | 123456 |
*(Note: You can also Sign Up with any new email and choose your role.)*

## 📖 Final Step: Technical Explanations

### How I Handled Slot Conflicts
I used the interval overlap formula to ensure schedule integrity. Before adding a new slot, the system checks the proposed `start` and `end` times against all existing slots:
```javascript
const isOverlapping = slots.some(slot => {
  const existingStart = new Date(slot.startTime);
  const existingEnd = new Date(slot.endTime);
  return (proposedStart < existingEnd) && (proposedEnd > existingStart);
});
```
If this condition is true, the system blocks the creation and triggers an error notification.

### Project Structure
- **Contexts:** `AuthContext` (User sessions/roles) and `SlotContext` (Global schedule data/logic). This provides a single source of truth without "prop drilling."
- **Components:** Modularized into specific features (e.g., `TeacherDashboard`, `StudentView`, `NotificationCenter`).
- **Styling:** Feature-specific CSS files combined with a global theme for a consistent "Smart" international look.

## ⚙️ How to Run the Project
1. **Clone the repository:**
   ```bash
   git clone [your-repo-link]
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```
