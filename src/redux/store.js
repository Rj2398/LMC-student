import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import subjectSlice from './slices/student/subjectSlice';
import studentSlice from './slices/student/studentSlice';
import lessionSlice from './slices/student/lessionSlice';

// Teacher Panel
import dashboardSlice from './slices/teacher/dashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    student: studentSlice,
    subject: subjectSlice,
    lession: lessionSlice,

    // Teacher Slices
    dashboard: dashboardSlice,
  }
});
