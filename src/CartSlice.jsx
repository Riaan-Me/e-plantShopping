import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    cntCrt: 0,
    addedToCart: [],
    itmTotalCost: 0,
    crtTotalCost: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, description, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      //console.log(name)
      //console.log(existingItem);
      
      //console.log(existingCartItem)
      
      if (existingItem) {
        existingItem.quantity++;

      } else {
        state.items.push({ name, image, cost, quantity: 1 });
        state.addedToCart.push({name, image, description, cost, quantity: 1, itemtotalcost : cost.replace("$","")});
      }

    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload.name);
      console.log(state.items)
      state.addedToCart = state.addedToCart.filter(item => item.name !== action.payload.name);
      state.cntCrt = state.cntCrt - action.payload.quantity;
    },
    updateQuantity: (state, action) => {
      const { name, quantity, itemtotalcost } = action.payload;
      //const itemToUpdate = state.items.find(item => item.name === name);
      const itemToUpdate = state.addedToCart.find(item => item.name === name);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        
        itemToUpdate.itemtotalcost = itemtotalcost;
      }
    },
    addCartTotal: (state, action) => {
      state.cntCrt++;

    },
    remCartTotal: (state, action) => {
      state.cntCrt--;
    },

    updateCartCostTotal: (state, action) => {
      //state.crtTotalCost = action.payload;
      //console.log("Slice " & action.payload)

      //console.log(state.crtTotalCost);
    },
  },
});

export const { addItem, removeItem, updateQuantity, addCartTotal, remCartTotal, updateCartCostTotal } = CartSlice.actions;

export default CartSlice.reducer;
