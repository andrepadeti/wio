import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const WioModal = props => {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Well done!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You've put all sentences in order:</p>
        <p>
          {props.sentences.map((each, index) => (
            <span key={index}>{each.text}<br/></span>
          ))}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.handleOnClickBack}>
          Back to Games
        </Button>
        <Button variant="primary" onClick={props.handleOnClickPlayAgain}>
          Play Again
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WioModal
