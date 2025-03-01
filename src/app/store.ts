import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
import { apiSlice } from '../features/apiSlice';

// Persistence configurations for cart and auth
const cartPersistConfig = {
    key: 'cart',
    storage,
  };
  
  const authPersistConfig = {
    key: 'auth',
    storage,
  };
  
  // Persisted reducers
  const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
  const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: persistedCartReducer,
        auth: persistedAuthReducer,
        // admin: adminReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware), devTools: import.meta.env.DEV,
});

// Setup listeners for RTK Query's automatic refetching
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
