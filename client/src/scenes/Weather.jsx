import React, { useState } from 'react';
import { BookOpenCheck, PlusCircle, CheckCircle, Undo } from 'lucide-react';

const Weather = () => {
  const [assignments, setAssignments] = useState([
    { id: 1, text: 'Math Assignment - Algebra', completed: false },
    { id: 2, text: 'Science Report - Photosynthesis', completed: true },
    { id: 3, text: 'English Essay - Shakespeare', completed: false },
  ]);
  const [input, setInput] = useState('');

  const styles = {
    page: {
      background: 'linear-gradient(to right top, #0a0a0a, #1a001a)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    },
    glassContainer: {
      backdropFilter: 'blur(12px)',
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px rgba(255, 105, 180, 0.3)',
      padding: '40px 30px',
      width: '100%',
      maxWidth: '700px',
      color: '#fff',
      textAlign: 'center',
    },
    heading: {
      fontSize: '2.5rem',
      color: '#ff69b4',
      marginBottom: '25px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
    },
    inputArea: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap',
      marginBottom: '30px',
    },
    input: {
      padding: '12px 18px',
      width: '260px',
      borderRadius: '25px',
      border: '2px solid #ff69b4',
      backgroundColor: '#1a1a1a',
      color: '#fff',
      fontSize: '16px',
      outline: 'none',
    },
    addButton: {
      backgroundColor: '#ff69b4',
      color: '#000',
      fontWeight: 'bold',
      padding: '12px 20px',
      borderRadius: '25px',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    taskListContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '25px 20px',
      marginTop: '20px',
      boxShadow: '0 6px 20px rgba(255, 105, 180, 0.1)',
    },
    taskListTitle: {
      color: '#ff69b4',
      fontSize: '1.4rem',
      marginBottom: '15px',
      textAlign: 'left',
    },
    taskCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '15px 20px',
      marginBottom: '15px',
      boxShadow: '0 4px 20px rgba(255, 105, 180, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: '0.3s',
    },
    taskText: {
      fontSize: '18px',
      color: '#fff',
    },
    completedTask: {
      textDecoration: 'line-through',
      color: '#aaa',
    },
    toggleButton: {
      backgroundColor: '#ff69b4',
      color: '#000',
      border: 'none',
      borderRadius: '20px',
      padding: '8px 15px',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '14px',
    },
    noTaskText: {
      color: '#aaa',
      fontStyle: 'italic',
    }
  };

  const addAssignment = () => {
    if (!input.trim()) return;
    const newTask = { id: Date.now(), text: input.trim(), completed: false };
    setAssignments([newTask, ...assignments]);
    setInput('');
  };

  const toggleCompletion = (id) => {
    setAssignments(assignments.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div style={styles.page}>
      <div style={styles.glassContainer}>
        <h1 style={styles.heading}>
          <BookOpenCheck size={32} color="#ff69b4" />
          Assignment Tracker
        </h1>

        <div style={styles.inputArea}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter new assignment..."
            style={styles.input}
          />
          <button onClick={addAssignment} style={styles.addButton}>
            <PlusCircle size={20} />
            Add
          </button>
        </div>

        <div style={styles.taskListContainer}>
          <h2 style={styles.taskListTitle}>📋 Your Assignments</h2>
          {assignments.length === 0 ? (
            <p style={styles.noTaskText}>No assignments yet. Add one above ✨</p>
          ) : (
            assignments.map(task => (
              <div key={task.id} style={styles.taskCard}>
                <span
                  style={
                    task.completed
                      ? { ...styles.taskText, ...styles.completedTask }
                      : styles.taskText
                  }
                >
                  📘 {task.text}
                </span>
                <button
                  onClick={() => toggleCompletion(task.id)}
                  style={styles.toggleButton}
                >
                  {task.completed ? (
                    <>
                      <Undo size={16} />
                      Undo
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} />
                      Done
                    </>
                  )}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
