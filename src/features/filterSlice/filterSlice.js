import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    
    searchedText:'',
    dataSorted:false
}

const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        search:(state,action)=>{
            state.searchedText=action.payload
        },
        sorted:(state,action)=>{
            state.dataSorted=action.payload;
        }

    }
})
export const {updateId,search,sorted} =filterSlice.actions
export default filterSlice.reducer; 