"use client"
import { useState } from "react";
import styles from "@/components/Login/styles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {login} from "@/services/auth";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

const handlelogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login({email: email, password: password});
      if (response.ok) {
        router.push("/checking");
        toast.success("Login Successful");
    } else {
      setError(response.message);
    } 
    } catch (err)  {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["logo"]}>
        <Image
          src="/images/Quốc Huy Việt Nam 1.svg"
          alt="Logo"
          width={85}
          height={85}
        />
      </div>
      <h1 className={styles["title"]}>Thi thử VSTEP</h1>
      <form className={styles["login-form"]} onSubmit={handlelogin}>
        <div className={styles["form-groups"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Nhập tài khoản</label>
            <input //Khi người dùng ấn vào label Email, hàm input sẽ được gọi, quá trình nhập thông tin bắt đầu.
              type="email"
              id="email" //Đặt id cho giá trị này để sau này dễ dùng.
              value={email} //Gán giá trị của Value cho biến Email.
              onChange={(e) => setEmail(e.target.value)} //Nếu người dùng thay đổi thông tin (biến value), Email sẽ thay đổi theo bằng useState.
              required //Buộc phải có.
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="password">Nhập mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p className={`${styles["error"]} ${error ? styles["visible"] : ""}`}>
            {error}
          </p>
          <div className={styles["button-container"]}>
            <button type="submit" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
