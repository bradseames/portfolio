import React, {useState, useEffect, useRef} from 'react'
import {MDXProvider, MDXProviderProps} from '@mdx-js/react'
import {getMDXComponent} from 'mdx-bundler/client'
import * as d3 from 'd3'

// A custom D3 component for MDX
const D3Component = ({data, width = 300, height = 150}) => {
  const ref = useRef()

  useEffect(() => {
    const svg = d3.select(ref.current)
                  .attr('width', width)
                  .attr('height', height)

    svg.selectAll('*').remove() // Clear previous rendering

    svg.append('circle')
       .attr('cx', width / 2)
       .attr('cy', height / 2)
       .attr('r', data * 10)
       .attr('fill', 'steelblue')
  }, [data, width, height])

  return <svg ref={ref} />
}

// MDXProvider components for custom elements
const components = {
  D3Component
}

const MathAndD3 = ({mdxSource}) => {
  const [Component, setComponent] = useState(null)

  useEffect(() => {
    async function getComponent() {
      // In a real app, this compilation would be in an API or server function
      // For demonstration, we'll assume mdxSource is pre-compiled
      const {code} = await mdxBundler.compile({source: mdxSource})
      const Content = getMDXComponent(code)
      setComponent(() => Content)
    }

    getComponent()
  }, [mdxSource])

  // Ensure MathJax re-renders dynamic content
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise()
    }
  }, [Component])

  if (!Component) {
    return <div>Loading...</div>
  }

  return (
    <MDXProvider components={components}>
      <Component />
    </MDXProvider>
  )
}

export default MathAndD3
