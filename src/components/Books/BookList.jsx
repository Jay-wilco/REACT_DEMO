import { useEffect, useState } from "react";

import BookCard from "./BookCard";
import axios from "axios";

const BookList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/books")
      .then((res) => setBooksData(res.data));
  }, []);

  const eventHandler = (id) => {
    console.log("read more button was clicked:", id);
  };
  const toggleStock = (id) => {
    const updatedArray = booksData.map((book) =>
      book.id === id ? { ...book, inStock: !book.inStock } : book
    );

    setBooksData(updatedArray);

    console.log("stock button was clicked", id);
  };
  const toggleFavorite = (id) => {
    setBooksData((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
      )
    );
  };

  const handlePriceChange = (id, newPrice) => {
    const bookToUpdate = booksData.find((book) => book.id === id);
    if (!bookToUpdate) return;

    const updatedBook = {
      ...bookToUpdate,
      price: parseFloat(newPrice),
    };

    axios
      .put(`http://localhost:3001/books/${id}`, updatedBook)
      .then(() => {
        setBooksData((prevBooks) =>
          prevBooks.map((book) => (book.id === id ? updatedBook : book))
        );
      })
      .catch((error) => {
        console.error("Failed to update price:", error);
      });
  };

  // const handlePriceChange = (id, newPrice) => {
  //   setBooksData((prevState) =>
  //     prevState.map((book) =>
  //       book.id === id ? { ...book, price: parseFloat(newPrice) } : book
  //     )
  //   );
  // };

  const searchHandle = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredBooks = booksData.filter((book) => {
    const search = searchValue.toLowerCase();
    return (
      book.title?.toLowerCase().includes(search) ||
      book.author?.toLowerCase().includes(search)
    );
  });

  return (
    <>
      <div className="books">
        <h1>Books catalog</h1>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          name="search"
          value={searchValue}
          onChange={searchHandle}
        />
        <p>Your search word is: {searchValue}</p>

        <div className="boxes">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                {...book}
                onEventHandler={() => eventHandler(book.id)}
                onToggleStock={toggleStock}
                onToggleFavorite={() => toggleFavorite(book.id)}
                onPriceChange={handlePriceChange}
              />
            ))
          ) : (
            <p>No matching books found. Try another search.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BookList;
