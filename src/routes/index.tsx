import { Routes, Route } from "react-router";
import App from "@/App";
import Start from "@/features/start";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/start" element={<Start />} />
    </Routes>
  );
}
