import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function UpdatePostModal({ show, handleClose, post }) {
    const [postContent, setPostContent] = useState(post.post_content);

    //API Endpoint
    const BASE_URL = "https://6eb9a79c-ff48-48e3-9fb0-77592fd52711-00-3niw0ix6x7ivx.pike.replit.dev"

    const cancelUpdate = () => {
        handleClose();
    }

    const handleUpdatePost = async () => {
        const data = {
            post_content: postContent,
            updated_timestamp: new Date().toLocaleString()
        }
        await axios.put(`${BASE_URL}/post/${post.id}`, data)
            .then((response) => { console.log("Success: ", response.data) })
            .catch((error) => { console.error("Error: ", error) })
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
                <h1>Update Post</h1>
                <Form>
                    <Form.Group controlId="postContent">
                        <Form.Label>Add a new post</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Type your message here..."
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                        />
                    </Form.Group>
                    <Button className="mt-3 me-2" variant="primary" onClick={handleUpdatePost}>
                        Submit
                    </Button>
                    <Button className="mt-3" variant="danger" onClick={cancelUpdate}>
                        Cancel
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}