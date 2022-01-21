import React, { useState, useEffect } from "react";
import useTweetCollection from "../hooks/useTweetCollection";
import Tweet from "./Tweet";

const TweetList = () => {
  const [tweetList, setTweetList] = useState([]);

  const { getAllDocs } = useTweetCollection();

  useEffect(() => {
    const unsubscribeSnapshot = getAllDocs((snapshot) => {
      console.log(snapshot);
      setTweetList(
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
      {tweetList && tweetList.length > 0
        ? tweetList.map((element) => <Tweet key={element.id} {...element} />)
        : "No existen tweets"}
    </div>
  );
};

export default TweetList;
