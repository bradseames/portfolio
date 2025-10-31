import type { Route } from './+types/DynamicMdxPage';
import { lazy, Suspense } from 'react';
import { mdxComponents } from '../components/mdx-components';
import { MathJax, mathJaxConfig } from '../app/ProviderShell';
import { MDXProvider } from '@mdx-js/react';
import { components } from '../components/MDXProvider';


export async function clientLoader({ params }: Route.ComponentProps) {
  const { category, subject, name } = params;
  if (!category || !name) {
    throw new Error('Missing category or name in route params');
  }
  const path = subject
      ? `../content/${category}/${subject}/${name}.mdx`
      : `../content/${category}/${name}.mdx`;
  try {
    const module = await import(path);
    return module.default();
  } catch (err) {
    console.error('Failed to load MDX:', err);
    throw new Response('MDX file not found', { status: 404 });
  }
}


export default function DynamicMdxPage({ loaderData }: Route.ComponentProps) {
  const MdxContent = loaderData;
  console.log(MdxContent);
  return (
      <Suspense fallback={<div>Loading content...</div>}>
        <MdxContent />
      </Suspense>
  );
}


//import { ErrorBoundary } from 'react-error-boundary';

//const importMdx = (
//    category: string | undefined,
//    subject: string | undefined,
//    name: string | undefined,
//) => {
//  return lazy(async () => {
//    const module = subject != undefined
//        ? await import(`../content/${category}/${subject}/${name}.mdx`)
//        : await import(`../content/${category}/${name}.mdx`);
//    return { default: module.default };
//  });
//};

//export async function clientLoader({ params }: Route.ComponentProps) {
//  const module = params.subject != undefined
//      ? await import(`../content/${params.category}/${params.subject}/${params.name}.mdx`)
//      : await import(`../content/${params.category}/${params.name}.mdx`);
//  return module.default;
//}

//export async function clientLoader({ params }: Route.ComponentProps) {
//  const module = await import(`../content/${params.category}/${params.subject}/${params.name}.mdx`);
//  return module.default;
//}

//export async function clientLoader({ params }: Route.ComponentProps) {
//  const module = await import(`../content/${params.category}/${params.subject}/${params.name}.mdx`);
//  return module.default;
//}

