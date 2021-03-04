import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {userData, listingData} from '../data'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';

////////////////////////
// Styles for components
////////////////////////
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        padding: 'auto'
      },
    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
      paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
  }));

  
  ////////////////////////
  // Sets basic CSS for modal
  ////////////////////////
  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

////////////////////////////
// Check if name includes user input
////////////////////////////
const funcForList = (input, name) => {
    let tempInput = input.toLowerCase();
    let tempName = name.toLowerCase();
    return tempName.includes(tempInput)
      
} 
  


  export default function UserLookup() {
    const classes = useStyles();
    const [userInputForValidating, setUserInputForValidating] = useState('')
    const [personForModal, setPersonForModal] = useState('')
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    
    
    /////////////////////////////
    // handles state change for open and closed Modal
    // and sets person as state for modal info
    /////////////////////////////
    const handleOpen = (person) => {
        setPersonForModal(person)
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };



    //////////////////////////
    // Updates search criteria for list of people
    //////////////////////////
    const handleChange = (e) => {
        setUserInputForValidating(e.target.value);
    } 


    ////////////////////////
    // Search field
    ////////////////////////
    const form = (
        <form className={classes.root} noValidate autoComplete="off">
        <TextField 
        id="standard-basic" 
        label="User Lookup" 
        onChange={handleChange}
        />
      </form>
    )


    //////////////////////////
    // Maps through users and adds onCLick for modal to open
    //////////////////////////
    const peopleList = (
        <List dense className={classes.list}>
        {userData.map((value) => {
            if (funcForList(userInputForValidating, value.displayName)){
                return (
                <ListItem 
                key={value.defaultListingId} 
                button
                onClick = {() => handleOpen(value)}
                >
                <ListItemText  primary={value.displayName} />
                
                </ListItem>
                )
            } else {
                return
            }
        })}
      </List>
    
    )

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{personForModal.displayName}</h2>
          <img src={personForModal.photoURL} /> 
          <p id="simple-modal-description"> 
            Created: {personForModal.createdAt} <br/>
            Default Listing ID: {personForModal.defaultListingId} <br/>
            
            Listings: { personForModal.listings !== undefined ? personForModal.listings.map(listing => <ul>
                <li>
                    listing ID: {listing.id}
                </li>
                <li>
                    role: {listing.role}
                </li>
                </ul>) : <span>No listings to show</span>} <br/>
            Number: {personForModal.number} <br/>
            Pending Listing ID: {personForModal.pendingListingId} <br/>

            Verification: {personForModal.verification !== undefined ? 
                <>
                <span>   Amount: {personForModal.verification.amount}</span> <br/>
                <span>   DocumentURL: <a href = {personForModal.verification.documentURL} 
                target="_blank" rel="noopener noreferrer"> 
                Document Url
                </a>
                </span> <br/>
                <span>   Lender: {personForModal.verification.lender}</span> <br/>
                <span>   Loan Type: {personForModal.verification.loanType}</span> <br/>  
                <span>   Status: {personForModal.verification.status}</span> <br/>
                <span>   Verification Type: {personForModal.verification.verifType}</span> <br/>
                </>
                : <span>Nothing to show</span>
                
            }


          </p>
          
          
        </div>
      );
    


    return (
        <>
        <div className="user-lookup">
      {form}
      {peopleList}
      </div>
      <Modal

          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </>
    );
  }
