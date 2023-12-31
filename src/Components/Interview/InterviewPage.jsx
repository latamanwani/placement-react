import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const InterviewPage = () => {
  const { id } = useParams()
  const navigate = useNavigate();

  const [interview, setInterviewDetails] = useState({})
  const [selectedStudentId, setSelectedStudentId] = useState()

  useEffect(() => {
    axios.get(`http://localhost:8080/interview_detail/${id}`)
      .then(res => {
        console.log(res.data);
        setInterviewDetails(res.data)
      })
  }, [])

  const handleSelect = (e) => {
    console.log(e.target.value)
    setSelectedStudentId(e.target.value)
  }

  const handleAddStudent = (e) => {
    e.preventDefault()
    const data = {
      studentId: selectedStudentId,
      interviewId: id,
    }
    axios.post(`http://localhost:8080/interview/addStudent`, data)
      .then(res => {
        if (res.data.success) {
          console.log(res.data);
          navigate('/home')
        }
      })
  }

  const handleStudentPlaced = (studentId) => {
    const data = {
      studentId: studentId,
      interviewId: id,
    }
    axios.post(`http://localhost:8080/students/placed`, data)
      .then(res => {
        if (res.data.success) {
          console.log(res.data);
          navigate('/home')
        }
      })
  }

  return (
    <>
      <h1>Interview Details: {interview.company_name}</h1>
      <div className="row mx-0">
        <div className="col-12">
          <select onChange={(e) => handleSelect(e)} class="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            {
              interview.student_detail && interview.student_detail.map((student, i) => (
                <option key={student._id} name="stdName" value={student._id}>{student.name}</option>
              ))
            }
          </select>
          <button onClick={(e) => handleAddStudent(e)} className="btn btn-sm btn-success">Add Student</button>
        </div>
      </div>
      <div className="row mx-0 my-5">
        <div className="col-12">
          <div id="student-table">
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Student Name</th>
                  <th scope='col'>Placement Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  interview.student_detail && interview.student_detail.map((student) => (
                    <tr key={student._id}>
                      <td scope='row'>{student.name}</td>
                      <td scope='row'> {
                        student.placed ?
                          <td> Placed in {student.student_placed}</td> :
                          <td><button onClick={() => handleStudentPlaced(student._id)} className="btn btn-primary">Placed {`${student.name} in ${interview.company_name}`}</button></td>
                      }</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default InterviewPage