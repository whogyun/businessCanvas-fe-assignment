import { styled } from 'styled-components'
import { useSelector } from 'react-redux'

import { selectResources } from '../modules/resourceSlice'

import ResourceItem from './ResourceItem'

const Wrapper = styled('div')`
  box-sizing: border-box;
  overflow: scroll;
  width: 280px;
  position: relative;
  background-color: #f7f7f7;
  border-right: 1px solid #c4c4c4;
`

const ResourcesContainer = styled('div')`
  padding: 10px;
  > * + * {
    margin-top: 10px;
  }
  > span {
    display: block;
    text-align: center;
  }
`

function SideResourceList() {
  const resources = useSelector(selectResources)

  return (
    <Wrapper>
      <ResourcesContainer>
        {resources.length < 1 ? (
          <span>리소스가 없습니다.</span>
        ) : (
          resources.map((item, idx) => <ResourceItem key={idx} resource={item} />)
        )}
      </ResourcesContainer>
    </Wrapper>
  )
}

export default SideResourceList
