// controllers/productController.js
import { uploadToCloudinary } from "../middlewares/uplaod.js";
import Product from "../models/Prodect.js";
import { redisClient } from "../utils/redisClient.js";
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, brand, category, stock } = req.body;
    const images = await uploadToCloudinary(req.files);

    const product = await Product.create({
      title,
      description,
      price: Number(price),
      brand,
      category,
      stock: Number(stock),
      images,
      createdBy: req.user._id,
    });

    await redisClient.del("products:*");
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Product creation failed", error: err.message });
  }
};

// ✅ Get All Products (with filters)
export const getAllProducts = async (req, res) => {
  try {
    const { keyword = "", category, minPrice, maxPrice } = req.query;
    const query = {};

    if (keyword.trim()) query.title = { $regex: keyword.trim(), $options: "i" };
    if (category && category !== "All") query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Fetching products failed", error: err.message });
  }
};

// ✅ Get Single Product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Fetching product failed", error: err.message });
  }
};

// ✅ Update Product
export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, brand, category, stock } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.files && req.files.length > 0) {
      for (const img of product.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
      product.images = await uploadToCloudinary(req.files);
    }

    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = Number(price);
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (stock) product.stock = Number(stock);

    const updatedProduct = await product.save();
    await redisClient.del("products:*");

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// ✅ Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    for (const img of product.images) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await product.deleteOne();
    await redisClient.del("products:*");
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

// ✅ Get Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    const cleanCategories = categories.filter(Boolean).sort();
    res.json(cleanCategories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories", error: err.message });
  }
};
