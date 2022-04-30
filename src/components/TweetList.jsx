import Tweet from "./Tweet";
import Wrapper from "./Wrapper";
import orderBy from "lodash/orderBy";

const TweetList = ({ tweets = [], isLoading = false }) => {
  return (
    <div className="tweet-list">
      <Wrapper>
        {isLoading ? (
          <div className="font-white">Loading...</div>
        ) : tweets?.length > 0 ? (
          orderBy(tweets, ["createdAt"], ["desc"]).map((element) => (
            <Tweet key={element.id} {...element} />
          ))
        ) : (
          <div className="font-white">"No existen tweets"</div>
        )}
      </Wrapper>
    </div>
  );
};

export default TweetList;
