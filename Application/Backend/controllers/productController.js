const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const ecomCompanies = [
    'AMZ',
    'FLP',
    'SNP',
    'MYN',
    'AZO'
];

const categories = [
    'Phone', 'Computer', 'TV', 'Earphone', 'Tablet', 'Charger', 'Mouse', 'Keypad', 
    'Bluetooth', 'Pendrive', 'Remote', 'Speaker', 'Headset', 'Laptop', 'PC'
];

module.exports.getProducts = async (req, res) => {
    const { categoryname } = req.params;
    const { n = 10, page = 1, sortBy = 'rating', order = 'desc', minPrice = 1, maxPrice = 10000 } = req.query;
    const limit = Math.min(n, 10);
    const offset = (page - 1) * limit;
    if (!categories.includes(categoryname)) {
        return res.status(400).json({ error: 'Invalid category name' });
    }
    try {
        const productPromises = ecomCompanies.map(async (company) => {
            const url = `http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products?top=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}`
            console.log(url);
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${req.token}`
                    }
                });
                const productsWithCompany = response.data.map(product => ({
                    ...product,
                    companyName: company
                }));
                return productsWithCompany;
            } catch (error) {
                console.error(`Error fetching URL: ${url}`, error);
                return []; // Return an empty array or handle the error as needed
            }
        });

        const responses = await Promise.all(productPromises);
        let products = responses.flatMap(response => response);

        if (minPrice !== undefined && maxPrice !== undefined) {
            products = products.filter(product => 
                product.price >= minPrice && product.price <= maxPrice
            );
        }

        products.sort((a, b) => {
            if (order === 'asc') {
                return a[sortBy] - b[sortBy];
            } else {
                return b[sortBy] - a[sortBy];
            }
        });

        products = products.map(product => ({ ...product, id: uuidv4() }));

        const paginatedProducts = products.slice(offset, offset + limit);

        res.json(paginatedProducts);
    } catch (error) {
        // console.log(error)
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

module.exports.getProductById = async (req, res) => {
    const { categoryname, productid } = req.params;

    if (!categories.includes(categoryname)) {
        return res.status(400).json({ error: 'Invalid category name' });
    }

    try {
        const productPromises = ecomCompanies.map(company => 
            axios.get(`http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products`)
        );

        const responses = await Promise.all(productPromises);
        let products = responses.flatMap(response => response.data);

        // Add unique identifier to each product
        products = products.map(product => ({ ...product, id: uuidv4() }));

        const product = products.find(product => product.id === productid);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};