import { use, useEffect, useState } from "react";
import TodoCard from "../components/TodoCard/TodoCard";
import axios from "axios";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const [statusFilter, setStatusFilter] = useState("all"); // status filter
  const [userFilter, setUserFilter] = useState("all"); // user filter

  const simulateLoading = (callback) => {
    // loading timeout thingy
    setTimeout(callback, 1500);
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        console.log(res);
        setTodos(res.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (todos.length && users.length) {
      simulateLoading(() => setLoading(false));
    }
  }, [todos, users]);

  const filteredData = todos.filter((todo) => {
    const matchStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "completed"
        ? todo.completed
        : !todo.completed;

    const matchUser =
      userFilter === "all" ? true : todo.userId === Number(userFilter);

    return matchStatus && matchUser;
  });

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div>
        <label>Filter by status</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not completed</option>
        </select>
        <label>Filter by user</label>
        <select
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        >
          <option value="all">All users</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {filteredData.map((todo) => {
          const user = users.find((user) => user.id === todo.userId);
          return (
            <TodoCard
              key={todo.id}
              username={user?.name || "Unknown"}
              title={todo.title}
              completed={todo.completed}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todos;
