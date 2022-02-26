import React, { useContext } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import heartOn from "../assets/heart-on.svg";
import heartOff from "../assets/heart-off.svg";
import trash from "../assets/trash.svg";
import useTweetCollection from "../hooks/useTweetCollection";
import { UserContext } from "../contexts/UserContext";

const Tweet = ({ createdAt, text, id, likes, user }) => {
  const { user: currentUser } = useContext(UserContext);

  const { updateTweet, deleteTweet } = useTweetCollection();

  const liked = likes.includes(currentUser?.uid);

  const toggleLike = () => {
    const newLikes = liked
      ? likes.filter((item) => item !== currentUser?.uid)
      : [...likes, currentUser?.uid];
    updateTweet(id, { likes: newLikes });
  };

  const isTheSameUser = currentUser?.uid === user.uid;
  const date = formatDistanceToNow(createdAt.toDate(), {
    addSuffix: true,
  });

  return (
    <div className="flex justify-center">
      {user && (
        <img src={user.photoURL} alt={user.username} className="image-tweet" />
      )}

      <div className="tweet">
        <div>
          <div>
            <h2
              style={{ backgroundColor: user.color }}
              className="font-bold username"
            >
              {user.username}
            </h2>
            <span className="font-white">{date}</span>
          </div>

          {isTheSameUser && (
            <button type="button" onClick={() => deleteTweet(id)}>
              <img src={trash} alt="" width="20px" />
            </button>
          )}
        </div>
        <div className="font-white ">
          <p>{text}</p>
        </div>
        <div>
          <button onClick={toggleLike} type="button">
            {liked ? (
              <img src={heartOn} alt="" width="20px" />
            ) : (
              <img src={heartOff} alt="" width="20px" />
            )}
          </button>
          <span className="font-white">{likes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
