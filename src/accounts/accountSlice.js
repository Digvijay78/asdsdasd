import {createSlice} from "@reduxjs/toolkit"
const initialState= {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading : false,
  };

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers : {
    deposit(state,action){
      state.balance = state.balance + action.payload
      state.isLoading = false
    },
    withraw(state,action){
     state.balance = state.balance - action.payload
    },
    requestLoan:{
      prepare(amount,purpose){
        return {payload : {amount,purpose}}
      },
      
      reducer(state,action){
        if(state.loan > 0) return ;
        state.loan = action.payload.amount
        state.loanPurpose = action.payload.purpose
        state.balance = state.balance  + action.payload.amount
        
      }
    },
    payLoan(state,action){
      state.balance = state.balance - state.loan
       state.loan = 0;
       state.loanPurpose = ""

    },
    convertAmount(state,action){
      state.isLoading = true
      
    }

  }
})

// console.log(accountSlice);
  
export const { withraw, requestLoan, payLoan} = accountSlice.actions

export function deposit(amount , currency){
      if(currency === 'USD')
      return {type : "account/deposit" , payload: amount}
      else{
         
        return async function (dispatch, getState) {
          dispatch({type: "account/convertingCurrency" })
          const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
          const data = await res.json()
          console.log(data);
          const convertedAmount = data.rates.USD
          
          dispatch({type: "account/deposit" , payload: convertedAmount})
        }
      }
    }


export default accountSlice.reducer












//  const accountReducer = (state = initialStateAccount  , action) => {
//     switch (action.type) {
//       case "account/deposit":
//         return { ...state, balance: state.balance + action.payload , isLoading: true };
  
//       case "account/withraw":
//         return { ...state, balance: state.balance - action.payload };
  
//       case "account/requestLoan":
//         if (state.loan > 0) return state;
//         return {
//           ...state,
//           loan: action.payload.amount,
//           balance: state.balance + action.payload.amount,
//           loanPurpose: action.payload.purpose,
//         };
  
//       case "account/payloan":
//         return {
//           ...state,
//           loan: 0,
//           loanPurpose: "",
//           balance: state.balance - state.loan,
//         }; 

//         case "account/convertingCurrency":
//           return {...state, isLoading:true}
  
//       default:
//         return state;
//     }
//   };


//   export function deposit(amount , currency){
//     if(currency === 'USD')
//     return {type : "account/deposit" , payload: amount}
//     else{
       
//       return async function (dispatch, getState) {
//         dispatch({type: "account/convertingCurrency" })
//         const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
//         const data = await res.json()
//         console.log(data);
//         const convertedAmount = data.rates.USD
        
//         dispatch({type: "account/deposit" , payload: convertedAmount})
//       }
//     }
//   }
  
//   export function withraw(amount){
//     return {type : "account/withraw" , payload: amount}
//   }
//   export function requestLoan(amount, purpose){
//     return {type : "account/requestLoan" , payload : {amount : amount , purpose : purpose}}
//   }
//   export function payLoan(){
//     return {type : "account/payloan" }
//   }


//   export default accountReducer;