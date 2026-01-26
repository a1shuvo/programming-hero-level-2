"use client";

import { getBlogs } from "@/actions/blog.action";
import { useEffect, useState } from "react";

// export const dynamic = "force-dynamic";

export default function AboutPage() {
  // For simulating load time
  // await new Promise((resolve) => setTimeout(resolve, 4000));

  // For simulating error
  // throw new Error("Something went wrong!");
  const [data, setData] = useState();
  const [error, setError] = useState<{ message: string } | null>(null);

  console.log(data);
  console.log(error);

  useEffect(() => {
    (async () => {
      const { data, error } = await getBlogs();
      setData(data);
      setError(error);
    })();
  }, []);

  return <div>This is about page component</div>;
}
