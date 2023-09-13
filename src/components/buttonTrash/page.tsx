"use-client";
import { useSession } from "next-auth/react";
import { FaTrash } from "react-icons/fa";

export default function ButtonTrash(user: any) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  return (
    <button>
      <FaTrash size={24} color="#ea3140" />;
    </button>
  );
}
