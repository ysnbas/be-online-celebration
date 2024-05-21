const getPrompts = async (req, res) => {
  const category_name = req.body.name;
  try {
    if (!category_name || category_name === "all") {
      // If category_name is not provided, return all prompts
      const prompts = await req.db.collection("Prompts").find({}).toArray();
      return res.status(200).json({
        success: true,
        data: prompts,
      });
    }

    // First, find the category object by its name
    const category = await req.db
      .collection("Categories")
      .findOne({ name: category_name });

    if (!category) {
      return res
        .status(400)
        .json({ success: false, error: "Category not found" });
    }

    // Then, use the category's ObjectId to find the prompts
    const prompts = await req.db
      .collection("Prompts")
      .find({ category_id: category._id })
      .toArray();
    res.status(200).json({
      success: true,
      data: prompts,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getPrompts,
};
