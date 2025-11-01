import type { Route } from "./+types/DynamicMdxPage";
import { lazy, Suspense } from "react";
//import { mdxComponents } from '../components/mdx-components';
import { MDXProvider } from "@mdx-js/react";
import { useMDXComponents } from "../components/mdx-components";

//export async function clientLoader({ params }: Route.ComponentProps) {
//  const { category, subject, name } = params;
//  if (!category || !name) {
//    throw new Error('Missing category or name in route params');
//  }
//  //const path = subject
//  //    ? `../content/${category}/${subject}/${name}.mdx`
//  //    : `../content/${category}/${name}.mdx`;
//  try {
//    return import(`../content/${category}/${subject}/${name}.mdx`);
//  } catch (err) {
//    console.error('Failed to load MDX:', err);
//    throw new Response('MDX file not found', { status: 404 });
//  }
//}

export async function clientLoader({ params }: Route.ComponentProps) {
  const subject = !params.subject ? "" : `${params.subject}/`;
  const path = `../content/${params.category}/${subject}${params.name}.mdx`;
  console.log(path);
  const module = await /* @vite-ignore */ import(path);
  return module.default;
}

export default function DynamicMdxPage({ loaderData }: Route.ComponentProps) {
  const MdxContent = loaderData;
  console.log(MdxContent);
  return (
    <Suspense fallback={<div>Loading content...</div>}>
      <MdxContent components={useMDXComponents()} />
    </Suspense>
  );
}
