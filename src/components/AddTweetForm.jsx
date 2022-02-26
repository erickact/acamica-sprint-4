import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import useTweetCollection from "../hooks/useTweetCollection";

const AddTweetForm = () => {
  const { addNewTweet } = useTweetCollection();
  const [tweet, setTweet] = useState("");

  const { user } = useContext(UserContext);
  if (!user) {
    return null;
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { username, color, email, uid, photoURL } = user;

    addNewTweet({
      likes: [],
      text: tweet,
      createdAt: new Date(),
      user: { username, color, email, uid, photoURL },
    });

    setTweet("");
  };

  return (
    <div className="flex justify-center bg-black py-20">
      <div>
        {user && (
          <img className="image-profile" src={user.photoURL} alt="ericka" />
        )}
      </div>
      <div className="flex align-center flex-column">
        <form onSubmit={handleOnSubmit}>
          <textarea
            className="textarea bg-purple text-rose"
            autoComplete="off"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            placeholder="What's happening"
          />
          <p className="max-words">200 max.</p>
          <div className=" flex justify-end">
            <button className="btn-post font-bold bg-purple" type="submit">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTweetForm;
