// import { createSlice } from '@reduxjs/toolkit';

// const bookingSlice = createSlice({
//   name: 'booking',
//   initialState: {
//     selectedService: null,
//     selectedSlot: null,
//   },
//   reducers: {
//     setBookingDetails: (state, action) => {
//       state.selectedService = action.payload.service;
//       state.selectedSlot = action.payload.slot;
//     },
//   },
// });

// export const { setBookingDetails } = bookingSlice.actions;
// export default bookingSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Service {
  _id: string;
  serviceId: string;
  name: string;
  date: string;
  price: number;
  duration: number;
  description: string;
}

interface Slot {
  _id: string;
  startTime: string;
  endTime: string;
  service: Service;
}


interface BookingState {
  selectedSlot: Slot | null;
  selectedService: Service | null;
}

const initialState: BookingState = {
  selectedSlot: null,
  selectedService: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSelectedSlot(state, action: PayloadAction<Slot>) {
      state.selectedSlot = action.payload;
    },
    setSelectedService(state, action: PayloadAction<Service>) {
      state.selectedService = action.payload;
    },
setBookingDetails: (state, action) => {
  state.selectedService = action.payload.service;
  state.selectedSlot = action.payload.slot;
},
    resetBooking(state) {
      state.selectedSlot = null;
      state.selectedService = null;
    },
  },
});

export const { setSelectedSlot, setSelectedService,setBookingDetails, resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
