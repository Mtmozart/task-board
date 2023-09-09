import { Metadata } from "next";
import styles from "./styles.module.css";
import { db } from "@/services/FireBaseConnection";
import { collection, onSnapshot, getDoc, doc } from "firebase/firestore";

export const metadata: Metadata = {
  title: "Details",
  description: `The tasks belong to mine.`,
};
//LoadPostById

export async function loadTasksById(id: string) {
  const docRef = doc(db, "tasks", id);

  const snapshot = await getDoc(docRef);
  if (snapshot.data() === undefined) {
    return {
      redirect: "/",
      permanent: false,
    };
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: "/",
      permanent: false,
    };
  }
}

export default async function task({ params }: { params: { id: string } }) {
  const id = params.id.toString();
  const task = await loadTasksById(id);

  return (
    <>
      <div className={styles.container}>
        <main>
          <h1>task</h1>
        </main>
      </div>
    </>
  );
}
