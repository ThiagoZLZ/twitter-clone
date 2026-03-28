import { useEffect, useState, useRef } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import { formatDate } from "../Utils/formatData";
import * as S from "../Styles/profile";

type Tweet = {
  id: number;
  author: string;
  author_id: number;
  content: string;
  created_at: string;
};

export default function Profile() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loggedUserId, setLoggedUserId] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { id } = useParams();

  const fetchMyTweets = () => {
    // Pegar dados do usuário (username + foto)
    api.get(`/users/${id}/`)
      .then((res) => {
        setUsername(res.data.username);

        const profileUrl = res.data.profile?.profile_image || null;

        setProfileImage(profileUrl);
      })
    
      .catch((err) => {
        console.error("Erro ao buscar usuário:", err);
      });

    // Pegar tweets do usuário
    api.get("/tweets/")
      .then((res) => {
        const userTweets = res.data.results.filter(
          (tweet: any) => tweet.author_id == id
        );
        setTweets(userTweets);
      })
      .catch((err) => {
        console.error("Erro ao buscar tweets:", err);
      });
  };

  useEffect(() => {
    if (id) {
      fetchMyTweets();
    }
  }, [id]);

  useEffect(() => {
    api.get("/me/")
      .then((res) => {
        setLoggedUserId(res.data.id);
      })
      .catch((err) => {
        console.error("Erro ao buscar usuário logado:", err);
      });
  }, []);


  // ADD IMAGEM //
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    if (!file) return;
  
    const formData = new FormData();
    formData.append("profile_image", file);
  
    api.post("/me/upload-image/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        fetchMyTweets(); // recarrega dados
      })
      .catch((err) => {
        console.error("Erro ao enviar imagem:", err);
      });
  };


  const handleDelete = (tweetId: number) => {
    api.delete(`/tweets/${tweetId}/`)
      .then(() => fetchMyTweets())
      .catch((err) => console.error("Erro ao deletar tweet:", err));
  };

  const startEdit = (tweet: Tweet) => {
    setEditingId(tweet.id);
    setEditContent(tweet.content);
  };

  const saveEdit = (tweetId: number) => {
    api.put(`/tweets/${tweetId}/`, { content: editContent })
      .then(() => {
        setEditingId(null);
        fetchMyTweets();
      })
      .catch((err) => console.error("Erro ao salvar tweet:", err));
  };

  const isMyProfile = Number(id) === loggedUserId;

  const handleFollow = () => {
    api.post(`/users/${id}/follow/`)
      .then(() => {
        console.log("Follow/unfollow ok");
      })
      .catch((err) => console.error("Erro ao seguir:", err));
  };

  const handleImageClick = () => {
    if (isMyProfile) {
      fileInputRef.current?.click();
    }
  };

  return (
    <S.Container>
      <S.Header>
      <S.AvatarWrapper $clickable={isMyProfile}>
        <S.Avatar
          src={profileImage || "https://i.pravatar.cc/100"}
          onClick={handleImageClick}
        />

        {isMyProfile && (
          <>
            <S.Overlay>📷 Alterar</S.Overlay>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </>
        )}
      </S.AvatarWrapper>
  
        <S.UserInfo>
          <S.Username>@{username}</S.Username>
          <S.TweetsCount>Tweets: {tweets.length}</S.TweetsCount>
  
          {!isMyProfile && (
            <S.Button onClick={handleFollow}>
              Seguir
            </S.Button>
          )}
        </S.UserInfo>
      </S.Header>
  
      <S.Divider />
  
      {tweets.map((tweet) => (
        <S.TweetCard key={tweet.id}>
          {editingId === tweet.id ? (
            <>
              <S.TextArea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <S.Button onClick={() => saveEdit(tweet.id)}>
                Salvar
              </S.Button>
            </>
          ) : (
            <>
              <S.TweetText>{tweet.content}</S.TweetText>
  
              {isMyProfile && (
                <>
                  <S.Button onClick={() => startEdit(tweet)}>
                    Editar
                  </S.Button>
                  <S.Button onClick={() => handleDelete(tweet.id)}>
                    Deletar
                  </S.Button>
                </>
              )}
            </>
          )}
  
          <S.TweetDate>
            {formatDate(tweet.created_at)}
          </S.TweetDate>
  
          <S.Divider />
        </S.TweetCard>
      ))}
    </S.Container>
  );
}