import fs from "fs";
import path from "path";

export default function getBlogs(req, res) {
  if (req.method === "GET") {
    // Path to the blogs.json file in the "./" directory
    const filePath = path.join(process.cwd(), "blogs.json");

    try {
      // Read the contents of the blogs.json file
      const jsonData = fs.readFileSync(filePath, "utf-8");
      // Parse the JSON data into an array of blogs
      // const blogs = JSON.parse(jsonData);

      // Example response
      res.status(200).json(jsonData);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle other HTTP methods if needed
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
