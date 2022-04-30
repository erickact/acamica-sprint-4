import React, { useEffect, useState } from "react";
import isEqual from "lodash/isEqual";
import { useParams } from "react-router-dom";
import useTweetCollection from "../hooks/useTweetCollection";
import TweetList from "../components/TweetList";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { getTweetProperties } from "../utils";

const UserProfile = () => {
  const { onSnapshotWithQuery } = useTweetCollection();
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    const unsubscribeSnapshot = onSnapshotWithQuery(
      (snapshot) => {
        setIsLoading(snapshot.metadata.hasPendingWrites);
        const newTweets = snapshot.docs.map((doc) => getTweetProperties(doc));
        const isChanging = !isEqual(newTweets, tweets);

        if (isChanging) {
          setTweets(newTweets);
        }
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
      <TweetList tweets={tweets} isLoading={isLoading} />
    </div>
  );
};

export default UserProfile;
