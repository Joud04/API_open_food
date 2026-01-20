const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dns = require('node:dns');

// 🚑 FIX VITESSE : Force Node à utiliser IPv4 (évite les timeouts de 5s dans Docker)
dns.setDefaultResultOrder('ipv4first');

const app = express();
app.use(cors());

// Config
const TIMEOUT = 10000; // 10 secondes max pour répondre
const FIELDS = "code,product_name,brands,image_front_small_url,image_front_url,nutriscore_grade,ecoscore_grade,quantity,allergens_tags";

// Fonction propre pour appeler l'API
async function callApi(url, label) {
    console.log(`🌍 [${label}] Appel : ${url}`);
    try {
        const response = await axios.get(url, { 
            timeout: TIMEOUT,
            headers: { 'User-Agent': 'FoodProjectStudent/1.0' } 
        });
        return response.data;
    } catch (error) {
        console.error(`❌ Erreur [${label}] :`, error.message);
        throw error;
    }
}

// 1. Route Accueil (Aléatoire)
app.get('/api/initial', async (req, res) => {
    try {
        const categories = ["snack", "chocolat", "boisson", "biscuit", "pizza"];
        const randomCat = categories[Math.floor(Math.random() * categories.length)];
        
        // On cherche des produits populaires de la catégorie
        const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${randomCat}&search_simple=1&action=process&json=1&page_size=8&sort_by=popularity&fields=${FIELDS}`;
        
        const data = await callApi(url, "HOME");
        res.json(data.products || []);
    } catch (error) {
        console.error("Erreur Initial:", error.message);
        res.status(500).json({ error: "API indisponible" });
    }
});

// 2. Route Recherche
app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.json([]);

    console.log(`🔎 Recherche demandée : "${query}"`);

    try {
        let results = [];

        // CAS A : C'est un Code Barre (chiffres uniquement)
        if (/^\d+$/.test(query)) {
            const url = `https://world.openfoodfacts.org/api/v0/product/${query}.json?fields=${FIELDS}`;
            const data = await callApi(url, "SCAN");
            
            if (data.status === 1) {
                results = [data.product];
            }
        } 
        // CAS B : C'est du Texte (ex: Nutella)
        else {
            const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&page_size=12&fields=${FIELDS}`;
            const data = await callApi(url, "SEARCH");
            results = data.products || [];
        }

        console.log(`✅ ${results.length} produits trouvés pour "${query}"`);
        res.json(results);

    } catch (error) {
        console.error("Erreur Search:", error.message);
        res.status(500).json({ error: "Erreur lors de la recherche" });
    }
});

app.listen(3000, () => console.log('🚀 Backend prêt (IPv4 forcé) sur le port 3000'));