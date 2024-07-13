import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsResponse = await axios.get("http://localhost:3000/transactions");
        const customersResponse = await axios.get("http://localhost:3000/customers");
        setTransactions(transactionsResponse.data);
        setCustomers(customersResponse.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const combinedData = transactions.map((transaction) => {
    const customer = customers.find((customer) => customer.id == transaction.customer_id);
    return {
      ...transaction,
      customerName: customer ? customer.name : "None",
      customerId: customer ? customer.id : "None"
    };
  });

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredData = combinedData.filter(
    (transaction) =>
      transaction.amount.toString().includes(filter) ||
      transaction.customerName?.toLowerCase().includes(filter.toLowerCase())
  );

  const groupedData = filteredData.reduce((acc, curr) => {
    if (!acc[curr.customerId]) {
      acc[curr.customerId] = {
        customerName: curr.customerName,
        transactions: []
      };
    }
    acc[curr.customerId].transactions.push(curr);
    return acc;
  }, {});

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data IT mostly the port of json change it from http://localhost:3000 to yours </div>;

  return (
    <div className="container my-5 py-2 rounded-5 shadow-lg">
      <h1 className="text-center fw-bolder">Customers Transactions</h1>
      <h5 className="mb-4 text-center fs-6 text-info">Click on the client's name to see the chart</h5>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by customer name or Transaction amount ..."
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <table className="table table-bordered    ">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Transaction Amount</th>
            <th>Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedData).length > 0 ? (
            Object.keys(groupedData).map((customerId) => (
              <React.Fragment key={customerId}>
                {groupedData[customerId].transactions.map((transaction, index) => (
                  <tr key={transaction.id}>
                    {index === 0 ? (
                      <>
                        <td rowSpan={groupedData[customerId].transactions.length}>{customerId}</td>
                        <td rowSpan={groupedData[customerId].transactions.length}>
                          <Link to={`/chart/${customerId}`}>{groupedData[customerId].customerName}</Link>
                        </td>
                      </>
                    ) : null}
                    <td>{transaction.amount}</td>
                    <td>{transaction.date}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
