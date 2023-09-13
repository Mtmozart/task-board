import { FaTrash } from "react-icons/fa";
import { loadComments } from "@/ultils/loadComments";
import styles from "./styles.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function AllComments(id: any) {
  const session = await getServerSession(authOptions);

  const comments = await loadComments(id.id);
  return (
    <section className={styles.commentsContainer}>
      <h2>All comments</h2>
      {(await comments).length === 0 && <span>No comments found.</span>}
      {(await comments).map((item) => (
        <article className={styles.comment} key={item.id}>
          <div className={styles.headComment}>
            <label className={styles.commentsLabel}>{item.username}</label>
            {item.user_email === session?.email && (
              <button className={styles.buttonTrash}>
                <FaTrash size={18} color="#ea3140" />;
              </button>
            )}
          </div>
          <p>{item.comment}</p>
        </article>
      ))}
    </section>
  );
}
