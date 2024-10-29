import { useContext, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { AuthContext } from '../components/AuthProvider';
import UpdatePostModal from './UpdatePostModal';

export default function PostCard({ post, handleConfirmDeletePost }) {
    const { id: id, email: email, post_content: post_content, edited_flag: edited_flag, timestamp: timestamp, updated_timestamp: updated_timestamp, uid: uid } = post;
    const { currentUser } = useContext(AuthContext);

    //Update Function
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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


    return (
        <Card className="mb-1">
            <Card.Body>
                <Card.Title>{email}</Card.Title>
                <Card.Text>{post_content}</Card.Text>
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
                            {!edited_flag && <span><i className="bi bi-sticky-fill"></i> Posted: {formatDateWithoutTimezone(timestamp)}</span>}
                            {edited_flag && <span><i className="bi bi-pencil-fill"></i> Edited: {formatDateWithoutTimezone(updated_timestamp)}</span>}
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
                <UpdatePostModal show={showUpdateModal} handleClose={handleCloseUpdateModal} post={post} />
            </Card.Body>
        </Card>
    )
}
