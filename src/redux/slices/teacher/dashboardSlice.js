import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api.js";
import toast from "react-hot-toast";

//  Get All subject List
export const getSubjectLevel = createAsyncThunk("/student/getSubjectLevel", async (_, { rejectWithValue }) => {
  try {
    const response = await api.getSubjectLevel();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getSubjectsByLevel = createAsyncThunk("/student/getSubjectsByLevel", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getSubjectsByLevel(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getClassDetailBySubject = createAsyncThunk("/student/getClassDetailBySubject", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getClassDetailBySubject(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getSubjectInfo = createAsyncThunk("/student/getSubjectInfo", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getSubjectInfo(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getSubjectList = createAsyncThunk("/student/getSubjectList", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getSubjectList(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getTeacherSubDashboard = createAsyncThunk("/student/getTeacherSubDashboard", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getTeacherSubDashboard(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getTeacherLessionDetail = createAsyncThunk("/student/getTeacherLessionDetail", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getTeacherLessionDetail(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getBaselineSummitiveQuiz = createAsyncThunk("/student/getBaselineSummitiveQuiz", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getBaselineSummitiveQuiz(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const studentProfilePerformance = createAsyncThunk("/student/studentProfilePerformance", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.studentProfilePerformance(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState: {
    classLevels: null,
    allSubjects: null,
    classDetails: null,
    subjectInfo : null,
    subjectList: null,
    subDashboard: null,
    lessonInfo: null,
    baslineSummitiveInfo: null,
    studentProfileInfo:null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubjectLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.classLevels = action.payload?.data;
      })
      .addCase(getSubjectLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getSubjectsByLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectsByLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.allSubjects = action.payload?.data;
      })
      .addCase(getSubjectsByLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getClassDetailBySubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClassDetailBySubject.fulfilled, (state, action) => {
        state.loading = false;
        state.classDetails = action.payload?.data;
      })
      .addCase(getClassDetailBySubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getSubjectInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectInfo = action.payload?.data;
      })
      .addCase(getSubjectInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getSubjectList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectList.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectList = action.payload?.data;
      })
      .addCase(getSubjectList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getTeacherSubDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherSubDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.subDashboard = action.payload?.data;
      })
      .addCase(getTeacherSubDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getTeacherLessionDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherLessionDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.lessonInfo = action.payload;
      })
      .addCase(getTeacherLessionDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getBaselineSummitiveQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBaselineSummitiveQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.baslineSummitiveInfo = action.payload?.data;
      })
      .addCase(getBaselineSummitiveQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(studentProfilePerformance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(studentProfilePerformance.fulfilled, (state, action) => {
        state.loading = false;
        state.studentProfileInfo = action.payload?.data?.[0];
      })
      .addCase(studentProfilePerformance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

  },
});

export default dashboardSlice.reducer;
