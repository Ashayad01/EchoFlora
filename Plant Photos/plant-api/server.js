const express = require ("express");
const cors = require("cors");
const path = require("path");

const plants = require("./data/plants");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//Server plant images
app.use("/images", express.static(path.join(__dirname, "images")));

//Home route
app.get("/", (req, res) => {
    res.json({
        message: "Plant API is working!"
    });
});

//Get all plants
app.get("/api/plants", (req, res) => {
    console.log("GET /api/plants requested");
    res.json(plants);
});

//Get an individual plant by ID
app.get("/api/plants/:id", (req, res) => {
    const id = Number(req.params.id);
    const plant = plants.find(plant => plant.id === id);

    if(!plant){
        return res.status(404).json({
            message: "Plant not found"
        });
    }

    res.json(plant);
});

app.listen(PORT, () => {
    console.log(`Plant API running at http://localhost:${PORT}`);
    console.log(`Number of plants loaded: ${plants.length}`);
});





