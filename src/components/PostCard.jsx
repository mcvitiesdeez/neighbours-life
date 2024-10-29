import { useContext, useState } from 'react';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import { AuthContext } from '../components/AuthProvider';
import UpdatePostModal from './UpdatePostModal';
import axios from 'axios';

export default function PostCard({ post, handleConfirmDeletePost }) {
    const { id: id, email: email, post_content: post_content, edited_flag: edited_flag, timestamp: timestamp, updated_timestamp: updated_timestamp, uid: uid } = post;
    const { currentUser } = useContext(AuthContext);

    //API Endpoint
    const BASE_URL = import.meta.env.VITE_BASE_URL

    //Update Function
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [postContent, setPostContent] = useState(post.post_content);
    const [newPostContent, setNewPostContent] = useState(post.post_content);
    const [editedFlag, setEditedFlag] = useState(post.edited_flag)

    const handleShowUpdateModal = () => setShowUpdateModal(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);

    //Delete
    const handleConfirmDelete = () => {
        handleConfirmDeletePost(id);
        setShowDeleteModal(false);
    }

    const formatDateWithoutTimezone = (isoString) => {
        const [datePart, timePart] = isoString.split('T');
        const [year, month, day] = datePart.split('-');
        let [hour, minute] = timePart.split(':');

        hour = parseInt(hour, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        return `${year}-${month}-${day}, ${hour}:${minute}${ampm}`;
    };

    const handleUpdatePost = async () => {
        const data = {
            post_content: newPostContent,
            updated_timestamp: new Date().toLocaleString()
        }
        await axios.put(`${BASE_URL}/post/${post.id}`, data)
            .then((response) => { console.log("Success: ", response.data) })
            .catch((error) => { console.error("Error: ", error) })
        handleCloseUpdateModal();
        setEditedFlag(true)
        setPostContent(newPostContent)
    }


    return (
        <Card className="mb-1">
            <Card.Body>
                <Card.Title>{email}</Card.Title>
                <Card.Text>{postContent}</Card.Text>
                <Card.Footer className="text-muted">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            {currentUser.uid === uid && (
                                <Button variant="light">
                                    <i className="bi bi-pencil-square" onClick={handleShowUpdateModal}></i>
                                </Button>
                            )}
                            {currentUser.uid === uid && (
                                <Button variant="light">
                                    <i className="bi bi-trash" onClick={handleShowDeleteModal}></i>
                                </Button>
                            )}
                        </div>
                        <div className='text-end'>
                            {!editedFlag && <span><i className="bi bi-sticky-fill"></i> Posted: {formatDateWithoutTimezone(timestamp)}</span>}
                            {editedFlag && <span><i className="bi bi-pencil-fill"></i> Edited: {formatDateWithoutTimezone(timestamp)}</span>}
                        </div>
                    </div>
                </Card.Footer>

                {/* delete modal */}
                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                    <Modal.Body>
                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                            Delete this thread?
                        </h2>
                        <p>Are you sure you want to delete this thread?</p>
                        <Button className='me-2' variant="danger" onClick={handleConfirmDelete}>
                            Yes, delete this thread
                        </Button>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                            No, cancel
                        </Button>
                    </Modal.Body>
                </Modal>

                {/* Update modal */}
                <Modal show={showUpdateModal} onHide={handleCloseUpdateModal} centered>
                    <Modal.Body>
                        <h1>Update Post</h1>
                        <Form>
                            <Form.Group controlId="postContent">
                                <Form.Label>Add a new post</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Type your message here..."
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                />
                            </Form.Group>
                            <Button className="mt-3 me-2" variant="primary" onClick={handleUpdatePost}>
                                Submit
                            </Button>
                            <Button className="mt-3" variant="danger" onClick={handleCloseUpdateModal}>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    )
}
