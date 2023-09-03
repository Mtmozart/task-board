"use client";
import styles from "./styles.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

import Link from "next/link";
export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href="/">
            <h1 className={styles.logo}>
              Tarefas <span>+</span>
            </h1>
          </Link>
          <Link className={styles.link} href="/dashboard">
            Meu painel
          </Link>
        </nav>
        {status === "loading" ? (
          <>
            <button className={styles.loginButton}>...Loading</button>
          </>
        ) : session ? (
          <>
            <button className={styles.loginButton} onClick={() => signOut()}>
              SingOut
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.loginButton}
              onClick={() => signIn("google")}
            >
              SingIn
            </button>
          </>
        )}
      </section>
    </header>
  );
}
