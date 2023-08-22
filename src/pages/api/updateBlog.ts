import fs from "fs";
import path from "path";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function updateBlog(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const options: formidable.Options = {};
    options.uploadDir = path.join(process.cwd(), "public", "uploads"); // Step 1: Use a dedicated directory, e.g., "uploads"
    options.keepExtensions = true;

    options.filename = (name, ext, path, form) => {
      const timestamp = Date.now().toString();
      const sanitizedFileName = name.replace(/[^a-zA-Z0-9]/g, "-");
      return `${timestamp}-${sanitizedFileName}${ext}`;
    };

    const form = formidable(options);

    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) reject(err);
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        resolve({ fields, files });

        const filePath = path.join(process.cwd(), "blogs.json");

        try {
          const jsonData = fs.readFileSync(filePath, "utf-8");
          const blogs = JSON.parse(jsonData);

          // Find the specific blog you want to update (assuming the blog has an ID property)
          const blogId = +fields.id[0].trim(); // Trim whitespace from the blog ID
          const blog = blogs.find((blog: { id: Number }) => blog.id === blogId);

          if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
          }

          // Delete the previous image if it exists
          const previousImagePath = blog.image;
          const prevPath = path.join(
            process.cwd(),
            "public",
            previousImagePath
          );

          if (files.file && fs.existsSync(prevPath)) {
            fs.unlinkSync(prevPath);
          }

          // Update the blog properties
          blog.title = fields.title[0]; // Assuming you pass the updated title in the request body
          blog.description = fields.description[0]; // Assuming you pass the updated description in the request body
          blog.date = fields.date[0]; // Assuming you pass the updated date in the request body

          // Convert the array of blogs back to JSON
          const updatedJsonData = JSON.stringify(blogs, null, 2);

          // Write the updated JSON data back to the blogs.json file
          fs.writeFileSync(filePath, updatedJsonData, "utf-8");

          res.status(200).json({ message: "Blog updated successfully" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
        // console.log(fields, "FielldDDDSSSSS");
      });
    });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
