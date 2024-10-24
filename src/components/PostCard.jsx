import { useState, useContext } from 'react';
import { Container, Row, Col, Stack, Nav, Card, Image, Form, Button } from 'react-bootstrap'
// import UpdatePostModal from './UpdatePostModal';

export default function PostCard(post) {
    const { id: id, post_content: post_content, edited_flag: edited_flag, timestamp: timestamp, updated_timestamp: updated_timestamp, uid: uid } = post.post;

    //Update Function
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleShowUpdateModal = () => setShowUpdateModal(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);

    //Delete
    const handleDelete = () => {
        console.log("Delete Post from DB")
    }

    return (
        <Card className="mb-1">
            <Card.Body>
                <Card.Title>{uid}</Card.Title>
                <Card.Text>{post_content}</Card.Text>
                <Card.Footer className="text-muted">
                    <div>{edited_flag ? timestamp : updated_timestamp}</div>
                    <div>
                        <Button variant="light">
                            <i className="bi bi-pencil-square" onClick={handleShowUpdateModal}></i>
                        </Button>
                        <Button variant="light">
                            <i className="bi bi-trash" onClick={handleDelete}></i>
                        </Button>
                    </div>
                </Card.Footer>
                {/* <UpdatePostModal
                    show={showUpdateModal}
                    handleClose={handleCloseUpdateModal}
                /> */}
            </Card.Body>
        </Card>
    )
}
