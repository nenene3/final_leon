import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { getAuth } from "firebase/auth";
import "./a.css";
import { db } from "../firebase-config";
import Task from "./Task";

import {Box, Typography, Button, Grid} from "@mui/material"

export default function Tasks() {
  let[email,setEmail]=useState("");
  let [user, setUser] = useState(null);
  let [taskName, setTaskName] = useState("");
  let [details, setDetails] = useState("");
  let [list, setList] = useState([]);
  let [listDisplay, setListDisplay] = useState([]);
  let [counter, setCounter] = useState(0);
  let getTime = () => {
    let currentdate = new Date();
    let datetime =
      "Created At: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    return datetime;
  };

  let add = async () => {
    if (!details || !taskName) return;
    try {
      let time = getTime();
      const docRef = await addDoc(collection(db, user), {
        taskName: taskName,
        details: details,
        modify: time,
        isComplete: false,
      });

      console.log("Document written with ID: ", docRef.id);
      window.location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("succc");
        setUser(user.uid)
        setEmail(user.email)
        const getUsersData = async () => {
          const arr = await getDocs(collection(db, user.uid));
          setList(
            arr.docs.map((element) => ({ ...element.data(), id: element.id }))
          );
          setListDisplay(
            arr.docs.map((element) => ({ ...element.data(), id: element.id }))
          );
        };
        getUsersData();
      } else {
        console.log(user);
      }
    });
  }, []);

  let remove = async (name) => {
    try {
      await deleteDoc(doc(db, user, name));

      // window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  let display = (e) => {
    setListDisplay(
      list.filter((val) => {
        return val.taskName.includes(e.target.value);
      })
    );
  };

  let updateStatus = async (name) => {
    try {
      let docChange = doc(db, user, name);
      const docSnap = await getDoc(docChange);

      let a = await updateDoc(docChange, {
        isComplete: !docSnap.data().isComplete,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const mainContainerStyle ={
    display: "flex",
    justifyContent: 'center',
    width: "100%",
    height: "100%",
  }

  const contentStyle = {
    width: "100%",    
  }

  const actionPanelStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    textAlign: "center",
    border: "1px solid white",
    backgroundColor: "black",
    padding: "1rem",
    height: "fit-content"
  }

  const createActionPanel = () => {

    const newTaskBtnStyle = {
      width: "100%",
      backgroundColor: "grey",
    }

    return (
      <Grid item sm={12} md={3} xs={12} sx={actionPanelStyle}>
        <Typography variant="h5" color="initial">
          Search Task:
        </Typography>
        <input type="text" onChange={(e) => display(e)} />
        <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
          <Typography variant="h5" color="initial">
            Add New Task:
          </Typography>
          <input
            type="text"
            placeholder="task name"
            onChange={(e) => setTaskName(e.target.value)}
          />
          <textarea
            style={{ height: "5rem" }}
            type="text"
            placeholder="details"
            onChange={(e) => setDetails(e.target.value)}
          />
        </Box>

        <Button sx={newTaskBtnStyle} onClick={add}>
          add task{" "}
        </Button>
      </Grid>
    );
  }

  const showTaskList = () => {
    return (
      <Grid item xs={12} sm={12} md={9} >
          {listDisplay.map((d, i) => {
            return (
              <Task key={i} isComplete={d.isComplete} taskName={d.taskName} details={d.details} id={d.id} modify={d.modify} i={i} user={user}/>
            );
          })}
          </Grid>
    )
  }

  return (
    <Box sx={mainContainerStyle}>
      {user ? (
        <Box width={"100%"} height={"100%"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <h1>Your Tasks: {email}</h1>
          <Grid container spacing={2} sx={contentStyle}>
            {createActionPanel()}
            {showTaskList()}
          </Grid>
        </Box>
      ) : (
        <Box>
          <h1>pls log in</h1>
        </Box>
        
      )}
      
    </Box>
  );
}
