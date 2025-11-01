import type { Route } from "./+types/DynamicMdxPage";
import { lazy, Suspense } from "react";
import { useMDXComponents } from "../components/mdx-components";

export async function clientLoader({ params }: Route.ComponentProps) {
  const subject = !params.subject ? "" : `${params.subject}/`;
  const path = `../content/${params.category}/${subject}${params.name}.mdx`;
  const module = await /* @vite-ignore */ import(path);
  return module.default;
}

export default function DynamicMdxPage({ loaderData }: Route.ComponentProps) {
  const MdxContent = loaderData;
  return (
    <Suspense fallback={<div>Loading content...</div>}>
      <MdxContent components={useMDXComponents()} />
    </Suspense>
  );
}
