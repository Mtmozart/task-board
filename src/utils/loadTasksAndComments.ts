import { db } from "../services/FireBaseConnection";
import { collection, getDocs } from "firebase/firestore";
import { cache } from "react";

export const revalidate = 3600;

export const loadTasksAndCommentsCache = cache(async () => {
  const commentRef = collection(db, "comments");
  const postRef = collection(db, "tasks");

  const commentSnapshot = await getDocs(commentRef);
  const postSnapshot = await getDocs(postRef);

  const commentSize = commentSnapshot.size;
  const postSize = postSnapshot.size;

  if (commentSize === 0 && postSize === 0) {
    const size = {
      allComments: 0,
      allTask: 0,
    };
  }
  const size = {
    allComments: commentSize,
    allTask: postSize,
  };

  try {
    return size;
  } catch (error) {
    return size;
  }
});
