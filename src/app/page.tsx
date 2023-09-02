import Image from "next/image";
import HomeCapa from "../../public/assets/hero.png";
import styles from "../styles/home.module.css";
import LoginButton from "../components/loginButton/login-btn";

export default function Home() {
  return (
    <div className={styles.container}>
      <main>
        <LoginButton />
        <div className={styles.logo}>
          <Image
            className={styles.hero}
            alt="Logo da home"
            src={HomeCapa}
            priority
          />
        </div>
        <h1 className={styles.title}>
          Sistema feito para que você organize <br /> suas tarefas
        </h1>

        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+12 posts</span>
          </section>
          <section className={styles.box}>
            <span>+90 mil comentários</span>
          </section>
        </div>
      </main>
    </div>
  );
}
