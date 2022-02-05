import React, { Component } from 'react'

interface IState {
  isOpen: boolean
  title: string
  hand: Function
}

const ModalContext = React.createContext({
    isOpen: false,
    title: '',
    setOpen: (c: boolean) => {},
    setHandler: (c: Function) => {},
    setTitle: (c: string) => {},
    handler: () => {}
  })


class ModalProvider extends Component {
  // Context state
  state: IState = {
    isOpen: false,
    title: '',
    hand: () => {}
  }
 

  // Method to update state
  setOpen = (isOpen: boolean) => {
    this.setState((prevState) => ({ isOpen }))
  }

  setTitle = (title: string) => {
    this.setState((prevState) => ({ title }))
  }
  

  setHandler = (hand: Function) => {
    this.setState((prevState) => ({ hand }))
  }

  handler = () => {
    
    this.state.hand()
  }

  render() {
    const { children } = this.props
    const { isOpen, title } = this.state
    const { setOpen, setHandler, setTitle, handler } = this

    return (
      <ModalContext.Provider
        value={{
          title,
          setTitle,
          isOpen,
          setOpen,
          setHandler,
          handler
        }}
      >
        {children}
      </ModalContext.Provider>
    )
  }
}

export default ModalContext

export { ModalProvider }