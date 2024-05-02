import React from 'react';
import { Form, Button } from 'react-bootstrap';
import '../css/Join.css';

function Join() {
    return (
        <div className='join-box'>

            <h3>회원가입</h3>
            <div className='input-id'>
                <div>
                    <p>기본 정보</p>
                </div>
                <div className="form-container">
                    <div className="form-item">
                        <Form.Control type="text" placeholder="아이디" />
                    </div>

                    <div className="form-item">
                        <Form.Control type="password" placeholder="비밀번호" />
                    </div>

                    <div className="form-item">
                        <Form.Control type="password" placeholder="비밀번호 확인" />
                    </div>
                </div>
            </div>

            <div className='input-me'>
                <div className="form-container">
                    <div className="form-item">
                        <p>이름</p>
                        <Form.Control type="text" placeholder="이름" />
                    </div>
                </div>
                <div className="form-container">
                    <div className="form-item">
                        <p>이메일</p>
                        <Form.Control type="email" placeholder="이메일" />
                    </div>
                </div>
                <div className="form-container">
                    <div className="form-item">
                        <p>전화번호</p>
                        <Form.Control type="email" placeholder="01012345678" />
                    </div>
                </div>
                <div>
                    <p>hello
                    </p>
                </div>
                
            </div>
            <Button variant="primary">회원가입</Button>
        </div>
    );

}

export default Join;