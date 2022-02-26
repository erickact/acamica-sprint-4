import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import TweetList from "../components/TweetList";
import { UserContext } from "../contexts/UserContext";
import useTweetCollection from "../hooks/useTweetCollection";

const MyProfile = () => {
  const { onSnapshotWithQuery } = useTweetCollection();
  const { user } = useContext(UserContext);
  const [tweets, setTweets] = useState([]);
  const [favoriteTweets, setFavoriteTweets] = useState([]);

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
      <div>
        <div className="flex justify-center align-center flex-column">
          <img
            className="image-profile"
            src={user.photoURL}
            alt="ericka-profile"
          />
          <h3
            style={{ backgroundColor: user.color }}
            className="font-bold username-profile"
          >
            {user.username}
          </h3>
        </div>
      </div>
      <TweetList tweets={tweets} />
      <TweetList tweets={favoriteTweets} />
    </div>
  );
};

export default MyProfile;
