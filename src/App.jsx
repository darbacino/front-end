import { default as LecturerForm } from './pages/lecturerForm/lecturer'
import { QuestionsForm } from './pages/questionsForm/questions'
import { Dashboard } from './pages/dashboard/dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PollForm from './pages/pollForm/poll'
import SubjectForm from './pages/subjectForm/subject'
import AnswerForm from './pages/answerForm/answer'
import { default as Navbar } from './components/navBar/navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/lecturer" element={<LecturerForm />} />
        <Route path="/questions" element={<QuestionsForm />} />
        <Route path="/poll" element={<PollForm />} />
        <Route path="/answer" element={<AnswerForm />} />
        <Route path="/subject" element={<SubjectForm />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
