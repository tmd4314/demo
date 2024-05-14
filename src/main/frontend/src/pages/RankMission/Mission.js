import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    // 게시물 목록을 가져오는 함수
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts'); // 서버에서 게시물 목록을 가져옴
        setPosts(response.data); // 가져온 게시물 목록을 상태에 저장
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts(); // 함수 호출
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행됨

  const handleNewPostSubmit = async (e) => {
    e.preventDefault();
    try {
      // 새 게시물 생성 요청
      await axios.post('/api/posts', {
        title: newPostTitle,
        content: newPostContent,
      });
      // 게시물 목록 다시 불러오기
      const response = await axios.get('/api/posts');
      setPosts(response.data);
      // 입력 필드 초기화
      setNewPostTitle('');
      setNewPostContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h1>MISSION</h1>
      <form onSubmit={handleNewPostSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <textarea
          placeholder="내용"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        ></textarea>
        <button type="submit">게시물 등록</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>

            <p>content</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
