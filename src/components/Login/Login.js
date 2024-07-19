"use client";
import { useState } from "react";
import styles from "@/components/Login/styles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlelogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(" ");
    //Một hàm để làm cho trang web không bị F5 ở khi gửi yêu cầu được gửi lên server.

    try {
      const response = await fetch("https://vidu.com/api/login", {
        method: "POST",
        //Method: 'POST' tức ta sẽ gửi yêu cầu (thông tin đăng nhập) của người dùng đến API được ghi trong fetch.
        header: {
          "Content-Type": "application/json",
        },
        //Ta sẽ cho server biết dữ liệu trong body của yêu cầu sẽ ở định dạng Json.

        body: JSON.stringify({ Email, Password }),
        //Như đã nói ở trên, dữ liệu ở phần body sẽ ở dạng Json, đây là câu lệnh chuyển đối tượng email và password thành một chuỗi JSON.
      });
      const data = await response.json();
      //Đợi dữ liệu từ server gửi về.

      if (!response.ok) {
        throw new Error(data.message || "Có gì đó không ổn?");
        //Trường hợp thông tin không được trả về hoặc lỗi.
      }
      console.log("Thành công:", data);
      alert("Đăng nhập thành công!");
      //Đăng nhập thành công.
      //router.push('/Trang tiếp theo'); Chuyển hướng.
    } catch (
      error
      //Xuất hiện lỗi.
    ) {
      console.error("Lỗi:", error);
      setError(error.message);
    } finally {
      setLoading(false);
      //Dù đăng nhập thành công hay thất bại, state của loading phải được chuyển thành false, không thì trang web sẽ tiếp tục xoay.
    }
  };
  const handleNavigation = () => {
    router.push("/checking");
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
            <label htmlFor="email"></label>
            <input //Khi người dùng ấn vào label Email, hàm input sẽ được gọi, quá trình nhập thông tin bắt đầu.
              type="email" //Dạng dữ liệu người dùng nhập vào phải là dạng email.
              id="email" //Đặt id cho giá trị này để sau này dễ dùng.
              //placeholder='Nhập tài khoảng...'
              value={Email} //Gán giá trị của Value cho biến Email.
              onChange={(e) => setEmail(e.target.value)} //Nếu người dùng thay đổi thông tin (biến value), Email sẽ thay đổi theo bằng useState.
              required //Buộc phải có.
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              //placeholder='Nhập mật khẩu...'
              value={Password}
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
        <button onClick={handleNavigation}>Nhảy</button>
      </form>
    </div>
  );
};
export default Login;