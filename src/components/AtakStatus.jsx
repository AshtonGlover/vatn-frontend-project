import {React, useState, useEffect} from 'react';
import '../styles/CardStyles.css';

//component for the AtakStatus card
const AtakStatus = () => {

    //checks for data in local storage, or sets to the default values
    const [atak, setAtak] = useState(() => {
        const savedAtak = localStorage.getItem('atak');
        return savedAtak
            ?  JSON.parse(savedAtak) 
            : {
                connected: true
            }
    });

    //updates values at a frequency of 1 HZ
    useEffect(() => {
        const updateAtak = () => {
            setAtak(prevAtak => {
                const updatedAtak = {
                    ...prevAtak,
                    connected: !prevAtak.connected
                };

                localStorage.setItem('atak', JSON.stringify(updatedAtak));
                return updatedAtak;
            });
        };

        //update at a rate of 1 HZ
        const intervalId = setInterval(updateAtak, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="card">
            <h2>AtakStatus</h2>
            <p>Connected: {atak.connected ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default AtakStatus;