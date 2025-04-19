import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';
import { Product } from '@/types/Product';

interface UserState {
  id: string;
  email: string;
  password: string;
  cart: Product[];
  unitNumber: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
}

const initialState: UserState = {
  id: '',
  email: '',
  password: '',
  cart: [],
  unitNumber: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  phoneNumber: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setUnitNumber: (state, action: PayloadAction<string>) => {
      state.unitNumber = action.payload;
    },
    setStreet: (state, action: PayloadAction<string>) => {
      state.street = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
    setZipcode: (state, action: PayloadAction<string>) => {
      state.zipcode = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      state.cart = state.cart.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );
    },
    removeAllFromCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  setId,
  setEmail,
  setPassword,
  setUnitNumber,
  setStreet,
  setCity,
  setState,
  setZipcode,
  setPhoneNumber,
  addToCart,
  removeFromCart,
  removeAllFromCart,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
