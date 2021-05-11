var express = require("express");
var app = express();
const axios = require("axios");
var bodyParser = require("body-parser");
const config = require("./config");
const token = config.secrets.API_KEY;
///////////////////////////////////
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
///////////////////////////////////
app.post("/getAPIData", (req, res) => {
  console.log(req.body.question);
  axios
    .post(
      "https://chatbot4health.azurewebsites.net/qnamaker/knowledgebases/af146b94-bda6-4f89-ad00-ccc342cc6d8f/generateAnswer",
      {
        question: req.body.question,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "EndpointKey " + token,
        },
      }
    )
    .then((data) => {
      console.log("Success:", data.data.answers);
      res.json(data.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 8080, () => console.log("listening!"));
