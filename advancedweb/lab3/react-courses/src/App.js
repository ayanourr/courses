import React, { useState, useEffect } from 'react';
import './App.css';
import Course from './components/Course';

function App() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: '', confirmation: 0 });

  useEffect(() => {
    fetch('http://localhost/advancedweb/lab3/react_courses/api/process.php')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleInputChange = (event) => {
    setNewCourse({ ...newCourse, name: event.target.value });
  };

  const handleAddCourse = () => {
    if (newCourse.name.trim() !== '') {
      fetch('http://localhost/advancedweb/lab3/react_courses/api/add.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newCourse.name })
      })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            setCourses([...courses, { ...newCourse, id: result.id }]);
            setNewCourse({ name: '', confirmation: 0 });
          } else {
            alert('Error adding course: ' + result.error);
          }
        })
        .catch(error => console.error('Error:', error));
    }
  };

  const handleConfirm = (index) => {
    const course = courses[index];
    fetch('http://localhost/advancedweb/lab3/react_courses/api/confirm.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: course.id })
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setCourses(prevCourses =>
            prevCourses.map((course, i) =>
              i === index ? { ...course, confirmation: 1 } : course
            )
          );
        } else {
          alert('Error confirming course: ' + result.error);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDelete = (index) => {
    const course = courses[index];
    fetch('http://localhost/advancedweb/lab3/react_courses/api/delete.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: course.id })
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setCourses(prevCourses =>
            prevCourses.filter((_, i) => i !== index)
          );
        } else {
          alert('Error deleting course: ' + result.error);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="container">
      <div>
        <input
          type='text'
          placeholder='Enter course name'
          value={newCourse.name}
          onChange={handleInputChange}
        />
        <button onClick={handleAddCourse}>Add Course</button>
      </div>
      <div className="courses-container">
        {courses.map((course, index) => (
          <Course
            key={index}
            name={course.name}
            confirmation={course.confirmation}
            onConfirm={() => handleConfirm(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
