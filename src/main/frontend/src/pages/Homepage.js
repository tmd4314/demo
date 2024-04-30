// HomePage.js (or any other page component that needs axios)
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  const [hello, setHello] = useState('');

        useEffect(() => {
          axios.get('/api/homepage')
            .then(response => setHello(response.data))
            .catch(error => console.log(error))
        }, []);

  return (
    <div className="container-fluid">
      <h1 className="mt-4">홈페이지</h1>
      <p>백엔드에서 가져온 데이터: {hello}</p>
      <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
      <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#sidebarToggle</code> ID which will toggle the menu when clicked.</p>
    </div>
  );
}

export default HomePage;
