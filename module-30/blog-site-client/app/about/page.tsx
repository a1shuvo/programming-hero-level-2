export const dynamic = "force-dynamic";
export default async function AboutPage() {
  // For simulating load time
  await new Promise((resolve) => setTimeout(resolve, 4000));

  // For simulating error
  // throw new Error("Something went wrong!");

  return <div>This is about page component</div>;
}
