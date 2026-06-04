import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px;
  border-bottom: 1px solid #e6ecf0;
`;

export const Logo = styled.h1`
  color: #1DA1F2;
  font-size: 24px;
  margin: 0;
`;

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Username = styled.span`
  font-weight: bold;
  color: white;
  cursor: pointer;

  &: hover{
    color: #0d8ddb;
  } 
`;

export const LogoutButton = styled.button`
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

export const Welcome = styled.div`
  text-align: center;
  margin: 20px 0;
`;