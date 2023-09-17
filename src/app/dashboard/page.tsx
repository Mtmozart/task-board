"use client";
import { Metadata } from "next";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import styles from "./styles.module.css";
import { TextArea } from "@/components/textArea/page";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
//interface
import { TaskProps } from "./ITaskProps";
//Database
import { db } from "../../services/FireBaseConnection";
import {
  addDoc,
  collection,
  orderBy,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

//react
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My painel of tasks",
  description: "My tasks in the task-board",
};

export default function Dashboard() {
  //verification
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  //states
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const email = session?.user?.email || "";
  useEffect(() => {
    async function loadTasks() {
      //controle de repetição

      const tasksRef = collection(db, "tasks");
      const q = await query(
        tasksRef,
        orderBy("created", "desc"),
        where("user", "==", email)
      );

      onSnapshot(q, (snapshot) => {
        let list = [] as TaskProps[];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            task: doc.data().task,
            created: doc.data().created,
            user: doc.data().user,
            public: doc.data().public,
          });
        });
        setTasks(list);
      });
    }

    loadTasks();
  }, [email]);

  //
  function handleChangePublic(e: ChangeEvent<HTMLInputElement>) {
    setPublicTask(e.target.checked);
  }

  async function handleRegisterTask(e: FormEvent) {
    e.preventDefault();
    if (input === "") return;
    try {
      await addDoc(collection(db, "tasks"), {
        task: input,
        created: new Date(),
        user: session?.user?.email,
        public: publicTask,
      });

      setInput("");
      setPublicTask(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleShared(id: string) {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${id}`
    );
  }

  async function handleDeleteTask(id: string) {
    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef);
  }

  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <div className={styles.contentForm}>
          <h1 className={styles.title}>Add your task</h1>
          <form onSubmit={handleRegisterTask}>
            <TextArea
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setInput(e.target.value)
              }
              value={input}
              placeholder="Enter your task..."
            />
            <div className={styles.checkBoxArea}>
              <input
                type="checkbox"
                className={styles.checkBox}
                checked={publicTask}
                onChange={handleChangePublic}
              />
              <label>Publish the task?</label>
            </div>
            <button type="submit" className={styles.button}>
              Register
            </button>
          </form>
        </div>
      </section>

      <section className={styles.taskContainer}>
        {tasks.length ? (
          tasks.map((item) => (
            <article className={styles.task} key={item.id}>
              {item.public && (
                <div className={styles.tagContainer}>
                  <label className={styles.tag}>Public</label>
                  <button
                    className={styles.sharedButton}
                    onClick={() => handleShared(item.id)}
                  >
                    <FiShare2 size={32} color="#3183ff" />
                  </button>
                </div>
              )}
              <div className={styles.taskContent}>
                {item.public ? (
                  <Link href={`/task/${item.id}`}>
                    <p>{item.task}</p>
                  </Link>
                ) : (
                  <p>{item.task}</p>
                )}
                <button
                  className={styles.trashButton}
                  onClick={() => handleDeleteTask(item.id)}
                >
                  <FaTrash size={24} color="#ea3140" />
                </button>
              </div>
            </article>
          ))
        ) : (
          <article className={styles.title}>
            <h1>No tasks registered</h1>
          </article>
        )}
      </section>
    </main>
  );
}
