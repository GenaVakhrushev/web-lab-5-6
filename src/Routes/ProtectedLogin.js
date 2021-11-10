import React from "react";
import { Redirect, Route } from "react-router";

export default function ProtectedLogin({ auth, component:Component, ...rest }){
    return(
        <Route
            {...rest}
            render = {() => !auth ? (
                <Component/>
            ):
                (
                    <Redirect to="/tasks"></Redirect>
                )
            }
        />
    )
}