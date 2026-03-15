import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import twitterlogo from "../../assets/twitter_logo.png";

import {
  Container,
  Card,
  Title,
  Form,
  Input,
  Button,
  Image,
  
} from "../../Styles/auth";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
  
    // cria usuário
    api.post("/register/", {
      username,
      password,
    })
      .then(() => {
        console.log("Usuário criado!");
  
        // login automático
        return api.post("/token/", {
          username,
          password,
        });
      })
      .then((response) => {
        // salva token
        const token = response.data.access;
  
        localStorage.setItem("access_token", token);
  
        // redireciona para feed
        navigate("/home");
      })
      .catch((error) => {
        console.error("Erro ao registrar:", error);
      });
  }

  return (
    <Container>
      <Image src= {twitterlogo}/>
      <Title>Criar conta</Title>
        <Card>
          <Form onSubmit={handleRegister}>
            < Input
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            < Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit">Cadastrar</Button>
          </Form>
        </Card>
    </Container>
  );
}