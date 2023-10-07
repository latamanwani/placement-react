import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const InterviewPage = () => {
  const { id } = useParams()
  const [interview, setInterviewDetails] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:8080/interview_detail/${id}`)
      .then(res => {
        console.log(res.data);
        setInterviewDetails(res.data)
      })
  }, [])

  const handleSelect = (e) => {
    console.log(e.target.value)
  }
  return (
    <>
      <h1>Interview Details Page</h1>
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
        </div>
      </div>
    </>
  )
}

export default InterviewPage