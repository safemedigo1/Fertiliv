// import fs from "fs";
// import path from "path";

// export default function getBlogs(req, res) {
//   if (req.method === "GET") {
//     // Path to the blogs.json file in the "./" directory
//     const filePath = path.join(process.cwd(), "blogs.json");

//     try {
//       // // Read the contents of the blogs.json file
//       // const jsonData = fs.readFileSync(filePath, "utf-8");
//       // // Parse the JSON data into an array of blogs
//       // const blogs = JSON.parse(jsonData);

//       // // Example response
//       // res.status(200).json(jsonData);

//       const jsonData = fs.readFileSync(filePath, "utf-8");
//       // Parse the JSON data into an array of blogs
//       const blogs = JSON.parse(jsonData);

//       // Update the image URLs to include the correct host
//       const updatedBlogs = blogs.map((blog) => {
//         // Assuming the image property is named "image" in the JSON data

//         const imageUrl = blog.image;
//         // Check if the image URL is a local path

//         if (imageUrl.startsWith("/images/")) {
//           // Get the host from the request
//           const host = req.headers.host;

//           // Update the image URL with the correct host
//           blog.image = `http://${host}${imageUrl}`;
//         }
//         return blog;
//       });
//       res.status(200).json(updatedBlogs);
//       console.log(updatedBlogs);
//     } catch (error) {
//       console.error(error); // Log the error for debugging purposes
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else {
//     // Handle other HTTP methods if needed
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// }
// import fs from "fs";
// import path from "path";
// import { v4 as uuidv4 } from "uuid";

// export default async function getBlogs(req, res) {
//   if (req.method === "GET") {
//     // Path to the blogs.json file in the "./" directory
//     const filePath = path.join(process.cwd(), "blogs.json");

//     try {
//       // Read the contents of the blogs.json file
//       const jsonData = fs.readFileSync(filePath, "utf-8");
//       // Parse the JSON data into an array of blogs
//       const blogs = JSON.parse(jsonData);

//       // Update the image URLs to use direct URLs to the image files
//       const updatedBlogs = await Promise.all(
//         blogs.map(async (blog) => {
//           // Assuming the image property is named "image" in the JSON data
//           const imageUrl = blog.image;
//           // Check if the image URL is a blob URL
//           if (imageUrl.startsWith("blob:")) {
//             // Remove the "blob:" prefix from the URL
//             const blobUrl = imageUrl.substring(5);
//             console.log(blobUrl, "HERE");
//             // Generate a unique filename using UUID
//             const fileName = `${uuidv4()}.png`;
//             // Define the destination directory for the image files
//             const destDir = path.join(process.cwd(), "public/images");
//             // Create the destination directory if it doesn't exist
//             fs.mkdirSync(destDir, { recursive: true });
//             // Download the image file using fetch
//             const response = await fetch(blobUrl);
//             const arrayBuffer = await response.arrayBuffer();
//             // Convert the ArrayBuffer to a Buffer
//             const buffer = Buffer.from(arrayBuffer);
//             // Save the image file to the destination directory
//             fs.writeFileSync(path.join(destDir, fileName), buffer);
//             // Update the image URL with the direct URL to the image file
//             blog.image = `/public/images/${fileName}`; // The images folder is inside the public directory
//           }
//           return blog;
//         })
//       );

//       // Example response
//       res.status(200).json(updatedBlogs);
//     } catch (error) {
//       console.error(error); // Log the error for debugging purposes
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else {
//     // Handle other HTTP methods if needed
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// }

import { NextApiHandler } from "next";
import fs from "fs/promises";
import path from "path";

const isDev = process.env.NODE_ENV === "development";
const baseUrl = isDev ? "http://localhost:3000" : "https://fertilive.com";

const getBlogs: NextApiHandler = async (req, res) => {
  try {
    const blogsFilePath = path.join(process.cwd(), "blogs.json");
    const data = await fs.readFile(blogsFilePath, "utf8");
    const blogs = JSON.parse(data);

    // Update the image URLs to use the appropriate base URL
    const blogsWithFixedImageUrls = blogs.map((blog) => {
      return {
        ...blog,
        image: `${baseUrl}${blog.image}`,
      };
    });

    res.status(200).json(blogsWithFixedImageUrls);
  } catch (error) {
    console.error("Error reading blogs.json", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getBlogs;
