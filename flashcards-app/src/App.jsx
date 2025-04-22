import { useState } from "react";
import { data } from "./data/cards";
import FlashCardViewer from "./components/FlashCardViewer";
import Header from "./components/Header";

export default function App() {
  const topics = Object.keys(data);
  const [topic, setTopic] = useState(topics[0]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header topic={topic} setTopic={setTopic} topics={topics} />
      <div className=" flex items-center justify-center">
        <FlashCardViewer topic={topic}/>
      </div>
    </div>
  );
}
