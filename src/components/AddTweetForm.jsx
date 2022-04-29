import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import useTweetCollection from "../hooks/useTweetCollection";

const MAX_CHARS = 200;

const AddTweetForm = () => {
  const { addNewTweet } = useTweetCollection();
  const [tweet, setTweet] = useState("");
  const [charCount, setCharCount] = useState(0);

  const { user } = useContext(UserContext);
  if (!user) {
    return null;
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (charCount <= MAX_CHARS) {
      const { username, color, email, uid, photoURL } = user;

      addNewTweet({
        likes: [],
        text: tweet,
        createdAt: new Date(),
        user: { username, color, email, uid, photoURL },
      });

      setTweet("");

      setCharCount(0);
    }
  };

  const handleOnChange = (e) => {
    setTweet(e.target.value);
    setCharCount(e.target.value.length);
  };

  const width = (charCount * 100) / MAX_CHARS;

  return (
    <div className="flex justify-center bg-black py-20">
      <div>
        {user && (
          <img className="image-profile" src={user.photoURL} alt="ericka" />
        )}
      </div>
      <div className="flex align-center flex-column">
        <form onSubmit={handleOnSubmit}>
          <div className="relative">
            <textarea
              className="textarea bg-purple text-rose"
              autoComplete="off"
              value={tweet}
              onChange={handleOnChange}
              placeholder="What's happening"
            />
            <div
              style={{ width: `${width}%` }}
              className="percentage-line"
            ></div>
          </div>
          <div className="flex justify-between">
            <p className="font-white">{charCount}</p>
            <p className="max-words">200 max.</p>
          </div>
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
