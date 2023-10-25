import { useState, useCallback, useRef, useEffect, ChangeEvent } from 'react'
import { styled } from 'styled-components'

import { TResource } from '../types/resource'

import { Input } from './common'
import ResourceItem from './ResourceItem'

const INIT_URL = 'https://'

const toEmbedUrl = (url: string) => {
  if (url.includes('www.youtube.com')) {
    return url.replace('watch?v=', 'embed/')
  } else {
    return url
  }
}

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
const AddButtonsContainer = styled('div')`
  background-color: #fff;
  height: 50px;
  box-sizing: border-box;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  gap: 10px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
`

const AddButton = styled('button')`
  width: 100%;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 8px;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
`
const AddFileButton = styled('label')`
  width: 100%;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 8px;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
`

const AddUrlFieldWrapper = styled('div')`
  position: absolute;
  bottom: 8px;
  left: 10px;
  right: 10px;
  transform: translateY(100%);
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 4px;
`

function SideResourceList({
  resources,
  onResourceAdd,
}: {
  resources: TResource[]
  onResourceAdd: (type: 'url' | 'image', data: string | File) => void
}) {
  const inputRef = useRef(null)

  const [addUrlOpen, setAddUrlOpen] = useState(false)
  const [value, setValue] = useState(INIT_URL)

  useEffect(() => {
    if (addUrlOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [addUrlOpen])

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  const handleOnKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onResourceAdd('url', toEmbedUrl(value))
        setAddUrlOpen(false)
      }
    },
    [onResourceAdd, value]
  )

  const handleAddUrlOpen = useCallback(() => {
    setAddUrlOpen(true)
  }, [])

  const handleReset = useCallback(() => {
    setValue(INIT_URL)
    setAddUrlOpen(false)
  }, [])

  const handleAddFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    for (const file of e.target.files) {
      onResourceAdd('image', file)
    }
  }, [])

  return (
    <Wrapper>
      <AddButtonsContainer>
        <AddButton onClick={handleAddUrlOpen}>URL 추가</AddButton>
        <AddUrlFieldWrapper style={{ display: addUrlOpen ? 'initial' : 'none' }}>
          <Input
            ref={inputRef}
            style={{ width: 'Calc(100% - 10px)' }}
            value={value}
            onChange={handleInputChange}
            onKeyPress={handleOnKeyPress}
            onBlur={handleReset}
          />
        </AddUrlFieldWrapper>

        <AddFileButton htmlFor="file">이미지 추가</AddFileButton>
        <input
          type="file"
          multiple
          accept="image/png, image/jpeg"
          onChange={handleAddFile}
          id="file"
          name="file"
          style={{ opacity: 0, position: 'absolute', zIndex: '-1' }}
        />
      </AddButtonsContainer>

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
