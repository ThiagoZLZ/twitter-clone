import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import { formatDate } from "../Utils/formatData";

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

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      {/* FOTO DE PERFIL */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <img
          src={profileImage || "https://i.pravatar.cc/100"}
          alt="Foto de perfil"
          width={100}
          height={100}
          style={{ borderRadius: "50%" }}
        />
        <div>
          <h2>@{username}</h2>
          <p>Tweets: {tweets.length}</p>
          {!isMyProfile && (
            <button onClick={handleFollow}>
              Seguir
            </button>
)}
        </div>
      </div>

      <hr />

      {/* LISTA DE TWEETS */}
      {tweets.map((tweet) => (
        <div key={tweet.id} style={{ marginBottom: 20 }}>
          {editingId === tweet.id ? (
            <>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                style={{ width: "100%", height: 80 }}
              />
              <button onClick={() => saveEdit(tweet.id)}>Salvar</button>
            </>
          ) : (
            <>
              <p>{tweet.content}</p>
              {isMyProfile && (
                <>
                  <button onClick={() => startEdit(tweet)}>Editar</button>
                  <button onClick={() => handleDelete(tweet.id)}>Deletar</button>
                </>
              )}
            </>
          )}

          <p style={{ fontSize: 12, color: "#555" }}>
            {formatDate(tweet.created_at)}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}