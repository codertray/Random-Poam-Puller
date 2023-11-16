// dependencies
import express from "express";
import axios from "axios";

// constants
const app = express();
const API_URL = "https://poetrydb.org/random"
const errorMessage = {
    title: "OOPS",
    lines: [ 
        "uh oh! something's wrong.",
        "we will try and get that fixed",
        "please try again soon!"
    ],
    author: "CreatorTray"
};
const port = 3000
const themes = ["blue-sky", "sunset", "library", "midnight", "under-water", "log-cabin" ];
var themeSet; //see middlewares

// middlewares
function thmeChoice(req, res, next){
themeSet = Math.floor(Math.random()*themes.length);
console.log(themes[themeSet]);
next();
}
app.use(express.static("public"));
app.use(thmeChoice);

//routing
app.get("/", async (req, res) => {
    try{
        const result = await axios.get(API_URL);
        const content = result.data[0];
        res.render("index.ejs", {data: content, lines: content.lines, style: themes[themeSet]});
    } catch (error) {
        res.render("index.ejs", {data: errorMessage});
        console.log(JSON.stringify(error.message));
    }
});

app.listen(port, () => {
    console.log(`app running on port ${port}`);
});