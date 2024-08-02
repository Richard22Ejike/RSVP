import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerList from "../../components/customer/customerList/CustomerList";
import CustomerSummary from "../../components/customer/customerSummary/CustomerSummary";

import { getCustomers } from "../../redux/features/customer/customerSlice";

const Dashboard = () => {

  const dispatch = useDispatch();

  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const { customers, isLoading, isError, message } = useSelector(
    (state) => state.customer
  );

  useEffect(() => {
  
      dispatch(getCustomers());
    

    if (isError) {
      console.log(message);
    }
  }, [ isError, message, dispatch]);

  return (
    <div>
      <CustomerSummary customers={customers} />
      <CustomerList customers={customers} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
