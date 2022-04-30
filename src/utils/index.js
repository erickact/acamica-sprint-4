export const getTweetProperties = (doc) => {
  const { likes, createdAt, user, text } = doc.data();

  return {
    likes,
    createdAt,
    user,
    text,
    id: doc.id,
  };
};
