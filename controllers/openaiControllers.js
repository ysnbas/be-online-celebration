const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.ORGANIZATION,
  project: process.env.PROJECT_ID,
});

const generateImage = async (req, res) => {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "üzerinde Yasin yazan bir doğum günü pastası oluştur",
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

module.exports = {
  generateImage,
};
