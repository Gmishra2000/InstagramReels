import React, { useContext } from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom"
import Feed from "./components/Feed"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Profile from "./components/Profile"
import { AuthContext, AuthProvider } from './contexts/AuthProvider';
// let isSignedUp = Math.random()<0.5? true: false;

function App() {
    return (
        <>
            <AuthProvider>
                <Router>
            
                    <Switch>
                        {/* {console.log("Hello")} */}
                       <Route path="/login" component={Login}></Route>
                        <Route path="/signup" component={Signup}></Route>
                        <PrivateRoute path="/profile" abc={Profile}></PrivateRoute>
                        <PrivateRoute path="/" abc={Feed}></PrivateRoute>
                    </Switch>
            
                </Router>
            </AuthProvider>
        </>
    )
}

function PrivateRoute(props) {
    console.log(props);
    let Component = props.abc;
    let { currentUser } = useContext(AuthContext)
    return (<Route {...props} render={(props) => {
        return currentUser != null ? <Component {...props}></Component> : 
        <Redirect to="/login"></Redirect>
    }}></Route>
    )
}


export default App;
// Private Route