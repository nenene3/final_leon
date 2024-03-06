import React, { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db, auth } from "../firebase-config";
import {Box, Typography, Button} from "@mui/material"
export default function Logging() {
  let [user, setUser] = useState(null);
  let [password, setPassword] = useState(null);
  let [email, setEmail] = useState(null);
  

  useEffect(() => {
    let a = onAuthStateChanged(auth, (i) => {
      if (i) {
        setUser(i);
      } else {
        setUser(null);
      }
    });

    return () => a();
  }, []);

  const createUser = async () => {
    try {
      let u = await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };
  let log = async () => {
    try {
      let u = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };


  const mainContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    
  }
  // border: "1px solid white"


  const loggingForm = {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    bottom: "15%",
    gap: "1rem",
    justifyContent: "center",
    alignItems: "center",
  }

  const inputStyle = {
    width: "80%",
    textAlign: "center"
  }

  const btnStyle = {
    width: "80%",
    backgroundColor: "black"
  }

  return (
    <Box sx={mainContainerStyle}>
      {user ? (
        <Box>
          
          <button onClick={() => signOut(auth)}>sign out</button>
          {/* <button onClick={() => console.log(id)}>return</button> */}
          
        </Box>
      ) : (
        <Box sx={loggingForm}>
          <Typography variant="h3" color="initial">Sign in \ Register</Typography>
          <input
            style={inputStyle}
            type="text"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
          style={inputStyle}
            type="text"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
                <Button
            style={btnStyle}
            onClick={async () => {
              try {
                let a = await signInWithEmailAndPassword(auth, email, password);
              } catch (e) {
                console.error(e);
              }
            }}
          >
            Login
          </Button>
          <Button style={btnStyle} onClick={createUser}>Register</Button>
    
        </Box>
      )}
    </Box>
  );
}
