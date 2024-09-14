import styles from "./styles.module.css";
import postAnswers from '@/services/postAnswers'
const Page = () => {
    const Submit = async () => {
        try {
          const result = await postAnswers(/*answers*/);
          if (result.status) {
            console.log('Gửi thành công!');
          } else {
            console.log('Gửi thất bại!');
          }
        } catch (error) {
          console.error('Lỗi khi gửi dữ liệu:', error);
        }
      };
      
    Submit();

    return (
        <div className={styles['submit-page']}>
            <div>
                <h1>Bạn đã kết thúc phần thi thử Vstep</h1>
                <p>-Vui lòng nghe lại đoạn thu âm của phần thi Speaking</p>
                <p>-Nếu không có âm thanh, hoặc âm thanh lỗi, vui lòng báo cho giáo viên.</p>
            </div>
        </div>
    );
};

export default Page;
