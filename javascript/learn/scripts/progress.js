/**
 * progress.js — Fortschritt via localStorage
 *
 * Speichert welche Kapitel abgeschlossen wurden und
 * welche Quiz-Fragen richtig beantwortet wurden.
 */

const Progress = (() => {
  const STORAGE_KEY = "techstore-learn-progress";

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { completed: [], quizResults: {} };
    } catch {
      return { completed: [], quizResults: {} };
    }
  }

  function save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // localStorage not available — silently ignore
    }
  }

  function isCompleted(chapterId) {
    return load().completed.includes(chapterId);
  }

  function markCompleted(chapterId) {
    const data = load();
    if (!data.completed.includes(chapterId)) {
      data.completed.push(chapterId);
      save(data);
    }
  }

  function getCompletedCount() {
    return load().completed.length;
  }

  function getCompletedList() {
    return load().completed;
  }

  function saveQuizResult(chapterId, questionIndex, correct) {
    const data = load();
    if (!data.quizResults[chapterId]) {
      data.quizResults[chapterId] = {};
    }
    data.quizResults[chapterId][questionIndex] = correct;
    save(data);
  }

  function getQuizResult(chapterId, questionIndex) {
    const data = load();
    return data.quizResults[chapterId]?.[questionIndex] ?? null;
  }

  function getChapterQuizResults(chapterId) {
    return load().quizResults[chapterId] || {};
  }

  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  return {
    isCompleted,
    markCompleted,
    getCompletedCount,
    getCompletedList,
    saveQuizResult,
    getQuizResult,
    getChapterQuizResults,
    reset,
  };
})();
