const axios = require("axios");
const { ObjectId } = require("mongodb");

const generateVideo = async (req, res) => {
  const { img_prompt } = req.body;
  if (!img_prompt) {
    return res
      .status(400)
      .json({ success: false, error: "Prompt value is missing" });
  }
  try {
    const options = {
      method: "POST",
      url: "https://runwayml.p.rapidapi.com/generate/image",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "afe70d8d08msh04cc44e5c4268bcp101f2ejsndebc1c74ff16",
        "X-RapidAPI-Host": "runwayml.p.rapidapi.com",
      },
      data: {
        img_prompt,
        motion: 5,
        seed: 0,
        upscale: true,
        interpolate: true,
        callback_url: "",
      },
    };
    const response = await axios.request(options);
    res.status(200).json({
      success: true,
      data: response.data,
    });
    console.log(response.data);
  } catch (error) {
    if (error.response) {
      res.json({ success: false, error: error.response.data });
    } else {
      res.json({ success: false, error: error.message });
    }
  }
};

module.exports = {
  generateVideo,
};
