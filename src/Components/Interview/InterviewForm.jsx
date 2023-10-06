import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

const InterviewForm = () => {
  const [company_name, setCmpName] = useState()
  const [date, setDate] = useState()
  const [interviews, setInterviewList] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/interview/")
      .then(res => {
        console.log(res.data.interviews);
        setInterviewList(res.data.interviews)
      })
  }, [])

  const handleCmpNameChange = (e) => {
    setCmpName(e.target.value)
  }
  const handleDateChange = (e) => {
    setDate(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      company_name,
      date,
    }

    axios.post("http://localhost:8080/interview/create", data)
      .then(res => {
        console.log(res.data.message);
      })
    console.log("Interview Form Data", data)
  }

  return (
    <>
      <div>
        <h1> Interview Main Page </h1>
        <div>
          <button><Link to="/">GO to Main</Link> </button>
        </div>

        <section>
          <div >
            <form>
              <div class="form-group">
                <label for="exampleFormControlFile1">Company Name</label>
                <input type="text" name="company_name" value={company_name} onChange={(e) => handleCmpNameChange(e)} class="form-control-text" id="exampleFormControltext1" />
              </div>
              <div class="form-group">
                <label for="exampleFormControltext1">Date</label>
                <input type="date" name="date" value={date} onChange={(e) => handleDateChange(e)} class="form-control-text" id="exampleFormControltext1" />
              </div>
              <div class="form-group">
                <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Create Student</button>
              </div>
            </form>
          </div>
          <h1>List of Previous Interviews</h1>
          <div className="row mx-0">
            <div className="col-12">
              {
                interviews && interviews.map((interview) => (
                  <div key={interview._id} className="row mx-0 border">
                    <div className="col-4 p-2">{interview.company_name}</div>
                    <div className="col-6 p-2">{interview.date}</div>
                    <div className="col-2 p-2"><Link to={`/interview/${interview._id}`}><button className="btn btn-sm btn-secondary">View</button></Link></div>
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default InterviewForm