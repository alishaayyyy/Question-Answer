import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const QuestionManager = () => {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', category: '' });
  const [editingId, setEditingId] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const API = `${import.meta.env.VITE_Backend_url}/api/question`;

  const axiosConfig = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`${API}/my-questions`, axiosConfig);
      setQuestions(res.data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, formData, axiosConfig);
        toast.success('Question updated successfully!');
      } else {
        await axios.post(API, formData, axiosConfig);
        toast.success('Question created successfully!');
      }
      setFormData({ title: '', description: '', category: '' });
      setEditingId(null);
      setShowDrawer(false);
      fetchQuestions();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, axiosConfig);
      toast.success('Question deleted!');
      fetchQuestions();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Delete failed!');
    }
  };

  const startEdit = (question) => {
    setFormData({
      title: question.title,
      description: question.description,
      category: question.category,
    });
    setEditingId(question._id);
    setShowDrawer(true);
  };

  const openAddDrawer = () => {
    setFormData({ title: '', description: '', category: '' });
    setEditingId(null);
    setShowDrawer(true);
  };

  return (
    <div className="relative p-4 max-w-4xl mx-auto">
      <ToastContainer />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Questions</h2>
        <button
          onClick={openAddDrawer}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Question
        </button>
      </div>

      <ul className="space-y-3">
        {questions.map((q) => (
          <li
            key={q._id}
            className="p-4 border rounded flex justify-between items-center bg-white shadow-sm"
          >
            <div>
              <p className="font-bold text-lg">{q.title}</p>
              <p>{q.description}</p>
              <p className="text-sm text-gray-500">Category: {q.category}</p>
              <p className="text-sm text-green-600">Status: {q.status || 'waiting for answer'}</p>
            </div>
            <div className="flex space-x-3 text-xl">
              <button onClick={() => startEdit(q)} className="text-yellow-500 hover:text-yellow-600">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(q._id)} className="text-red-600 hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showDrawer && (
        <div className="fixed inset-0 flex justify-end z-50">
          <div className="bg-white w-full sm:w-[400px] h-full p-5 shadow-lg overflow-auto transition-transform duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingId ? 'Edit Question' : 'Add Question'}</h2>
              <button onClick={() => setShowDrawer(false)} className="text-gray-600 text-2xl">
                <AiOutlineClose />
              </button>
            </div>
            <form onSubmit={handleAddOrEdit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editingId ? 'Update' : 'Add'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionManager;
