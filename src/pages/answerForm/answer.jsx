import { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import './styles.css'

export const PollForm = () => {
  const [selectedId, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [options, setOptions] = useState([])
  const [optionsLec, setOptionsLec] = useState([])

  const [optionsSub, setOptionsSub] = useState([])
  const [error, setError] = useState('')
  const [question, setQuestion] = useState(null)
  const [count, setCount] = useState(0)

  const [subject, setSubject] = useState(null)
  const [lecturer, setLecturer] = useState(null)
  const [optionsPoll, setOptionsPoll] = useState([])
  const [allPolls, setAllPolls] = useState([])
  const [onePoll, setOnePoll] = useState(null)
  const [poll, setPoll] = useState(null)

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
    setCount(0)
  }, [poll])

  useEffect(() => {
    setOptions(
      optionsLec.filter(que => {
        return onePoll?.value.toString() === que.poll.toString()
      })
    )
  }, [onePoll])

  useEffect(() => {
    setName('')
    setDescription('')
    if (options && options.length > 0) setQuestion(options[count])
    else {
      setQuestion(null)
    }
  }, [options])

  useEffect(() => {
    axios('http://localhost:8080/polls-1.0-SNAPSHOT/api/questions', {
      method: 'GET',
    }).then(res =>
      setOptionsLec(
        res.data.map(opt => {
          return {
            value: opt.id,
            label: opt.question,
            poll: opt.poll.path.slice(10),
          }
        })
      )
    )
    axios('http://localhost:8080/polls-1.0-SNAPSHOT/api/subjects', {
      method: 'GET',
    }).then(res =>
      setOptionsSub(
        res.data.map(opt => {
          return {
            value: opt.id,
            label: opt.name,
          }
        })
      )
    )
  }, [])

  const handleShowAll = () => {
    axios('http://localhost:8080/polls-1.0-SNAPSHOT/api/answers', {
      method: 'GET',
    }).then(res => setAllPolls(res.data))
  }
  const handleNext = () => {
    if (options && options.length > count) {
      setQuestion(options[count + 1])
      setCount(count + 1)
    } else if (options && options.length === count) {
      setCount(0)
      setQuestion(options[0])
    }
    setName('')
    setDescription('')
  }
  const handleSend = () => {
    console.log(description)
    if (name && question) {
      axios('http://localhost:8080/polls-1.0-SNAPSHOT/api/answers', {
        method: 'POST',
        data: {
          name: name,
          description: '',
          question: question?.value,
        },
      })
      setName('')
      setDescription('')
      setError('')
    } else {
      setError('Please fill all the fields')
    }
  }

  const handleShowById = () => {
    if (selectedId)
      axios(
        `http://localhost:8080/polls-1.0-SNAPSHOT/api/answers/${selectedId}`,
        {
          method: 'GET',
        }
      ).then(res => setPoll(res.data))
  }

  return (
    <>
      <div className="container1">
        <div className="row">
          <div className="column">
            <label>Show All Data from Answers </label>

            <button className="button" onClick={handleShowAll}>
              Show
            </button>
            <div>
              {allPolls &&
                allPolls.map(poll => {
                  return (
                    <p key={poll.id}>
                      {poll?.id +
                        ' ' +
                        poll?.name +
                        ' ' +
                        poll?.description +
                        ' [' +
                        optionsLec.find(lec => {
                          return (
                            lec.value.toString() ===
                            poll.question.path.slice(14)
                          )
                        })?.label +
                        ']'}
                    </p>
                  )
                })}
            </div>
          </div>
          <div className="column">
            <label>Choose Poll </label>

            <Select
              className="formElement"
              options={optionsPoll}
              onChange={setOnePoll}
              placeholder="POLL"
            ></Select>

            <label>Answer the Question/s </label>
            <label></label>

            <label>Question </label>
            <p>{question?.label}</p>
            <label></label>

            <input
              className="formElement"
              onChange={event => setName(event.target.value)}
              value={name}
              type="text"
              placeholder="Answer"
              disabled={!question}
            ></input>
            <label></label>

            <div>
              <button className="button" onClick={handleSend}>
                Submit
              </button>
              <button className="button" onClick={handleNext}>
                Next
              </button>
            </div>
            <p>{error}</p>
          </div>
          <div className="column">
            <label>Show Selected Data from Answer </label>

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
              {poll &&
                poll?.id +
                  ' ' +
                  poll?.name +
                  ' ' +
                  poll?.description +
                  ' [' +
                  optionsLec.find(lec => {
                    return lec.value.toString() === poll.question.path.slice(14)
                  })?.label +
                  ']'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PollForm
