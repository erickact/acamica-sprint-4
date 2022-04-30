import React, { useState, useEffect } from "react";
import AddTweetForm from "../components/AddTweetForm";
import TweetList from "../components/TweetList";
import Header from "../components/Header";
import useTweetCollection from "../hooks/useTweetCollection";
import isEqual from "lodash/isEqual";

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const { getAllDocs } = useTweetCollection();

  useEffect(() => {
    const unsubscribeSnapshot = getAllDocs((snapshot) => {
      const newTweets = snapshot.docs.map((doc) => {
        const { likes, createdAt, user, text } = doc.data();
        return {
          likes,
          createdAt,
          user,
          text,
          id: doc.id,
        };
      });

      const isChanging = !isEqual(tweets, newTweets);

      if (isChanging) {
        setTweets(newTweets);
      }
    });
    // la siguiente funcion se va a ejecutar cuando el
    // componente se desmonta
    return () => {
      unsubscribeSnapshot();
    };
  }, [getAllDocs]);

  return (
    <div>
      <Header />
      <AddTweetForm />
      <TweetList tweets={tweets} />
    </div>
  );
};

export default Home;
