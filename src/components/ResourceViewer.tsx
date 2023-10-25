import { styled } from 'styled-components'
import { TResource } from '../types/resource'

const Container = styled('div')`
  overflow: hidden;
  background-color: #f6f6f6;
`

const ResourceViewer = ({ selectedResource }: { selectedResource?: TResource }) => {
  
  if (!selectedResource) return <Container />
  return (
    <Container>
      {selectedResource.type === 'url' && (
        <iframe src={selectedResource.data} width="100%" height="100%" />
      )}
    </Container>
  )
}

export default ResourceViewer
