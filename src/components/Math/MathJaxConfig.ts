import pkg from 'better-react-mathjax';

export const {MathJax, MathJaxContext} = pkg;


export const mathJaxConfig = {
    loader: {load: ['[tex]/physics']},
    tex: {
        inlineMath: [
            ['$', '$'],
            ['\\(', '\\)'],
        ],
        displayMath: [
            ['$$', '$$'],
            ['\\[', '\\]'],
        ],
    },
};
