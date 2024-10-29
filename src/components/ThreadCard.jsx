import React, { useState } from 'react';
import { Button, Card, Image, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UpdateThreadModal from './UpdateThreadModal';

export default function ThreadCard({ thread, onDelete, userId }) {
    const { id: threadId, propertydescription: propertyDescription, propertylocation: propertyLocation, propertyname: propertyName, timestamp: timestamp, uid: uid, imageurl: imageurl } = thread;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const navigate = useNavigate();
    //Delete Modal
    const handleShowDeleteModal = () => setShowDeleteModal(true);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    //Format propertyDescription
    const formatDescription = (description) => {
        description = description.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        if (description.length > 120) {
            return description.substring(0, 120) + "..."
        } else {
            return description
        }
    }

    //Execute function passed from parent component
    const handleConfirmDelete = () => {
        onDelete(threadId);
        setShowDeleteModal(false);
    }

    //Show update thread modal
    const handleShowUpdateModal = () => setShowUpdateModal(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);

    const handleAccessThread = () => {
        navigate('/threadpost', {
            state: {
                thread: thread,
                userId: userId
            }
        })
    }


    return (
        <Card className='mb-3 me-3' key={threadId} style={{ height: '395px' }}>
            <Card.Img variant="top" src={imageurl} as={Image} fluid={true} alt="Property Image" style={{ height: '150px', objectFit: 'cover', cursor: 'pointer' }} onClick={handleAccessThread} />
            <Card.Body>
                <Card.Title>{propertyName}</Card.Title>
                <Card.Subtitle>{propertyLocation}</Card.Subtitle>
                <Card.Text style={{ height: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{formatDescription(propertyDescription)}</Card.Text>

                {userId === uid &&
                    (<Card.Footer>
                        <Button variant="danger" onClick={handleShowDeleteModal} className='me-2'><i className="bi bi-trash-fill"></i></Button>
                        <Button variant="warning" onClick={handleShowUpdateModal}><i className="bi bi-pencil-square"></i></Button>
                    </Card.Footer>)}
            </Card.Body>

            {/* delete modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                <Modal.Body>
                    <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                        Delete this thread?
                    </h2>
                    <p>Are you sure you want to delete this thread?</p>
                    <Button className="me-2" variant="danger" onClick={handleConfirmDelete}>
                        Yes, delete this thread
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        No, cancel
                    </Button>
                </Modal.Body>
            </Modal>

            {/* Update modal */}
            <UpdateThreadModal show={showUpdateModal} handleClose={handleCloseUpdateModal} threadId={threadId} threadContent={thread} />
        </Card>

    )
}
