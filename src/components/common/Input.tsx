import { styled } from 'styled-components'

const Input = styled('input')`
  width: 100%;
  height: 30px;
  font-size: inherit;
  border-radius: 3px;
  &:focus {
    background-color: #f7f7f7;
  }
  &:focus-visible {
    outline-color: #38a5e1;
  }
`

export default Input
