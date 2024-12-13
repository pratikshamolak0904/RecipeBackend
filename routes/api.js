// routes/api.js
const express = require('express');
const Recipe = require('../model/table');

const router = express.Router();

// Add a new recipe
router.post('/addRecipe', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.send({ status: true, message: "Recipe added successfully!" });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

// Get all recipes
router.get('/getRecipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.send({ status: true, message: recipes });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

// Get a specific recipe by ID
router.get('/getRecipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.send({ status: false, message: 'Recipe not found' });
    }
    res.send({ status: true, message: recipe });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

// Update a recipe by ID
router.put('/updateRecipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recipe) {
      return res.send({ status: false, message: 'Recipe not found' });
    }
    res.send({ status: true, message: 'Recipe updated successfully!' });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

// Delete a recipe by ID
router.delete('/deleteRecipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.send({ status: false, message: 'Recipe not found' });
    }
    res.send({ status: true, message: 'Recipe deleted successfully!' });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

// Search recipes by name or ingredient
router.get('/search', async (req, res) => {
  const { query } = req.query; // Search query (name or ingredient)
  try {
    const recipes = await Recipe.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { ingredients: { $regex: query, $options: 'i' } },
      ],
    });
    res.send({ status: true, message: recipes });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

module.exports = router;
