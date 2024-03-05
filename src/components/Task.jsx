import React, { useState } from "react";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";
export default function Task(props) {
  let [done, setDone] = useState(props.isComplete);
  let updateStatus = async (name) => {
    try {
      let docChange = doc(db, props.user, name);
      const docSnap = await getDoc(docChange);

      let a = await updateDoc(docChange, {
        isComplete: !docSnap.data().isComplete,
      });
    } catch (err) {
      console.log(err);
    }
  };
  let remove = async (name) => {
    try {
      await deleteDoc(doc(db, props.user, name));
      
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <div
        title={props.modify}
        className={`${
          done ? "finish" : `${props.i % 2 == 0 ? "task1" : "task2"}`
        }`}
        onClick={(e) => {
          e.stopPropagation()
          updateStatus(props.id);
          setDone(!done);
        }}
      >
        <p>{props.taskName}</p>
        <p>{props.details}</p>

        <h3>{done ? "finish" : "notfinish"}</h3>
        <br />
        <button onClick={(e) => {remove(props.id) ;e.stopPropagation() }}>remove</button>
        <button>edit</button>
      </div>
    </div>
  );
}
