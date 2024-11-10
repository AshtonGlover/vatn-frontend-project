import { React, useState, useEffect } from "react";
import "../styles/CardStyles.css";

//component for the SystemStatus card
const SystemStatus = () => {

  //checks for data in local storage, or sets to the default values
  const [sysstat, setSysstat] = useState(() => {
    const savedSysstat = localStorage.getItem("sysstat");
    return savedSysstat
      ? JSON.parse(savedSysstat)
      : {
          autonomy_state: 2,
          mission_loaded: true,
          mission_start: false,
          counting_down: false,
          awake: true,
        };
  });

  //updates values at a frequency of 2 HZ
  useEffect(() => {
    const updateSysstat = () => {
      setSysstat((prevSysstat) => {
        const updatedSysstat = {
          ...prevSysstat,
          autonomy_state: (prevSysstat.autonomy_state + 1) % 5,
          mission_loaded: !prevSysstat.mission_loaded,
          mission_start: !prevSysstat.mission_start,
          counting_down: !prevSysstat.counting_down,
          awake: !prevSysstat.awake,
        };

        localStorage.setItem("sysstat", JSON.stringify(updatedSysstat));
        return updatedSysstat;
      });
    };

    //update at a rate of 2 HZ
    const intervalId = setInterval(updateSysstat, 500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="card">
      <h2>SystemStatus</h2>
      <p>Autonomy State: {sysstat.autonomy_state}</p>
      <p>Mission Loaded: {sysstat.mission_loaded ? "Yes" : "No"}</p>
      <p>Mission Start: {sysstat.mission_start ? "Yes" : "No"}</p>
      <p>Counting Down: {sysstat.counting_down ? "Yes" : "No"}</p>
      <p>Awake: {sysstat.awake ? "Yes" : "No"}</p>
    </div>
  );
};

export default SystemStatus;
