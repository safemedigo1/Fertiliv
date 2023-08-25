import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const createBlog = (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};

  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "public", "uploads"); // Step 1: Use a dedicated directory, e.g., "uploads"
    options.keepExtensions = true; // Retain the file extensions
    options.filename = (name, ext, path, form) => {
      const timestamp = Date.now().toString();
      const sanitizedFileName = name.replace(/[^a-zA-Z0-9]/g, "-");
      return `${timestamp}-${sanitizedFileName}${ext}`;
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024;

  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });

      const file = files?.file[0];
      const filePath = file.filepath;
      const fileName = path.basename(filePath);
      const relativePath = path.join("/uploads", fileName);
      const fixedRelativePath = relativePath.replace(/\\/g, "/");

      const isDev = process.env.NODE_ENV === "development";
      const baseUrl = isDev ? "http://localhost:3000" : "https://fertilive.com";

      const blogData = {
        title: fields.title[0],
        description: fields.description[0],
        date: fields.date[0],
        image: `${fixedRelativePath}`,
        id: generateRandomId(),
      };

      const blogsFilePath = path.join(process.cwd(), "blogs.json");
      await fs
        .readFile(blogsFilePath, "utf8")
        .then((data) => {
          const blogs = JSON.parse(data);
          blogs.push(blogData);
          return fs.writeFile(blogsFilePath, JSON.stringify(blogs, null, 2));
        })
        .catch((error) => {
          console.error("Error writing to blogs.json", error);
        });
    });
  });
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const directoryPath = path.join(process.cwd(), "public", "uploads");
      const files = await fs.readdir(directoryPath);

      // Filter only image files
      const imageFiles = files.filter((file) => {
        const extension = path.extname(file).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(extension);
      });

      // Use the imageFiles array as needed

      await createBlog(req, true);
      res.json({ done: "ok" });
    } catch (error) {
      console.log(error, "ERROR");
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;

function generateRandomId() {
  return Math.floor(Math.random() * 100000) + 1;
}
