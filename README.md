# Project Structure

All of the React components can be found within the components folder, and all styling comes from the styles folder. index.js renders the App component, which then renders each of the individuals cards. 

# Overview

To run this project, make sure you are within the vatn-frontend-project directory, and then type 
npm start in your terminal. This will launch the application in your browser. The web interface is
layed out with 5 different cards: VehicleOdom, AtakStatus, NavSat, INSstatus, and SystemStatus. Each of these
cards are represented as their own react component which have their values 
updated at their respective frequencies. The way that their values are updated is done randomly currently to 
simulate values coming in from the backend. All of the values start at the default, and then are updated 
either by toggling their boolean value or just adding some value to the number to simulate the updating 
logic. Upon reloading, the values will remain in their current format due to the use of local storage. 