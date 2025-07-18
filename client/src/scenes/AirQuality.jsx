import React, { useState, useEffect } from 'react';
import { User, FileText, PlusCircle, Loader2 } from 'lucide-react';

const AirQuality = () => {
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/students');
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to load students');
      setLoading(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!newStudentName.trim()) {
      setFormError('Please enter a student name');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newStudentName.trim() }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add student');
      }

      const newStudent = await response.json();
      setStudents([...students, newStudent]);
      setNewStudentName('');
      setFormError(null);
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <div style={{
      backgroundColor: '#1f2937',
      minHeight: '100vh',
      color: '#ffffff',
      fontFamily: "'Inter', sans-serif",
      padding: '1.5rem 2.5rem',
    }}>
      <h2 style={{
        fontSize: '2.25rem',
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@media (min-width: 768px)': { justifyContent: 'flex-start' },
      }}>
        <FileText style={{
          width: '2.5rem',
          height: '2.5rem',
          marginRight: '0.75rem',
          color: '#f9a8d4',
          animation: 'pulse 2s infinite',
        }} />
        Students
      </h2>

      {/* Add Student Form */}
      <div style={{
        gridColumn: 'span 12 / span 12',
        background: 'linear-gradient(145deg, #1f2937, #374151)',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(236, 72, 153, 0.3)',
        marginBottom: '1.5rem',
      }}>
        <form onSubmit={handleAddStudent} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          '@media (min-width: 640px)': {
            flexDirection: 'row',
            alignItems: 'center',
          },
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#4b5563',
            borderRadius: '0.375rem',
            padding: '0.5rem',
            flex: '1',
          }}>
            <User style={{
              width: '1.5rem',
              height: '1.5rem',
              margin: '0 0.5rem',
              color: '#f9a8d4',
            }} />
            <input
              type="text"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              placeholder="Enter student name"
              style={{
                flex: '1',
                padding: '0.5rem',
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: 'none',
                outline: 'none',
                fontSize: '1rem',
                transition: 'box-shadow 0.2s ease',
                ':focus': {
                  boxShadow: '0 0 0 2px #ec4899',
                },
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #ec4899, #f472b6)',
              color: '#ffffff',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s ease',
              ':hover': {
                background: 'linear-gradient(135deg, #db2777, #e879f9)',
              },
            }}
          >
            <PlusCircle style={{
              width: '1.25rem',
              height: '1.25rem',
              marginRight: '0.5rem',
            }} />
            Add Student
          </button>
        </form>
        {formError && (
          <p style={{
            color: '#ec4899',
            marginTop: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.875rem',
          }}>
            <FileText style={{
              width: '1.25rem',
              height: '1.25rem',
              marginRight: '0.5rem',
            }} />
            {formError}
          </p>
        )}
      </div>

      {/* Students List */}
      {loading ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#d1d5db',
          fontSize: '1.125rem',
        }}>
          <Loader2 style={{
            width: '2rem',
            height: '2rem',
            marginRight: '0.5rem',
            color: '#ec4899',
            animation: 'spin 1s linear infinite',
          }} />
          Loading...
        </div>
      ) : error ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ec4899',
          fontSize: '1.125rem',
        }}>
          <FileText style={{
            width: '2rem',
            height: '2rem',
            marginRight: '0.5rem',
            color: '#ec4899',
          }} />
          {error}
        </div>
      ) : students.length === 0 ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#d1d5db',
          fontSize: '1.125rem',
        }}>
          <FileText style={{
            width: '2rem',
            height: '2rem',
            marginRight: '0.5rem',
            color: '#d1d5db',
          }} />
          No students found
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}>
          {students.map(student => (
            <div
              key={student.id}
              style={{
                background: 'linear-gradient(145deg, #1f2937, #374151)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(236, 72, 153, 0.3)',
                transition: 'transform 0.3s ease',
                ':hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem',
              }}>
                <User style={{
                  width: '2rem',
                  height: '2rem',
                  marginRight: '0.75rem',
                  color: '#f9a8d4',
                }} />
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#ffffff',
                }}>{student.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AirQuality;