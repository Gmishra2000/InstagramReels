import logo from './logo.svg';
import './App.css';
import auth from "./firebase";
import react, { useState } from 'react';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);


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
    
  }

  const handleEmailInput = (e) => {
    setEmail(e.target.value)
  }
  return (
    <>
      {error == true ? <h1>Failed To login</h1>:
      loader == true ? <h1>Loading......</h1> :
      
        user != null ? <h1>User LoggedIn {user.uid}</h1> :
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
