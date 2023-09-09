import { Metadata } from "next";
import styles from "./styles.module.css";
import { doc } from "firebase/firestore";

export const metadata: Metadata = {
  title: "Details",
  description: `The tasks belong to mine.`,
};

export async function generateStaticParams() {
  //const task = await fetch("https");
}

export default function task() {
  return (
    <div className={styles.container}>
      <main>
        <h1>task</h1>
      </main>
    </div>
  );
}
