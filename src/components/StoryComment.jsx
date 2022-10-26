import React from 'react';
import { Comment, Tag } from 'antd';
import 'antd/dist/antd.css';

function StoryComment({key, data}){
    const [ showComments, setShowComments] = React.useState(false);
    const [ nestedComments, setNestedComments ] = React.useState([]);

    React.useEffect(() => {
      fetchNestedComments();
    }, []);

    async function fetchNestedComments() {
        try {
            let newNestedComments = [];
            if (!data.kids)
              return;
            for (let commentId of data.kids) {
                const commentResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`);
                let nestedComment = await commentResponse.json();
                if (nestedComment !== null) newNestedComments = [...newNestedComments, nestedComment];
            }
            setNestedComments(newNestedComments);
        } catch (error) {
            alert('Ошибка при запросе данных');
        }
    }

    const formatCommentText = (text) => {
        const slash = "&#x2F;";
        const comma = "&#x27;";
        if (text.includes(slash)) {
            text = text.replaceAll(slash, "/");
        }
        if (text.includes(comma)) {
            text = text.replaceAll(comma, "'");
        }
        return text;
    };

    return (
        <Comment
          author={data.by}
          content={ formatCommentText(data.text) }
          datetime={new Date(data.time * 1000).toLocaleString()}
          style={{
            paddingLeft: 24, 
            paddingRight: 10 
          }}
          onClick={() => setShowComments(true)}
        >
          { 
              showComments &&
              nestedComments &&
              nestedComments
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
        </Comment>
    );
}

export default StoryComment;