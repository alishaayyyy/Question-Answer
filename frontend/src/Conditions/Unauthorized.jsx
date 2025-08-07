import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-2xl font-bold text-red-600">Access Denied ❌</h1>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        🔙 Go Back
      </button>
    </div>
  );
};

export default Unauthorized;
