import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const CreateStudentForm = () => {
  const navigate = useNavigate();

  const [formData, setFormDate] = useState({
    student_name: "",
    batch: "",
    college: "",
    dsa: "",
    webd: "",
    reactScore: "",
  })

  const handleFieldChange = (e) => {
    setFormDate({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { student_name, reactScore, batch, college, dsa, webd } = formData
    let data = {
      name: student_name,
      react: reactScore,
      batch,
      college,
      dsa,
      webd,
    }

    axios.post("http://localhost:8080/students/create", data)
      .then(res => {
        console.log(res.data.message);
        navigate('/home')
      })
    console.log("Interview Form Data", data)
  }

  return (
    <>
      <div className="row ">
        <div className="col-12">
          <h1>Create Student Form</h1>
        </div>
        <div className="col-12">
          <div >
            <form>
              <div class="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Student Name</label>
                <input onChange={(e) => handleFieldChange(e)} name="student_name" value={formData.student_name} type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Batch</label>
                <input onChange={(e) => handleFieldChange(e)} name="batch" value={formData.batch} type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">College</label>
                <input onChange={(e) => handleFieldChange(e)} name="college" value={formData.college} type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">React Score</label>
                <input onChange={(e) => handleFieldChange(e)} name="reactScore" value={formData.reactScore} type="number" className="form-control" />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">DSA Score</label>
                <input onChange={(e) => handleFieldChange(e)} name="dsa" value={formData.dsa} type="number" className="form-control" />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Web Dev Score</label>
                <input onChange={(e) => handleFieldChange(e)} name="webd" value={formData.webd} type="number" className="form-control" />
              </div>
              <div className="form-group">
                <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Create Student</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateStudentForm