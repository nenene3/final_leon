import React, { useState } from "react";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";
export default function EditTask(props) {
  let [d, setD] = useState("");
  let [name1, setName] = useState("");
  let updateStatus = async (name) => {
    if(!d || !name1){
      return;
    }
    try {
      let docChange = doc(db, props.user, name);
      const docSnap = await getDoc(docChange);

      let a = await updateDoc(docChange, {
        taskName: name1,
        details: d,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{display:"flex", flexDirection:"column", padding:"36px"}}>
      <input
        placeholder={props.taskName}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <input
        placeholder={props.details}
        onChange={(e) => {
          setD(e.target.value);
        }}
      ></input>
      <button onClick={() => updateStatus(props.id)}>submit</button>
    </div>
  );
}
