import { Metadata } from "next";
import styles from "./styles.module.css";
import { db } from "@/services/FireBaseConnection";
import { getDoc, doc } from "firebase/firestore";
import { ITaskProps } from "./iTaskInterface";
import { redirect } from "next/navigation";
import { Comment } from "@/components/comment";
import { loadComments } from "@/ultils/loadComments";

export const metadata: Metadata = {
  title: "Details",
  description: `The tasks belong to mine.`,
};

export async function loadTasksById(id: string) {
  const docRef = doc(db, "tasks", id);

  const snapshot = await getDoc(docRef);

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

export default async function Task({ params }: { params: { id: string } }) {
  const id = params.id as string;
  const task: ITaskProps = await loadTasksById(id);
  const comment = loadComments(id);

  if (task === undefined) {
    redirect("/dashboard");
  }

  if (!task.public) {
    redirect("/dashboard");
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Task</h1>
        <article className={styles.task}>
          <p>{task.task}</p>
        </article>
      </main>
      <Comment id={id} />
    </div>
  );
}
