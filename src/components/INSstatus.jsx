import { React, useState, useEffect } from "react";
import "../styles/CardStyles.css";

//component for the INSstatus card
const INSstatus = () => {

  //checks for data in local storage, or sets to the default values
  const [ins, setINS] = useState(() => {
    const savedINS = localStorage.getItem("ins");
    return savedINS
      ? JSON.parse(savedINS)
      : {
          aligned: true,
          pos_valid: false,
          heading_valid: false,
          dvl_recv: true,
          dvl_used: false,
          lat_accuracy: 456.654,
          lon_accuracy: 854645.646,
        };
  });

  //updates values at a frequency of 1 HZ
  useEffect(() => {
    const updateINS = () => {
      setINS((prevINS) => {
        const updatedINS = {
          ...prevINS,
          aligned: !prevINS.aligned,
          pos_valid: !prevINS.pos_valid,
          heading_valid: !prevINS.heading_valid,
          dvl_recv: !prevINS.dvl_recv,
          dvl_used: !prevINS.dvl_used,
          lat_accuracy: prevINS.lat_accuracy + 1,
          lon_accuracy: prevINS.lon_accuracy + 1,
        };

        localStorage.setItem("ins", JSON.stringify(updatedINS));
        return updatedINS;
      });
    };

    //update at a rate of 1 HZ
    const intervalId = setInterval(updateINS, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="card">
      <h2>INSstatus</h2>
      <p>Aligned: {ins.aligned ? "Yes" : "No"}</p>
      <p>Position Valid: {ins.pos_valid ? "Yes" : "No"}</p>
      <p>Heading Valid: {ins.heading_valid ? "Yes" : "No"}</p>
      <p>DVL Received: {ins.dvl_recv ? "Yes" : "No"}</p>
      <p>DVL Used: {ins.dvl_used ? "Yes" : "No"}</p>
      <p>Latitude Accuracy: {ins.lat_accuracy}</p>
      <p>Longitude Accuracy: {ins.lon_accuracy}</p>
    </div>
  );
};

export default INSstatus;
