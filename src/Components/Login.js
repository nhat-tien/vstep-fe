'use client'
import { useState } from 'react';
import styles from '@/Components/Login.module.css';

const Login = () => 
    {
        const [Email, setEmail] = useState('');
        const [Password, setPassword] = useState('');
        const [error, setError] = useState ('');
        const [loading, setLoading] = useState(false);

        const handlelogin = async (event) => {
            event.preventDefault();
            setLoading(true);
            setError(' ');
        //Một hàm để làm cho trang web không bị F5 ở khi gửi yêu cầu được gửi lên server.

        try 
        {
            const response = await fetch('https://vidu.com/api/login',{
                    method: 'POST',
                //Method: 'POST' tức ta sẽ gửi yêu cầu (thông tin đăng nhập) của người dùng đến API được ghi trong fetch.
                    header: {
                        'Content-Type': 'application/json',
                    },
                //Ta sẽ cho server biết dữ liệu trong body của yêu cầu sẽ ở định dạng Json.

                    body: JSON.stringify({Email, Password}),
                //Như đã nói ở trên, dữ liệu ở phần body sẽ ở dạng Json, đây là câu lệnh chuyển đối tượng email và password thành một chuỗi JSON.
                });
        const data = await response.json();
        //Đợi dữ liệu từ server gửi về.

        if (!response.ok) { throw new Error(data.message || 'Có gì đó không ổn?'); 
                //Trường hợp thông tin không được trả về hoặc lỗi.
        }
        console.log('Thành công:', data);
        alert('Đăng nhập thành công! Chuẩn bị lên thớt!');
                //Đăng nhập thành công.
    } catch (error)
                //Xuất hiện lỗi.
    {   console.error('Lỗi:', error);
        setError(error.message);
        
    } finally {
        setLoading(false);
                //Dù đăng nhập thành công hay thất bại, state của loading phải được chuyển thành false, không thì trang web sẽ tiếp tục xoay.
    }
};

    return(
    <div className = {styles.loginContainer}>
        <form className={styles.loginForm} onSubmit={handlelogin}>
            <h2>Login</h2>
            {
                error && <p className={styles.error}>{error}</p>
                //Câu điều kiện kiểm tra, nếu error tồn tại giá trị, đoạn mã sau dấu && sẽ được thực hiện.
            }   
        <div className={styles.formGroup}>
            <label htmlFor="email">Email: </label>
            <input  //Khi người dùng ấn vào label Email, hàm input sẽ được gọi, quá trình nhập thông tin bắt đầu.
                type="email" //Dạng dữ liệu người dùng nhập vào phải là dạng email.
                id = "email" //Đặt id cho giá trị này để sau này dễ dùng. 
                value={Email} //Gán giá trị của Value cho biến Email. 
                onChange={(e) => setEmail(e.target.value)} //Nếu người dùng thay đổi thông tin (biến value), Email sẽ thay đổi theo bằng useState.
                required //Buộc phải có.
            />
        </div>
        <div className={styles.formGroup}> 
            <label htmlFor="password">Password:</label>
            <input
                type = "password"
                id = "password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <div className={styles.buttonContainer}>
        <button type='submit' disabled = {loading}>
            {loading ? 'Logging in...' : 'Login'}
        </button>
        </div>
        </form>
    </div>
);
};
export default Login;