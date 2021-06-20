import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
  Action,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  createTransform,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import taskReducer from "./slices/taskSlice";
import { APP_NAME } from "../config";
import { AuthState } from "../type/model";

const appReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  task: taskReducer,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState, action: Action): RootState => {
  if (action.type === "auth/logout") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const SetTransform = createTransform(
  (
    inboundState: AuthState
  ): Pick<AuthState, "accessToken" | "refreshToken"> => {
    return {
      accessToken: inboundState.accessToken,
      refreshToken: inboundState?.refreshToken || "",
    };
  },
  (outboundState: any) => {
    return outboundState;
  },
  { whitelist: ["auth"] }
);

const persistConfig = {
  key: APP_NAME,
  storage,
  whitelist: ["auth"],
  transforms: [SetTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer as never);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type AppDispatch = typeof store.dispatch;
const persistor = persistStore(store);

const S = { store, persistor };

export default S;
