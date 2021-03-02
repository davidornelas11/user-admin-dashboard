import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {userData, listingData} from '../data'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';

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

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

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
    
    
    const handleOpen = (person) => {
        setPersonForModal(person)
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };



    const handleChange = (e) => {
        setUserInputForValidating(e.target.value);
    } 

    const form = (
        <form className={classes.root} noValidate autoComplete="off">
        <TextField 
        id="standard-basic" 
        label="User Lookup" 
        onChange={handleChange}
        />
      </form>
    )


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
            }
        })}
      </List>
    
    )

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{personForModal.displayName}</h2>
          <p id="simple-modal-description"> 
            
          </p>
          <img src={personForModal.photoURL} /> 
          
        </div>
      );
    


    return (
        <>
      {form}
      {peopleList}
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
