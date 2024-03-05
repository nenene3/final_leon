import React from 'react'
import {doc,getDoc,updateDoc} from 'firebase/firestore'
import {db} from '../firebase-config'
export default function Task(props) {
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
      await deleteDoc(doc(db, props.id, name));

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
          props.isComplete ? "finish" : `${props.i % 2 == 0 ? "task1" : "task2"}`
        }`}
      >
        <p>{props.taskName}</p>
        <p>{props.details}</p>
        <label>
          {props.isComplete ? "finish" : "notfinish"}
          <input
            type="checkbox"
            name="done"
            id="done"
            onChange={() => updateStatus(props.id)}
            defaultChecked={props.isComplete}
          />
        </label>
        <br />
        <button onClick={() => remove(props.id)}>remove</button>
        <button>edit</button>
      </div>
    </div>
  );
}
