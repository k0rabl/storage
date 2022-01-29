import React, { Component } from 'react'

interface IState {
  isOpen: boolean
  type: string
  params: any[]
  hand: Function
}

const ModalContext = React.createContext({
    isOpen: false,
    type: '',
    setOpen: (c: boolean) => {},
    setType: (c: string) => {},
    setHandler: (c: Function, p?: any[]) => {},
    handler: () => {}
  })


class ModalProvider extends Component {
  // Context state
  state: IState = {
    isOpen: false,
    type: '',
    hand: () => {},
    params: []
  }
 

  // Method to update state
  setOpen = (isOpen: boolean) => {
    this.setState((prevState) => ({ isOpen }))
  }

  setType = (type: string) => {
    this.setState((prevState) => ({ type }))
  }
  

  setHandler = (hand: Function, params?: any[]) => {
    this.setState((prevState) => ({
      hand: hand,
      params: params && []
    }))
  }

  handler = () => {
    this.state.hand(...this.state.params)
  }

  render() {
    const { children } = this.props
    const { isOpen, type } = this.state
    const { setType, setOpen, setHandler, handler } = this

    return (
      <ModalContext.Provider
        value={{
          isOpen,
          type,
          setOpen,
          setType,
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