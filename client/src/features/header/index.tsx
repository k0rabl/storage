import { FunctionComponent } from "react"

interface IProps {}

export const Header:FunctionComponent<IProps> = () => {
  const token = localStorage.getItem('token')
  return(
    <div>
      <h1>MyCloud</h1>
      <p>Search-bar</p>
      
    </div>
  )
}