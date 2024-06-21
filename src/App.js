import CreateCustomer from "./customers/CreateCustomer"
import Customer from "./customers/Customer";
import AccountOperations from "./accounts/AccountOperations";
import BalanceDisplay from "./accounts/BalanceDisplay";
import { useSelector } from "react-redux";

function App() {

  const store = useSelector((store) => store.customer.fullName)

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
 { !store ? <CreateCustomer /> : 
      <>
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
      </>
 }
    </div>
  );
}

export default App;
