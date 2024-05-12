const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.ORGANIZATION,
  project: process.env.PROJECT_ID,
});

const client = require("../db/db");
const db = client.db(process.env.DB_NAME);

const generateImage = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res
      .status(400)
      .json({ success: false, error: "Prompt value is missing" });
  }
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      quality: "standard",
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });

    await db
      .collection("Generated")
      .insertOne({ prompt: prompt, generated_image_link: imageUrl });
  } catch (error) {
    if (error.response) {
      res.json({ success: false, error: error.response.data });
    } else {
      res.json({ success: false, error: error.message });
    }
  }
};

module.exports = {
  generateImage,
};
