import express from "express";
import axios from "axios";
import dotenv from "dotenv"

dotenv.config()

const app = express();
const port = 3000;

app.use(express.static("public"));

//OpenWeatherMap

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_Key = process.env.API_Key;
const lat = "13.036176";
const long = "77.505330";

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL, {
      params: {
        lat: lat,
        lon: long,
        appid: API_Key,
        units: "metric",
      },
    });
    res.render("index.ejs", {
      content: JSON.stringify(result.data.weather[0].description),
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
