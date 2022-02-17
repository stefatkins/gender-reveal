import { useState, useEffect } from 'react'
import { collection, setDoc, onSnapshot, doc, query } from 'firebase/firestore'
import { db } from './firebase.js'

const isValid = ({
  firstName,
  lastName,
  babyGender,
  babyHeight,
  babyWeight,
}) => {
  return [firstName, lastName, babyGender, babyHeight, babyWeight].every(
    (attribute) => !!attribute
  )
}

const createVote = async (vote) => {
  if (!isValid(vote)) throw new Error(`Missing argument.`)

  const { firstName, lastName, babyGender, babyHeight, babyWeight } = vote
  const documentId = [
    firstName.toLowerCase().trim(),
    lastName.toLowerCase().trim(),
  ].join('-')
  await setDoc(doc(collection(db, 'votes'), documentId), {
    gender: babyGender,
    height: babyHeight,
    weight: babyWeight,
    firstName: firstName,
    lastName: lastName,
  })
}

export const useVotes = () => {
  const [votes, setVotes] = useState([])
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'votes')),
      (querySnapshot) => {
        setVotes(
          querySnapshot.docs.map((vote) => ({
            id: vote.id,
            ...vote.data(),
          }))
        )
      }
    )
    return () => unsubscribe()
  }, [])

  return { createVote, votes }
}
