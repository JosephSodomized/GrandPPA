import React, { Component } from 'react';
import styled from 'styled-components'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import '../style/css/Home.css'
import logo from '../style/img/logo.png'; 

class Home extends Component {
    render() {
       
        const Header = styled.h2`
            color: black;
            font-style: italic;
        `
      

        return (
            <div>
                    <Container className="text-center">
                    <img className="image p-3" src={logo} alt="Logo"/>
                    <Card className="p-3">
                    <Card.Header>
                    <Row>
                        <Col>
                            <Header>
                                Witam w naszej aplikacji dla seniorów
                            </Header>
                        </Col>
                    </Row>
                    </Card.Header>
                    <Row className="pt-2">
                        <Col>
                            <Link to="/meds">
                            <Button variant="info" size="lg" block>Medicine<br/>
                            <i class="fas fa-capsules fa-2x pt-2"></i>
                            </Button>
                            </Link>
                        </Col>
                        <Col>
                            <Button variant="warning" size="lg" block>Help me!<br/>
                            <i class="fas fa-ambulance fa-2x pt-2"></i>
                            </Button>
                        </Col>
                    </Row>
                    <Row className="pt-4">
                        <Col>
                        <Button variant="primary" size="lg" block>Find me<br/>
                        <i class="fas fa-map-marker-alt fa-2x pt-2"></i>
                        </Button>
                        </Col>
                        <Col>
                        <Button variant="success" size="lg" block>News<br/>
                        <i class="far fa-newspaper fa-2x"></i>
                        </Button>  
                        </Col>
                    </Row>
                    </Card>
                </Container>
            </div>

        )
    }
}

export default Home;