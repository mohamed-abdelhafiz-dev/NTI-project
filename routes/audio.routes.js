const express = require("express");
const Audio = require("../models/Audio");
const upload = require("../config/multer");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("hi")
  const audios = await Audio.find();
  res.json({
    success: true,
    data: audios,
  });
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const audio = await Audio.findById(id);
  res.json({
    success: true,
    data: audio,
  });
});
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const audio = await Audio.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.json({
    success: true,
    data: audio,
  });
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const audio = await Audio.findByIdAndDelete(id);
  res.json({
    success: true,
    data: audio,
  });
});
router.post("/", upload.single("audioFile"), async (req, res) => {
  const audio = await Audio.create(req.body);
  res.status(201).json({
    success: true,
    data: audio,
  });
});

module.exports = router;
