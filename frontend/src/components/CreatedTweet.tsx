import { useState } from "react";
import api from "../api/api";

type Props = {
  onTweetCreated: () => void;
};

export default function CreateTweet({ onTweetCreated }: Props) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/tweets/", { content });
      setContent("");
      onTweetCreated();
    } catch (error) {
      console.error("Erro ao criar tweet:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="O que está acontecendo?"
      />
      <br />
      <button type="submit">Tweetar</button>
    </form>
  );
}