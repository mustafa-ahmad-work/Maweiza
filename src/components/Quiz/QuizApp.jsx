"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QuizApp = ({ quizSettings }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [totalTimeTaken, setTotalTimeTaken] = useState(0);
    const [questionStartTime, setQuestionStartTime] = useState(0);
    const timerRef = useRef(null);

    // Process quiz settings to get questions
    const { difficulty = 'level1', topic } = quizSettings;
    const levelsData = topic.levelsData;
    const currentLevelQuestions = levelsData[difficulty];

    const questions = currentLevelQuestions.map(question => ({
        question: question.q,
        options: question.answers.map(answer => answer.answer),
        correctAnswer: question.answers.findIndex(answer => answer.t === 1),
        link: question.link
    }));

    // Set time based on difficulty
    const getTimeForDifficulty = () => {
        switch(difficulty) {
            case 'level1': return 30; // 30 seconds for easy
            case 'level2': return 20; // 20 seconds for medium
            case 'level3': return 15; // 15 seconds for hard
            default: return 30;
        }
    };

    // Initialize timer for a new question
    const startTimer = () => {
        clearInterval(timerRef.current);
        setTimeLeft(getTimeForDifficulty());
        setQuestionStartTime(Date.now());

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    handleTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Handle when time runs out
    const handleTimeUp = () => {
        if (selectedAnswer === null) {
            setSelectedAnswer(-1); // -1 indicates no answer selected
            setIsAnimating(true);

            setTimeout(() => {
                if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                    setSelectedAnswer(null);
                    setIsAnimating(false);
                } else {
                    setShowResults(true);
                    setIsAnimating(false);
                }
            }, 1500);
        }
    };

    // Start timer when component mounts or question changes
    useEffect(() => {
        if (!showResults) {
            startTimer();
        }

        return () => clearInterval(timerRef.current);
    }, [currentQuestion, showResults]);

    const handleAnswerClick = (answerIndex) => {
        if (selectedAnswer !== null || isAnimating) return;

        // Calculate time taken for this question
        const timeTaken = Math.round((Date.now() - questionStartTime) / 1000);
        setTotalTimeTaken(prev => prev + timeTaken);

        clearInterval(timerRef.current);
        setSelectedAnswer(answerIndex);
        setIsAnimating(true);

        if (answerIndex === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
                setIsAnimating(false);
            } else {
                setShowResults(true);
                setIsAnimating(false);
            }
        }, 1500);
    };

    const restartQuiz = () => {
        clearInterval(timerRef.current);
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResults(false);
        setTotalTimeTaken(0);
    };

    // Calculate progress percentage
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    // Get difficulty level name in Arabic
    const getDifficultyName = () => {
        switch(difficulty) {
            case 'level1': return 'المستوى الأول';
            case 'level2': return 'المستوى الثاني';
            case 'level3': return 'المستوى الثالث';
            default: return 'مستوى غير معروف';
        }
    };

    // Get score percentage
    const scorePercentage = Math.round((score / questions.length) * 100);

    // Get result message based on score
    const getResultMessage = () => {
        if (scorePercentage >= 90) return { message: 'ممتاز!', emoji: '🏆', color: 'text-emerald-600' };
        if (scorePercentage >= 70) return { message: 'جيد جداً!', emoji: '👍', color: 'text-emerald-500' };
        if (scorePercentage >= 50) return { message: 'جيد', emoji: '👌', color: 'text-yellow-500' };
        return { message: 'يمكنك التحسن', emoji: '💪', color: 'text-red-500' };
    };

    // Get time color based on time left
    const getTimeColor = () => {
        const maxTime = getTimeForDifficulty();
        const percentage = (timeLeft / maxTime) * 100;

        if (percentage > 50) return 'text-emerald-600';
        if (percentage > 20) return 'text-yellow-500';
        return 'text-red-500';
    };

    // Get timer bar color based on time left
    const getTimerBarColor = () => {
        const maxTime = getTimeForDifficulty();
        const percentage = (timeLeft / maxTime) * 100;

        if (percentage > 50) return 'bg-emerald-500';
        if (percentage > 20) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const result = getResultMessage();

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Quiz Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                    أسئلة في {topic.name}
                </h1>
                <div className="inline-flex items-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {getDifficultyName()} - {getTimeForDifficulty()} ثانية للسؤال
                </div>
            </div>

            {/* Progress Bar */}
            {!showResults && (
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>السؤال {currentQuestion + 1} من {questions.length}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <motion.div
                            className="bg-emerald-600 h-2.5 rounded-full"
                            initial={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        ></motion.div>
                    </div>
                </div>
            )}

            {/* Question Card */}
            {!showResults ? (
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    key={currentQuestion}
                >
                    <div className="p-6 md:p-8">
                        {/* Timer */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">الوقت المتبقي</span>
                                <span className={`text-lg font-bold ${getTimeColor()}`}>{timeLeft} ثانية</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <motion.div
                                    className={`${getTimerBarColor()} h-2.5 rounded-full`}
                                    initial={{ width: '100%' }}
                                    animate={{ width: `${(timeLeft / getTimeForDifficulty()) * 100}%` }}
                                    transition={{ duration: 1 }}
                                ></motion.div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-4 mx-auto">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 dark:text-white mb-6 font-quran leading-relaxed">
                                {questions[currentQuestion].question}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <AnimatePresence>
                                {questions[currentQuestion].options.map((option, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => handleAnswerClick(index)}
                                        className={`p-4 md:p-5 rounded-xl text-lg font-quran text-right transition-all duration-300 flex items-start
                                            ${selectedAnswer !== null
                                                ? index === questions[currentQuestion].correctAnswer
                                                    ? 'bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-500 text-emerald-800 dark:text-emerald-200'
                                                    : selectedAnswer === index
                                                        ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-800 dark:text-red-200'
                                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                : 'bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white hover:border-emerald-400 hover:shadow-md'}
                                            ${selectedAnswer === null && 'hover:scale-[1.02]'}
                                        `}
                                        disabled={selectedAnswer !== null || isAnimating}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ml-3 flex-shrink-0
                                            ${selectedAnswer !== null
                                                ? index === questions[currentQuestion].correctAnswer
                                                    ? 'bg-emerald-500 text-white'
                                                    : selectedAnswer === index
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                                                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}
                                        `}>
                                            {/* {String.fromCharCode(1617 + index)} */}
                                        </div>
                                        <span>{option}</span>
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Feedback */}
                        {selectedAnswer !== null && (
                            <motion.div
                                className={`mt-6 p-4 rounded-lg text-center ${
                                    selectedAnswer === questions[currentQuestion].correctAnswer
                                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200'
                                        : selectedAnswer === -1
                                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
                                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                                }`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>إجابة صحيحة</span>
                                    </div>
                                ) : selectedAnswer === -1 ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>انتهى الوقت</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <span>إجابة خاطئة</span>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            ) : (
                /* Results Screen */
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="p-8 text-center">
                        <div className="flex justify-center mb-6">
                            <div className={`text-6xl ${result.color}`}>
                                {result.emoji}
                            </div>
                        </div>

                        <h2 className={`text-3xl font-bold mb-4 ${result.color}`}>
                            {result.message}
                        </h2>

                        <div className="mb-8">
                            <div className="text-5xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                                {score} <span className="text-2xl text-gray-500 dark:text-gray-400">من</span> {questions.length}
                            </div>
                            <div className="text-xl text-gray-600 dark:text-gray-400">
                                {scorePercentage}%
                            </div>
                            <div className="mt-4 text-gray-600 dark:text-gray-400">
                                <div className="flex items-center justify-center">
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>الوقت الإجمالي: {totalTimeTaken} ثانية</span>
                                </div>
                                <div className="mt-1">
                                    متوسط الوقت لكل سؤال: {Math.round(totalTimeTaken / questions.length)} ثانية
                                </div>
                            </div>
                        </div>

                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-8">
                            <motion.div
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-4 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${scorePercentage}%` }}
                                transition={{ duration: 1, delay: 0.3 }}
                            ></motion.div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <motion.button
                                onClick={restartQuiz}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center justify-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                إعادة المحاولة
                            </motion.button>

                            <motion.button
                                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center justify-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                العودة للقسم
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default QuizApp;
