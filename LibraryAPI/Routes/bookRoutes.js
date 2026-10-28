const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Book = require("../models/bookModel");

router.post("/", async (req, res) => {
  try {
    const { title, author, category } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const book = await Book.create({
      title,
      author,
      category,
    });

    res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating book",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);

    const books = await Book.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Book.countDocuments();

    res.status(200).json({
      page,
      limit,
      total,
      books,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching books",
      error: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { available } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid book id",
      });
    }

    if (typeof available !== "boolean") {
      return res.status(400).json({
        message: "Available must be true or false",
      });
    }

    const book = await Book.findByIdAndUpdate(id, { available }, { new: true });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating book",
      error: error.message,
    });
  }
});

module.exports = router;
