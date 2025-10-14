import React, {useState} from 'react';

import {useParams} from 'react-router-dom';

// pathMDX: string
//
// const contentMap: Record<string, () => Promise<any>> = {
//   'math/integration-by-parts': () => import(pathMDX)
// };

export default function ConceptPage() {
  // const {subject, concept} = useParams();
  // const slug = subject && concept ? `${subject}/${concept}` : '';
  // const [MDXContent, setMDXContent] = React.useState<any>(null);
  //
  // React.useEffect(() => {
  //   if (slug && contentMap[slug])
  //     {
  //       contentMap[slug]().then((mod) => setMDXContent(() => mod.default));
  //     }
  // }, [slug]);
  //
  // const components = {IntegrationByPartsVisualization};
  //
  // return (
  //   `<div>
  //     {MDXContent ? <MDXContent components=${components}/> : <div>Concept not found.</div >}
  //   </div>`
  // );
}

