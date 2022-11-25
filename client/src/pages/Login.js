import React from 'react';
import './Login.css';

export default function Login() {

    return (
        <div className='login'>

            <form id="loginForm" className='login__form'>
                <h3>Log in</h3>
                <div className='login__field'>
                    <input type="text" placeholder="Username" form=""/>
                </div>

                <div className='login__links'>
                    <a className="login__link-new" href="#">New user?</a>
                </div>

                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}