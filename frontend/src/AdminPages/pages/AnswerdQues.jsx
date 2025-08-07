import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminAnswers = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answerText, setAnswerText] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const BASE_URL = import.meta.env.VITE_Backend_url;

  const getAllQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/api/question/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setQuestions(res.data.questions);
    } catch (err) {
      console.error("Error fetching questions", err);
      toast.error("Failed to load questions");
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  const handleAnswerClick = (question) => {
    setSelectedQuestion(question);
    setAnswerText('');
    setDrawerOpen(true);
  };

  const handleSubmit = async () => {
    if (!answerText.trim()) return toast.error("Answer cannot be empty.");

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BASE_URL}/api/question/answer/${selectedQuestion._id}`,
        { answer: answerText },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success("Answer submitted successfully.");
      setDrawerOpen(false);
      setSelectedQuestion(null);
      getAllQuestions();
    } catch (err) {
      console.error("Error submitting answer", err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" />
      <h1 className="text-2xl font-bold mb-4">Admin Answer Panel</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">User Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Question</th>
              <th className="px-4 py-2 border">Answer</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(questions) && questions.map((q) => (
              <tr key={q._id} className="text-center">
                <td className="border px-4 py-2">{q.user?.name || 'N/A'}</td>
                <td className="border px-4 py-2">{q.user?.email || 'N/A'}</td>
                <td className="border px-4 py-2">{q.title}</td>
                <td className="border px-4 py-2">{q.answer || 'Not answered yet'}</td>
                <td className="border px-4 py-2">
                  {!q.answer && (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleAnswerClick(q)}
                    >
                      Answer this Question
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Drawer */}
      {drawerOpen && (
        <div className="fixed top-0 right-0 w-full sm:w-1/2 h-full bg-white shadow-lg p-6 z-50 transition-all duration-300">
          <h2 className="text-xl font-bold mb-4">Write Answer</h2>
          <p className="mb-2 font-semibold">Question:</p>
          <p className="mb-4 text-gray-700">{selectedQuestion?.title}</p>
          <textarea
            className="w-full border border-gray-300 p-2 mb-4 h-32"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Type your answer here..."
          />
          <div className="flex justify-between">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={() => setDrawerOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnswers;


// export default AdminAnswers;

