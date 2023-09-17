import styles from "../../styles/home.module.css";
import { loadTasksAndCommentsCache } from "@/utils/loadTasksAndComments";
export async function ButtonHome() {
  const items = await loadTasksAndCommentsCache();

  return (
    <div className={styles.infoContent}>
      <section className={styles.box}>
        <span>{items.allTask} tasks</span>
      </section>
      <section className={styles.box}>
        <span>{items.allComments} comments</span>
      </section>
    </div>
  );
}
