"use client"; // Ensure this is a Client Component

import { useSearchParams } from "next/navigation";

export default function ProjectPage() {
  const searchParams = useSearchParams();
  const folder = searchParams.get("folder");
  const parent = searchParams.get("parent");

  if (!folder || !parent) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Project: {folder}</h1>
      <iframe
        src={`https://xamppdb.raquibi.space/${parent}/${folder}`}
        className="w-full h-[80vh] border"
      />
      <iframe src=""/>
    </div>
  );
}
