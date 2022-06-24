import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface IDataState {
  dataUserForm: IDataUserForm,
  dataPetForm: IDataPetForm,
}
export interface IDataUserForm{
  insurance: string,
  name:string,
  lastName: string,
  city: string,
  address: string,
  email:string,
}
export interface IDataPetForm{
  pet:string,
  datepet:string,
  namepet:string,
  agePet:number,
  weightPet: number,
  racePet: string,
  selection: (string)[],
  image: string
}
// Define the initial state using that type
const initialState: IDataState = {
  dataUserForm: {
    insurance: " ",
    name:" ",
    lastName: " ",
    city: " ",
    address: " ",
    email:" ",
  },
  dataPetForm: {
    pet: " ",
    datepet: " ",
    namepet: " ",
    agePet: 0,
    weightPet: 0,
    racePet: " ",
    selection: [],
    image: " ",
  }
};


export const slice = createSlice({
  name: 'dataUserForm',
  initialState,
  reducers: {
    dataUserForm: (state: IDataState, action: PayloadAction<IDataUserForm>) => {
      const value = action.payload
      state.dataUserForm = value;
    },
    dataPetForm: (state: IDataState, action: PayloadAction<IDataPetForm>) => {
      const value = action.payload
      state.dataPetForm = value;
    },
  },
});

export const { reducer } = slice;

export const { dataUserForm, dataPetForm } = slice.actions
