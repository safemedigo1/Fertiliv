// import fs from "fs";
// import path from "path";

// export default function createBlog(req, res) {
//   if (req.method === "POST") {
//     const { title, description, date, image } = req.body;

//     const newBlog = {
//       id: generateRandomId(),
//       title,
//       description,
//       date,
//       image,
//     };

//     // Path to the blogs.json file
//     const filePath = path.join(process.cwd(), "blogs.json");
//     console.log(newBlog);
//     try {
//       // Read the existing blogs.json file
//       const jsonData = fs.readFileSync(filePath, "utf-8");
//       const blogs = JSON.parse(jsonData);

//       // Add the new blog to the array
//       blogs.push(newBlog);

//       // Convert the updated blogs array to JSON string
//       const updatedJsonData = JSON.stringify(blogs, null, 2); // null, 2 for pretty formatting

//       // Write the updated JSON data to the blogs.json file
//       fs.writeFileSync(filePath, updatedJsonData);

//       // Example response
//       res.status(200).json({
//         message: "Blog created successfully",
//       });
//     } catch (error) {
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else {
//     // Handle other HTTP methods if needed
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// }

// function generateRandomId() {
//   // Generate a random number between 1 and 100000
//   return Math.floor(Math.random() * 100000) + 1;
// }

// import fs from "fs";
// import path from "path";
// import multer from "multer";

// // Create the multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads"); // Specify the destination folder
//   },

//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const fileExtension = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
//   },
// });

// // Create the multer upload middleware
// const upload = multer({ storage }).single("image");
// export default function createBlog(req, res) {
//   upload(req, res, (err) => {
//     if (err) {
//       // Handle upload error
//       res.status(500).json({ error: "Failed to upload image" });
//     } else {
//       if (req.method === "POST") {
//         const { title, description, date, image, selectedFile } = req.body;

//         const newBlog = {
//           id: generateRandomId(),
//           title,
//           description,
//           date,
//           image: image, // Save the filename of the uploaded image
//         };
//         // Path to the blogs.json file
//         const filePath = path.join(process.cwd(), "blogs.json");
//         try {
//           // Read the existing blogs.json file
//           const jsonData = fs.readFileSync(filePath, "utf-8");
//           const blogs = JSON.parse(jsonData);

//           // Add the new blog to the array
//           blogs.push(newBlog);

//           // Convert the updated blogs array to JSON string
//           const updatedJsonData = JSON.stringify(blogs, null, 2); // null, 2 for pretty formatting

//           // Write the updated JSON data to the blogs.json file
//           fs.writeFileSync(filePath, updatedJsonData);

//           // Example response
//           res.status(200).json({
//             message: "Blog created successfully",
//           });
//         } catch (error) {
//           res.status(500).json({ error: "Internal Server Error" });
//         }
//       } else {
//         // Handle other HTTP methods if needed
//         res.status(405).json({ error: "Method Not Allowed" });
//       }
//     }
//   });
// }

// import { NextApiHandler, NextApiRequest } from "next";
// import formidable from "formidable";
// import path from "path";
// import fs from "fs/promises";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const readFile = (
//   req: NextApiRequest,
//   saveLocally?: boolean
// ): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
//   const options: formidable.Options = {};
//   if (saveLocally) {
//     options.uploadDir = path.join(process.cwd(), "/public/images");
//     options.filename = (name, ext, path, form) => {
//       // return Date.now().toString() + "_" + path.originalFilename;
//       return path.originalFilename;
//     };
//   }
//   options.maxFileSize = 4000 * 1024 * 1024;

//   const form = formidable(options);
//   return new Promise((resolve, reject) => {
//     form.parse(req, async (err, fields, files) => {
//       if (err) reject(err);
//       resolve({ fields, files });

//       // Add the blog data to blogs.json file

//       // Move the uploaded file to the persistent directory
//       // if (saveLocally) {
//       //   const file = files.image;
//       //   const oldPath = files.file[0].filepath;
//       //   const newPath = path.join(
//       //     options.uploadDir,
//       //     files.file[0].originalFilename
//       //   );
//       //   try {
//       //     await fs.rename(oldPath, newPath); // Await the file move operation
//       //   } catch (error) {
//       //     reject(error);
//       //     return;
//       //   }
//       // }

//       const blogData = {
//         title: fields.title[0],
//         description: fields.description[0],
//         date: fields.date[0],
//         image: fields.image[0],
//         id: generateRandomId(),
//       };

//       // const blogData = { id: generateRandomId(), ...fields }; // Add the dynamic ID
//       const blogsFilePath = path.join(process.cwd(), "blogs.json");
//       fs.readFile(blogsFilePath, "utf8")
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
//   try {
//     await fs.readdir(path.join(process.cwd() + "/public", "/images"));
//   } catch (error) {
//     await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
//   }
//   await readFile(req, true);
//   res.json({ done: "ok" });
// };

// export default handler;
// function generateRandomId() {
//   // Generate a random number between 1 and 100000
//   return Math.floor(Math.random() * 100000) + 1;
// }
import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "uploads"); // Step 1: Use a dedicated directory, e.g., "uploads"
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

      const file = files.file[0];
      const filePath = file.filepath; // Use the path property instead of filepath
      const fileName = path.basename(filePath);
      const relativePath = path.join("/uploads", fileName); // Generate the relative image path
      const fixedRelativePath = relativePath.replace(/\\/g, "/");
      const blogData = {
        title: fields.title[0],
        description: fields.description[0],
        date: fields.date[0],
        image: fixedRelativePath,
        id: generateRandomId(),
      };

      const blogsFilePath = path.join(process.cwd(), "blogs.json");
      fs.readFile(blogsFilePath, "utf8")
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
  try {
    await fs.readdir(path.join(process.cwd(), "uploads")); // Step 1: Check if the uploads directory exists
  } catch (error) {
    await fs.mkdir(path.join(process.cwd(), "uploads")); // Step 1: Create the uploads directory if it doesn't exist
  }
  await readFile(req, true);
  res.json({ done: "ok" });
};

export default handler;

function generateRandomId() {
  return Math.floor(Math.random() * 100000) + 1;
}
