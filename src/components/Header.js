import React from "react";
import ticketsImage from "../img/ticket.png";

function Header() {
  return (
    <React.Fragment>
      <h1>Help Queue</h1>
      <img src={ticketsImage} alt="A paper ticket with the text 'support ticket' and a life preserver icon on it" />
    </React.Fragment>
  );
}

export default Header;