import { Metadata } from "next";
import styles from "./styles.module.css";
import { db } from "@/services/FireBaseConnection";
import { getDoc, doc } from "firebase/firestore";
import { ITaskProps } from "./iTaskInterface";

export const metadata: Metadata = {
  title: "Details",
  description: `The tasks belong to mine.`,
};

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

  const milliseconds = snapshot.data()?.created.seconds * 1000;

  const task = {
    task: snapshot.data()?.task,
    public: snapshot.data()?.public,
    created: new Date(milliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    task_id: id,
  };

  return task;
}

export default async function task({ params }: { params: { id: string } }) {
  const id = params.id as string;
  const tarefa = await loadTasksById(id);

  return (
    <div className={styles.container}>
      <main>
        {tarefa && <>{tarefa.task}</>}
        <h1> </h1>
      </main>
    </div>
  );
}
