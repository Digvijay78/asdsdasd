const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
  };


 const accountReducer = (state = initialStateAccount  , action) => {
    switch (action.type) {
      case "account/deposit":
        return { ...state, balance: state.balance + action.payload };
  
      case "account/withraw":
        return { ...state, balance: state.balance - action.payload };
  
      case "account/requestLoan":
        if (state.loan > 0) return state;
        return {
          ...state,
          loan: action.payload.amount,
          balance: state.balance + action.payload.amount,
          loanPurpose: action.payload.purpose,
        };
  
      case "account/payloan":
        return {
          ...state,
          loan: 0,
          loanPurpose: "",
          balance: state.balance - state.loan,
        };
  
      case "createCustomer":
        return   
  
      default:
        return state;
    }
  };


  export function deposit(amount){
    return {type : "account/deposit" , payload: amount}
  }
  
  export function withraw(amount){
    return {type : "account/withraw" , payload: amount}
  }
  export function requestLoan(amount, purpose){
    return {type : "account/requestLoan" , payload : {amount : amount , purpose : purpose}}
  }
  export function payLoan(){
    return {type : "account/payloan" }
  }


  export default accountReducer;