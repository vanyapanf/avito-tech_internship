import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import 'antd/dist/antd.css';
const { Meta } = Card;

function StoryCard({key, data}){
    let storyDate = new Date(data.time * 1000).toLocaleString();

    return (
        <Link to={`/story/${data.id}`}>
            <Card 
                hoverable
                style={{
                    marginTop: 16,
                }}
                loading={false}
            >
                <Meta
                    title={data.title}
                />
                <span className="storyinfo"> {data.score} points by {data.by} at {storyDate}</span>
            </Card>
        </Link>
    );
}

export default StoryCard;