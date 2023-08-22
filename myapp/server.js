const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors()); // Middleware to parse JSON data

// Sample data for books
let books = [
  { id: 1, title: 'Book 1' },
  { id: 2, title: 'Book 2' },
];

// GET /books - Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST /books - Create a new book
app.post('/books', (req, res) => {
  const newBook = { id: books.length + 1, title: req.body.title };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - Update a book
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(book => book.id === id);
  if (bookIndex !== -1) {
    books[bookIndex].title = req.body.title;
    res.json(books[bookIndex]);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// DELETE /books/:id - Delete a book
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(book => book.id !== id);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
