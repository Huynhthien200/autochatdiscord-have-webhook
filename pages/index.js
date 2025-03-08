import { useEffect } from "react";

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1347758452293763194/mwzk6e79uHrMs_siPjB2od1P2XmBM1Lc0bq3oZqkgkAGZjtX54rIvfmiSNAISGtDD40y"; // Thay bằng webhook URL của bạn

export default function Home() {
  useEffect(() => {
    const oneWeek = 7 * 24 * 60 * 60 * 1000; // 1 tuần tính bằng ms
    const intervalTime = 60 * 1000; // gửi mỗi phút
    const startTime = Date.now();

    // Danh sách các câu thoại khác nhau
    const messages = [
      "Chào mọi người! Đây là tin nhắn đầu tiên.",
      "Hy vọng mọi người có một ngày tuyệt vời!",
      "Đây là thông báo tự động từ Next.js.",
      "Hãy cùng nhau tạo nên những điều kỳ diệu!",
      "Mỗi phút là một cơ hội mới!",
      "Chúc mọi người một tuần làm việc hiệu quả!",
      "Đây là tin nhắn thú vị từ hệ thống tự động.",
      "Cảm ơn bạn đã theo dõi tin nhắn của tôi!",
      "Tin nhắn tự động: Hãy luôn mỉm cười!",
      "Chúc bạn một ngày tràn đầy năng lượng!"
    ];

    let messageIndex = 0;

    const interval = setInterval(() => {
      if (Date.now() - startTime >= oneWeek) {
        clearInterval(interval);
        console.log("Đã hết 1 tuần, dừng gửi tin nhắn tự động.");
        return;
      }
      
      // Lấy câu thoại hiện tại và cập nhật index cho vòng sau
      const message = messages[messageIndex % messages.length];
      messageIndex++;

      fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Tin nhắn gửi thành công:", data))
        .catch((err) => console.error("Lỗi gửi tin nhắn:", err));
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Auto Chat Discord với Next.js</h1>
      <p>Trang này sẽ tự động gửi tin nhắn đến Discord mỗi phút trong 1 tuần với các câu thoại khác nhau.</p>
    </div>
  );
}
