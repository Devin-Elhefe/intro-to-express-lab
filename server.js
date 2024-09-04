const express = require('express')
const app = express()

app.get('/', function(req, res){
    res.send('<h1>Express Lab!</h1>')
})

//1. Be Polite, Greet the User
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Hello there, ${username}!`);
})

//2. Rolling the Dice

app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number);
    if (isNaN(number)) {
        return res.send("You must specify a number.");
    }
    const rolledNumber = Math.floor(Math.random() * (number + 1));
    res.send(`You rolled a ${rolledNumber}.`);
})

// 3. I Want THAT One!

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        return res.send("This item is not yet in stock. Check back soon!");
    } 
    const item = collectibles[index];
    res.send(`So, you want the ${item.name}? For $${item.price}, it can be yours!`);

})

//4. Filter Shoes by Query Parameters

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;
    if (req.query['min-price']) {
        const minPrice = parseFloat(req.query['min-price']);
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }
    if (req.query['max-price']) {
        const maxPrice = parseFloat(req.query['max-price']);
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }
    if (req.query.type) {
        const type = req.query.type.toLowerCase();
        filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type)
    }
    res.json(filteredShoes);
})

app.listen(3001, function() {
    console.log('Express App is listening for http requests on port: 3001')
})