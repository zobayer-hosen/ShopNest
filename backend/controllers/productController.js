const Product = require('../model/product');
const cloudinary = require('../config/cloudinary');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }

    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        let imageURL = '';
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            imageURL = result.secure_url;
        }
        const product = new Product({
            name,
            description,   
            price,
            category,
            stock,     
            imageURL
        });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error' });
    }       
}; 

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        let imageURL = '';
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            imageURL = result.secure_url;
        }
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = name || product.name;   
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.stock = stock || product.stock;

            if(imageURL){
                product.imageURL = imageURL;
            }
            
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }         
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error' });
    }   

};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error' });
    }       
};

module.exports = {
    getProducts,
    getProductById, 
    createProduct,
    updateProduct,
    deleteProduct
};

