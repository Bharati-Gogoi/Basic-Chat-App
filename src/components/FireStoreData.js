import {useState, useEffect, useRef} from 'react'
import DeleteData from './DeleteData'

import firebase from 'firebase/app'
import 'firebase/firestore'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

export default function FireStoreData(){
    const dummy = useRef()
    const [msg, setMsg] = useState([])

    const [loading, setLoading] = useState(false)
    const ref = firebase.firestore().collection("messages")

    function getMessages(){
        setLoading(true)
        ref.orderBy("createdAt").onSnapshot((querySnapshot)=>{
            const items=[]
            querySnapshot.forEach((doc)=>{
                items.push(doc.data())
            })
            setMsg(items)
            setLoading(false)
            dummy.current.scrollIntoView({
                behavior: "smooth"
            })
        })
    }

    useEffect(()=>{
        getMessages()
    }, [])

    if(loading){
        return(
            <div style={{textAlign: 'center',
                background: "linear-gradient(#e69664, #9198e5)",
                padding: '1%'}}
                xs={10} sm={8} md={6} lg={10}>
                <h2>Loading...</h2>
                <br/>
            </div>
        ) 
    }

    return(
        <div style={{
            background: "linear-gradient(#e69664, #9198e5)"
        }}> 
            <Grid container>
                <Grid item xs={1} sm={2} md={3} lg={1}></Grid>
                
                <Grid item xs={10} sm={8} md={6} lg={10}>
                    <h1 style={{textAlign: 'center'}}>
                        CHAT APP  BY BG</h1>
                    {msg.map((info)=>(
                        <Paper key={info.id} style={{
                            backgroundColor: "#abc1db", 
                            color: "#404040",
                            padding: "3%",
                            margin: "1%",
                        }} xs={6} sm={6}>
                            {info.text}
                            <br/>
                            <div style={{ textAlign: 'right',
                                            color: '#78045d',
                                            fontSize: '12px',
                                            marginBottom: '3%',
                            }}>
                                <DeleteData docu={info.doc_id} /> 
                                <small>
                                    <b>
                                - <u>{new Date(info.createdAt.seconds * 1000)
                                .toLocaleDateString("en-US")}</u></b>
                                </small>
                            </div>
                        </Paper>
                    ))} 
                </Grid>

                <Grid item xs={1} sm={2} md={3} lg={1}></Grid>
            </Grid>

            <span ref={dummy}></span>
        </div>
    )

}

