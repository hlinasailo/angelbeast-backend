import express from "express";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["POST"],
}));

app.use(express.json());

// Cloudinary config (hardcoded)
cloudinary.config({
  cloud_name: "dedcto4oa",
  api_key: "278724514929627",
  api_secret: "U3Q8zwXzNIXimWiOybdJV4Z2dg4",
});

// Delete image route
app.post("/delete-image", async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ success: false, error: "No publicId provided" });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    res.json({ success: true, result });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
