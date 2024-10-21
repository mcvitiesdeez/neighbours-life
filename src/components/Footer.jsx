import { Container, Row, Col, Stack, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <Container>
            <Row>
                <Col style={{ display: 'grid', placeItems: 'center' }}>
                    <img src="/src/assets/Neighbour_Brand.webp" alt="Neighbours Logo" width="300px" height="300px" />
                </Col>
                <Col>
                    <Stack direction="horizontal" gap={2} style={{ placeItems: 'center' }}>
                        <a href="https://www.linkedin.com/in/teng-tjun-ong-41881188/" style={{ margin: '0px 10px', fontSize: '36px' }}><i className="bi bi-linkedin"></i></a>
                        <a href="https://github.com/mcvitiesdeez" style={{ margin: '0px 10px', fontSize: '36px' }}><i className="bi bi-github"></i></a>
                        <a href="https://www.tjunnn.com" style={{ margin: '0px 10px', fontSize: '36px' }}><i className="bi bi-globe"></i></a>
                    </Stack>
                </Col>
            </Row>
        </Container>

    )
}
