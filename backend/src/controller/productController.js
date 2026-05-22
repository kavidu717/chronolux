import Product from "../models/Product.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const createProduct = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
       console.log("FILE RECEIVED:", req.file)
    }

    const product = await Product.create({
      ...req.body,
      image: imageUrl,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
};

export const getProducts = async (req, res) => {
  try {
    const { brand, category, search } = req.query;

    let filter = {};

    if (brand && brand.trim() !== "") {
      filter.brand = brand.trim();
    }

    if (category && category.trim() !== "") {
      filter.category = category.trim();
    }

    if (search && search.trim() !== "") {
      filter.name = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    const products = await Product.find(filter);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 GET FILTER OPTIONS (NO HARDCODE)
export const getFilterOptions = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    const brands = await Product.distinct("brand");

    res.json({ categories, brands });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};