import {useState, useRef, useEffect} from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

import {Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'


const useStyles = makeStyles((theme) => ({
    appBar: {
      top: 'auto',
      bottom: 0,
    },

    buttonDesign:{
        backgroundColor: '#f0fffe',
        marginTop: '3%',
        boxShadow: '5px 5px 5px #2e2d2d',
        '&:hover': {
            backgroundColor: '#ffffff',

        }
    },

    textDesign:{
        backgroundColor: '#f0fffe',
        borderRadius: '4px',
        boxShadow: '5px 5px 5px #2e2d2d',
        '&:hover':{
            backgroundColor: '#ffffff',
            borderRadius: '4px',
        }
    }
}));


export default function AddData(){
    const classes = useStyles()

    const [message, setMessage] = useState('')
    const db = firebase.firestore()

    function getValue(event){
        setMessage(event.target.value)
    }

    function SendMessage(){ 
        let newDocRef=db.collection('messages').doc()
        newDocRef.set({
            text: message,
            createdAt: firebase.firestore.Timestamp.now(),
            doc_id: newDocRef.id
        })
        .then(()=>{
            console.log("Message sent!")
        })
        .catch(function (error){
            console.log("Error!! ", error)
            alert("Error!!!")
        })
    }

    function validateMessage(){
        if(message === ""){
            alert("Cannot send empty message!")
        }else{
            {SendMessage()}
        }
	}  

    return(    
            <Grid container style={{position: 'fixed'}} 
            className={classes.appBar}>
                <Grid item xs={1} sm={1} md={3} lg={1}></Grid>
                
                <Grid item xs={10} sm={10} md={6} lg={10}
                style={{textAlign: 'center', paddingTop: '1%', 
                paddingBottom: '1%'}}>
                    <div>
                        <TextField  id="outlined-basic" label="Message" 
                        variant="outlined" onChange={getValue}
                        value={message} className={classes.textDesign}/>
                        &nbsp;&nbsp;

                        <Button onClick={validateMessage}
                        className={classes.buttonDesign}>
                            Send 
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={1} sm={1} md={3} lg={1}></Grid>
            </Grid>
    )
}