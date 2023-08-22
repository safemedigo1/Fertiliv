import { NextApiHandler, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";
import Cors from "cors";

const isDev = process.env.NODE_ENV === "development";
const baseUrl = isDev ? "http://localhost:3000" : "https://www.fertiliv.com";

// Helper function to wrap the cors middleware
const cors =
  (handler: NextApiHandler) => async (req: any, res: NextApiResponse) => {
    await new Promise((resolve, reject) => {
      Cors()(req, res, (result: unknown) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });

    return handler(req, res);
  };

const getBlogs: NextApiHandler = async (req, res) => {
  try {
    // Run the cors middleware
    await cors(async (req: any, res: NextApiResponse) => {
      const blogsFilePath = path.join(process.cwd(), "blogs.json");
      const data = await fs.readFile(blogsFilePath, "utf8");
      const blogs = JSON.parse(data);

      // Update the image URLs to use the appropriate base URL
      const blogsWithFixedImageUrls = blogs.map((blog: any) => {
        return {
          ...blog,
          image: `https://www.fertiliv.com${blog.image}`,
        };
      });

      res.status(200).json(blogsWithFixedImageUrls);
    })(req, res);
  } catch (error) {
    console.error("Error reading blogs.json", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getBlogs;
