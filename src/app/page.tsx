import Image from "next/image";
import HomeCapa from "../../public/assets/hero.png";
import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main>
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
      </main>
    </div>
  );
}
