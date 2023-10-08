import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

const InterviewForm = () => {
  const navigate = useNavigate();

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
        navigate('/create-interview')
      })
    console.log("Interview Form Data", data)
  }

  return (
    <>
      <div className="row mx-0 d-flex justify-content-center">
        <div className="col-6">
          <div className="mb-5">
            <div>
              <Link to="/home"><button className="btn btn-secondary">GO to Main</button></Link>
            </div>
            <h1> Interview Main Page </h1>
          </div>
          <form className="p-2 border rounded">
            <div class="form-group">
              <label for="exampleFormControlFile1">Company Name</label>
              <input type="text" name="company_name" value={company_name} onChange={(e) => handleCmpNameChange(e)} className="form-control" id="exampleFormControltext1" />
            </div>
            <div class="form-group mt-4">
              <label for="exampleFormControltext1">Date</label>
              <input type="date" name="date" value={date} onChange={(e) => handleDateChange(e)} className="form-control" id="exampleFormControltext1" />
            </div>
            <div class="form-group my-5 text-center">
              <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Create Interview</button>
            </div>
          </form>
        </div>
      </div>
      <div className="row mx-0 my-5">
        <div className="col-12">
          <h3>List of Previous Interviews</h3>
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
        </div>
      </div>
    </>
  )
}

export default InterviewForm