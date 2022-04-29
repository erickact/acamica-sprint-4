import React, { useContext } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import heartOn from "../assets/heart-on.svg";
import heartOff from "../assets/heart-off.svg";
import trash from "../assets/trash.svg";
import useTweetCollection from "../hooks/useTweetCollection";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

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
    <div className="tweet flex">
      {user && (
        <img src={user.photoURL} alt={user.username} className="image-tweet" />
      )}

      <div className="flex-1">
        <div className="flex">
          <div className="flex-1">
            <h2
              style={{ backgroundColor: user.color }}
              className="font-bold username"
            >
              {isTheSameUser ? (
                <Link to="/me">{user.username}</Link>
              ) : (
                <Link to={`/users/${user.uid}`}>{user.username}</Link>
              )}
            </h2>
            <span className="font-white">- {date}</span>
          </div>

          {isTheSameUser && (
            <button type="button" onClick={() => deleteTweet(id)}>
              <img src={trash} alt="" width="20px" />
            </button>
          )}
        </div>

        <div className="font-white mb-2 word-break ">
          <p>{text}</p>
        </div>
        <div className="flex align-center">
          <button className="flex mr-2" onClick={toggleLike} type="button">
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
