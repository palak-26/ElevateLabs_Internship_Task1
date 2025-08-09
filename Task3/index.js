// index.js

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON

// In-memory data store
let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "1984", author: "George Orwell" }
];

// GET /books - return all books
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// POST /books - add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - update book by ID
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const book = books.find(b => b.id === parseInt(id));
  
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.status(200).json(book);
});

// DELETE /books/:id - delete book by ID
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  books = books.filter(b => b.id !== parseInt(id));
  res.status(204).send();
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
