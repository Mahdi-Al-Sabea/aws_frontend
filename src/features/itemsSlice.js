import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const response = await axios.get(import.meta.env.VITE_API_URL + '/api/items');
    return response.data;
});

export const addItem = createAsyncThunk('items/addItem', async (item) => {
    const response = await axios.post(import.meta.env.VITE_API_URL + '/api/items', item);
    return response.data;
});

export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/items/${id}`);
    return id;
});

const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    }
});

export default itemsSlice.reducer;
