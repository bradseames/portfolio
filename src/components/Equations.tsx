import React, { useEffect, useRef } from 'react';


export const mathJaxConfig = {
  loader: { load: ['input/tex', 'output/chtml'] },
  tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
};
//export const mathJaxConfig2 = {
//  loader: {
//    load: ['input/tex', 'output/chtml'],
//    paths: {
//      mathjax: '@mathjax/src/bundle',
//    },
//  },
//  tex: {
//    inlineMath: [['$', '$'], ['\\(', '\\)']],
//  },
//};


export function useMathJax() {
  useEffect(() => {
    if ((window as any).MathJax) return;
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    s.async = true;
    document.head.appendChild(s);
  }, []);
}

export function MathBlock({ tex }: { tex: string }) {
  useMathJax();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const MJ = (window as any).MathJax;
    if (!MJ) return;
    MJ.typesetPromise?.([ref.current]);
  }, [tex]);
  return <div className="mathblock" ref={ref}>{`$$${tex}$$`}</div>;
}

export function MathLine({ tex }: { tex: string }) {
  useMathJax();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const MJ = (window as any).MathJax;
    if (!MJ) return;
    MJ.typesetPromise?.([ref.current]);
  }, [tex]);
  return <div className="mathline" ref={ref}>{`$$${tex}$$`}</div>;
}
