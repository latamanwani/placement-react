import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import exportFromJSON from 'export-from-json'

const Home = () => {

  const [studentList, setStudentList] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/")
      .then(res => {
        console.log(res.data.students);
        setStudentList(res.data.students)
      })
  }, [])

  const fileName = 'StudentsData'
  const exportType = exportFromJSON.types.xls
  const downloadExel = () => {
    exportFromJSON({ data: studentList, fileName, exportType })
  }

  return (
    <div>
      <div className='row mx-0'>
        <div className='col-6 mb-5'>
          <h1>Students List</h1>
          <button className='btn btn-success' onClick={() => downloadExel()}>Download CSV</button>
        </div>
        <div className='col-3'>
          <Link to="/create-student"><button className='btn btn-primary'>Create Student</button></Link>
        </div>
        <div className='col-3'>
          <Link to="/create-interview"><button className='btn btn-info'>Create Interview</button></Link>
        </div>
      </div>
      <div id="student-table">
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>name</th>
              <th scope='col'>batch</th>
              <th scope='col'>College</th>
              <th scope='col'>DSA MARKS</th>
              <th scope='col'>WEB-D MARKS</th>
              <th scope='col'>REACT MARKS</th>
              <th scope='col'>Companies</th>
              <th scope='col'>Placement Status</th>
            </tr>
          </thead>
          <tbody>
            {
              studentList && studentList.map((student) => (
                <tr key={student._id}>
                  <td scope='row'>{student.name}</td>
                  <td scope='row'>{student.batch}</td>
                  <td scope='row'>{student.college}</td>
                  <td scope='row'>{student.dsa}</td>
                  <td scope='row'>{student.webd}</td>
                  <td scope='row'>{student.react}</td>
                  <td scope='row'>
                    {student?.companies && student?.companies.map((cmp, i) => (
                      <>
                        <span key={i} className='border border-info p-1 me-2 rounded'>
                          {cmp}
                        </span>
                      </>
                    ))}
                  </td>
                  <td scope='row'> {student.placed ? <td> Placed in {student.student_placed}</td> : <td>Not Placed</td>}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home