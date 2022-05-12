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
import NProgress from "nprogress";

const useTweetCollection = () => {
  // add Doc (add tweet)
  const addNewTweet = async (tweetObject) => {
    try {
      NProgress.start();
      const docRef = await addDoc(tweetsCollectionRef, tweetObject);
      console.log("Document written with ID: ", docRef.id);
      // get updated docs
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      NProgress.done();
    }
  };

  // delete tweets
  const deleteTweet = async (idDocument) => {
    const refDocument = doc(tweetsCollectionRef, idDocument);
    try {
      NProgress.start();

      await deleteDoc(refDocument);
    } catch (error) {
      console.error(error);
    } finally {
      NProgress.done();
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
