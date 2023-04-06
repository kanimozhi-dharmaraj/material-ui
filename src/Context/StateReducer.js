export const initialState = {
    tasks : [],
    isLoggedIn : JSON.parse(localStorage.getItem('isLoggedIn')) || false
 }
 export const stateReducer = (state,action)=>{
     console.log('state',state, 'action',action)
     switch(action.type){
        
         case "ADD_TASK" : return{
             ...state,
             tasks : action.payload,
         };
         case "DELETE_TASK" : return{
             ...state,
             tasks : action.payload,
         };
         case "UPDATE_TASK" : return{
             ...state,
             tasks : action.payload,
         };
         case "ASC_TASK" : return{
             ...state,
             tasks : action.payload,
         };
         case "DESC_TASK" : return{
             ...state,
             tasks : action.payload,
         };
         case "ALL_TASK" : return{
             ...state,
             tasks : action.payload,
         };
         case "FILTERED" : return{
             ...state,
             tasks : action.payload,
         };
         case "UPDATE" : return{
             ...state,
             tasks : action.payload,
         };
         case "CHECKED" : return{
             ...state,
             tasks : action.payload,
         };
         case "SEARCH" : return{
             ...state,
             tasks : action.payload,
         };
         case "TASKS" : return{
             ...state,
             tasks : action.payload,
         };
         case "LOGIN" : return{
             ...state,
             isLoggedIn : action.payload,
         };
 
         default:return state
     }
     //return state;
 }