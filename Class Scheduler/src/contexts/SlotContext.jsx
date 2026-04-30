/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const SlotContext = createContext();

export const useSlots = () => useContext(SlotContext);

export const SlotProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [slots, setSlots] = useState(() => {
    const savedSlots = localStorage.getItem('class-slots');
    return savedSlots ? JSON.parse(savedSlots) : [];
  });

  const teacherName = currentUser?.name || "Instructor"; 

  useEffect(() => {
    localStorage.setItem('class-slots', JSON.stringify(slots));
  }, [slots]);

  const addSlot = (startTimeStr) => {
    const start = new Date(startTimeStr);
    const end = new Date(start.getTime() + 15 * 60 * 1000); // 15 minutes later
    const now = new Date();

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

    const newSlot = {
      id: crypto.randomUUID(),
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      status: 'Available',
      teacherName: teacherName
    };

    setSlots(prev => [...prev, newSlot]);
    return { success: true, message: "Slot added successfully!" };
  };

  const bookSlot = (slotId) => {
    setSlots(prev => prev.map(slot => 
      slot.id === slotId ? { ...slot, status: 'Booked' } : slot
    ));
    return { success: true, message: "Slot booked successfully!" };
  };

  // Dynamically update status for past slots
  const processedSlots = slots.map(slot => {
    const now = new Date();
    if (new Date(slot.endTime) < now && slot.status !== 'Completed') {
      return { ...slot, status: 'Completed' };
    }
    return slot;
  });

  return (
    <SlotContext.Provider value={{ 
      slots: processedSlots, 
      addSlot, 
      bookSlot, 
      teacherName, 
      totalSlots: processedSlots.length 
    }}>
      {children}
    </SlotContext.Provider>
  );
};
