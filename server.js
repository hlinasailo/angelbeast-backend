import express from "express";
import cors from "cors";
import cloudinary from "cloudinary";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Cloudinary config (keep keys secret, never in frontend!)
cloudinary.v2.config({
  cloud_name: "de2szhnwu",
  api_key: "383268817355816",
  api_secret: "5qPWPrJelPo1F7CtDC3V1oEQbWQ",
});

// Delete route
app.post("/delete-image", async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId) return res.status(400).json({ success: false, error: "No publicId" });

    const result = await cloudinary.v2.uploader.destroy(publicId);
    res.json({ success: true, result });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
app.listen(4000, () => console.log("✅ Server running on http://localhost:4000"));