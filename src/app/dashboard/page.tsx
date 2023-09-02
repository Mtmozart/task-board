import { Metadata } from "next";
import styles from "./styles.module.css";

export const metadata: Metadata = {
  title: "My painel of tasks",
  description: "My tasks in the task-board",
};

export default function Home() {
  return <h1>Dashboard</h1>;
}
