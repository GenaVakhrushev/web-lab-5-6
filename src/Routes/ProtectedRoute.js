import React from "react";
import { Redirect, Route } from "react-router";

export default function ProtectedRoute({ auth, ...rest }){
    let component

    if (!!auth)
        component = <Route {...rest}/>
    else
        component = <Route> <Redirect to="/"></Redirect> </Route>

    return(  
        component
    )
}