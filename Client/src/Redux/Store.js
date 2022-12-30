import { combineReducers, configureStore } from '@reduxjs/toolkit';
import sampleReducer from './Slice';

const rootReducer =combineReducers({
    sample:sampleReducer
})
const Store = configureStore({reducer:rootReducer});
export default Store;