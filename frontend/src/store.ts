import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./api";
import type { ContentItem, ContentType, User } from "./types";

type AuthState = { user: User | null; token: string | null; loading: boolean };
type ContentState = { [K in ContentType]: ContentItem[] } & { loading: boolean };

const initialAuth: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  loading: false,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const { data } = await api.post("/auth/login", { email, password });
    return data as { token: string; user: User };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const fetchContentThunk = createAsyncThunk(
  "content/fetch",
  async (type: ContentType) => {
    const { data } = await api.get(`/content/${type}`);
    return { type, items: data as ContentItem[] };
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState: {
    package: [],
    visa: [],
    desk: [],
    cms: [],
    gallery: [],
    testimonial: [],
    contact: [],
    loading: false,
  } as ContentState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContentThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchContentThunk.fulfilled, (state, action) => {
      state.loading = false;
      state[action.payload.type] = action.payload.items;
    });
    builder.addCase(fetchContentThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    content: contentSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
