import styled from "styled-components";

export const FeedContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
`;

export const FeedTitle = styled.h1`
  text-align: center;
  color: #1DA1F2;
`;

export const CreateTweet = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  textarea {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    resize: none;
  }

  button {
    margin-top: 10px;
    padding: 10px;
    background-color: #1DA1F2;
    border: none;
    color: white;
    border-radius: 8px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0d8ddb;
  }
`;

export const TweetCard = styled.div`
  border: 1px solid #e6ecf0;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  background: black;
`;

export const TweetAuthor = styled.p`
  color: #1DA1F2;
  font-weight: bold;
`;

export const LikeButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

export const FollowButton = styled.button`
  cursor: pointer;
  background: #1DA1F2;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;

  &:focus {
    outline: none;
  }
`;

export const TweetActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
`;

export const TweetDate = styled.small`
  display: block;
  text-align: right;
  color: gray;
  margin-top: 5px;
`;

