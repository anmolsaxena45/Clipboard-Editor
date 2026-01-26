import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { toast } from "react-toastify";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem('pastes'))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    AddToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Paste Created", {
        position: "top-right", 
        autoClose: 2000, 
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style:{color: "black"}
      });
    },

    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0){
        state.pastes[index] = paste;
      }

      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      toast.success("Paste Updated", {
        position: "top-right", 
        autoClose: 2000, 
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style:{color: "black"}
      });
    },

    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");

      toast.success("Reset done", {
        position: "top-right", 
        autoClose: 2000, 
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style:{color: "black"}
      });
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0){
        state.pastes.splice(index, 1);

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste deleted", {
        position: "top-right", 
        autoClose: 2000, 
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style:{color: "black"}
      }
        );
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { AddToPastes, updateToPaste, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
