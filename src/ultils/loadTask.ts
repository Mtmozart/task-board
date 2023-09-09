import { db } from "../services/FireBaseConnection";
import {
  collection,
  orderBy,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export async function loadTasks(email: string) {
  const tasksRef = collection(db, "tasks");
  const q = await query(
    tasksRef,
    orderBy("created", "desc"),
    where("id", "==", email)
  );

  onSnapshot(q, (snapshot) => {
    return snapshot;
  });
}
