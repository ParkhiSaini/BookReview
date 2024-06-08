const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const url = 'http://localhost:5000/public_users';


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});
  




// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
 
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn= req.params.isbn;
  res.send(books[isbn]);
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let result =[];
  const bookKeys= Object.keys(books);

  bookKeys.forEach(key=> {
    if(books[key].author===author){
      result.push(books[key]);
    }
  })

  if (result.length>0){
    res.json(result);
  }else{
    res.status(404).json({message: "No books for the given author"});
  }
  //Write your code here

});


public_users.get('/isbn/:isbn',function (req, res) {
  const isbn= req.params.isbn;
  res.send(books[isbn]);
  return res.status(300).json({message: "Yet to be implemented"});
 });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let result =[];
  const bookKeys=Object.keys(books); 

  bookKeys.forEach(key=> {
    if(books[key].title === title){
      result.push(books[key]);
    }
  })
  if (result.length>0){
    res.json(result);
  }else{
    res.status(404).json({message: "No books for the given title"})
  }
  
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

    // Find the book by ISBN
    const book = books[isbn];

    if (book) {
        // Return the reviews of the found book
        res.json({ reviews: book.reviews });
    } else {
        // If book not found, return a 404 error
        res.status(404).json({ message: "Book not found" });
    }
});

// regd_users.delete("/auth/review/:isbn", (req, res) => {
  
// });

module.exports.general = public_users;
