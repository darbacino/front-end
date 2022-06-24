import { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import './styles.css'

export const QuestionsForm = () => {
  const [selectedId, setId] = useState('')
  const [questionName, setQuestionName] = useState('')
  const [options, setOptions] = useState([])
  const [optionsPoll, setOptionsPoll] = useState([])

  const [error, setError] = useState('')

  const [lecturer, setLecturer] = useState(null)

  const [allQuestions, setAllQuestions] = useState([])
  const [question, setQuestion] = useState(null)

  useEffect(() => {
    axios('http://localhost:8080/polls-1.0-SNAPSHOT/api/subjects', {
      method: 'GET',
    }).then(res =>
      setOptions(
        res.data
          .filter(sub => {
            return lecturer?.subjects?.includes(sub.id.toString())
          })
          .map(res => {
            return { value: res.id, label: res.name }
          })
      )
    )
  }, [lecturer])

  useEffect(() => {
    axios('http://localhost:8080/polls-1.0-SNAPSHOT/api/polls', {
      method: 'GET',
    }).then(res =>
      setOptionsPoll(
        res.data.map(opt => {
          return {
            value: opt.id,
            label: opt.name,
            subjects: opt.subjects?.map(sub => {
              return sub.path.slice(13)
            }),
          }
        })
      )
    )
  }, [])

  const handleShowAll = () => {
    console.log(allQuestions)
    console.log(options)
    axios('http://localhost:8080/polls-1.0-SNAPSHOT/api/questions', {
      method: 'GET',
    }).then(res => setAllQuestions(res.data))
  }
  const handleSend = () => {
    if (questionName && lecturer) {
      axios('http://localhost:8080/polls-1.0-SNAPSHOT/api/questions', {
        method: 'POST',
        data: {
          question: questionName,
          poll: lecturer.value,
        },
      })
      setError('')
    } else {
      setError('Please fill all the fields')
    }
  }
  const handleShowById = () => {
    if (selectedId)
      axios(
        `http://localhost:8080/polls-1.0-SNAPSHOT/api/questions/${selectedId}`,
        {
          method: 'GET',
        }
      ).then(res => setQuestion(res.data))
  }

  return (
    <>
      <div className="container1">
        <div className="row">
          <div className="column">
            <label>Show All Data from Questions </label>

            <button className="button" onClick={handleShowAll}>
              Show
            </button>
            <div>
              {allQuestions &&
                allQuestions?.map(qe => {
                  return (
                    <p key={qe.id}>
                      {qe?.id +
                        ', ' +
                        qe?.question +
                        ' ' +
                        ' [' +
                        ' ' +
                        optionsPoll.find(lec => {
                          return (
                            lec.value.toString() === qe?.poll.path.slice(10)
                          )
                        })?.label +
                        ' ' +
                        qe?.poll.path.slice(10) +
                        ' ' +
                        ']'}
                    </p>
                  )
                })}
            </div>
          </div>
          <div className="column">
            <label>Add New Question</label>

            <label>Question </label>
            <input
              className="formElement"
              onChange={event => setQuestionName(event.target.value)}
              value={questionName}
              type="text"
              placeholder="Questions"
            ></input>

            <button className="button" onClick={handleSend}>
              ADD
            </button>
            <p>{error}</p>
            <label>Choose Poll </label>

            <Select
              className="formElement"
              options={optionsPoll}
              onChange={setLecturer}
              placeholder="POLL"
            ></Select>
          </div>
          <div className="column">
            <label>Show Selected Data from Questions </label>

            <button className="button" onClick={handleShowById}>
              Show
            </button>
            <input
              className="formElement"
              onChange={event => setId(event.target.value)}
              value={selectedId}
              type="text"
              placeholder="ID"
            ></input>
            <div>
              {question &&
                question?.id +
                  ' ' +
                  question?.question +
                  ' ' +
                  ' [' +
                  ' ' +
                  optionsPoll.find(lec => {
                    return (
                      lec.value.toString() === question?.poll.path.slice(10)
                    )
                  })?.label +
                  ' ' +
                  question?.poll.path.slice(10) +
                  ' ' +
                  ']'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default QuestionsForm
