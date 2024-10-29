import { Container, Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './components/Auth'
import { AuthProvider } from './components/AuthProvider'
import Footer from './components/Footer'
import CreateThread from './pages/CreateThread'
import Home from './pages/Home'
import Thread from './pages/Thread'
import ThreadPost from './pages/ThreadPost'
import NavBarLogo from './assets/Brands_text_1.webp'

export function Layout() {

  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to={'/'}><img src={NavBarLogo} alt="Brands Text" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to={'/'}>
                <div className='styled-header'>
                  <i className="bi bi-house-fill"></i><p>Home</p>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to={'/thread'}>
                <div className='styled-header'>
                  <i className="bi bi-chat-left-text-fill"></i><p>Thread</p>
                </div>
              </Nav.Link>
              <Auth />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

function App() {

  return (
    <AuthProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flex: 1 }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='thread' element={<Thread />} />
                <Route path='createthread' element={<CreateThread />} />
                <Route path='threadpost' element={<ThreadPost />} />
                {/* <Route path='login' element={<AuthPage />} /> */}
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    </AuthProvider>

  )
}

export default App
