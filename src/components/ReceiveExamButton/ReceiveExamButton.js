"use client";

import { useAppStore } from "@/stores/app-store-provider";
import postAvatar from "@/services/postAvatar";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { defaultInitState } from "@/stores/app-store";

export default function ReceiveExamButton() {
  const avatar = useAppStore((state) => state.avatar);
  const router = useRouter();

  const handlePostImage = async () => {
    if(avatar == defaultInitState.avatar) {
      toast.error("Thí sinh chưa chụp hình")
      return;
    }

    const res = await postAvatar(avatar);

    if(res.status == 200) {
       router.push("/exam/speaking/1");
    } else {
      toast.error("Something wrong with avatar")
    }
  };

  return (
    <button className={styles["receive-exam-button"]} onClick={handlePostImage}>
      Nhận đề
    </button>
  );
}
