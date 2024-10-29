import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function UpdateThreadModal({
    show, handleClose, threadId, threadContent
}) {
    //states
    const [propertyName, setPropertyName] = useState(threadContent.propertyname);
    const [propertyLocation, setPropertyLocation] = useState(threadContent.propertylocation);
    const [propertyDescription, setPropertyDescription] = useState(threadContent.propertydescription);

    //API Endpoint
    const BASE_URL = "https://ffca51ee-54a7-413b-bde5-598ed309fd45-00-17425dkhg8k6s.pike.replit.dev"

    const cancelUpdate = () => {
        handleClose();
    }

    const handleUpdateThread = async () => {
        const data = {
            property_name: propertyName,
            property_location: propertyLocation,
            property_description: propertyDescription
        }
        await axios.put(`${BASE_URL}/thread/${threadId}`, data)
            .then((response) => { console.log("Success: ", response.data) })
            .catch((error) => { console.error("Error: ", error) })
        handleClose();
    }


    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
                <h1>Update property</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formPropertyName">
                        <Form.Label>Property Title:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter property name"
                            value={propertyName}
                            onChange={(e) => setPropertyName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPropertyLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter property location"
                            value={propertyLocation}
                            onChange={(e) => setPropertyLocation(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="note">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            placeholder="Describe the property"
                            as="textarea"
                            rows={3}
                            value={propertyDescription}
                            onChange={(e) => setPropertyDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Button className="mt-3 me-2" variant="primary" onClick={handleUpdateThread}>
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
