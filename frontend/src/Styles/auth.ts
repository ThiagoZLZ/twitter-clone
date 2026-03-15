import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
  color: white;
`;

export const ImgCenter = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Image = styled.img`
  width: 180px;
  margin-bottom: 20px;
`


export const Logo = styled.h1`
  font-size: 40px;
  margin-bottom: 40px;
`;

export const Card = styled.div`
  width: 380px;
  background-color: #16181c;
  padding: 40px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h2`
  font-size: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Input = styled.input`
  padding: 14px;
  border-radius: 6px;
  border: 1px solid #2f3336;
  background-color: #000;
  color: white;
  font-size: 15px;

  &:focus {
    border-color: #1da1f2;
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 14px;
  border-radius: 25px;
  border: none;
  background-color: #1da1f2;
  color: white;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #1a91da;
  }
`;

export const RegisterText = styled.div`
  font-size: 14px;
  text-align: center;
`;

export const RegisterLink = styled.span`
  color: #1da1f2;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;