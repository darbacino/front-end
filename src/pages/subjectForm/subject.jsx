import { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import './styles.css'

export const SubjectForm = () => {
  const [selectedId, setId] = useState('')
  const [name, setName] = useState('')
  const [allSubjects, setallSubjects] = useState([])
  const [subject, setSubject] = useState(null)
  const handleClick = () => {
    axios('http://localhost:8080/polls-1.0-SNAPSHOT/api/subjects', {
      method: 'POST',

      data: { name: name },
    })
  }

  const handleShowAll = () => {
    axios('http://localhost:8080/polls-1.0-SNAPSHOT/api/subjects', {
      method: 'GET',
    })
      .then(res => setallSubjects(res.data))
      .then(console.log(allSubjects))
  }

  const handleShowById = () => {
    axios(
      `http://localhost:8080/polls-1.0-SNAPSHOT/api/subjects/${selectedId}`,
      {
        method: 'GET',
      }
    ).then(res => setSubject(res.data))
  }

  return (
    <>
      <div className="container1">
        <div className="row">
          <div className="column">
            <label>Show All Data from Subject </label>

            <button className="button" onClick={handleShowAll}>
              Show
            </button>
            <div className="">
              {allSubjects.map(sub => {
                return <p> {sub.id + ' ' + sub.name} </p>
              })}
            </div>
          </div>
          <div className="column">
            <label>Add New Subject</label>

            <label>Name </label>
            <input
              className="formElement"
              onChange={event => setName(event.target.value)}
              value={name}
              type="text"
              placeholder="Name"
            ></input>

            <button className="button" onClick={handleClick}>
              Add
            </button>
          </div>
          <div className="column">
            <label>Show Selected Data from Subject </label>

            <input
              className="formElement"
              onChange={event => setId(event.target.value)}
              value={selectedId}
              type="text"
              placeholder="ID"
            ></input>

            <button className="button" onClick={handleShowById}>
              Show
            </button>
            <div>{subject && subject?.id + ' ' + subject?.name}</div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SubjectForm
