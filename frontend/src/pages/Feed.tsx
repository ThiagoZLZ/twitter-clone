import { useEffect, useState } from "react";
import api from "../api/api";
import twitterlogo from "../assets/twitter_logo.png";
import { Image, ImgCenter } from "../Styles/auth";

import {
  FeedContainer,
  CreateTweet,
  TweetCard,
  TweetAuthor,
  LikeButton,
  FollowButton,
  TweetActions,
  TweetDate,
} from "../Styles/feed";

type Tweet = {
  id: number;
  author: string;
  author_id: number;
  content: string;
  created_at: string;
  likes_count: number;
  is_liked: boolean;
  is_following: boolean;
};

export default function Feed() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [content, setContent] = useState("");

  const handleCreateTweet = () => {
    if (!content.trim()) return;
  
    api.post("/tweets/", {
      content: content,
    })
      .then(() => {
        setContent("");     // limpa input
        fetchTweets();      // atualiza feed
      })
      .catch(error => {
        console.error("Erro ao criar tweet:", error);
      });
  };

  const handleLike = (tweetId: number) => {
    api.post(`/tweets/${tweetId}/like/`)
      .then(() => {
        fetchTweets(); // atualiza o feed
      })
      .catch(error => {
        console.error("Erro ao curtir:", error);
      });
  };

  const fetchTweets = () => {
    api.get("/tweets/")
      .then(response => {
        setTweets(response.data.results);
      })
      .catch(error => {
        console.error("Erro:", error);
      });
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const handleFollow = (userId: number) => {
    api.post(`/users/${userId}/follow/`)
      .then(() => {
        fetchTweets();
      })
      .catch(error => {
        console.error("Erro ao seguir:", error);
      });
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);
  
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  return (
    <FeedContainer>
      <ImgCenter>
        <Image src= {twitterlogo}/>
      </ImgCenter>
      

      <CreateTweet>
          <textarea
            placeholder="O que está acontecendo?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

            <br />

            <button onClick={handleCreateTweet}>
              Publicar
            </button>

            <hr />
      </CreateTweet>
  
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id}>
          <TweetAuthor><strong>{tweet.author}</strong></TweetAuthor>
          
          <p>{tweet.content}</p>

        <TweetActions>
            <LikeButton onClick={() => handleLike(tweet.id)}>
            {tweet.is_liked ? "💙" : "🤍"} {tweet.likes_count}
            </LikeButton>

            <FollowButton onClick={() => handleFollow(tweet.author_id)}>
            {tweet.is_following ? "Deixar de seguir" : "Seguir"}
            </FollowButton>
        </TweetActions>

        <hr />
        <TweetDate>{formatDate(tweet.created_at)}</TweetDate>
        </TweetCard>
      ))}
    </FeedContainer>
  );
}