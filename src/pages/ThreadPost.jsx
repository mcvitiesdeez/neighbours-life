import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Image } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';
import PostCard from '../components/PostCard';

export default function ThreadPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const BASE_URL = "https://6eb9a79c-ff48-48e3-9fb0-77592fd52711-00-3niw0ix6x7ivx.pike.replit.dev"

    const { thread, userId } = location.state || {};

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/post/${thread.id}`);
            setPosts(res.data)
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    // Add new post to the list
    const handleAddPost = async (e) => {
        console.log(posts)
        e.preventDefault()
        if (newPost.trim() === "") return;

        const data = {
            uid: userId,
            email: currentUser.email,
            post_content: newPost,
            timestamp: new Date().toLocaleString(),
            thread_id: thread.id
        };
        const res = await axios.post(`${BASE_URL}/post`, data)
            .then((response) => {
                console.log("Success: ", response.data);
                setPosts((prevPosts) => [...prevPosts, response.data])
            })
            .catch((error) => {
                console.error("Error: ", error);
            })
        setNewPost("");
    }

    const clearPostForm = () => {
        setNewPost("");
    }

    //Delete post
    const handleConfirmDeletePost = async (postId) => {
        try {
            console.log(postId)
            await axios.delete(`${BASE_URL}/post/${postId}`)
            setPosts((prevItems) => prevItems.filter((post) => post.id !== postId));

        } catch (error) {
            console.error("Error: ", error);
        }
    }


    return (
        <Container>
            <h1>{thread.propertyname}</h1>
            <Image alt="Image of property" />
            <h3>{thread.propertylocation}</h3>
            <p>{thread.propertydescription}</p>

            {/* Post */}
            <Col>
                {posts.map((post, index) => (
                    <div key={index}>
                        <PostCard key={post.id} post={post} handleConfirmDeletePost={handleConfirmDeletePost} />
                    </div>
                ))}
                {posts.length === 0 && <h3>No Post found.</h3>}
            </Col>
            {/* Form to add new post */}
            <Form onSubmit={handleAddPost} className='mt-5'>
                {/* <Form> */}
                <Form.Group controlId="postContent">
                    <Form.Label>Add a new post</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Type your message here..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3 me-1">
                    Post
                </Button>
                <Button variant="secondary" onClick={clearPostForm} className="mt-3">
                    Clear
                </Button>
            </Form>

        </Container>
    )
}
