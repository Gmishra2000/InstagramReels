import logo from './logo.svg';
import './App.css';
import auth from "./firebase";
import react, { useState,useEffect } from 'react';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);
  const [mainLoader, setMainLoader] = useState(true);


  const handleSubmit = async () => {
    // alert(email + password);
    try {
      // async function
      setLoader(true)
      let res = await auth.signInWithEmailAndPassword(email, password);
      console.log(res.user);
      setUser(res.user);
      setLoader(false);
    } catch (err) {
      setError("Failed to login");
      setError(true);
      setLoader(false);
    }
    setEmail("");
    setPassword("");
    
  }

  const handleLogout = async () => {
    setLoader(true);
    await auth.signOut();
    setUser(null);
    setLoader(false);
  }

  const handleEmailInput = (e) => {
    setEmail(e.target.value)
  }

  

  // this will work after render
  // use effect is similar to component did amount
  // jo chiz aane me time lagti hai wo component did mount me dal do
  // agr login karle to logged in wali page hi dikhni chhaiye
  useEffect(() => {
    
    auth.onAuthStateChanged (user => {
      setUser(user);
      setMainLoader(false)
    })
  }, [])
  return (
    <>
      {mainLoader == true ? <h1>Wait For a second</h1>:
        loader == true ? <h1>Loading......</h1> :
          
      
          user != null ? <h1>User LoggedIn {user.uid}
            <button onClick={handleLogout}>Logout</button>
          </h1> :
        <>
     
    
              <h1>FireBase Login</h1>
              
          <input type="email" value={email} onChange={handleEmailInput}></input>
          <input type="password" value={password} onChange={(e) => {
            setPassword(e.target.value)
          }}>
          </input>
          <input type="button" value="submit" onClick={handleSubmit}></input>
        </>
      }
    
      
    </>
    );
}

export default App;
