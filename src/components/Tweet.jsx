import React, { useContext } from "react";
import heartOn from "../assets/heart-on.svg";
import heartOff from "../assets/heart-off.svg";
import useTweetCollection from "../hooks/useTweetCollection";
import { UserContext } from "../contexts/UserContext";

const Tweet = ({ text, id, likes, user }) => {
  const { user: currentUser } = useContext(UserContext);

  const { updateTweet } = useTweetCollection();

  const liked = likes.includes(currentUser?.uid);

  const toggleLike = () => {
    const newLikes = liked
      ? likes.filter((item) => item !== currentUser?.uid)
      : [...likes, currentUser?.uid];
    updateTweet(id, { likes: newLikes });
  };

  return (
    <div>
      {user && <img src={user.photoURL} alt={user.username} />}
      <h3 className="font-white">{text}</h3>
      <button onClick={toggleLike}>
        {liked ? (
          <img src={heartOn} alt="" width="20px" />
        ) : (
          <img src={heartOff} alt="" width="20px" />
        )}
      </button>
      <span className="font-white">{likes.length}</span>
    </div>
  );
};

export default Tweet;
