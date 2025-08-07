import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
       const res = await axios.get(`${import.meta.env.VITE_Backend_url}/api/question/all`);
        setQuestions(res.data.questions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to load questions.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Questions and Answers</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q._id} className="border border-gray-300 rounded-md p-4 shadow-sm bg-white">
              <h3 className="text-lg font-semibold">{q.title}</h3>
              <p className="mt-2">
                <strong>Answer:</strong>{' '}
                {q.answer ? (
                  <span className="text-green-600">{q.answer}</span>
                ) : (
                  <span className="text-red-500">Waiting for answer...</span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllQuestions;

