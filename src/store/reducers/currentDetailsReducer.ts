import { CLEAR_REFS, SAVE_CURRENT_DATA,  SAVE_REFS,  SAVE_USER_DETAILS, TOGGLE_SIGN_IN } from "../types";

let initialState={
    selected:null,
    username:null,
    signIn:false,
    id:null,
    refs:[]
}
let currentDetailsReducer=(state=initialState, action:any)=>{
    switch(action.type){
        case SAVE_CURRENT_DATA:{
            return{
                ...state,
                selected:action.payload
            }
        }
        case SAVE_USER_DETAILS:{
            return{
                ...state,
                username:action.payload.username,
                id:action.payload.id
            }
        }
        case TOGGLE_SIGN_IN:{
            return {
                ...state,
                signIn:!state.signIn
            }
        }
        case SAVE_REFS:{
            return{
                ...state,
                refs:[...state.refs, action.payload]
            }
        }
        case CLEAR_REFS:{
            return{
                ...state,
                refs:[]
            }
        }
        default:{
            return{
                ...state
            }
        }
    }
}

export default currentDetailsReducer;