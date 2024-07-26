const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const app = express();
const port = process.env.PORT || 4000;
app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use('/api', productRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});