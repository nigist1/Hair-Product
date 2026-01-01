const mongoose = require('mongoose');
const { Product } = require('../models');
const { baseResponse, paginatedResponse } = require('../utils/response');
const { NotFoundError } = require('../utils/errors');

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;
    const userId = req.user.userId;

    
    let finalImageUrl = imageUrl || null;
    if (req.file) {
      finalImageUrl = `/uploads/images/${req.file.filename}`;
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category: category || null,
      imageUrl: finalImageUrl,
      userId: new mongoose.Types.ObjectId(userId),
    });

    const productResponse = {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      stock: product.stock,
      category: product.category,
      imageUrl: product.imageUrl,
      userId: product.userId.toString(),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    res.status(201).json(
      baseResponse(true, 'Product created successfully', productResponse)
    );
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const product = await Product.findById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    
    Object.keys(updateData).forEach(key => {
      product[key] = updateData[key];
    });

    await product.save();

    const productResponse = {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      stock: product.stock,
      category: product.category,
      userId: product.userId.toString(),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    res.status(200).json(
      baseResponse(true, 'Product updated successfully', productResponse)
    );
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || parseInt(req.query.pageSize) || 10;
    const search = req.query.search || '';

    const query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    const skip = (page - 1) * limit;

    const [products, count] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('name description price stock category imageUrl createdAt updatedAt'),
      Product.countDocuments(query),
    ]);

    const productsResponse = products.map(product => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      stock: product.stock,
      category: product.category,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    res.status(200).json(
      paginatedResponse(
        true,
        'Products retrieved successfully',
        productsResponse,
        page,
        limit,
        count
      )
    );
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    const productResponse = {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      stock: product.stock,
      category: product.category,
      imageUrl: product.imageUrl,
      userId: product.userId.toString(),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    res.status(200).json(
      baseResponse(true, 'Product retrieved successfully', productResponse)
    );
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    res.status(200).json(
      baseResponse(true, 'Product deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  getProductById,
  deleteProduct,
};