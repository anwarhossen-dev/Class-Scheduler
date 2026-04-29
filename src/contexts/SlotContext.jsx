/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query 
} from 'firebase/firestore';

const SlotContext = createContext();

export const useSlots = () => useContext(SlotContext);

export const SlotProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { addNotification } = useNotifications();
  const [slots, setSlots] = useState([]);

  const teacherName = currentUser?.name || "Instructor"; 

  // Real-time synchronization with Firestore
  useEffect(() => {
    const q = query(collection(db, 'slots'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const slotsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSlots(slotsData);
    });
    return () => unsubscribe();
  }, []);

  const addSlot = async (startTimeStr) => {
    const start = new Date(startTimeStr);
    const end = new Date(start.getTime() + 15 * 60 * 1000); // 15 minutes later
    
    // Add a 1-minute grace period to prevent errors when selecting the current time
    const now = new Date(Date.now() - 60000); 

    if (start < now) {
      return { success: false, message: "Cannot add a slot in the past." };
    }

    const isOverlapping = slots.some(slot => {
      const s = new Date(slot.startTime);
      const e = new Date(slot.endTime);
      return start < e && end > s;
    });

    if (isOverlapping) {
      return { success: false, message: "This slot overlaps with an existing one." };
    }

    try {
      await addDoc(collection(db, 'slots'), {
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        status: 'Available',
        teacherName: teacherName,
        teacherId: currentUser?.id 
      });
      addNotification(`New slot created for ${new Date(start).toLocaleTimeString()}`, 'success');
      return { success: true, message: "Slot added successfully!" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const deleteSlot = async (slotId) => {
    try {
      await deleteDoc(doc(db, 'slots', slotId));
      addNotification(`Slot deleted successfully`, 'warning');
      return { success: true, message: "Slot deleted successfully!" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const bookSlot = async (slotId) => {
    try {
      const slotRef = doc(db, 'slots', slotId);
      await updateDoc(slotRef, {
        status: 'Booked',
        studentId: currentUser?.id
      });
      addNotification(`Session booked successfully!`, 'success');
      return { success: true, message: "Slot booked successfully!" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const completeSlot = async (slotId) => {
    try {
      const slotRef = doc(db, 'slots', slotId);
      await updateDoc(slotRef, { status: 'Completed' });
      addNotification(`Session marked as Completed! ✅`, 'success');
      return { success: true, message: "Slot completed!" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const teacherSlots = currentUser?.role === 'Teacher' 
    ? slots.filter(s => s.teacherId === currentUser?.id) // Use 'id' from AuthContext
    : [];

  return (
    <SlotContext.Provider value={{ 
      slots, 
      addSlot, 
      deleteSlot,
      bookSlot, 
      completeSlot,
      teacherName, 
      teacherSlots,
      totalSlots: teacherSlots.length 
    }}>
      {children}
    </SlotContext.Provider>
  );
};
