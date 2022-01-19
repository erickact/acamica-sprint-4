import {
  addDoc,
  doc,
  getDoc,
  deleteDoc,
  onSnapshot,
  updateDoc,
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
      const docDelete = await deleteDoc(refDocument);
    } catch (error) {
      console.error(error);
    }
  };

  //  get tweets onsnapshots
  const getAllDocs = (callback) => {
    const unsubscribe = onSnapshot(tweetsCollectionRef, callback);
    return unsubscribe;
  };

  // update tweet

  const updateTweet = async (idDocument, toUpdate) => {
    const docRef = doc(tweetsCollectionRef, idDocument);
    await updateDoc(docRef, toUpdate);
  };

  return { addNewTweet, getAllDocs, deleteTweet, updateTweet };
};

export default useTweetCollection;
