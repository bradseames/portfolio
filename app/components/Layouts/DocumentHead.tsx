import React from 'react';

interface DocumentHeadProps {
  title: string
  description: string | undefined;
}

//
//export function DocumentHead({title, description}: DocumentHeadProps) {
//  //const _title = title ? `${title} | Mantine` : 'Mantine';
//  //const _description = description || metaDescription;
//
//  return (<head>
//    <meta charSet="utf-8"/>
//    <meta name="language" content="English"/>
//    <meta
//        name="viewport"
//        content="width=device-width, initial-scale=1,  minimum-scale=1,user-scalable=no"
//    />
//    {/*<title>{_title}</title>*/}
//    <link rel="shortcut icon" href="/favicon.svg"/>
//
//    {/*<meta itemProp="name" content={_title} key="item-title"/>*/}
//    {/*<meta itemProp="description" content={_description}/>*/}
//    {/*<meta name="description" content={_description}/>*/}
//
//    {/*<meta name="og:type" content="website"/>*/}
//    {/*<meta property="og:url" content={'_url'} key="og-url"/>*/}
//    {/*<meta property="og:title" content={_title} key="og-title"/>*/}
//    {/*<meta name="og:title" content={_title}/>*/}
//    {/*<meta name="og:description" content={_description}/>*/}
//    {/*<meta name="og:image:width" content="1280"/>*/}
//    {/*<meta name="og:image:height" content="640"/>*/}
//
//    {/*<meta name="twitter:title" content={_title}/>*/}
//    {/*<meta name="twitter:description" content={_description}/>*/}
//
//    {/*<meta name="robots" content="index, follow"/>*/}
//    {/*<meta name="keywords" content="engineer,developer,portfolio"/>*/}
//
//    {/* <script>
//     {
//     (MathJax = {
//     output: {
//     font: 'mathjax-stix2',
//     fontPath: 'http://localhost:3000/mathjax-strix2-font',
//     },
//     })
//     }
//     </script>
//     <script defer src='http://localhost:3000/mathjax/tex-chtml.js'></script> */}
//  </head>);
//}
