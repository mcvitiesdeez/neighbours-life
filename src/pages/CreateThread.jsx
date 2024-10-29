import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate, redirect } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase";


export default function CreateThread() {
    const [propertyName, setPropertyName] = useState("");
    const [propertyLocation, setPropertyLocation] = useState("");
    const [propertyDescription, setPropertyDescription] = useState("");
    const [currentUserId, setCurrentUserId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("")

    //Navigate function
    const navigate = useNavigate();

    //Initialize Firebase Storage
    const storage = getStorage();

    //API Endpoint
    const BASE_URL = "https://ffca51ee-54a7-413b-bde5-598ed309fd45-00-17425dkhg8k6s.pike.replit.dev"

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]); // Set the selected image file
    };

    const handleCreateThread = async () => {
        if (imageFile) {
            const storageRef = ref(storage, `images/${imageFile.name}`);
            await uploadBytes(storageRef, imageFile);
            const downloadUrl = await getDownloadURL(storageRef);
            setImageUrl(downloadUrl)

            const data = {
                uid: currentUserId,
                propertyName: propertyName,
                propertyLocation: propertyLocation,
                propertyDescription: propertyDescription,
                timestamp: new Date().toLocaleString(),
                imageurl: downloadUrl
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
    }

    const cancelCreation = () => {
        //Navigate back to Thread.jsx
        setPropertyName("")
        setPropertyLocation("")
        setPropertyDescription("")
        setImageFile(null)
        setImageUrl("")
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
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control type="file" onChange={handleImageChange} />
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
