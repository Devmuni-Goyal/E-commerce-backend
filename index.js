import cors from 'cors';

import {connectDB} from './database/index.js'
// const express = require('express');
import User from './Schema/user.js';
import Category from './Schema/category.js';
import Product from './Schema/product.js';
import Subcategory from './Schema/subcategory.js';
import express from 'express';
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello from Node backend!');
});

app.post('/api/signup', async(req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    try {
        const userExists = await User.findOne({ email });
    
        if (userExists) {
          return res.status(409).json({ message: 'Email already exists' });
        }
    
        const newUser = new User({ name, email, password }); 
        console.log(newUser,"newUser");
        await newUser.save();
    
        res.status(201).json({ message: 'User created successfully', user: newUser });
      } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
      }

    res.status(201).json({
        message: 'User signed up successfully!',
        user: newUser
    });
});

app.post('/api/login', async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    const ans = await User.findOne({email, password});
    console.log(ans,"ans");
    if (!ans) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful!', ans });
});

app.post('/api/category/create', async(req, res) => {
    const { name, userRef } = req.body;
    if (!name || !userRef) {
        return res.status(400).json({ message: 'name is required' });
    }
    // const user = await User.findById(id);
    const newCategory = new Category({userRef,name}); 
    await newCategory.save();
    console.log(newCategory,"ans");

    res.status(200).json({ message: 'category added' });
});

app.post('/api/category/list', async(req, res) => {
    const { userRef } = req.body;
    if (!userRef) {
        return res.status(400).json({ message: 'id ddddare required' });
    }
    // const ans = await User.findOne({email, password});
    const categories = await Category.find({ userRef });
    // console.log(ans,"ans");
    // if (!ans) {
    //     return res.status(401).json({ message: 'Invalid email or password' });
    // }

    res.status(200).json({ message: 'category fetched successful!', categories });
});

app.post('/api/subcategory/create', async(req, res) => {
    const { name, userRef, categoryRef } = req.body;
    if (!name || !userRef) {
        return res.status(400).json({ message: 'name is required' });
    }
    // const user = await User.findById(id);
    const newSubCategory = new Subcategory({userRef,categoryRef,name}); 
    await newSubCategory.save();
    // console.log(newCategory,"ans");

    res.status(200).json({ message: 'Subcategory added' });
});

app.post('/api/subcategory/list', async(req, res) => {
    const { userRef, categoryRef } = req.body;
    if (!categoryRef || !userRef) {
        return res.status(400).json({ message: 'name is required' });
    }
    // const user = await User.findById(id);
    // const newSubCategory = new Subcategory({userRef,categoryRef,name}); 
    // await newSubCategory.save();
    // console.log(newCategory,"ans");
    const subcategories = await Subcategory.find({ userRef, categoryRef });
    res.status(200).json({ message: 'Subcategory fetched', subcategories });
});

app.post('/api/product/create', async(req, res) => {
    const { name, userRef, productcode, description, categoryRef, subCategoryRef } = req.body;
    if (!name || !userRef || !categoryRef ||  !subCategoryRef) {
        return res.status(400).json({ message: 'name is required' });
    }
    const newProduct = new Product({userRef, categoryRef, subCategoryRef, productcode, description, name}); 
    await newProduct.save();

    res.status(200).json({ message: 'Product added' });
});

app.post('/api/product/list', async(req, res) => {
    const { userRef, categoryRef, subCategoryRef } = req.body;
    if (!userRef || !categoryRef ||  !subCategoryRef) {
        return res.status(400).json({ message: 'name is required' });
    }
    // const newProduct = new Product({userRef, categoryRef, subCategoryRef, productcode, description, name}); 
    // await newProduct.save();
    const products = await Product.find({ userRef, categoryRef, subCategoryRef });
    res.status(200).json({ message: 'Product fetched', products });
});
app.listen(PORT, async() => {
  await connectDB();
  console.log(`Server running on http://localhost:${PORT}`);

});