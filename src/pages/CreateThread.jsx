import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate, redirect } from 'react-router-dom';
import { auth } from "../firebase";


export default function CreateThread() {
    const [propertyName, setPropertyName] = useState("");
    const [propertyLocation, setPropertyLocation] = useState("");
    const [propertyDescription, setPropertyDescription] = useState("");
    const [currentUserId, setCurrentUserId] = useState(null);

    //Navigate function
    const navigate = useNavigate();

    //API Endpoint
    const BASE_URL = "https://6eb9a79c-ff48-48e3-9fb0-77592fd52711-00-3niw0ix6x7ivx.pike.replit.dev"

    const handleCreateThread = async () => {
        const data = {
            uid: currentUserId,
            propertyName: propertyName,
            propertyLocation: propertyLocation,
            propertyDescription: propertyDescription,
            timestamp: new Date().toLocaleString()
        }

        await axios.post(`${BASE_URL}/thread`, data)
            .then((response) => {
                console.log("Success: ", response.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            })
        //Data Submit: User UID, Property Name, Property Location, Property Description, Timestamp created
        //Submit to Neon DB
        navigate('/thread');
    }

    const cancelCreation = () => {
        //Navigate back to Thread.jsx
        setPropertyName("")
        setPropertyLocation("")
        setPropertyDescription("")
        navigate('/thread')
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setCurrentUserId(user.uid)
            } else {
                setCurrentUserId(null)
                navigate('/')
            }
        })
    }, [navigate])

    return (
        <Container>
            <h1>Add a new property</h1>
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
                <Button className="mt-3 me-2" variant="primary" onClick={handleCreateThread}>
                    Submit
                </Button>
                <Button className="mt-3" variant="danger" onClick={cancelCreation}>
                    Cancel
                </Button>
            </Form>
        </Container>
    )
}
