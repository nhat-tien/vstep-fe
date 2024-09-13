import { AppStoreProvider } from "@/stores/app-store-provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";

// const monts = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "VSTEP",
  description: "Thi thử VSTEP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <Toaster />
        <AppStoreProvider>{children}</AppStoreProvider>
      </body>
    </html>
  );
}
