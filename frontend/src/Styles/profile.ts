import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-size: 12px;
  font-weight: bold;

  opacity: 0;
  transition: 0.3s;

  pointer-events: none;
`;

export const AvatarWrapper = styled.div<{ $clickable: boolean }>`
  position: relative;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};

  &:hover ${Overlay} {
    opacity: ${({ $clickable }) => ($clickable ? 1 : 0)};
  }
`;

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
`;

export const UserInfo = styled.div``;

export const Username = styled.h2`
  margin: 0;
`;

export const TweetsCount = styled.p`
  margin: 5px 0;
  color: #555;
`;

export const Button = styled.button`
  margin: 5px;
  padding: 6px 12px;
  cursor: pointer;
  border: none;
  background-color: #1da1f2;
  color: white;
  border-radius: 5px;

  &:hover {
    background-color: #0d8ddb;
  }
`;

export const TweetCard = styled.div`
  margin-bottom: 20px;
`;

export const TweetText = styled.p`
  margin: 0;
`;

export const TweetDate = styled.p`
  font-size: 12px;
  color: #555;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
`;

export const Divider = styled.hr``;