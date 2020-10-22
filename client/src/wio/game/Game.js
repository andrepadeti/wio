import React, { Fragment, useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
import { Container } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom'
import Title from '../../common/Title'
import Sentence from './Sentence'
import Modal from './Modal'

const Game = () => {
  const { id } = useParams()
  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const getAPI = async () => {
      try {
        // const dataAPI = await fetch(`http://localhost:8080/api/wio/${id}`)
        const dataAPI = await fetch(`/api/wio/${id}`)
        const jsonData = await dataAPI.json()
        setData(jsonData)
        setLoading(false)
      } catch (error) {
        alert('Could not fetch')
      }
    }
    getAPI()
  }, [id])

  // checks whether all sentences have been sorted
  const handleCompletion = whichSentence => {
    // changes status of the current correct sentence
    let newData = cloneDeep(data)
    // console.log(newData.sentences[whichSentence])
    newData.sentences[whichSentence].complete = true

    // do the complete checking
    let allComplete = false
    newData.sentences.forEach(each => {
      allComplete = each.complete
    })

    // if all sentences have been sorted, show modal
    if (allComplete) {
      // alert('All Complete')
      setShowModal(true)
    }
    setData(newData)
  }

  /*
   * Modal methods
   */
  const handleOnHideModal = () => {
    setShowModal(false)
  }

  const handleOnClickBack = () => {
    history.push('/wio')
  }

  const handleOnClickPlayAgain = () => {
    history.go(0)
  }
  /*
   * End of modal methods
   */

  return (
    <Fragment>
      {loading ? (
        <div>Loading</div>
      ) : (
        <Fragment>
          <Modal
            show={showModal}
            onHide={handleOnHideModal}
            handleOnClickBack={handleOnClickBack}
            handleOnClickPlayAgain={handleOnClickPlayAgain}
            sentences={data.sentences}
          />
          <Container>
            <Title main={data.title.main} subtitle={data.title.subtitle} />
            {data.sentences.map(each => (
              <Sentence
                key={each.id}
                id={each.id}
                comment={each.comment}
                sentenceInOrder={each.sentenceInOrder}
                sentenceShuffled={each.sentenceShuffled}
                onCompletion={handleCompletion}
              />
            ))}
          </Container>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Game
