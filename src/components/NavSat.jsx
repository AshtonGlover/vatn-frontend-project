import { React, useState, useEffect } from "react";
import "../styles/CardStyles.css";

//component for the NavSat card
const NavSat = () => {

  //checks for data in local storage, or sets to the default values
  const [navsat, setNavSat] = useState(() => {
    const savedNavSat = localStorage.getItem("navsat");
    return savedNavSat
      ? JSON.parse(savedNavSat)
      : {
          latitude: 54.211324,
          longitude: 45.324341,
        };
  });

  //updates values at a frequency of 5 HZ
  useEffect(() => {
    const updateNavSat = () => {
      setNavSat((prevNavSat) => {
        const updatedNavSat = {
          ...prevNavSat,
          latitude: prevNavSat.latitude + 0.1,
          longitude: prevNavSat.longitude + 0.1,
        };

        localStorage.setItem("navsat", JSON.stringify(updatedNavSat));
        return updatedNavSat;
      });
    };

    //update at a rate of 5 HZ
    const intervalId = setInterval(updateNavSat, 200);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="card">
      <h2>NavSat</h2>
      <p>Latitude: {navsat.latitude}</p>
      <p>Longitude: {navsat.longitude}</p>
    </div>
  );
};

export default NavSat;
