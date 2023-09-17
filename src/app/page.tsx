import Image from "next/image";
import HomeCapa from "../../public/assets/hero.png";
import styles from "../styles/home.module.css";
import { ButtonHome } from "@/components/buttonHome/buttonsHome";

export default function Home() {
  next: {
    revalidate: 3600;
  }
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
          System made for you to organize <br /> your tasks
        </h1>

        <ButtonHome />
      </main>
    </div>
  );
}
