import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import React, { useState } from 'react';

function TicketControl() {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     formVisibleOnPage: false,
  //     mainTicketList: [],
  //     selectedTicket: null,
  //     editing: false
  //   };
  // }

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);

  const handleClick = () => {
    if (this.state.selectedTicket != null) {
      setFormVisibleOnPage(false);  
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        // editing: false
        // potentially the wrong state value was removed in lesson https://full-time.learnhowtoprogram.com/react/react-with-nosql/refactoring-help-queue-to-use-hooks
      });
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleDeletingTicket = (id) => {
    const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      mainTicketList: newMainTicketList,
      selectedTicket: null
    });
  }

  const handleEditClick = () => {
    this.setState({editing: true});
  }

  const handleEditingTicketInList = (ticketToEdit) => {
    const editedMainTicketList = this.state.mainTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);
    this.setState({
        mainTicketList: editedMainTicketList,
        editing: false,
        selectedTicket: null
      });
  }

  const handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = this.state.mainTicketList.concat(newTicket);
    this.setState({ mainTicketList: newMainTicketList });
  }

  const handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
    setFormVisibleOnPage(false)
  }

  let currentlyVisibleState = null;
  let buttonText = null;


  if (this.state.editing ) {      
    currentlyVisibleState = <EditTicketForm 
      ticket = {this.state.selectedTicket} 
      onEditTicket = {this.handleEditingTicketInList}
      />
    buttonText = "Return to Ticket List";
  } else if (this.state.selectedTicket != null) {
    currentlyVisibleState = <TicketDetail 
      ticket = {this.state.selectedTicket} 
      onClickingDelete = {this.handleDeletingTicket} 
      onClickingEdit = {this.handleEditClick} 
      />
    buttonText = "Return to Ticket List";
  } else if (formVisibleOnPage) {
    currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
    buttonText = "Return to Ticket List";
  } else {
    currentlyVisibleState = <TicketList 
      ticketList={this.state.mainTicketList}
      onTicketSelection={this.handleChangingSelectedTicket}
    />;
    buttonText = "Add Ticket";
  }

  return (
    <React.Fragment>
      {currentlyVisibleState}
      <button onClick={this.handleClick}>{buttonText}</button>
    </React.Fragment>
  );

}

export default TicketControl;