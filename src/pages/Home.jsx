import { Container } from 'react-bootstrap'
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
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="true">
                <div className="carousel-inner">
                    {
                        images.map((image, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                <img src={image.imageurl} className="d-block w-100" style={{ borderRadius: '15px', border: '5px solid white' }} />
                            </div>
                        ))
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </Container>
    )
}
