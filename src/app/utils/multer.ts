import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../lib/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "products",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      resource_type: "auto",
    };
  },
});

const upload = multer({ storage });

export const fileUploader = {
  upload,
};