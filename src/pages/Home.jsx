import { Carousel, Container } from 'react-bootstrap'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const BASE_URL = import.meta.env.VITE_BASE_URL
        const fetchImages = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/images`)
                setImages(res.data)
            } catch (error) {
                console.error("Error: ", error);
            }
        }
        fetchImages()
    }, [])

    return (
        <Container>
            <h1>Home</h1>
            {/* CarouselComponentDoneLater */}
            <Carousel>
                {
                    images.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img src={image.imageurl} className="d-block w-100" style={{ borderRadius: '15px', border: '5px solid white', width: '100%', height: 'auto', objectFit: 'cover', maxHeight: '600px' }} />
                        </Carousel.Item>
                    ))
                }
            </Carousel>
            <br />
            <p>Neighbours is a social platform where you can chat about property details, get help with buying a unit, and discuss facility issues. Our simple threads and cards format makes it easy to connect and share information with others in the community. Join us to get advice and support as you navigate the world of real estate!</p>
        </Container>
    )
}
