import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReloadOutlined, LeftOutlined } from '@ant-design/icons';
import { Card, Button, Divider, Typography } from 'antd';
import 'antd/dist/antd.css';
import { uploadComments }  from "../store/actions"; 
import StoryComment from '../components/StoryComment';
const { Meta } = Card;
const { Link } = Typography;

function StoryPage({}){
    const state = useSelector((state)=>state);
    const dispatch = useDispatch();

    const { id } = useParams();
    const history = useHistory();
    const [ story, setStory ] = React.useState({});
    const [ comments, setComments ] = React.useState([]);

    React.useEffect(() => {
        fetchStory();
    }, []);

    async function fetchStory() {
        try {
            let storyData = state.find((item) => item.id == id);
            if (!storyData) {
                const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
                storyData = await storyResponse.json();
            }
            setStory(storyData);

            let storyComments = [];
            if (!storyData.kids)
                return;
            for (let commentId of storyData.kids) {
                const commentResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`);
                let comment = await commentResponse.json();
                if (comment !== null) storyComments = [...storyComments, comment];
            }
            setComments(storyComments);
        } catch (error) {
            alert('Ошибка при запросе данных');
        }
    }

    return (
        <div className="content">
            <Button 
                type="primary" 
                shape="circle" 
                icon={<LeftOutlined />} 
                size="large"
                style={{ 
                    background: "#ff6600", 
                    borderColor: "#ff6600",
                    position: "fixed",
                    top: "70px",
                    left: "30px",
                    zIndex: 1001
                }}
                onClick={history.goBack}
            />
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
                onClick={() => fetchStory()}
            />
            <Card
                style={{
                    marginTop: 15,
                }}
                loading={false}
            >
                <Meta
                    title={story.title}
                />
                <Link href={story.url}>Link to story</Link>
                <Divider type="vertical" />
                <span className="storyinfo"> {story.score} points by {story.by} at {new Date(story.time * 1000).toLocaleString()}</span>
                <Divider type="vertical" />
                <span className="comments">{story.kids? story.kids.length : 0} comments</span>
            </Card>
            <div className="comments">
                {
                    comments && 
                    comments
                    .filter((comment) => (
                        !comment.deleted
                    ))
                    .map((comment) => (
                        <StoryComment 
                            key = {comment.id}
                            data = {comment}
                        />
                    ))
                }           
            </div>
        </div>
    );
}

export default StoryPage;

