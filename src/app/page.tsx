import Image from "next/image";
import HomeCapa from "../../public/assets/hero.png";

export default function Home() {
  return (
    <main>
      <div>
        <Image alt="Logo da home" src={HomeCapa} priority />
      </div>
      <h1>
        Sistema feito para que você organize <br /> suas tarefas
      </h1>
    </main>
  );
}
