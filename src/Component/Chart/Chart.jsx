import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip);

const Chart = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/transactions");
        setTransactions(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const customerTransactions = transactions.filter(trans => trans.customer_id == id);

  const chartData = {
    labels: customerTransactions.map(trans => trans.date),
    datasets: [
      {
        label: `Transaction Data for Customer ID ${id}`,
        data: customerTransactions.map(trans => trans.amount),
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transaction Details Chart',
      },
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data IT mostly the port of json change it from http://localhost:3000 to yours</div>;

  return (
    <div className="container mt-5 position-relative">
      <h1>Transaction Details</h1>
      <Link to={"/"} className="btn btn-light position-absolute top-0 end-0 "> Go back  </Link>
      {customerTransactions.length > 0 ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Transactions for Customer ID: {id}</h5>
           
          </div>
          <div className="w-75 m-auto">

          <Line data={chartData} options={options} />
          </div>
        </div>
      ) : (
        <p>No transactions available for this customer</p>
      )}
    </div>
  );
};

export default Chart;
