import "./todocard.css";
function TodoCard({ title, completed, username }) {
  return (
    <div className="todoCard">
      <h3 className="todoTitle">{title}</h3>
      <div className="todoUser">
        <img className="todoAvatar" src="{" alt="" />
        <p>{username}</p>
        <p>{completed ? "✅ Completed" : "❌  Not Completed"}</p>
      </div>
    </div>
  );
}

export default TodoCard;
