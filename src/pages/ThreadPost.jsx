import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Stack, Nav, Card, Image, Form, Button } from 'react-bootstrap'
import { AuthContext } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function ThreadPost() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([
        { id: 1, username: "ListenToTheWind", content: "Wah stim oh layan lonely auntie", timestamp: "11:01 AM" },
        { id: 2, username: "hihihehe", content: "Like that only?", timestamp: "11:01 AM" }
    ]);
    const BASE_URL = "https://3e6cea79-5f7c-478c-ab94-afdfe63a2cbe-00-1rphpctmxz8hn.pike.replit.dev/"
    const { currentUser } = useContext(AuthContext);

    const [newPost, setNewPost] = useState("");

    //Fetch Posts from DB based on propertyId
    // const fetchPosts = async() => {
    //     try{
    //         const res = await.axios.get(`${BASE_URL}/posts/${propId}`);
    //         setPosts(res.data)
    //     } catch(error){
    //         console.error("Error: ", error);
    //     }
    // }

    // useEffect(() => {
    //     fetchPosts()
    // }, [])

    // Add new post to the list
    const handleAddPost = (e) => {
        e.preventDefault();
        if (newPost.trim() === "") return;

        const newEntry = {
            id: posts.length + 1,
            username: currentUser.email, // Ideally, you'd fetch this dynamically
            content: newPost,
            timestamp: new Date().toLocaleTimeString(),
        };
        setPosts([newEntry, ...posts]);
        setNewPost("");
    }

    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
    })


    return (
        <Container>
            <h1>Property.Title</h1>
            <Image alt="Image of property" />
            <h3>Property.Location</h3>
            <p>Property.Description</p>

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
