import fs from "fs";
import path from "path";

export default function deleteBlog(req, res) {
  if (req.method === "DELETE") {
    // const filePath = path.join(process.cwd(), "blogs.json");
    const filePath = path.join("/tmp", "blogs.json");

    try {
      const jsonData = fs.readFileSync(filePath, "utf-8");
      const blogs = JSON.parse(jsonData);

      // Find the specific blog you want to delete (assuming the blog has an ID property)
      const blogId = req.query.id; // Assuming you pass the blog ID as a query parameter
      const blogIndex = blogs.findIndex((blog) => blog.id === blogId);

      if (blogId) {
        const selectedBlogImage = blogs.find((blog) => blog.id == blogId);

        const previousImagePath = selectedBlogImage.image;
        // const imgPath = path.join(process.cwd(), "public", previousImagePath);
        const imgPath = path.join(
          "/tmp/uploads",
          path.basename(previousImagePath)
        );

        // Delete Image File
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      }

      // Remove the blog from the array
      blogs.splice(blogIndex, 1);
      // Convert the array of blogs back to JSON
      const updatedJsonData = JSON.stringify(blogs, null, 2);
      // Write the updated JSON data back to the blogs.json file
      fs.writeFileSync(filePath, updatedJsonData, "utf-8");

      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
