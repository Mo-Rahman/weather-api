const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const https = require("node:https");

// The code you need to write to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Home route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Home route post response
app.post("/", (req, res) => {
  // call the https.get method.
  const query = req.body.cityName;
  const apiKey = "72c730752966399c022efbcc01f01e5e";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;
  // send a https get request and retrieve the data from the api path provided.
  https.get(url, (resp) => {
    console.log("statusCode:", resp.statusCode);

    resp.on("data", (data) => {
      // Passing the data sent back using JSON.parse(data)
      const weatherData = JSON.parse(data);
      // process.stdout.write(data);
      // console.log(weatehrData) to see what is returned in the console
      console.log(weatherData);
      // const object = {
      //   name: "Mohammed",
      //   favouriteFood: "Curry",
      // };
      // console.log(JSON.stringify(object));
      const location = weatherData.name;
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      // To send multiple messages we use res.write.
      res.write(`<p>Expect ${weatherDescription}</p>`);
      res.write(`<h1>The temp in ${location} is ${temp} degrees Celcius</h1>`);
      res.write(
        `<img src=${imageURL} alt="weather image" width="200" height="200">`
      );
      // We can only have 1 res.send()
      res.send();
    });
  });
});
// The app is listening on port 3000 or any other port number that you set.
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// // call the https.get method.
// const query = "madrid";
// const apiKey = "72c730752966399c022efbcc01f01e5e";
// const units = "metric";
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;

// https.get(url, (resp) => {
//   console.log("statusCode:", resp.statusCode);

//   resp.on("data", (data) => {
//     const weatherData = JSON.parse(data);
//     // process.stdout.write(data);
//     console.log(weatherData);
//     // const object = {
//     //   name: "Mohammed",
//     //   favouriteFood: "Curry",
//     // };
//     // console.log(JSON.stringify(object));
//     const location = weatherData.name;
//     const temp = weatherData.main.temp;
//     const weatherDescription = weatherData.weather[0].description;
//     const icon = weatherData.weather[0].icon;
//     const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
//     // To send multiple messages we use res.write.
//     res.write(`<p>Expect ${weatherDescription}</p>`);
//     res.write(`<h1>The temp in ${location} is ${temp} degrees Celcius</h1>`);
//     res.write(
//       `<img src=${imageURL} alt="weather image" width="100" height="100">`
//     );
//     res.send();
//   });
// });

// // res.send("Hello World");
