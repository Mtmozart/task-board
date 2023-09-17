import { db } from "../services/FireBaseConnection";
import { collection, query, where, getDocs } from "firebase/firestore";
import { IComment } from "./IComments";

export async function loadComments(id: any) {
  const q = query(collection(db, "comments"), where("taskId", "==", id));
  const snapshotComments = await getDocs(q);

  let allComments: IComment[] = [];
  snapshotComments.forEach((doc) => {
    allComments.push({
      id: doc.id,
      comment: doc.data().comment,
      username: doc.data().username,
      user_email: doc.data().user_email,
      taskId: doc.data().taskId,
    });
  });
  try {
    return allComments;
  } catch (error) {
    return (allComments = []);
  }
}
