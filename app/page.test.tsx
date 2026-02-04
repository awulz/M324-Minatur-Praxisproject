import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />)
    const heading = screen.getByText('Swiss Weather App')
    expect(heading).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Home />)
    const subtitle = screen.getByText('Click on the map or search a Swiss city')
    expect(subtitle).toBeInTheDocument()
  })

  it('renders the map loading state', () => {
    render(<Home />)
    const mapPlaceholder = screen.getByText('Loading map...')
    expect(mapPlaceholder).toBeInTheDocument()
  })

  it('has the map container with correct id', () => {
    render(<Home />)
    const mapContainer = document.getElementById('map')
    expect(mapContainer).toBeInTheDocument()
  })
})
