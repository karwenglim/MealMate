import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';
import { Product } from '@/types/Product';

// export interface Product {
//   _id: string;
//   name: string;
//   category: string;
//   price: number;
//   offerPrice: number;
//   image: StaticImageData[];
//   description: string[];
//   ratings: number;
//   createdAt: string;
//   updatedAt: string;
//   inStock: boolean;
//   seller: string;
// }
interface ProductInCart extends Product {
  quantity: number;
}

interface UserState {
  id: string;
  email: string;
  password: string;
  cart: ProductInCart[];
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
      const foundProduct = state.cart.find(
        (cartProduct) => cartProduct._id === action.payload._id
      );
      if (foundProduct) {
        state.cart = state.cart.map((cartProduct) =>
          cartProduct._id === action.payload._id
            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            : cartProduct
        );
      } else {
        const formattedProduct = { ...action.payload, quantity: 1 };
        state.cart.push(formattedProduct);
      }
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const foundProduct = state.cart.find(
        (cartProduct) => cartProduct._id === action.payload._id
      );
      if (foundProduct) {
        const foundProductQty = foundProduct.quantity;
        if (foundProductQty === 1) {
          state.cart = state.cart.filter(
            (cartItem) => cartItem._id !== action.payload._id
          );
        } else {
          state.cart = state.cart.map((cartItem) =>
            cartItem._id === action.payload._id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
        }
      }
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
