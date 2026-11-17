const express = require("express");
const cors = require("cors");
const path = require("path");

const plants = require("./data/plants");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin:[
        "https://Ashayad01.github.io", 
    "http://localhost:5500",
    "http://127.0.0.1:5500"
    ]
}));
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
    const plant = plants.find(p => p.id === id);

    if(!plant){
        return res.status(400).json({
            message: "Plant not found"
        });
    }

    res.json(plant);
});


app.use((req, res) => {
    res.status(404).json({ message: "Route not found"});
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({message: "Something went wrong"});
});

app.listen(PORT, () => {
    console.log(`Plant API running at http://localhost:${PORT}`);
    console.log(`Number of plants loaded: ${plants.length}`);
});





