import { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import './styles.css'

const LecturerForm = () => {
  const [selectedId, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subjects, setSubjects] = useState([])
  const [lecturer, setLecturer] = useState(null)
  const [options, setOptions] = useState([])
  const [allLecturers, setAllLecturers] = useState([])

  const subjectFromURL = async url => {
    const res = await axios('http://localhost:8080/polls-1.0-SNAPSHOT/' + url, {
      method: 'GET',
    })
    console.log(res.data)
    return res.data.name
  }

  useEffect(() => {
    axios('http://localhost:8080/polls-1.0-SNAPSHOT/api/subjects', {
      method: 'GET',
    }).then(res =>
      setOptions(
        res.data.map(opt => {
          return { value: opt.id, label: opt.name }
        })
      )
    )
  }, [])

  const handleShowAll = () => {
    axios('http://localhost:8080/polls-1.0-SNAPSHOT/api/lecturers', {
      method: 'GET',
    }).then(res => setAllLecturers(res.data))
  }
  const handleShowById = () => {
    axios(
      `http://localhost:8080/polls-1.0-SNAPSHOT/api/lecturers/${selectedId}`,
      {
        method: 'GET',
      }
    ).then(res => setLecturer(res.data))
  }
  const handleClick = () => {
    axios('http://localhost:8080/polls-1.0-SNAPSHOT/api/lecturers', {
      method: 'POST',

      data: {
        name: name,
        email: email,
        subjects: subjects.map(sub => {
          return sub.value
        }),
      },
    })
  }

  return (
    <>
      <div className="container1">
        <div className="row">
          <div className="column">
            <label>Show All Data from Lecturer </label>

            <button className="button" onClick={handleShowAll}>
              Show
            </button>
            <div>
              {allLecturers.map(lec => {
                return (
                  <p key={lec.id}>
                    {lec?.id +
                      ' ' +
                      lec?.name +
                      ' ' +
                      lec?.email +
                      ' [' +
                      lec?.subjects.map(sub => {
                        return options.find(opt => {
                          return opt.value.toString() === sub.path.slice(13)
                        }).label
                      }) +
                      ']'}
                  </p>
                )
              })}
            </div>
          </div>
          <div className="column">
            <label>Add new lecturer</label>

            <label>Imie </label>
            <input
              className="formElement"
              onChange={event => setName(event.target.value)}
              value={name}
              type="text"
              placeholder="Name"
            ></input>

            <label>Email </label>
            <input
              className="formElement"
              onChange={event => setEmail(event.target.value)}
              value={email}
              type="text"
              placeholder="Email"
            ></input>
            <button className="button" onClick={handleClick}>
              ADD
            </button>

            <label>Subjects </label>
            <Select
              className="formElement"
              isMulti
              options={options}
              onChange={setSubjects}
              placeholder="Subjects"
            ></Select>
          </div>
          <div className="column">
            <label>Show Selected Data from Lecturer </label>

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
              {lecturer &&
                lecturer?.id +
                  ' ' +
                  lecturer?.name +
                  ' ' +
                  lecturer?.email +
                  ' [' +
                  lecturer?.subjects.map(sub => {
                    return options.find(opt => {
                      return opt.value.toString() === sub.path.slice(13)
                    }).label
                  }) +
                  ']'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LecturerForm
