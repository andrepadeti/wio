import React, { Fragment, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { cloneDeep } from 'lodash'
import {
  Comment,
  ExerciseContainer,
  SentenceContainer,
  Word,
  Check,
} from './SentenceComponents'

const Sentence = ({
  id,
  comment,
  sentenceInOrder,
  sentenceShuffled,
  onCompletion,
}) => {
  // prepare list to be used by SortableJS
  let preparedList = sentenceShuffled.map((word, index) => ({
    id: `${id}${index}`,
    name: word,
    class: 'sortable',
  }))

  const [complete, setComplete] = useState(false) // for the tick when sentence is complete
  const [list, setList] = useState(preparedList) // for the ReactSortable component

  let currentCorrectWord = 0
  const handleOnEnd = () => {
    let newList = cloneDeep(list)
    while (
      list[currentCorrectWord].name === sentenceInOrder[currentCorrectWord]
    ) {
      newList[currentCorrectWord].class = 'notSortable'
      currentCorrectWord++

      if (currentCorrectWord === sentenceInOrder.length) {
        onCompletion(id) // let parent component know one of its children is complete
        setComplete(true) // show tick
        let sentenceCompleteAudio = new Audio('/bell.wav')
        sentenceCompleteAudio.play()
        break
      }
    }
    setList(newList)
  }

  return (
    <Fragment>
      <Comment>
        {id + 1} {comment}
      </Comment>
      <ExerciseContainer className="shadow">
        <SentenceContainer>
          <ReactSortable
            // filter=".notSortable"
            draggable=".sortable"
            list={list}
            setList={setList}
            animation={150}
            onEnd={handleOnEnd}
          >
            {list.map(item => (
              <Word className={item.class} key={item.id}>
                {item.name}
              </Word>
            ))}
          </ReactSortable>
        </SentenceContainer>
        <Check>
          <img className="checkIcon" alt="" src={complete ? '/tick.png' : ''} />
        </Check>
      </ExerciseContainer>
    </Fragment>
  )
}

export default Sentence
