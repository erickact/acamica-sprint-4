import Tweet from "./Tweet";

const TweetList = ({ tweets = [] }) => {
  return (
    <div>
      {/* <Tweet
        text="Me desperté en el sofá de mi hermana con una resaca terrible y el deseo de asesinar a mi esposa"
        id="id"
        user={{
          username: "Ericka",
          color: "pink",
          email: "castillo@gmail.com",
          uid: "1234",
          photoURL: "https://placeimg.com/200/200/any",
        }}
        likes={["123", "345", "678", "1234"]}
      /> */}
      {tweets && tweets.length > 0
        ? tweets.map((element) => <Tweet key={element.id} {...element} />)
        : "No existen tweets"}
    </div>
  );
};

export default TweetList;
