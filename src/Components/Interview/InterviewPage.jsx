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

  return (
    <>
      <h1>Interview Details Page</h1>
    </>
  )
}

export default InterviewPage