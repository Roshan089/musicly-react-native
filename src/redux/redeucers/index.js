import { combineReducers }  from "redux";
import {allsongsReducer} from  './allsongsReducers';

const reducers = combineReducers({
    allsongs: allsongsReducer,
    
})


export default reducers;

