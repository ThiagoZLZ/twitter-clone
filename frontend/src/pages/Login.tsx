import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import twitterlogo from "../assets/twitter_logo.png";

import {
  Container,
  Card,
  Title,
  Form,
  Input,
  Button,
  RegisterText,
  RegisterLink,
  Logo,
  Image,
} from "../Styles/auth";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
        const response = await api.post("/token/", {
          username,
          password,
        });
      
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
      
        console.log("Login realizado!");
        navigate("/home");
      
      } catch (error) {
        console.error("Erro no login:", error);
      }
  }

  return (
    <Container>
      <Image src= {twitterlogo}/>
      <Logo>Twitter Clone</Logo>
  
      <Card>
        <Title>Faça Login</Title>
  
        <Form onSubmit={handleLogin}>
          <Input
            placeholder="Usuário"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
  
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
  
          <Button type="submit">Entrar</Button>
        </Form>
  
        <RegisterText>
          Não tem conta?{" "}
          <RegisterLink onClick={() => navigate("/register")}>
            Criar conta
          </RegisterLink>
        </RegisterText>
      </Card>
    </Container>
  );
}