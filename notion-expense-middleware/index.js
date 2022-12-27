var axios = require("axios");
const dotenv = require("dotenv");
const express = require("express");
dotenv.config();

app = express();
app.use(express.json());

port = process.env.PORT;

app.listen(port || 8080, () => {
  console.group(`port ${port}`);
});

app.get("/", (req, res) => {
  res.json({ message: "API Live" });
});

app.post("/addExpense", (req, res) => {
  var data = JSON.stringify({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID,
    },
    properties: {
      Expense: {
        type: "title",
        title: [
          {
            text: {
              content: req.body.expenseName,
            },
          },
        ],
      },
      // Tags: {
      //   type: "multi_select",
      //   multi_select: [
      //     {
      //       name: "Postman",
      //     },
      //     {
      //       name: "Tag 1",
      //     },
      //     {
      //       name: "New Tag",
      //     },
      //   ],
      // },
      // Comments: {
      //   type: "rich_text",
      //   rich_text: [
      //     {
      //       text: {
      //         content: "This is a rich text input",
      //       },
      //     },
      //   ],
      // },
    },
  });

  var config = {
    method: "post",
    url: "https://api.notion.com/v1/pages",
    headers: {
      "Content-Type": "application/json",
      "Notion-Version": "2021-08-16",
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    },
    data: data,
  };

  axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.json({ data: "success!" });
    })
    .catch((error) => {
      res.json({ data: "error!", message: error.message });
    });
});
