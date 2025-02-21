import { useEffect, useState } from "react";
import { getHistory } from "../../services/apiServices";

const UserQuizHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistoryQuiz = async () => {
      try {
        const res = await getHistory();
        if (res && res.EC === 0) {
          setHistory(res.DT.data);
        }
      } catch (error) {
        console.error("Failed to fetch quiz history:", error);
      }
    };
    fetchHistoryQuiz();
  }, []);

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Quiz Name</th>
              <th className="border px-4 py-2 text-center">Total Questions</th>
              <th className="border px-4 py-2 text-center">Correct/Total</th>
              <th className="border px-4 py-2 text-center">Completed At</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">{item.quizHistory?.name}</td>
                  <td className="border px-4 py-2 text-center">
                    {item.total_questions}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {item.total_correct}/{item.total_questions}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No quiz history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserQuizHistory;
