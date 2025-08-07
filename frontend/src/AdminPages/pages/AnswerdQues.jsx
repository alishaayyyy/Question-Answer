// src/pages/AdminAnswers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaReply } from "react-icons/fa";
import { toast } from "react-toastify";

const AdminAnswers = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_Backend_url}api/question`);
      setQuestions(res.data.questions); // adjust if your API returns different shape
    } catch (error) {
      toast.error("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDrawerOpen]);

  const handleOpenDrawer = (question) => {
    setSelectedQuestion(question);
    setAnswer(question.answer || "");
    setIsDrawerOpen(true);
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return toast.error("Answer cannot be empty");

    try {
      setSubmitting(true);
     await axios.put(
  `${import.meta.env.VITE_Backend_url}api/question/answer/${selectedQuestion._id}`,
        { answer },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Answer submitted successfully");
      setIsDrawerOpen(false);
      setSelectedQuestion(null);
      setAnswer("");
      fetchQuestions();
    } catch (error) {
      toast.error("Failed to submit answer");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Questions You Have to Answer</h1>

      {loading ? (
        <p className="text-center text-blue-600 font-medium">Loading questions...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2">User Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Title</th>
                <th className="p-2">Description</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q._id} className="border">
                  <td className="p-2">{q.user?.name || "N/A"}</td>
                  <td className="p-2">{q.user?.email || "N/A"}</td>
                  <td className="p-2">{q.title}</td>
                  <td className="p-2">{q.description}</td>
                  <td className="p-2">{q.status}</td>
                  <td className="p-2">
                    <button
                      className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      onClick={() => handleOpenDrawer(q)}
                    >
                      <FaReply /> Answer this Question
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-6 z-50">
          <h2 className="text-xl font-bold mb-4">Answer Question</h2>
          <p className="mb-2 font-medium text-blue-600">Title: {selectedQuestion?.title}</p>
          <p className="mb-4">{selectedQuestion?.description}</p>
          <textarea
            rows={5}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer..."
            className="w-full border p-2 mb-4 rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSubmitAnswer}
              disabled={submitting}
              className={`px-4 py-2 rounded text-white ${
                submitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {submitting ? "Submitting..." : "Submit Answer"}
            </button>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
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
