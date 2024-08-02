import React, { useEffect } from "react";
import "./CustomerSummary.scss";
import { AiFillContacts } from "react-icons/ai";
import { BiFemale, BiFoodMenu, BiMale } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_WOMEN,
  CALC_MEN,
  CALC_NORMAL,
  selectTotalWomen,
  selectTotalMen,
  selectTotalNormalPreference,
} from "../../../redux/features/customer/customerSlice";

// Icons
const menIcon = <BiMale size={40} color="#fff" />;
const totalCustomersIcon = <AiFillContacts size={40} color="#fff" />;
const normalPrefIcon = <BiFoodMenu size={40} color="#fff" />;
const womenIcon = <BiFemale size={40} color="#fff" />;

// Format Numbers
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CustomerSummary = ({ customers }) => {
  const dispatch = useDispatch();
  const totalWomen = useSelector(selectTotalWomen);
  const totalMen = useSelector(selectTotalMen);
  const totalNormalPreference = useSelector(selectTotalNormalPreference);

  useEffect(() => {
    dispatch(CALC_NORMAL(customers));
    dispatch(CALC_MEN(customers));
    dispatch(CALC_WOMEN(customers));
  }, [dispatch, customers]);

  return (
    <div className="customer-summary">
      <h3 className="--mt">Customer Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={totalCustomersIcon}
          title={"Total Attendees"}
          count={customers.length}
          bgColor="card1"
        />
        <InfoBox
          icon={menIcon}
          title={"Men"}
          count={totalMen}
          bgColor="card2"
        />
        <InfoBox
          icon={womenIcon}
          title={"Women"}
          count={totalWomen}
          bgColor="card3"
        />
        <InfoBox
          icon={normalPrefIcon}
          title={"Normal Pref"}
          count={totalNormalPreference}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default CustomerSummary;
