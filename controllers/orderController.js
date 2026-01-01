const mongoose = require('mongoose');
const { Order, Product } = require('../models');
const { baseResponse } = require('../utils/response');
const { NotFoundError, ValidationError } = require('../utils/errors');

const createOrder = async (req, res, next) => {
  try {
    const { products } = req.body;
    const userId = req.user.userId;

  
    if (!Array.isArray(products) || products.length === 0) {
      throw new ValidationError('Products array is required and must contain at least one item');
    }

  
    const productIds = products.map(p => new mongoose.Types.ObjectId(p.productId));
    const dbProducts = await Product.find({
      _id: { $in: productIds },
    });

    if (dbProducts.length !== productIds.length) {
      throw new NotFoundError('One or more products not found');
    }

   
    let totalPrice = 0;
    const orderProducts = [];
    const stockUpdates = [];

    for (const item of products) {
      const dbProduct = dbProducts.find(p => p._id.toString() === item.productId);

      if (!dbProduct) {
        throw new NotFoundError(`Product with id ${item.productId} not found`);
      }

      if (dbProduct.stock < item.quantity) {
        throw new ValidationError(`Insufficient stock for ${dbProduct.name}. Available: ${dbProduct.stock}, Requested: ${item.quantity}`);
      }

      totalPrice += parseFloat(dbProduct.price) * item.quantity;

  
      stockUpdates.push({
        product: dbProduct,
        quantity: item.quantity,
      });

      orderProducts.push({
        productId: dbProduct._id.toString(),
        name: dbProduct.name,
        price: parseFloat(dbProduct.price),
        quantity: item.quantity,
      });
    }

    const order = await Order.create({
      userId: new mongoose.Types.ObjectId(userId),
      description: `Order with ${orderProducts.length} item(s)`,
      totalPrice,
      status: 'completed',
      products: orderProducts,
    });

   
    for (const update of stockUpdates) {
      update.product.stock -= update.quantity;
      await update.product.save();
    }

    const orderResponse = {
      id: order._id.toString(),
      userId: order.userId.toString(),
      description: order.description,
      totalPrice: parseFloat(order.totalPrice),
      status: order.status,
      products: order.products,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };

    res.status(201).json(
      baseResponse(true, 'Order placed successfully', orderResponse)
    );
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ userId: new mongoose.Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .select('userId description totalPrice status products createdAt updatedAt');

    const ordersResponse = orders.map(order => ({
      id: order._id.toString(),
      userId: order.userId.toString(),
      description: order.description,
      totalPrice: parseFloat(order.totalPrice),
      status: order.status,
      products: order.products,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));

    res.status(200).json(
      baseResponse(true, 'Orders retrieved successfully', ordersResponse)
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
};