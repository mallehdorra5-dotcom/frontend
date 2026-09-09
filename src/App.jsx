import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Erreur :", error));
  }, []);

  const addTodo = () => {
    if (!title.trim()) return;

    fetch("http://localhost:8080/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        completed: false,
      }),
    })
      .then((response) => response.json())
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
        setTitle("");
      })
      .catch((error) => console.error("Erreur :", error));
  };

  return (
    <div style={styles.container}>
      <h1>📝 Ma Todo List</h1>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Écrire une tâche..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <button onClick={addTodo} style={styles.button}>
          Ajouter
        </button>
      </div>

      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.todo}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    width: "500px",
    margin: "50px auto",
    fontFamily: "Arial",
    textAlign: "center",
  },
  form: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "30px",
  },
  todo: {
    padding: "12px",
    marginBottom: "10px",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
    textAlign: "left",
  },
};

export default App;
