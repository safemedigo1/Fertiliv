import fs from "fs";
import path from "path";

export default function updateBlog(req, res) {
  if (req.method === "PUT") {
    const filePath = path.join(process.cwd(), "blogs.json");

    try {
      const jsonData = fs.readFileSync(filePath, "utf-8");
      const blogs = JSON.parse(jsonData);

      // Find the specific blog you want to update (assuming the blog has an ID property)
      const blogId = req.body.id; // Assuming you pass the blog ID in the request body
      const blog = blogs.find((blog) => blog.id === blogId);

      console.log(blog, "blogupdated");

      if (!blog) {
        res.status(404).json({ error: "Blog not found" });
        return;
      }

      // Update the blog properties
      blog.title = req.body.title; // Assuming you pass the updated title in the request body

      console.log(req.body, "HERE");
      // Convert the array of blogs back to JSON
      const updatedJsonData = JSON.stringify(blogs, null, 2);

      // Write the updated JSON data back to the blogs.json file
      fs.writeFileSync(filePath, updatedJsonData, "utf-8");

      res.status(200).json({ message: "Blog updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
