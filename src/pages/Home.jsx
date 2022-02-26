import React, { useState, useEffect } from "react";
import AddTweetForm from "../components/AddTweetForm";
import TweetList from "../components/TweetList";
import Header from "../components/Header";
import useTweetCollection from "../hooks/useTweetCollection";

const Home = () => {
  const [tweets, setTweets] = useState([]);

  const { getAllDocs } = useTweetCollection();

  useEffect(() => {
    const unsubscribeSnapshot = getAllDocs((snapshot) => {
      setTweets(
        snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        })
      );
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
