
import './App.css';

import React, { useState, useEffect } from 'react';
import './App.css';


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
      <h1>Books Management</h1>

      <h2>Books-List</h2>
      <div className='books'>
      <ul >
        {books.map((book) => (
          <li key={book.id}>
            {book.title}
           
            <button   className="btn" onClick={() => updateBook(book.id)}>Update</button>
            <button  className="btn" onClick={() => deleteBook(book.id)}>Delete</button>
          
          </li>
        ))}
      </ul>
      </div>

      <h2>Add a New Book</h2>
      <div  className='add'>
      <input
        
        type="text"
        value={newBookTitle}
        onChange={(e) => setNewBookTitle(e.target.value)}
        placeholder="Enter book title"
      />
      <button  className='add' onClick={addBook}>Add Book</button>
      </div>
    </div>
  );
}

export default App;
