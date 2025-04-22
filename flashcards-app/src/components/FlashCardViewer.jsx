import { useState, useEffect } from "react";
import "katex/dist/katex.min.css";
import katex from "katex";
import { data } from "../data/cards";

export default function FlashCardViewer({ topic }) {
    const cards = data[topic] || [];
    const [current, setCurrent] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        setCurrent(0);
        setShowAnswer(false);
    }, [topic]);

    const handleToggle = () => setShowAnswer(!showAnswer);
    const prev = () => {
        setCurrent((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
        setShowAnswer(false);
    };
    const next = () => {
        setCurrent((prev) => (prev + 1) % cards.length);
        setShowAnswer(false);
    };

    const renderMath = (latex) => {
        try {
            const cleaned = latex.replace(/^\$\$|\$\$$/g, "");
            return { __html: katex.renderToString(cleaned, { displayMode: true, throwOnError: false }) };
        } catch {
            return { __html: latex };
        }
    };

    const renderAnswer = (answer) => {
        // Проверяем, содержит ли ответ LaTeX
        if (answer.includes("$$") && answer.includes("$$")) {
            return (
                <div
                    dangerouslySetInnerHTML={renderMath(answer)}
                />
            );
        } else {
            return <span>{answer}</span>; // обычный текст
        }
    };

    const renderQuestion = (question, topic) => {
        if (topic === 'biology') {
            return (
                <img
                    src={`../images/${question}`}
                    alt={question}
                    className="w-full h-full object-contain"
                />
            );
        } else {
            return <span>{question}</span>;
        }
    };

    if (!cards.length) return <div className="text-center mt-10">Нет карточек для этой темы</div>;

    return (
        <div className="w-full max-w-xl mt-10 p-6 rounded-2xl shadow-lg bg-white text-center space-y-4">
            <div
                className="cursor-pointer p-6 min-h-[370px] flex items-center justify-center text-xl font-medium hover:bg-gray-100 transition rounded-xl border"
                onClick={handleToggle}
            >
                <span>{
                    !showAnswer ? renderQuestion(cards[current].question, topic) :
                        renderAnswer(cards[current].answer)
                }</span>
            </div>

            <div className="flex justify-between items-center">
                <button onClick={prev} className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300">Назад</button>
                <div className="text-lg font-medium">
                    {current + 1}/{cards.length}
                </div>
                <button onClick={next} className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300">Вперёд</button>
            </div>
        </div>
    );
}
