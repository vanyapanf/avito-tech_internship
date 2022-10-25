import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';
import { Button, Space, Spin } from 'antd';
import 'antd/dist/antd.css';
import StoryCard from '../components/StoryCard';
import { updateStories }  from "../store/actions"; 

function Home({}) {

  const state = useSelector((state)=>state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchStories();
    setInterval(fetchStories, 60000);
  }, []);

  async function fetchStories() {
    try {
      const newStoriesIdsResponse = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
      let newStoriesIds = await newStoriesIdsResponse.json();
      newStoriesIds = newStoriesIds.filter((storyId, index) => index < 100);

      let newStories = [];
      for (let storyId of newStoriesIds) {
        const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`);
        let story = await storyResponse.json();
        if (story !== null) newStories = [...newStories, story];
      }

      dispatch(updateStories(newStories));
    } catch (error) {
      alert('Ошибка при запросе данных');
    }
  }
  
  return (
    <div className="content">
      <Button 
        type="primary" 
        shape="circle" 
        icon={<ReloadOutlined />} 
        size="large"
        style={{ 
          background: "#ff6600", 
          borderColor: "#ff6600",
          position: "fixed",
          top: "70px",
          right: "30px",
          zIndex: 1001
        }}
        onClick={() => fetchStories()}
      />
      {
        (state.length === 0) ?
        <div className="loading">
          <Spin size="large" />
        </div>
        :
        state.map((story, index) => (
          <StoryCard
            key = {index}
            data = {story}
          />
        ))
      }
    </div>
  );
}

export default Home;