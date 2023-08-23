// import { NextApiHandler, NextApiRequest } from "next";
// import formidable from "formidable";
// import path from "path";
// import fs from "fs/promises";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const createBlog = (
//   req: NextApiRequest,
//   saveLocally?: boolean
// ): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
//   const options: formidable.Options = {};

//   if (saveLocally) {
//     options.uploadDir = path.join(process.cwd(), "public", "uploads"); // Step 1: Use a dedicated directory, e.g., "uploads"
//     options.keepExtensions = true; // Retain the file extensions
//     options.filename = (name, ext, path, form) => {
//       const timestamp = Date.now().toString();
//       const sanitizedFileName = name.replace(/[^a-zA-Z0-9]/g, "-");
//       return `${timestamp}-${sanitizedFileName}${ext}`;
//     };
//   }
//   options.maxFileSize = 4000 * 1024 * 1024;

//   const form = formidable(options);
//   return new Promise((resolve, reject) => {
//     form.parse(req, async (err, fields, files) => {
//       if (err) reject(err);
//       resolve({ fields, files });

//       const file = files?.file[0];
//       const filePath = file.filepath;
//       const fileName = path.basename(filePath);
//       const relativePath = path.join("/uploads", fileName);
//       const fixedRelativePath = relativePath.replace(/\\/g, "/");

//       const isDev = process.env.NODE_ENV === "development";
//       const baseUrl = isDev ? "http://localhost:3000" : "https://fertilive.com";

//       const blogData = {
// title: fields.title[0],
// description: fields.description[0],
// date: fields.date[0],
//         image: `${fixedRelativePath}`,
//         id: generateRandomId(),
//       };

//       const blogsFilePath = path.join(process.cwd(), "blogs.json");
//       await fs
//         .readFile(blogsFilePath, "utf8")
//         .then((data) => {
//           const blogs = JSON.parse(data);
//           blogs.push(blogData);
//           return fs.writeFile(blogsFilePath, JSON.stringify(blogs, null, 2));
//         })
//         .catch((error) => {
//           console.error("Error writing to blogs.json", error);
//         });
//     });
//   });
// };

// const handler: NextApiHandler = async (req, res) => {
//   if (req.method === "POST") {
//     try {
//       await fs.readdir(path.join(process.cwd(), "public", "uploads"));
//     } catch (error) {
//       await fs.mkdir(path.join(process.cwd(), "public", "uploads"));
//     }
//     await createBlog(req, true);
//     res.json({ done: "ok" });
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// };

// export default handler;

// function generateRandomId() {
//   return Math.floor(Math.random() * 100000) + 1;
// }

// import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
// import formidable from "formidable";
// import path from "path";
// import fs from "fs/promises";
// import { readFileSync } from "fs";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const createBlog = async (
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
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       const file = files?.file[0];
//       const filePath = file?.filepath;
//       const fileName = path.basename(filePath);
//       const relativePath = path.join("/uploads", fileName);
//       const fixedRelativePath = relativePath.replace(/\\/g, "/");

//       const isDev = process.env.NODE_ENV === "development";
//       const baseUrl = isDev ? "http://localhost:3000" : "https://fertilive.com";

//       const blogData = {
//         title: fields.title,
//         description: fields.description,
//         date: fields.date,
//         image: `${fixedRelativePath}`,
//         id: generateRandomId(),
//       };

//       try {
//         const blogsFilePath = path.join(process.cwd(), "blogs.json");

//         const data = readFileSync(blogsFilePath, "utf8");
//         const blogs = JSON.parse(data);
//         blogs.push(blogData);
//         await fs.writeFile(blogsFilePath, JSON.stringify(blogs, null, 2));
//         resolve({ fields, files });
//       } catch (error) {
//         console.error("Error writing to blogs.json", error);
//         reject(error);
//       }
//     });
//   });
// };

// const handler: NextApiHandler = async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => {
//   if (req.method === "POST") {
//     try {
//       await fs.mkdir(path.join(process.cwd(), "public", "uploads"));
//     } catch (error) {
//       // Ignore the error if the directory already exists
//       if (error.code !== "EEXIST") {
//         console.error("Error creating uploads directory", error);
//         res.status(500).json({ error: "Internal Server Error" });
//         return;
//       }
//     }
//     try {
//       await createBlog(req, true);
//       res.json({ done: "ok" });
//     } catch (error) {
//       console.error("Error creating blog", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// };

// export default handler;

// function generateRandomId() {
//   return Math.floor(Math.random() * 100000) + 1;
// }

// const handler: NextApiHandler = async (req, res) => {
//   try {
//     await fs.readdir(path.join(process.cwd(), "public", "uploads")); // Step 1: Check if the uploads directory exists
//   } catch (error) {
//     await fs.mkdir(path.join(process.cwd(), "public", "uploads")); // Step 1: Create the uploads directory if it doesn't exist
//   }
//   await createBlog(req, true);
//   res.json({ done: "ok" });
// };

// export default handler;

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import { readFileSync } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const createBlog = async (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};

  if (saveLocally) {
    options.uploadDir = path.join("/tmp");
    options.keepExtensions = true;
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
      if (err) {
        reject(err);
        return;
      }
      const file = files?.file[0];
      const filePath = file?.filepath;
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

      try {
        const blogsFilePath = path.join("/tmp", "blogs.json");

        let blogs = [];
        try {
          const data = await fs.readFile(blogsFilePath, "utf8");
          blogs = JSON.parse(data);
          console.log(blogsFilePath, "BLOGS");
        } catch (error) {
          // Ignore if blogs.json doesn't exist yet
          console.log(error);
        }

        blogs.push(blogData);
        await fs.writeFile(blogsFilePath, JSON.stringify(blogs, null, 2));
        resolve({ fields, files });
      } catch (error) {
        console.error("Error writing to blogs.json", error);
        reject(error);
      }
    });
  });
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    try {
      await fs.mkdir(path.join("/tmp/uploads"), { recursive: true });
    } catch (error) {
      console.error("Error creating uploads directory", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    try {
      await createBlog(req, true);
      res.json({ done: "ok" });
    } catch (error) {
      console.error("Error creating blog", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;

function generateRandomId() {
  return Math.floor(Math.random() * 100000) + 1;
}
