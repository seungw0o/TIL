import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(collection(db, "tweets"), limit(25));
      orderBy("createdAt", "desc");

      const snapshot = await getDocs(tweetsQuery);
      const tweets = snapshot.docs.map(doc => {
        const { tweet, userId, createdAt, username, photo } = doc.data();
        return { tweet, userId, createdAt, username, photo, id: doc.id };
      });
      unsubscribe = await onSnapshot(tweetsQuery, snapshot => {
        const tweets = snapshot.docs.map(doc => {
          const { tweet, userId, createdAt, username, photo } = doc.data();
          return { tweet, userId, createdAt, username, photo, id: doc.id };
        });
        setTweets(tweets);
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <Wrapper>
      {tweets.map(tweet => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;
