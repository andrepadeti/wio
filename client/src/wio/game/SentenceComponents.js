import styled from 'styled-components'

export const Comment = styled.span`
  background: #f4f4f4;
  color: #666;
  // font-size: 0.7rem;
  font-family: monospace;
  border: 1px solid #ddd;
  border-left: 3px solid #0275d8;
  page-break-inside: avoid;
  max-width: 100%;
  overflow: auto;
  word-wrap: break-word;
  padding: 0.5em 1.5em;
  margin-bottom: 1em;
`

export const ExerciseContainer = styled.div`
  background-color: #daf9f7;
  border-radius: 5px;
  margin-top: 1.5rem;
  margin-bottom: 3rem;
  /* grid container properties */
  display: grid;
  grid-template-columns: 11fr 1fr;
  grid-template-rows: 1;
  grid-template-areas: 'sentence check';
`

export const SentenceContainer = styled.div`
  grid-area: sentence;
  padding: 1rem;
  /* this item/fraction of the grid is a flexbox itself */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`

export const Word = styled.span`
  font-size: 1.1em;
  margin: 5px 3px;
  padding: 3px 10px;
  border: thin solid black;
  border-radius: 5px;

  &.sortable {
    cursor: move;
    background-color: #adf0ed;
  }

  &.notSortable {
    cursor: not-allowed;
    background-color: #48df73;
  }
`

export const Check = styled.div`
  grid-area: check;
  place-self: center center; /* shortcut for align-self (inline axis) and justify-self (block axis) */
`
