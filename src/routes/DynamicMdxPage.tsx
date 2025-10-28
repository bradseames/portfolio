import type { Route } from './+types/DynamicMdxPage';
import { lazy, Suspense } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MathJaxContext } from 'better-react-mathjax/MathJaxContext';
import { mathJaxConfig } from '../components/MathJaxProvider';
import { components } from '../components/MDXProvider';

const importMdx = (
  category: string | undefined,
  name: string | undefined,
) =>
  lazy((): Promise<any> =>
    import(`../content/${category}/${name}.mdx`));


export async function clientLoader({ params }: Route.ComponentProps,
) {
  return importMdx(params.category, params.name);
}


const Loading = () => (
  <div>Loading content...</div>
);


export default function DynamicMdxPage({ loaderData }: Route.ComponentProps,
) {
  const MdxContent = loaderData;
  return (
    <>
      <Suspense fallback={<Loading />}>
        <MDXProvider components={components}>
          <MathJaxContext config={mathJaxConfig}>
            <MdxContent />
          </MathJaxContext>
        </MDXProvider>
      </Suspense>
    </>
  );
}

