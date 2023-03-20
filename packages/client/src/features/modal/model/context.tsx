import React, { Component, ReactElement } from 'react'

interface IState {
  isOpen: boolean
  title: string
  child: ReactElement
  hand: Function
}

const ModalContext = React.createContext({
    isOpen: false,
    title: '',
    child: <div>Modal body</div>,
    setChild: (c: ReactElement) => {},
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
    child: <div>Modal body</div>,
    hand: () => {}
  }

  // Method to update state
  setOpen = (isOpen: boolean) => {
    this.setState((prevState) => ({ isOpen }))
  }

  setTitle = (title: string) => {
    this.setState((prevState) => ({ title }))
  }

  setChild = (child: ReactElement) => {
    this.setState((prevState) => ({ child }))
  }
  
  setHandler = (hand: Function) => {
    this.setState((prevState) => ({ hand }))
  }

  handler = () => {
    this.state.hand()
  }

  render() {
    const { children } = this.props
    const { isOpen, title, child} = this.state
    const { setOpen, setHandler, setTitle, setChild, handler } = this

    return (
      <ModalContext.Provider
        value={{
          title,
          child,
          setChild,
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