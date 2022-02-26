import {
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { tweetsCollectionRef } from "../firebase/config";

const useTweetCollection = () => {
  // add Doc (add tweet)
  const addNewTweet = async (tweetObject) => {
    try {
      const docRef = await addDoc(tweetsCollectionRef, tweetObject);
      console.log("Document written with ID: ", docRef.id);
      // get updated docs
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // delete tweets
  const deleteTweet = async (idDocument) => {
    const refDocument = doc(tweetsCollectionRef, idDocument);
    try {
      await deleteDoc(refDocument);
    } catch (error) {
      console.error(error);
    }
  };

  //  get tweets onsnapshots
  const getAllDocs = (callback) => {
    const unsubscribe = onSnapshot(tweetsCollectionRef, callback);
    return unsubscribe;
  };

  // get tweets onsnapshots with query

  const onSnapshotWithQuery = (callback, whereDetails) => {
    const { left, middle, right = "" } = whereDetails;
    const q = query(tweetsCollectionRef, where(left, middle, right));
    const unsubscribe = onSnapshot(q, callback);
    return unsubscribe;
  };

  // update tweet

  const updateTweet = async (idTweet, toUpdate) => {
    const docRef = doc(tweetsCollectionRef, idTweet);
    await updateDoc(docRef, toUpdate);
  };

  return {
    addNewTweet,
    getAllDocs,
    deleteTweet,
    updateTweet,
    onSnapshotWithQuery,
  };
};

export default useTweetCollection;
