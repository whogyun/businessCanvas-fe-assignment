import { useState, useCallback } from 'react'
import styled from 'styled-components'

import { TResource } from './types/resource'
import SideResourceList from './components/SideResourceList'
import ResourceViewer from './components/ResourceViewer'

const Container = styled('div')`
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100vh;
`

function App() {
  const [resources, setResources] = useState<TResource[]>([
    { type: 'url', data: 'https://www.robinwieruch.de/react-libraries/' },
    { type: 'url', data: 'https://typed.do/blog-kr/how-to-make-good-usability-product/' },
  ])

  const handleAddResources = useCallback((type: 'url' | 'image', data: string | File) => {
    setResources(curr => [...curr, { type, data }])
  }, [])

  return (
    <Container>
      <SideResourceList resources={resources} onResourceAdd={handleAddResources} />
      <ResourceViewer />
    </Container>
  )
}

export default App
