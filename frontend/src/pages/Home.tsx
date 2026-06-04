import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import Feed from "./Feed";

import {
  Container,
  Header,
  Logo,
  RightSide,
  Username,
  LogoutButton,
  Welcome,
} from "../Styles/home";




function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userid, setUserId] = useState<number | null>(null);

  useEffect(() => {
    api.get("/me/")
      .then((res) => {
        setUsername(res.data.username);
        setUserId(res.data.id);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    navigate("/");
  };

  return (
    <Container>
    <Header>
      <Logo>Twitter Clone</Logo>

      <RightSide>
        <Username
          onClick={() => navigate(`/profile/${userid}`)}
        >
          Olá @{username}
        </Username>

        <LogoutButton onClick={handleLogout}>
          Sair
        </LogoutButton>
      </RightSide>
    </Header>

    <Welcome>
      <p>Aqui você pode criar seus tweets 🚀</p>
    </Welcome>

    <Feed />
  </Container>
  );
}

export default Home;