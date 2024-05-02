import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../css/Login.css';

function Login() {
    return (
        <div className='login-box'>
            <h3>로그인</h3>
            <div>
                <div className="form-item">
                    <Form.Control type="username" placeholder="아이디"/>
                </div>
                <div className="form-item">
                    <Form.Control type="password" placeholder="비밀번호"/>
                </div>
                <div className="button-container">
                    <Button variant="primary" type="submit" id='loginBtn'>로그인</Button>
                    <a href='/join'>
                        <Button variant="secondary" id='joinBtn'>회원가입</Button>
                    </a>
                </div>
            </div>
        </div>
    <div>
        <p>hello
        </p>
    </div>
)
    ;
}

export default Login;
