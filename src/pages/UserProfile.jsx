import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTweetCollection from "../hooks/useTweetCollection";
import TweetList from "../components/TweetList";
import Header from "../components/Header";
import Hero from "../components/Hero";

const UserProfile = () => {
  const { onSnapshotWithQuery } = useTweetCollection();
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState({});

  const params = useParams();
  console.log(params);

  useEffect(() => {
    const unsubscribeSnapshot = onSnapshotWithQuery(
      (snapshot) => {
        setTweets(
          snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          })
        );
      },
      { left: "user.uid", middle: "==", right: params.id }
    );
    return () => {
      unsubscribeSnapshot();
    };
  }, [params]);

  useEffect(() => {
    if (tweets[0]) {
      setUser(tweets[0].user);
    }
  }, [tweets]);

  return (
    <div>
      <Header user={user} />
      <Hero user={user} />
      <TweetList tweets={tweets} />
    </div>
  );
};

export default UserProfile;
