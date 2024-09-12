import TestPage from "@/components/TestPage/TestPage";
import { CounterStoreProvider } from "@/stores/counter-store-provider";

export default function Page() {
  return (
    <CounterStoreProvider>
      <TestPage />
    </CounterStoreProvider>
  );
}
