"use client";
import { FaTrash } from "react-icons/fa";
import styles from "./style.module.css";
import { deleteComment } from "@/utils/deleteComment";
import { useRouter } from "next/navigation";

export function DeleteButton(id: any) {
  const router = useRouter();
  function handleDelete({ id }: any) {
    deleteComment(id);
    router.refresh();
  }
  return (
    <button className={styles.buttonTrash} onClick={() => handleDelete(id)}>
      <FaTrash />
    </button>
  );
}
