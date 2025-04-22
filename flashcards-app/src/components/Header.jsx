export default function Header({ topic, setTopic, topics }) {
    return (
      <div className="flex items-center gap-3 py-4 px-30 bg-blue-600 text-white">
        <h1 className="text-2xl font-bold">FlashCards</h1>
        <select
          className="bg-white text-black rounded p-1"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          {topics.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
    );
  }
  