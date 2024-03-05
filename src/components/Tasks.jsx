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
export default function Task() {
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

      window.location.reload();
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
      console.log(docSnap);
      console.log(docSnap);
      let a = await updateDoc(docChange, {
        isComplete: !docSnap.data().isComplete,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>your tasks </h1>
      <h2>search task {email}</h2>

      <input type="text" onChange={(e) => display(e)} />
      <br />
      <br />

      <form style={{ display: "inline-flex", border: "solid black 6px" }}>
        <div>
          <input
            type="text"
            placeholder="task name"
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="text"
            placeholder="details"
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
      </form>

      <button onClick={add}>add task </button>

      {listDisplay.map(function (d, i) {
        return (
          <div
            title={d.modify}
            className={`${
              d.isComplete ? "finish" : `${i % 2 == 0 ? "task1" : "task2"}`
            }`}
          >
            <p>{d.taskName}</p>
            <p>{d.details}</p>
            <label>
              {d.isComplete ? "finish" : "notfinish"}
              <input
                type="checkbox"
                name="done"
                id="done"
                onChange={() => updateStatus(d.id)}
                defaultChecked={d.isComplete}
              />
            </label>
            <br />
            <button onClick={() => remove(d.id)}>remove</button>
          </div>
        );
      })}

      <br />
      <br />
    </div>
  );
}
