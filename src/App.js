import React from "react";
import {BrowserRouter as Router, Switch} from "react-router-dom"
import TasksPage from "./Pages/TasksPage";
import TaskPage from "./Pages/TaskPage";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoute from "./Routes/ProtectedRoute";
import ProtectedLogin from "./Routes/ProtectedLogin"
import AuthApi from "./AuthApi"
import Cookies from "js-cookie";

function App() {
  let [auth, setAuth] = React.useState(false)
  
  const readCookie = () =>{
    const user = Cookies.get("user");
    if(user){
      setAuth(true);
    }
  }
  
  React.useEffect(() => {
    readCookie();
  }, [])

  return (
    <AuthApi.Provider value={{auth, setAuth}}>
      <Router>
        <Switch>
          <ProtectedLogin exact path ="/" component = {LoginPage} auth = {auth}/>
          <ProtectedRoute exact path="/tasks" component = {TasksPage} auth = {auth}/>
          <ProtectedRoute exact path="/task/:id" component={TaskPage} auth = {!!sessionStorage.getItem("user_id")}/>
        </Switch>
      </Router>
    </AuthApi.Provider>
  );
}

export default App;
