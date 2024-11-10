import { React, useState, useEffect } from "react";
import "../styles/CardStyles.css";

//component for the VehicleOdom card
const VehicleOdom = () => {

  //checks for data in local storage, or sets to the default values
  const [odom, setOdom] = useState(() => {
    const savedOdom = localStorage.getItem("odom");
    return savedOdom
      ? JSON.parse(savedOdom)
      : {
          northing: 10.0,
          easting: 655432.21635,
          zone: [19, "T"],
          depth: 15.0,
          heading: 59.5,
          pitch: 0.5,
          roll: 0.32,
        };
  });

  //updates values at a frequency of 5 HZ
  useEffect(() => {
    const updateOdom = () => {
      setOdom((prevOdom) => {
        const updatedOdom = {
          ...prevOdom,
          northing: prevOdom.northing + 0.1,
          easting: prevOdom.easting + 0.1,
          depth: prevOdom.depth + 0.01,
          heading: (prevOdom.heading + 1) % 360,
          pitch: prevOdom.pitch + 0.1,
          roll: prevOdom.roll + 0.05,
        };

        localStorage.setItem("odom", JSON.stringify(updatedOdom));
        return updatedOdom;
      });
    };

    //update at a rate of 5 HZ
    const intervalId = setInterval(updateOdom, 200);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="card">
      <h2>VehicleOdom</h2>
      <p>Northing: {odom.northing}</p>
      <p>Easting: {odom.easting}</p>
      <p>Zone: {odom.zone.join(", ")}</p>
      <p>Depth: {odom.depth} m</p>
      <p>Heading: {odom.heading}°</p>
      <p>Pitch: {odom.pitch}°</p>
      <p>Roll: {odom.roll}°</p>
    </div>
  );
};

export default VehicleOdom;
