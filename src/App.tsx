import styled from 'styled-components'

import SideResourceList from './components/SideResourceList'
import ResourceViewer from './components/ResourceViewer'

const Container = styled('div')`
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100vh;
`

function App() {
  return (
    <Container>
      <SideResourceList />
      <ResourceViewer />
    </Container>
  )
}

export default App
