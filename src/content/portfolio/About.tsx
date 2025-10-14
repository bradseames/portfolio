import {Container} from '@mantine/core'
// @ts-ignore
import AboutMe from './about-me.mdx';
import SliderControl from '../../components/Controls/SliderControl'
import carosel from '../../components/Carousel'
// import {MathJax, MathJaxContext} from 'better-react-mathjax';

export default function About() {
//   <MathJaxContext>
//   <MathJax>$$ \int u\,dv = uv - \int v\,du $$</MathJax>
// </MathJaxContext>
  return (
    <Container>
      
      <AboutMe name="Mars" year={2022}/>
    </Container>
  );
}
