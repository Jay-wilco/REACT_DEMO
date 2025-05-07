import { useState } from "react";
import { useNavigate } from "react-router";
import "./AddBookForm.css";
import axios from "axios";

const AddBookForm = ({ onAddBook }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    genre: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value })); // <--that is destructured,  ({...prev,[e.target.name]:e.target.value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      ...formData,
      price: parseFloat(formData.price),
      inStock: true,
      isFavorite: false,
    };
    axios.post("http://localhost:3001/books", newBook).then((res) => {
      console.log(res);
    });

    onAddBook(newBook);
    navigate("/books");

    setFormData({
      title: "",
      author: "",
      price: "",
      genre: "",
    });
  };

  return (
    <>
      <main>
        <h2>Add new book</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            name="title"
          />
          <input
            type="text"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            name="author"
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            name="price"
          />
          <input
            type="text"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
            name="genre"
          />
          <button type="submit">Add Book </button>
        </form>
      </main>
    </>
  );
};

export default AddBookForm;
