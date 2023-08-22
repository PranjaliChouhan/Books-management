
import './App.css';

import React, { useState, useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function App() {
  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch('http://localhost:3000/books');
    const booksData = await response.json();
    setBooks(booksData);
  };

  const addBook = async () => {
    if (newBookTitle) {
      const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newBookTitle }),
      });

      if (response.ok) {
        setNewBookTitle('');
        fetchBooks();
      }
    }
  };

  const updateBook = async (bookId) => {
    const newTitle = prompt('Enter new book title:');
    if (newTitle) {
      const response = await fetch(`http://localhost:3000/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (response.ok) {
        fetchBooks();
      }
    }
  };

  const deleteBook = async (bookId) => {
    const response = await fetch(`http://localhost:3000/books/${bookId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchBooks();
    }
  };


  return (
    <div className="App">
      <Typography variant="h1" >Manage-Books</Typography>

      <Typography variant="h2">Book-list</Typography>
      <ul className='books'>
        {books.map((book) => (
          <li key={book.id}>
            {book.title}
            <Button onClick={() => updateBook(book.id)} variant="outlined">
              Update
            </Button>
            <Button onClick={() => deleteBook(book.id)} variant="outlined">
              Delete
            </Button>
          </li>
        ))}
      </ul>

      <Typography variant="h2">Add a New Book</Typography>
      <TextField
         className='add'
        type="text"
        value={newBookTitle}
        onChange={(e) => setNewBookTitle(e.target.value)}
        placeholder="Enter book title"
      />
      <Button className='add' onClick={addBook}  >
        Add Book
      </Button>
    </div>
  );
}

export default App;
