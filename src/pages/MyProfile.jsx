import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import TweetList from "../components/TweetList";
import Wrapper from "../components/Wrapper";
import Hero from "../components/Hero";
import { UserContext } from "../contexts/UserContext";
import useTweetCollection from "../hooks/useTweetCollection";

const MyProfile = () => {
  const { onSnapshotWithQuery } = useTweetCollection();
  const { user } = useContext(UserContext);
  const [tweets, setTweets] = useState([]);
  const [favoriteTweets, setFavoriteTweets] = useState([]);
  const [showList, setShowList] = useState(true);

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
      { left: "user.uid", middle: "==", right: user?.uid }
    );
    return () => {
      unsubscribeSnapshot();
    };
  }, [onSnapshotWithQuery, user]);

  useEffect(() => {
    const unsubscribeSnapshot = onSnapshotWithQuery(
      (snapshot) => {
        setFavoriteTweets(
          snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          })
        );
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
        <TweetList tweets={tweets} />
      ) : (
        <TweetList tweets={favoriteTweets} />
      )}
    </div>
  );
};

export default MyProfile;
