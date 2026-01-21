const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dns = require('node:dns');
const mongoose = require('mongoose');

// Fix IPv4 pour la vitesse
dns.setDefaultResultOrder('ipv4first');

const app = express();
app.use(cors());

// CONFIGURATION MONGODB 
const MONGO_URI = 'mongodb://mongo:27017/food-project';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connecté !'))
    .catch(err => console.error('Erreur MongoDB:', err));

const ProductSchema = new mongoose.Schema({
    code: String,
    name: String,
    brand: String,
    date: { type: Date, default: Date.now }
});

const History = mongoose.model('History', ProductSchema);

// --- CONFIG API ---
const TIMEOUT = 30000; 
const FIELDS = "code,product_name,brands,image_front_small_url,image_front_url,nutriscore_grade,ecoscore_grade,quantity,allergens_tags";

async function callApi(url, label) {
    console.log(`[${label}] Appel : ${url}`);
    try {
        const response = await axios.get(url, { 
            timeout: TIMEOUT,
            headers: { 'User-Agent': 'FoodProjectStudent/1.0' }
        });
        return response.data;
    } catch (error) {
        console.error(`Erreur [${label}] :`, error.message);
        throw error;
    }
}

// Route Accueil
app.get('/api/initial', async (req, res) => {
    try {
        const categories = ["snack", "chocolat", "boisson", "biscuit", "pizza"];
        const randomCat = categories[Math.floor(Math.random() * categories.length)];
        const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${randomCat}&search_simple=1&action=process&json=1&page_size=20&sort_by=popularity&fields=${FIELDS}`;
        const data = await callApi(url, "HOME");
        res.json(data.products || []);
    } catch (error) {
        res.status(500).json({ error: "API indisponible" });
    }
});

// Route Recherche
app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.json([]);

    console.log(`🔎 Recherche : "${query}"`);

    try {
        let results = [];
        let productToSave = null;

        if (/^\d+$/.test(query)) {
            const url = `https://world.openfoodfacts.org/api/v0/product/${query}.json?fields=${FIELDS}`;
            const data = await callApi(url, "SCAN");
            if (data.status === 1) {
                results = [data.product];
                productToSave = data.product;
            }
        } else {
            const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&page_size=20&fields=${FIELDS}`;
            const data = await callApi(url, "SEARCH");
            results = data.products || [];
            if(results.length > 0) productToSave = results[0];
        }

        if (productToSave) {
            const newEntry = new History({
                code: productToSave.code,
                name: productToSave.product_name || "Inconnu",
                brand: productToSave.brands || "Inconnu"
            });
            newEntry.save().then(() => console.log("💾 Sauvegardé en BDD !"));
        }

        res.json(results);

    } catch (error) {
        res.status(500).json({ error: "Erreur recherche" });
    }
});

app.get('/api/history', async (req, res) => {
    const history = await History.find().sort({ date: -1 }).limit(20);
    res.json(history);
});

app.listen(3000, () => console.log('Backend + MongoDB prêt sur le port 3000'));