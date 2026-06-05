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
  transition: opacity 0.3s ease;

  pointer-events: none;

  z-index: 2;
`;

export const AvatarWrapper = styled.div<{ $clickable: boolean }>`
  position: relative;
  width: 100px;
  height: 100px;
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
  object-fit: cover;

  position: relative;
  z-index: 1;
`;

export const UserInfo = styled.div`
  flex: 1;
  position: relative;
`;

export const Username = styled.h2`
  margin: 0;
`;

export const TweetsCount = styled.p`
  margin: 5px 0;
  color: #55444;
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

export const LogoutButton = styled.button`
  position: absolute;
  top: 45px;
  right: 0;

  cursor: pointer;
  background: #1DA1F2;
  border: none;
  color: white;
  padding: 5px 25px;
  border-radius: 20px;
  font-size: 14px;

  &:focus {
    outline: none;
  }

  &:hover {
    background: #0d8ddb;
  }
`;

export const BackButton = styled.button`
  position: absolute;
  top: 5px;
  right: 0;

  cursor: pointer;
  background: #1DA1F2;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 20px;

  &:hover {
    background: #0d8ddb;
  }

  &:focus {
    outline: none;
  }
`