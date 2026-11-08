import { useState } from 'react';

export default function DotaQuiz() {
    const questions = [
        { id: 1, text: "Кто стал MVP на легендарном The International 2021 (TI10)?", options: ["TORONTOTOKYO", "Yatoro", "Collapse", "Miposhka"], answer: "Collapse" },
        { id: 2, text: "Какая команда выиграла The International в 2024 году?", options: ["Gaimin Gladiators", "Team Liquid", "Team Spirit", "Tundra Esports"], answer: "Team Liquid" },
        { id: 3, text: "Какой игрок стал двукратным чемпионом TI в составе двух разных клубов к 2025 году?", options: ["Sneyking", "Yatoro", "Miposhka", "33"], answer: "33" },
        { id: 4, text: "Какая команда выиграла самый первый турнир серии The International в 2011 году?", options: ["EHOME", "Natus Vincere", "Alliance", "Invictus Gaming"], answer: "Natus Vincere" },
        { id: 5, text: "Кто из этих игроков является легендарным капитаном, сыгравшим на наибольшем количестве TI?", options: ["Puppey", "Fly", "KuroKy", "Notail"], answer: "Puppey" },
        { id: 6, text: "Какому европейскому клубу удалось первому в истории защитить титул и выиграть TI два раза подряд?", options: ["Team Secret", "OG", "Team Liquid", "Alliance"], answer: "OG" },
        { id: 7, text: "Какая страна принимала The International в 2024 году?", options: ["Сингапур", "США", "Дания", "Германия"], answer: "Дания" },
        { id: 8, text: "Какой герой от Team Spirit (особенно в исполнении Collapse) стал кошмаром для врагов на TI10?", options: ["Magnus", "Mars", "Doom", "Tidehunter"], answer: "Magnus" },
        { id: 9, text: "Какой призовой фонд (рекордный в истории киберспорта) был разыгран на The International 10?", options: ["$24 млн", "$34 млн", "$40 млн", "$18 млн"], answer: "$40 млн" },
        { id: 10, text: "Кто из игроков Team Spirit перешел в команду PARIVISION перед сезоном TI 2026?", options: ["Yatoro", "Larl", "Mira", "rue"], answer: "Mira" },
        { id: 11, text: "Какая команда стала чемпионом The International 2025?", options: ["Team Falcons", "Xtreme Gaming", "Gaimin Gladiators", "Team Liquid"], answer: "Team Falcons" },
        { id: 12, text: "Где проходил турнир The International 11 в 2022 году?", options: ["Гамбург", "Копенгаген", "Сингапур", "Сиэтл"], answer: "Сингапур" },
        { id: 13, text: "Какое культовое прозвище носит главный трофей, вручаемый победителям The International?", options: ["Эгида (Aegis)", "Рапира (Rapier)", "Кубок Габена", "Сфера"], answer: "Эгида (Aegis)" },
        { id: 14, text: "В каком городе проходил грандиозный The International 2026?", options: ["Бухарест", "Шанхай", "Сиэтл", "Копенгаген"], answer: "Шанхай" },
        { id: 15, text: "Какая команда проиграла три гранд-финала TI подряд в период с 2022 по 2024 год?", options: ["Team Liquid", "PSG.LGD", "Gaimin Gladiators", "Team Secret"], answer: "Gaimin Gladiators" }
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    
    // Новые состояния для интерактивной проверки
    const [selectedOption, setSelectedOption] = useState(null); // Какой вариант выбрал игрок
    const [isAnswered, setIsAnswered] = useState(false); // Ответил ли игрок на текущий вопрос

    const handleOptionClick = (option) => {
        if (isAnswered) return; // Блокируем повторные клики, пока не нажали кнопку "Далее"

        setSelectedOption(option);
        setIsAnswered(true);

        if (option === questions[currentQuestion].answer) {
            setScore(score + 1);
        }
    };

    const handleNextClick = () => {
        // Сбрасываем состояния проверки для следующего вопроса
        setSelectedOption(null);
        setIsAnswered(false);

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedOption(null);
        setIsAnswered(false);
    };

    return (
        <div style={{ background: '#22252a', color: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #383d44', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#ff4c29', display: 'flex', alignItems: 'center', gap: '8px' }}>🧠 Викторина по TI</h3>
            
            {showScore ? (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                    <p style={{ fontSize: '1.2em', marginBottom: '15px' }}>Вы ответили правильно на <strong>{score}</strong> из {questions.length} вопросов!</p>
                    <button onClick={restartQuiz} style={{ background: '#ff4c29', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Пройти заново</button>
                </div>
            ) : (
                <div>
                    {/* Индикатор количества вопросов удален в соответствии с вашим требованием */}
                    <p style={{ fontSize: '1.1em', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.4' }}>{questions[currentQuestion].text}</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {questions[currentQuestion].options.map(option => {
                            const isCurrentCorrect = option === questions[currentQuestion].answer;
                            const isCurrentSelected = option === selectedOption;
                            
                            // Вычисляем цвет фона кнопки в зависимости от этапа проверки
                            let btnBackground = '#2d3238'; 
                            let btnColor = '#fff';
                            let btnBorder = '1px solid #444';

                            if (isAnswered) {
                                if (isCurrentCorrect) {
                                    // Правильный ответ всегда подсвечивается зеленым
                                    btnBackground = '#2e7d32';
                                    btnColor = '#fff';
                                    btnBorder = '1px solid #1b5e20';
                                } else if (isCurrentSelected && !isCurrentCorrect) {
                                    // Если игрок выбрал этот вариант, и он неверный — красим в красный
                                    btnBackground = '#c62828';
                                    btnColor = '#fff';
                                    btnBorder = '1px solid #b71c1c';
                                } else {
                                    // Остальные неотвеченные варианты приглушаем
                                    btnBackground = '#1b1d22';
                                    btnColor = '#666';
                                    btnBorder = '1px solid #2d3238';
                                }
                            }

                            return (
                                <button 
                                    key={option} 
                                    onClick={() => handleOptionClick(option)}
                                    disabled={isAnswered}
                                    style={{ 
                                        background: btnBackground, 
                                        color: btnColor, 
                                        border: btnBorder, 
                                        padding: '12px 15px', 
                                        borderRadius: '8px', 
                                        cursor: isAnswered ? 'default' : 'pointer', 
                                        textAlign: 'left',
                                        fontSize: '0.95em',
                                        fontWeight: isCurrentSelected || (isAnswered && isCurrentCorrect) ? 'bold' : 'normal',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>

                    {/* Кнопка перехода к следующему вопросу, появляется только после выбора ответа */}
                    {isAnswered && (
                        <div style={{ marginTop: '20px', textAlign: 'right' }}>
                            <button 
                                onClick={handleNextClick}
                                style={{ 
                                    background: '#00d2c4', 
                                    color: '#000', 
                                    border: 'none', 
                                    padding: '10px 20px', 
                                    borderRadius: '6px', 
                                    cursor: 'pointer', 
                                    fontWeight: 'bold',
                                    fontSize: '1em'
                                }}
                            >
                                {currentQuestion === questions.length - 1 ? 'Показать результат' : 'Следующий вопрос ➔'}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
