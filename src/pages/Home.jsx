import React from "react";
import AddTweetForm from "../components/AddTweetForm";
import TweetList from "../components/TweetList";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <AddTweetForm />
      <TweetList />
    </div>
  );
};

export default Home;
