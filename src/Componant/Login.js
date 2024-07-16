import React, { useState } from 'react';
//import '.Login.css'; Chỉnh CSS sau.

const Login = () => 
    {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
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

                    body: JSON.stringify({email, password}),
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

    }