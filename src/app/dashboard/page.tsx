"use client";
import { Metadata } from "next";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import styles from "./styles.module.css";
import { TextArea } from "@/components/textArea/page";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
//Database
import { db } from "../../services/FireBaseConnection";
import { addDoc, collection } from "firebase/firestore";

//react
import { ChangeEvent, FormEvent, useState } from "react";

export const metadata: Metadata = {
  title: "My painel of tasks",
  description: "My tasks in the task-board",
};

export default function Home() {
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);

  function handleChangePublic(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.checked);
    setPublicTask(e.target.checked);
  }

  async function handleRegisterTask(e: FormEvent) {
    e.preventDefault();
    if (input === "") return;
    try {
      await addDoc(collection(db, "tasks"), {
        task: input,
        created: new Date(),
        user: "",
        public: publicTask,
      });
    } catch (error) {
      console.log(error);
    }
  }
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });
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
        <h2>My tasks</h2>
        <article className={styles.task}>
          <div className={styles.tagContainer}>
            <label className={styles.tag}>Public</label>
            <button className={styles.sharedButton}>
              <FiShare2 size={32} color="#3183ff" />
            </button>
          </div>
          <div className={styles.taskContent}>
            <p>My first task for example</p>
            <button className={styles.trashButton}>
              <FaTrash size={24} color="#ea3140" />
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}
