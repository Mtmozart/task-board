"use client";
import { TextArea } from "../textArea/page";
import styles from "./styles.module.css";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/FireBaseConnection";

export function Comment(id: any) {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const task_id = id.id;
  async function handleComment(e: FormEvent) {
    e.preventDefault();
    if (input === "") return;
    if (!session?.user?.email || !session?.user?.name) return;

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        created: new Date(),
        user_email: session?.user?.email,
        username: session?.user?.name,
        taskId: task_id,
      });

      setInput("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className={styles.commentsContainer}>
      <h2>Leave a comment</h2>
      <form onSubmit={handleComment}>
        <TextArea
          value={input}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setInput(e.target.value)
          }
        />
        <button disabled={!session?.user} className={styles.button}>
          Send comment
        </button>
      </form>
    </section>
  );
}
