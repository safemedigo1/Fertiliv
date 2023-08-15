// import fs from "fs";
// import path from "path";

// export default function createBlog(req, res) {
//   if (req.method === "POST") {
//     const { title, description, date } = req.body;

//     const newBlog = { title, description, date };

//     // Convert the blog data to JSON string
//     const jsonData = JSON.stringify(newBlog);

//     // Path to the blogs.json file
//     const filePath = path.join(process.cwd(), "blogs.json");

//     try {
//       // Append the JSON data to the blogs.json file
//       fs.appendFileSync(filePath, jsonData + "\n");

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

import fs from "fs";
import path from "path";

export default function createBlog(req, res) {
  if (req.method === "POST") {
    const { title, description, date } = req.body;

    const newBlog = {
      id: generateRandomId(),
      title,
      description,
      date,
    };

    // Path to the blogs.json file
    const filePath = path.join(process.cwd(), "blogs.json");

    try {
      // Read the existing blogs.json file
      const jsonData = fs.readFileSync(filePath, "utf-8");
      const blogs = JSON.parse(jsonData);

      // Add the new blog to the array
      blogs.push(newBlog);

      // Convert the updated blogs array to JSON string
      const updatedJsonData = JSON.stringify(blogs, null, 2); // null, 2 for pretty formatting

      // Write the updated JSON data to the blogs.json file
      fs.writeFileSync(filePath, updatedJsonData);

      // Example response
      res.status(200).json({
        message: "Blog created successfully",
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle other HTTP methods if needed
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

function generateRandomId() {
  // Generate a random number between 1 and 100000
  return Math.floor(Math.random() * 100000) + 1;
}
