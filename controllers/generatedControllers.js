const getGeneratedData = async (req, res) => {
  try {
    const data = await req.db.collection("Generated_Data").find({}).toArray();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getGeneratedData,
};
