import React, { useState } from 'react'
import Countdown from 'react-countdown'
import ModalVideo from 'react-modal-video'
import './App.scss'

import { useVotes } from './hooks'
import { VoteModal } from './VoteModal'
import { PieChart } from 'react-minimal-pie-chart'
import { ReactComponent as WeightSvg } from './images/weight.svg'
import { ReactComponent as RulerSvg } from './images/ruler.svg'

const countdownRenderer = ({ days, hours, minutes, seconds }) => {
  return (
    <div className='text-center border-solid border-4 border-white p-4 m-8 max-w-md'>
      <p className='justify-center text-white text-2xl '>
        {days} jours {hours} heures <br />
        {minutes} minutes et {seconds} secondes
      </p>
    </div>
  )
}

const GENDERS = {
  boy: 'un garçon',
  girl: 'une fille',
}

const COLORS = {
  boy: 'blue',
  girl: 'pink',
}

const count = (collection, query) => {
  const key = Object.keys(query)[0]
  const value = Object.values(query)[0]
  const result = collection.filter((el) => el[key] === value)
  return result.length
}

function percentage(percent, total) {
  return ((100 * percent) / total).toFixed(2)
}

const revealDate = '2022-03-13T14:00:00'
const diffInMs = new Date(revealDate) - new Date()
const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
const VIDEO_BY_DAYS_LEFT = {
  0: 'NRcuGWxJYAw',
  1: 'qhK5NYlIMpQ',
  2: 'LRcXgsFAst4',
  3: 'pv5kBcwQGJ0',
  4: 'x-3-p4TA-h0',
  5: 'KvjHpQqzZ8Y',
  6: 'Zc_byAgx_UE',
  7: 'BkEGAvMVKgM',
  8: 'YVfL2GYiXaY',
  9: 'RQboc996ToQ',
  10: 't13FIUN0y8c',
  11: 'm0laK1zxE-0',
  12: 'Ib7lfurb3YE',
  13: 'ZyDS1UiJxpM',
  14: 'KMxplmpVC9g',
  15: '-R_6g6lGz3w',
}
const videoOfTheDay = VIDEO_BY_DAYS_LEFT[diffInDays]
const App = () => {
  const [countdownCompleted, setCountdownCompleted] = useState(false)
  const [voteModalVisible, setVoteModalVisible] = useState(false)
  const [videoModalVisible, setVideoModalVisible] = useState(false)
  const [submittingVote, setSubmittingVote] = useState(false)
  const [voteSubmitted, setVoteSubmitted] = useState(false)
  const { votes, createVote } = useVotes()
  const boyVotesCount = count(votes, { gender: 'boy' })
  const girlVotesCount = count(votes, { gender: 'girl' })
  const averageWeight =
    votes.reduce((n, { weight }) => n + weight, 0) / votes.length || 0
  const averageHeight =
    votes.reduce((n, { height }) => n + height, 0) / votes.length || 0
  const genderColor = COLORS[process.env.REACT_APP_SECRET_GENDER]
  return (
    <div
      className={`pyro grid justify-center ${
        diffInDays < 0 && genderColor
          ? `bg-${genderColor}-200`
          : 'bg-gradient-to-r from-blue-200 to-pink-200'
      } min-h-screen p-16 `}
    >
      {diffInDays >= 0 ? (
        <>
          <div className='text-center'>
            <div className='text-white text-4xl'>Fille ou garçon ?</div>
          </div>
          {countdownCompleted ? (
            <iframe
              className='absolute inset-0 w-full h-full m-0 p-0 overflow-hidden'
              title='secreIframe'
              allow='autoplay'
              frameBorder='0'
              seamless='seamless'
              src={process.env.REACT_APP_SECRET_URL}
            />
          ) : (
            <Countdown
              renderer={countdownRenderer}
              date={revealDate}
              onComplete={() => {
                setCountdownCompleted(true)
              }}
            />
          )}
          <div className='text-white text-center mb-4'>
            Si vous ne savez pas quoi faire en attendant. Vous pouvez :
            <ul className='leading-8'>
              <li
                className='cursor-pointer underline'
                onClick={() => setVideoModalVisible(true)}
              >
                Regarder la vidéo du jour
              </li>
              <li
                className='cursor-pointer underline'
                onClick={() => setVoteModalVisible(true)}
              >
                Faire vos pronostics
              </li>
              <li>
                <a
                  className='underline'
                  href='https://www.listedenaissance.fr/durant%20atkinson'
                  target='_blank'
                  rel='noreferrer'
                >
                  Jeter un coup d'oeil à notre Liste de naissance
                </a>
              </li>
            </ul>
            <div className='text-center mt-8  '>
              <h1 className='text-white text-4xl'> Vos pronostics :</h1>
            </div>
            {votes.length > 0 && (
              <div className='flex w-full justify-center mt-10'>
                <div className='w-40 sm:w-60'>
                  <PieChart
                    animate
                    labelStyle={{
                      fill: 'white',
                      fontSize: '40%',
                    }}
                    label={(props) => {
                      return props.dataEntry.title
                    }}
                    data={[
                      {
                        title:
                          girlVotesCount > 0 &&
                          `${percentage(girlVotesCount, votes.length)} %`,
                        value: girlVotesCount,
                        color: '#fed7e2',
                      },
                      {
                        title:
                          boyVotesCount &&
                          `${percentage(boyVotesCount, votes.length)} %`,
                        value: boyVotesCount,
                        color: '#bfdbfe',
                      },
                    ]}
                  />
                </div>
              </div>
            )}
          </div>
          <div className='flex items-center justify-center space-x-16'>
            <div className='text-center'>
              <div className='fill-white'>
                <WeightSvg className='w-20 h-20' />
              </div>
              <div className='text-white text-lg'>
                {averageWeight.toFixed(2)} kg
              </div>
            </div>
            <div className='text-center'>
              <div className='fill-white'>
                <RulerSvg className='w-20 h-20' />
              </div>
              <div className='text-white text-lg'>
                {averageHeight.toFixed(2)} cm
              </div>
            </div>
          </div>
          <VoteModal
            visible={voteModalVisible}
            setVisible={setVoteModalVisible}
            submitting={submittingVote}
            submitted={voteSubmitted}
            onSubmit={async ({
              firstName,
              lastName,
              babyGender,
              babyHeight,
              babyWeight,
            }) => {
              try {
                setSubmittingVote(true)
                await createVote({
                  firstName,
                  lastName,
                  babyGender,
                  babyHeight,
                  babyWeight,
                })
              } finally {
                setSubmittingVote(false)
                setVoteSubmitted(true)
              }
            }}
          />
          {videoOfTheDay && (
            <ModalVideo
              channel='youtube'
              autoplay
              isOpen={videoModalVisible}
              videoId={videoOfTheDay}
              onClose={() => setVideoModalVisible(false)}
            />
          )}
        </>
      ) : (
        <>
          <div className='before' />
          <div className='after' />
          <div className='flex items-center justify-center'>
            <div className='text-white text-4xl text-center'>
              C'est {GENDERS[process.env.REACT_APP_SECRET_GENDER]} !
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
