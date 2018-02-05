/* eslint-env jasmine, browser */
import { render } from 'preact'
import AnimateOnChange from '..'

const Animated = ({ children }) => {
  children = children || 'text'
  return <AnimateOnChange
    baseClassName='base'
    animationClassName='fade'
    animate={true}>
    {children}
  </AnimateOnChange>
}


describe('api', () => {
  let root
  beforeEach(() => {
    root = document.createElement('div')
    root.id = 'root'
    document.body.appendChild(root)
  })
  afterEach(() => {
    if (root) {
      document.body.removeChild(root)
    }
  })
  it('renders animated from dist', () => {
    render(<Animated />, root)
    let elms = document.getElementsByClassName('base')
    expect(elms.length).toBe(1)
  })
})