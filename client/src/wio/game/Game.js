import React, { Fragment, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Title from '../../common/Title'
import Sentence from './Sentence'

const Game = () => {
  const { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    const getAPI = async () => {
      try {
        const dataAPI = await fetch(`http://localhost:8080/api/wio/${id}`)
        const jsonData = await dataAPI.json()
        setData(jsonData)
        console.log(jsonData)
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
    data.sentences[whichSentence - 1].complete = true

    // do the complete checking
    let allComplete = []
    data.sentences.forEach(each => {
      allComplete = each.complete
    })

    // if all sentences have been sorted, show modal
    setShowModal(allComplete)
  }

  return (
    <Fragment>
      {loading ? (
        <div>Loading</div>
      ) : (
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
      )}
    </Fragment>
  )
}

export default Game
