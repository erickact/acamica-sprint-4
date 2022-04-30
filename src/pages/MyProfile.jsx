import React, { useContext, useEffect, useState } from "react";
import isEqual from "lodash/isEqual";
import Header from "../components/Header";
import TweetList from "../components/TweetList";
import Wrapper from "../components/Wrapper";
import Hero from "../components/Hero";
import { UserContext } from "../contexts/UserContext";
import useTweetCollection from "../hooks/useTweetCollection";
import { getTweetProperties } from "../utils";

const MyProfile = () => {
  const { onSnapshotWithQuery } = useTweetCollection();
  const { user } = useContext(UserContext);
  const [tweets, setTweets] = useState([]);
  const [favoriteTweets, setFavoriteTweets] = useState([]);
  const [showList, setShowList] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteTweetsIsLoading, setFavoriteTweetsIsLoading] = useState(false);

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
      { left: "user.uid", middle: "==", right: user?.uid }
    );
    return () => {
      unsubscribeSnapshot();
    };
  }, [onSnapshotWithQuery, user]);

  useEffect(() => {
    const unsubscribeSnapshot = onSnapshotWithQuery(
      (snapshot) => {
        setFavoriteTweetsIsLoading(snapshot.metadata.hasPendingWrites);
        const newTweets = snapshot.docs.map((doc) => getTweetProperties(doc));
        const isChanging = !isEqual(newTweets, favoriteTweets);

        if (isChanging) {
          setFavoriteTweets(newTweets);
        }
      },
      { left: "likes", middle: "array-contains", right: user?.uid }
    );
    return () => {
      unsubscribeSnapshot();
    };
  }, [onSnapshotWithQuery, user]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <Header showLogout={true} />
      <Hero user={user} />
      <div className="profile-buttons">
        <Wrapper>
          <button
            className={showList ? "button-on" : "button-off"}
            onClick={() => setShowList(true)}
          >
            POSTS
          </button>
          <button
            className={showList ? "button-off" : "button-on"}
            onClick={() => setShowList(false)}
          >
            FAVORITES
          </button>
        </Wrapper>
      </div>
      {showList ? (
        <TweetList tweets={tweets} isLoading={isLoading} />
      ) : (
        <TweetList
          tweets={favoriteTweets}
          isLoading={favoriteTweetsIsLoading}
        />
      )}
    </div>
  );
};

export default MyProfile;
