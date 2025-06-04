import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';
import { Product } from '@/types/Product';
import { v4 as uuidv4 } from 'uuid';

export interface ProductInCart extends Product {
  quantity: number;
  taxAmt: number;
  totalAmt: number;
}

export interface Order extends ProductInCart {
  orderId: string;
  date: string;
}

interface UserState {
  role: string;
  id: string;
  email: string;
  password: string;
  cart: ProductInCart[];
  orders: Order[];
  firstName: string;
  lastName: string;
  unitNumber: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
  deliveryFee: number;
  paymentMethod: string;
}

const initialState: UserState = {
  role: '',
  id: '',
  email: '',
  password: '',
  cart: [],
  orders: [],
  firstName: '',
  lastName: '',
  unitNumber: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  phoneNumber: '',
  deliveryFee: 0,
  paymentMethod: '',
};

const getTaxAmt = (quantity: number, price: number): number => {
  return Number((0.05 * quantity * price).toFixed(2));
};

const getDeliveryFee = (): number => {
  return Number(Math.floor(Math.random() * 5 + 1).toFixed(2));
};

const getSubtotal = (quantity: number, price: number): number => {
  return Number((quantity * price).toFixed(2));
};

const getTotalAmt = (
  state: UserState,
  quantity: number,
  price: number
): number => {
  const taxAmt = getTaxAmt(quantity, price);
  const subTotal = getSubtotal(quantity, price);
  return Number((taxAmt + subTotal).toFixed(2));
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
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
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    addToCart: (state, action: PayloadAction<Product | ProductInCart>) => {
      const foundProduct = state.cart.find(
        (cartProduct) => cartProduct._id === action.payload._id
      );

      if (foundProduct) {
        //Cart must not be empty
        const taxAmt = getTaxAmt(foundProduct.quantity + 1, foundProduct.price);
        const totalAmt = getTotalAmt(
          state,
          foundProduct.quantity + 1,
          foundProduct.price
        );
        state.cart = state.cart.map((cartProduct) =>
          cartProduct._id === action.payload._id
            ? {
                ...cartProduct,
                quantity: cartProduct.quantity + 1,
                taxAmt,
                totalAmt,
              }
            : cartProduct
        );
      } else {
        //cart can be empty, can also be not empty
        if (state.cart.length === 0) {
          const randomDeliveryFee = getDeliveryFee();
          state.deliveryFee = randomDeliveryFee;
        }

        const taxAmt = getTaxAmt(1, action.payload.price);
        const totalAmt = getTotalAmt(state, 1, action.payload.price);
        const formattedProduct = {
          ...action.payload,
          quantity: 1,
          taxAmt: taxAmt,
          totalAmt: totalAmt,
        };
        state.cart.push(formattedProduct);
      }
    },
    removeFromCart: (state, action: PayloadAction<Product | ProductInCart>) => {
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
          const taxAmt = getTaxAmt(foundProductQty - 1, foundProduct.price);
          const totalAmt = getTotalAmt(
            state,
            foundProductQty - 1,
            foundProduct.price
          );
          state.cart = state.cart.map((cartItem) =>
            cartItem._id === action.payload._id
              ? {
                  ...cartItem,
                  taxAmt: taxAmt,
                  totalAmt: totalAmt,
                  quantity: cartItem.quantity - 1,
                }
              : cartItem
          );
        }
        if (state.cart.length === 0) {
          state.deliveryFee = 0;
        }
      }
    },

    removeProductFromCart: (
      state,
      action: PayloadAction<Product | ProductInCart>
    ) => {
      state.cart = state.cart.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );
      if (state.cart.length === 0) {
        state.deliveryFee = 0;
      }
    },
    removeAllFromCart: (state) => {
      state.cart = [];
    },
    addToOrders: (state, action: PayloadAction<Product | ProductInCart>) => {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const dateString = `${day}/${month}/${year}`;

      const foundProduct = state.cart.find(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (!foundProduct) return;
      const formattedOrderProduct = {
        ...foundProduct,
        date: dateString,
        orderId: uuidv4(),
      };
      state.orders.push(formattedOrderProduct);
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
  removeProductFromCart,
  addToOrders,
  setPaymentMethod,
  setRole,
  removeAllFromCart,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const getTotalQty = (state: RootState) =>
  state.user.cart.reduce(function (acc, cartItem) {
    return acc + cartItem.quantity;
  }, 0);
export const getTotalTax = (state: RootState) =>
  state.user.cart.reduce(function (acc, cartItem) {
    return acc + cartItem.taxAmt;
  }, 0);
export const getAllSubtotal = (state: RootState) =>
  state.user.cart.reduce(function (acc, cartItem) {
    return acc + cartItem.price * cartItem.quantity;
  }, 0);
export const getAllTotal = (state: RootState) =>
  state.user.cart.reduce((acc, cartItem) => acc + cartItem.totalAmt, 0) +
  state.user.deliveryFee;

export const getUserDeliveryFee = (state: RootState) => state.user.deliveryFee;
export const getCart = (state: RootState) => state.user.cart;
export const getAddress = createSelector([selectUser], (user) => ({
  unitNumber: user.unitNumber,
  street: user.street,
  city: user.city,
  zipcode: user.zipcode,
  state: user.state,
}));
export const getOrders = (state: RootState) => state.user.orders;
export const getPaymentMethod = (state: RootState) => state.user.paymentMethod;
export const getRole = (state: RootState) => state.user.role;

export default userSlice.reducer;
