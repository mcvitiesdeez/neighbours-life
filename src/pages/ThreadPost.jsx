import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Stack, Nav, Card, Image, Form, Button } from 'react-bootstrap'
import { AuthContext } from '../components/AuthProvider';
import PostCard from '../components/PostCard';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ThreadPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const BASE_URL = "https://6eb9a79c-ff48-48e3-9fb0-77592fd52711-00-3niw0ix6x7ivx.pike.replit.dev"

    const { thread, userId } = location.state || {};

    // console.log(thread)
    // console.log(userId)

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
    })

    // Add new post to the list
    const handleAddPost = (e) => {
        e.preventDefault();
        if (newPost.trim() === "") return;

        const newEntry = {
            id: posts.length + 1,
            //username: currentUser.email, // Ideally, you'd fetch this dynamically
            content: newPost,
            timestamp: new Date().toLocaleTimeString(),
        };
        setPosts([newEntry, ...posts]);
        setNewPost("");
    }


    return (
        <Container>
            <h1>{thread.propertyname}</h1>
            <Image alt="Image of property" />
            <h3>{thread.propertylocation}</h3>
            <p>{thread.propertydescription}</p>

            {/* Post */}
            <Col>
                {posts.map((post) => (
                    <div key={post.id}>
                        <PostCard post={post} />
                    </div>
                ))}
            </Col>
            {/* Form to add new post */}
            <Form onSubmit={handleAddPost}>
                {/* <Form> */}
                <Form.Group controlId="postContent">
                    <Form.Label>Add a new post</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Type your message here..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Post
                </Button>
            </Form>

        </Container>
    )
}
