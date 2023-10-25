import { useState, useCallback, useRef, useEffect, ChangeEvent } from 'react'
import { styled } from 'styled-components'
import { TypedIcon } from 'typed-design-system'

import { TResource } from '../types/resource'

import { Input } from './common'

const Card = styled('div')`
  height: 90px;
  border-radius: 10px;
  background-color: #fff;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Actions = styled('div')`
  text-align: right;
  > * + * {
    margin-left: 8px;
  }
`

const Div = styled('div')`
  width: 100%;
  height: 2rem;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

const IconButton = styled('button')`
  border-width: 0;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
`

export default function ResourceItem({
  resource,
  onSelectResource,
}: {
  resource: TResource
  onSelectResource: (item: TResource) => void
}) {
  const inputRef = useRef(null)

  const [editMode, setEditMode] = useState(false)
  const [value, setValue] = useState(() =>
    resource.type === 'url' ? resource.data : resource.data.name
  )

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editMode])

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  const handleBlur = useCallback(() => {
    console.log('save item')
    setEditMode(false)
  }, [])

  const handleEdit = useCallback(() => {
    setEditMode(curr => !curr)
  }, [])

  const handleRemove = useCallback(() => {
    console.log('remove item')
  }, [])

  return (
    <Card>
      {editMode ? (
        <Input value={value} ref={inputRef} onBlur={handleBlur} onChange={handleInputChange} />
      ) : (
        <Div onClick={() => onSelectResource(resource)}>{value}</Div>
      )}

      <Actions>
        <IconButton onClick={handleEdit}>
          <TypedIcon icon="edit_19" size={19} />
        </IconButton>
        <IconButton onClick={handleRemove}>
          <TypedIcon icon="trash_19" size={19} />
        </IconButton>
      </Actions>
    </Card>
  )
}
