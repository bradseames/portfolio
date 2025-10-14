import type {Route} from "./+types/DynamicMdxPage";
import React, {lazy, Suspense} from 'react';
import {components} from '../components/MDXProvider';
// A utility function to load the correct MDX file.
// The path here assumes your MDX files are in src/content.
const importMdx = (
  category: string | undefined,
  name: string | undefined) => lazy(
  () => import(`../content/${category}/${name}.mdx`));

const Loading = () => <div>Loading content...</div>;
const NotFound = () => <div>Content not found.</div>;

export async function clientLoader({params}: Route.ComponentProps) {
  let mdxContent = importMdx(params.category, params.name);

  return mdxContent;
}

export default function DynamicMdxPage({
  loaderData
}: Route.ComponentProps) {

  const MdxContent = loaderData
  return (
    <>
      <Suspense fallback={<Loading/>}>
        <MdxContent components={components}/>
      </Suspense>
    </>
  );
}
