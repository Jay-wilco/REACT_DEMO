import "./Box.css";

const Box = ({ id, name, title, age, myanimal, salary }) => {
  return (
    <div className="box">
      <p>
        <strong>id: </strong>
        {id}
      </p>
      <p>
        <strong>Name: </strong>
        {name}
      </p>
      <p>
        <strong>Title:</strong> {title}
      </p>
      <p>
        <strong>Age:</strong> {age}
      </p>
      <p>
        <strong>Animal:</strong> {myanimal}
      </p>
      <p>
        <strong>Salary:</strong> {salary}
      </p>
    </div>
  );
};

export default Box;
