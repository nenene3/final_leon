import React, { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db, auth } from "../firebase-config";
import Task from "./Tasks";
import axios from "axios";
export default function Logging() {
  let [user, setUser] = useState(null);
  let [password, setPassword] = useState(null);
  let [email, setEmail] = useState(null);
  let [id, setId] = useState(null);
  let [image, setImage] = useState(null);
  useEffect(() => {
    let a = onAuthStateChanged(auth, (i) => {
      if (i) {
        setUser(i);
        setId(i.uid);
      } else {
        setUser(null);
        axi();
      }
    });

    let axi = async () => {
      let ax = await axios.get("https://dog.ceo/api/breeds/image/random");
      setImage(ax.data.message);
    };
    return () => a();
  }, []);

  let createUser = async () => {
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

  return (
    <div>
      {user ? (
        <div>
          <button onClick={() => signOut(auth)}>sign out</button>
          {/* <button onClick={() => console.log(id)}>return</button> */}
          <Task userId={id} />
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={createUser}>sign in</button>
          <button
            onClick={async () => {
              try {
                let a = await signInWithEmailAndPassword(auth, email, password);
              } catch (e) {
                console.error(e);
              }
            }}
          >
            log in
          </button>
          <img src={image} alt="adsasd" />
        </div>
      )}
    </div>
  );
}
