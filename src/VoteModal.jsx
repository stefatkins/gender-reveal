import React, { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { CheckCircle } from 'heroicons-react'

export const VoteModal = ({
  visible,
  setVisible,
  onSubmit,
  submitting,
  submitted,
}) => {
  const DECIMAL_REGEX = /^[+-]?\d*(?:[.]\d*)?$/
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [babyGender, setBabyGender] = useState(undefined)
  const [babyHeight, setBabyHeight] = useState('')
  const [babyWeight, setBabyWeight] = useState('')
  const MAX_BABY_WEIGHT = 10
  const MAX_BABY_HEIGHT = 100
  const submitDisabled =
    !firstName ||
    !lastName ||
    !babyGender ||
    !babyHeight ||
    !babyWeight ||
    babyWeight > MAX_BABY_WEIGHT ||
    babyHeight > MAX_BABY_HEIGHT ||
    submitting

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      {submitted ? (
        <div className='relative p-6 flex-auto'>
          <div className='flex flex-col items-center'>
            <CheckCircle className='fill-green-400 h-20 w-20' />
            <p className='text-gray-700 text-xl mt-4'>Merci !</p>
            <p className='text-gray-700 text-xl mt-4'>
              Tes pronostics ont bien été pris en compte.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className='flex items-start justify-between p-5 border-b border-solid border-blue-200 rounded-t'>
            <h3 className='text-3xl font-semibold'>Mon pronostic</h3>
          </div>
          {/*body*/}
          <div className='relative p-6 flex-auto'>
            <form className='w-full max-w-lg'>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                    Mon prénom
                  </label>
                  <input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className='w-full md:w-1/2 px-3'>
                  <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                    Mon nom
                  </label>
                  <input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-last-name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <hr className='mb-6' />
              <div className='flex flex-wrap -mx-3 mb-6 px-3 items-center'>
                <label className='block uppercase text-gray-700 text-xs font-bold'>
                  Je pense que le bébé sera un/une :{' '}
                </label>
                <div className='form-check form-check-inline ml-8 mr-8'>
                  <input
                    className='form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-200 checked:border-blue-200 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                    type='radio'
                    id='boy'
                    name='babyGender'
                    checked={babyGender === 'boy'}
                    onChange={() => setBabyGender('boy')}
                  />
                  <label
                    className='cursor-pointer form-check-label inline-block text-gray-800'
                    htmlFor='boy'
                  >
                    Garçon
                  </label>
                </div>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-pink-200 checked:border-pink-200 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                    type='radio'
                    name='gender'
                    id='girl'
                    checked={babyGender === 'girl'}
                    onChange={() => setBabyGender('girl')}
                  />
                  <label
                    className='cursor-pointer form-check-label inline-block text-gray-800'
                    htmlFor='girl'
                  >
                    Fille
                  </label>
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                    Taille (en cm)
                  </label>
                  <input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                    value={babyHeight}
                    onChange={(e) => {
                      if (DECIMAL_REGEX.test(e.target.value)) {
                        setBabyHeight(e.target.value)
                      }
                    }}
                  />
                  {babyHeight > MAX_BABY_HEIGHT && (
                    <p class='text-red-500 text-xs italic'>
                      Un peu gros tu ne trouves pas ?
                    </p>
                  )}
                </div>
                <div className='w-full md:w-1/2 px-3'>
                  <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                    Poids (en kg)
                  </label>
                  <input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    value={babyWeight}
                    onChange={(e) => {
                      if (DECIMAL_REGEX.test(e.target.value)) {
                        setBabyWeight(e.target.value)
                      }
                    }}
                  />
                  {babyWeight > MAX_BABY_WEIGHT && (
                    <p class='text-red-500 text-xs italic'>
                      Un peu lourd tu ne trouves pas ?
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
          {/*footer*/}
          <div className='flex items-center justify-end p-6 border-t border-solid border-blue-200 rounded-b'>
            <button
              className='text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
              type='button'
              onClick={() => setVisible(false)}
            >
              Annuler
            </button>
            <button
              className='bg-blue-600 text-white active:bg-blue-200 disabled:bg-gray-200 font-bold uppercase text-sm px-6 py-3 rounded shadow disabled:shadow-none hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
              type='button'
              disabled={submitDisabled}
              onClick={() => {
                onSubmit({
                  firstName,
                  lastName,
                  babyGender,
                  babyHeight: Number(babyHeight),
                  babyWeight: Number(babyWeight),
                })
              }}
            >
              {submitting ? (
                <div className='flex'>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Validation...
                </div>
              ) : (
                'Valider'
              )}
            </button>
          </div>
        </>
      )}
    </Modal>
  )
}
