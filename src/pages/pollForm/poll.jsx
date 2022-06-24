import { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import './styles.css'
//private String name;
//private String description;
//private Long lecturer;
//private Long subject;
export const PollForm = () => {
  const [selectedId, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [options, setOptions] = useState([])
  const [optionsLec, setOptionsLec] = useState([])

  const [optionsSub, setOptionsSub] = useState([])
  const [error, setError] = useState('')

  const [subject, setSubject] = useState(null)
  const [lecturer, setLecturer] = useState(null)

  const [allPolls, setAllPolls] = useState([])
  const [poll, setPoll] = useState(null)

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
    axios('http://localhost:8080/polls-1.0-SNAPSHOT/api/lecturers', {
      method: 'GET',
    }).then(res =>
      setOptionsLec(
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
    console.log(allPolls)
    console.log(options)
    axios('http://localhost:8080/polls-1.0-SNAPSHOT/api/polls', {
      method: 'GET',
    }).then(res => setAllPolls(res.data))
  }
  const handleSend = () => {
    if (name && description && lecturer && subject) {
      axios('http://localhost:8080/polls-1.0-SNAPSHOT/api/polls', {
        method: 'POST',
        data: {
          name: name,
          description: description,
          lecturer: lecturer.value,
          subject: subject.value,
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
        `http://localhost:8080/polls-1.0-SNAPSHOT/api/polls/${selectedId}`,
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
            <label>Show All Data from Poll </label>

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
                        optionsSub.find(opt => {
                          return (
                            opt.value.toString() === poll.subject.path.slice(13)
                          )
                        })?.label +
                        ' ' +
                        optionsLec.find(lec => {
                          return (
                            lec.value.toString() ===
                            poll.lecturer.path.slice(14)
                          )
                        })?.label +
                        ']'}
                    </p>
                  )
                })}
            </div>
          </div>
          <div className="column">
            <label>Add New Poll</label>

            <label>Name </label>
            <input
              className="formElement"
              onChange={event => setName(event.target.value)}
              value={name}
              type="text"
              placeholder="Name"
            ></input>

            <label>Description </label>
            <input
              className="formElement"
              onChange={event => setDescription(event.target.value)}
              value={description}
              type="text"
              placeholder="Email"
            ></input>
            <button className="button" onClick={handleSend}>
              ADD
            </button>
            <p>{error}</p>
            <label>Lecturer </label>

            <Select
              className="formElement"
              options={optionsLec}
              onChange={setLecturer}
              placeholder="Lecturer"
            ></Select>
            <label>Subjects </label>

            <Select
              className="formElement"
              options={options}
              onChange={setSubject}
              placeholder="Subjects"
            ></Select>
          </div>
          <div className="column">
            <label>Show Selected Data from Poll </label>

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
                  optionsSub.find(opt => {
                    return opt.value.toString() === poll.subject.path.slice(13)
                  })?.label +
                  ' ' +
                  optionsLec.find(lec => {
                    return lec.value.toString() === poll.lecturer.path.slice(14)
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
