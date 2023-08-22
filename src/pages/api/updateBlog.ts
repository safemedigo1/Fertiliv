// import fs from "fs";
// import path from "path";

// export default function updateBlog(req, res) {
//   if (req.method === "PUT") {
//     const filePath = path.join(process.cwd(), "blogs.json");

//     try {
//       const jsonData = fs.readFileSync(filePath, "utf-8");
//       const blogs = JSON.parse(jsonData);

//       // Find the specific blog you want to update (assuming the blog has an ID property)
//       const blogId = req.body.id; // Assuming you pass the blog ID in the request body
//       const blog = blogs.find((blog) => blog.id === blogId);

//       console.log(blog, "blogupdated");

//       if (!blog) {
//         res.status(404).json({ error: "Blog not found" });
//         return;
//       }

//       // Update the blog properties
//       blog.title = req.body.title; // Assuming you pass the updated title in the request body

//       console.log(req.body, "HERE");
//       // Convert the array of blogs back to JSON
//       const updatedJsonData = JSON.stringify(blogs, null, 2);

//       // Write the updated JSON data back to the blogs.json file
//       fs.writeFileSync(filePath, updatedJsonData, "utf-8");

//       res.status(200).json({ message: "Blog updated successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// }

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
  if (req.method === "PUT") {
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

// import { NextApiHandler, NextApiRequest } from "next";
// import formidable from "formidable";
// import path from "path";
// import fs from "fs/promises";

// const updateBlog: NextApiHandler = async (req, res) => {
//   if (req.method !== "PUT") {
//     res.status(405).json({ error: "Method Not Allowed" });
//     return;
//   }
//   console.log(req);
//   const { fields, files } = await readFile(req, true);

//   const file = files.file[0];
//   const filePath = file.filepath;
//   const fileName = path.basename(filePath);
//   const relativePath = path.join("/uploads", fileName);
//   const fixedRelativePath = relativePath.replace(/\\/g, "/");

//   const isDev = process.env.NODE_ENV === "development";
//   const baseUrl = isDev ? "http://localhost:3000" : "https://fertilive.com";

//   const blogData = {
//     title: fields.title[0],
//     description: fields.description[0],
//     date: fields.date[0],
//     image: `${fixedRelativePath}`,
//     id: generateRandomId(),
//   };

//   console.log(blogData, "HERERESSSS");

//   try {
//     const blogsFilePath = path.join(process.cwd(), "blogs.json");
//     const data = await fs.readFile(blogsFilePath, "utf8");
//     const blogs = JSON.parse(data);
//     const existingBlogIndex = blogs.findIndex(
//       (blog) => blog.id === blogData.id
//     );

//     if (existingBlogIndex !== -1) {
//       const existingBlog = blogs[existingBlogIndex];

//       // Delete the previous image if it exists
//       if (existingBlog.image && existingBlog.image !== blogData.image) {
//         const previousImagePath = path.join(
//           process.cwd(),
//           "public",
//           existingBlog.image
//         );
//         await fs.unlink(previousImagePath);
//         console.log("Previous image deleted successfully");
//       }

//       blogs[existingBlogIndex] = blogData;
//       await fs.writeFile(blogsFilePath, JSON.stringify(blogs, null, 2));
//       res.json({ message: "Blog updated successfully" });
//     } else {
//       res.status(404).json({ error: "Blog not found" });
//     }
//   } catch (error) {
//     console.error("Error updating blog:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while updating the blog" });
//   }
// };

// const readFile = (
//   req: NextApiRequest,
//   saveLocally?: boolean
// ): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
//   const options: formidable.Options = {};

//   if (saveLocally) {
//     options.uploadDir = path.join(process.cwd(), "public", "uploads");
//     options.keepExtensions = true;
//     options.filename = (name, ext, path, form) => {
//       const timestamp = Date.now().toString();
//       const sanitizedFileName = name.replace(/[^a-zA-Z0-9]/g, "-");
//       return `${timestamp}-${sanitizedFileName}${ext}`;
//     };
//   }
//   options.maxFileSize = 4000 * 1024 * 1024;

//   const form = formidable(options);
//   return new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve({ fields, files });
//       }
//     });
//   });
// };

// function generateRandomId() {
//   return Math.floor(Math.random() * 100000) + 1;
// }

// export default updateBlog;
