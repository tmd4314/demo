// src/components/Footer.js
import React from 'react';
import '../css/Footer.css';
import flag from '../img/깃.png';

function Footer() {
  return (
    <footer className="footer">
      <p><img className="flag" src={flag}/>© 2024 봉우리 원정대
      <img className="flag" src={flag}/>
      </p>
      <p>팀장: 이승민&nbsp; 팀원: 김민령, 박봉근, 서원재, 안지협</p>
      <p>고객센터 : 010-8521-3699 &nbsp; e-mail: mountain@naver.com </p>



    </footer>
  );
}

export default Footer;
