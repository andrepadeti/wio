import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Title from '../common/Title'

const WioIndex = () => {
  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState([])

  useEffect(() => {
    const getAPI = async () => {
      try {
        // const data = await fetch('http://localhost:8080/api/wio')
        const data = await fetch('/api/wio')
        const jsonData = await data.json()
        setLoading(false)
        setGames(jsonData)
      } catch (error) {
        alert('Could not fetch')
      }
    }
    getAPI()
  }, [])

  return (
    <Fragment>
      <Title main='Words in Order' subtitle='Index of Activities' />
      {loading ? (
        <div>Loading</div>
      ) : (
        <Container fluid='sm'>
          {games.map((game, index) => (
            <Row key={index}>
              <Col></Col>
              <Col sm={8}>
                <LinkContainer to={`/wio/${game._id}`}>
                  <Button
                    variant='primary'
                    className='mb-3 p-3 mx-auto shadow'
                    block
                  >
                    {game.description}
                  </Button>
                </LinkContainer>
              </Col>
              <Col></Col>
            </Row>
          ))}
        </Container>
      )}
    </Fragment>
  )
}

export default WioIndex
