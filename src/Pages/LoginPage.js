import Cookies from "js-cookie";
import React from "react";
import AuthApi from "../AuthApi";

const server = "http://127.0.0.1:8080"

function Login(Auth){
    let username = document.getElementById("username").value;
    let password =  document.getElementById("password").value;

    fetch(server + "/api/check_pass",{
                            method:"POST",
                            body:JSON.stringify({"username":username,"password":password}),
                            headers:{"Content-Type":"application/json"}
                        }).then(response => {
                            if (response.status === 200) {
                                let json = response.json()
                                json.then(data => {
                                    Cookies.set("user", "userIn")
                                    sessionStorage.setItem("user_id", data.user_id)
                                    Auth.setAuth(true)
                                })
                            }
                            else if(response.status === 400)
                                document.getElementById("info").innerHTML = "Неправильные имя пользователя или пароль";
                         })

}

function Register(){
    let username = document.getElementById("username").value;
    let password =  document.getElementById("password").value;

    fetch(server + "/api/register",{
                            method:"POST",
                            body:JSON.stringify({"username":username,"password":password}),
                            headers:{"Content-Type":"application/json"}
                        }).then(response => {
                            if (response.status === 200) {
                                document.getElementById("info").innerHTML = "Вы успешно зарегистрированы";
                            }
                            else if(response.status === 400)
                                document.getElementById("info").innerHTML = "Такой пользователь уже существует";
                         })
}

export default function LoginPage(){
    const Auth = React.useContext(AuthApi)

    return (
        <div className='wrapper'>
            <h1>ToDo app</h1>
        
            <p>Имя пользователя</p>
            <input type="value" id="username"/>
            <p>Пароль</p>
            <input type="value" id="password"/> <br/>
            <button onClick={() => Login(Auth)}>Войти</button>
            <button onClick={Register}>Зарегистрироваться</button>
            <p id="info"></p>
        </div>
      );
}