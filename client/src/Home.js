import React, { Fragment, useEffect, useState } from 'react'
import { Button, Container, Jumbotron } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LinkContainer } from 'react-router-bootstrap'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState([])

  useEffect(() => {
    const getAPI = async () => {
      try {
        const data = await fetch('http://localhost:8080/api')
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
      {loading ? (
        <div>Loading</div>
      ) : (
        <Container>
          <Jumbotron className="mt-5 text-center">
            <h1 className="display-4">
              <FontAwesomeIcon icon="graduation-cap" /> Language Games
            </h1>
            <p className="lead">
              Welcome to Language Games! Here you will find a collection of
              games to play with your students.
            </p>
            <hr className="my-4" />
            <p>This is just the beginning. Here's the available game:</p>
            {games.map((game, index) => (
              <LinkContainer key={index} to={game.url}>
                <Button variant="primary">
                  {game.game}
                </Button>
              </LinkContainer>
            ))}
          </Jumbotron>
        </Container>
      )}
    </Fragment>
  )
}

export default Home
