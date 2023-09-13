import { FaTrash } from "react-icons/fa";
import { loadComments } from "@/ultils/loadComments";
import styles from "./styles.module.css";
import ButtonTrash from "../buttonTrash/page";

export async function AllComments(id: any) {
  const comments = await loadComments(id.id);
  return (
    <section className={styles.commentsContainer}>
      <h2>All comments</h2>
      {(await comments).length === 0 && <span>No comments found.</span>}
      {(await comments).map((item) => (
        <article className={styles.comment} key={item.id}>
          <div className={styles.headComment}>
            <label className={styles.commentsLabel}>{item.username}</label>
          </div>
          <p>{item.comment}</p>
        </article>
      ))}
    </section>
  );
}
