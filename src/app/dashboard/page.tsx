"use client";
import { Metadata } from "next";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import styles from "./styles.module.css";
import { TextArea } from "@/components/textArea/page";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

export const metadata: Metadata = {
  title: "My painel of tasks",
  description: "My tasks in the task-board",
};

export default function Home() {
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
          <form action="">
            <TextArea placeholder="Enter your task..." />
            <div className={styles.checkBoxArea}>
              <input type="checkbox" className={styles.checkBox} />
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
