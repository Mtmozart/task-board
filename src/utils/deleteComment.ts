"use client";
import { db } from "../services/FireBaseConnection";
import { doc, deleteDoc } from "firebase/firestore";

export async function deleteComment(id: string) {
  try {
    const docRef = doc(db, "comments", id);
    await deleteDoc(docRef);
  } catch (err) {
    console.log(err);
  }
}
