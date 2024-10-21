import { Container, Nav, Navbar, Stack, Button, Modal, Form } from 'react-bootstrap'
import { BrowserRouter, Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../components/AuthProvider';

export default function Auth() {
    //Modals
    const [modalShow, setModalShow] = useState(null)
    const handleShowSignUp = () => setModalShow("SignUp")
    const handleShowLogin = () => setModalShow("Login")
    const { currentUser, logOut } = useContext(AuthContext);

    //Auth-Firebase
    const auth = getAuth();

    //Login/Signup form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Navigate to Home page if user is not logged in and trying to access a restricted page
    const navigate = useNavigate();

    // handleSignUp function
    const handleSignUp = async (e) => {
        setModalShow(null)
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res.user);
        } catch (error) {
            console.error(error);
        }
    }

    //handleLogin function
    const handleLogin = async (e) => {
        setModalShow(null)
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
    }

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
        }
    }

    const handleClose = () => setModalShow(null);
    return (
        <div>
            {
                currentUser ? (
                    <div style={{ textAlign: 'center' }}>
                        <Navbar.Text>Hi, {currentUser.email}</Navbar.Text><br />
                        <Button onClick={logOut} variant="link">Logout</Button>
                    </div>
                ) : (
                    <Stack>
                        <Button className='custom-btn rounded-pill my-1' onClick={handleShowLogin}>Login</Button>
                        <Button className='custom-btn rounded-pill my-1' onClick={handleShowSignUp}>Create an account</Button>
                    </Stack>
                )
            }
            <Modal show={modalShow !== null} onHide={() => setModalShow(null)} centered>
                <Modal.Body>
                    <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                        {modalShow === "SignUp"
                            ? "Create your account"
                            : "Log in to your account"}
                    </h2>
                    <Form className='d-grid gap-2 px-5' onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Button className='rounded-pill' variant='outline-dark' onClick={handleGoogleLogin}>
                            <i className='bi bi-google'></i>
                            {modalShow === "SignUp"
                                ? " Sign Up"
                                : " Login"
                            } with Google
                        </Button>
                        {modalShow === "SignUp"
                            ? (
                                <p style={{ fontSize: "12px" }}>
                                    By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. Neighbours may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account seceure and personalising our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.
                                </p>
                            )
                            : ""
                        }
                        <Button className='rounded-pill' type='submit'>{modalShow === "SignUp" ? "Sign Up" : "Log In"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
