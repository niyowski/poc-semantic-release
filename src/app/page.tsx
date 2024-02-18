import { Feature as Health } from "~/features/health";

export default async function HomePage() {
  return (
    <main>
      <h1 className="text-4xl font-bold">
        Welcome to POC: Conventional Commits and Semantic Release
      </h1>
      <Health />
    </main>
  );
}
