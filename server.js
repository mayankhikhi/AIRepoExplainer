require("dotenv").config();

const express = require("express");
const axios = require("axios");
const OpenAI = require("openai");
const path = require("path");


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(__dirname));

app.post("/repo", async (req, res) => {
  try {
    const { repoUrl } = req.body;

    const parts = repoUrl.split("/");
    const owner = parts[3];
    const repo = parts[4];

    // get github data
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );

    // generate fake ai summary (api key credits are over so this is just a placeholder or a demo)
    const aiSummary = `
This repository named ${response.data.name}
is written mainly in ${response.data.language}.
It currently has ${response.data.stargazers_count} stars on GitHub.
The project description is: ${response.data.description}.
`;


    //sends response back to frontedn
    res.json({
      name: response.data.name,
      aiSummary: aiSummary
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch repo" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
