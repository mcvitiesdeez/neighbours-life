import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ThreadCard from '../components/ThreadCard';
import { auth } from "../firebase";

export default function Thread() {
    const [threads, setThreads] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);

    //Navigate function
    const navigate = useNavigate();

    //API Endpoint
    const BASE_URL = "https://ffca51ee-54a7-413b-bde5-598ed309fd45-00-17425dkhg8k6s.pike.replit.dev"

    const fetchThreads = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/thread`)
            setThreads(res.data)
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    //CreateThread function
    const handleCreateThread = (currentUserId) => {
        navigate('/createthread')
        //Navigate to CreateThread.jsx
    }

    const handleOpenPost = () => {
        navigate('/threadpost')
    }

    const handleConfirmDeleteThread = async (threadId) => {
        try {
            await axios.delete(`${BASE_URL}/thread/${threadId}`)
            setThreads((prevItems) => prevItems.filter((thread) => thread.id !== threadId));
        } catch (error) {
            console.error("Error: ", error);
        }
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
        fetchThreads();
    }, [navigate])

    return (
        <Container>
            <h1>Thread</h1>
            <Container className='mt-5'>
                <Row xs={1} md={3} className='g-3'>
                    <Col md={4}>
                        <Card className='mb-3 me-3' style={{ height: '395px' }}>
                            <Card.Header style={{ fontSize: '140px', textAlign: 'center', cursor: 'pointer' }} onClick={handleCreateThread}>+</Card.Header>
                            <Card.Body>
                                <Card.Title>Create a new thread</Card.Title>
                                <Card.Subtitle>Have a new Property to add?</Card.Subtitle>
                                <Card.Text style={{ height: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>Click the &quot;+&quot; to add new entry</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {
                        threads.map((thread, index) => (
                            <Col key={index} md={4} className='mb-4'>
                                <ThreadCard key={thread.id} thread={thread} onDelete={handleConfirmDeleteThread} userId={currentUserId} />
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </Container>
    )
}
