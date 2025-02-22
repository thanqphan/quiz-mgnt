import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./DashBoard.scss";
import { useEffect, useState } from "react";
import { getOverView } from "../../../services/apiServices";
const DashBoard = (props) => {
  const [dataOverView, setDataOverView] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataOverView();
  }, []);
  const fetchDataOverView = async () => {
    let res = await getOverView();
    if (res && res.EC === 0) {
      setDataOverView(res.DT);
    }
    let qz = 0,
      qs = 0,
      as = 0;
    qz = res?.DT?.others?.countQuiz ?? 0;
    qs = res?.DT?.others?.countQuestions ?? 0;
    as = res?.DT?.others?.countAnswers ?? 0;
    const data = [
      {
        name: "Quizzes",
        qz: qz,
      },
      {
        name: "Questions",
        qs: qs,
      },
      {
        name: "Answers",
        as: as,
      },
    ];
    setDataChart(data);
  };
  console.log(dataOverView);

  return (
    <div className="dashboard-container">
      <div className="title">Analytics DashBoard</div>
      <div className="content">
        <div className="c-left">
          <div className="l-card">
            <span className="card-name">Total Users</span>
            <span className="card-count">
              {dataOverView &&
              dataOverView.users &&
              dataOverView.users.total ? (
                <>{dataOverView.users.total}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="l-card">
            <span className="card-name">Total Quizzes</span>
            <span className="card-count">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuiz ? (
                <>{dataOverView.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="l-card">
            <span className="card-name">Total Questions</span>
            <span className="card-count">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuestions ? (
                <>{dataOverView.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="l-card">
            <span className="card-name">Total Answers</span>
            <span className="card-count">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countAnswers ? (
                <>{dataOverView.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="qz" fill="#2D336B" />
              <Bar dataKey="qs" fill="#7886C7" />
              <Bar dataKey="as" fill="#A9B5DF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
