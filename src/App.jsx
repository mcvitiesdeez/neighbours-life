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

export function Layout() {

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand as={Link} to={'/'}><img src="src/assets/Brands_text_1.webp" alt="Brands Text" /></Navbar.Brand>
          <Nav>
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
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

function App() {

  return (
    <AuthProvider>
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
      <Footer />
    </AuthProvider>

  )
}

export default App
