require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('public'));

app.post('/generate-text', async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: prompt,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
        res.json(response.data.choices[0].text);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Similar endpoints for summarization and translation can be added here...

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
