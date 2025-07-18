import React, { useState, useEffect } from 'react';
import { User, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded data for student assignments
  const data = [
    { id: 1, name: 'John Doe', completed: 3, total: 5 },
    { id: 2, name: 'Jane Smith', completed: 2, total: 5 },
    { id: 3, name: 'Alex Johnson', completed: 4, total: 5 },
  ];

  // Aggregate data for Pie Chart
  const totalCompleted = data.reduce((sum, student) => sum + student.completed, 0);
  const totalAssignments = data.reduce((sum, student) => sum + student.total, 0);
  const pieData = [
    { name: 'Completed', value: totalCompleted },
    { name: 'Pending', value: totalAssignments - totalCompleted },
  ];

  useEffect(() => {
    // Simulate loading delay
    const fetchData = () => {
      try {
        setTimeout(() => {
          setStudents(data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        '@media (min-width: 768px)': {
          justifyContent: 'flex-start',
        },
      }}>
        <FileText style={{
          width: '2.5rem',
          height: '2.5rem',
          marginRight: '0.75rem',
          color: '#f9a8d4',
          animation: 'pulse 2s infinite',
        }} />
        Student Assignment Dashboard
      </h2>
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
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '1.5rem',
          gridAutoRows: 'min-content',
        }}>
          {/* Summary Card */}
          <div style={{
            gridColumn: 'span 12 / span 12',
            '@media (min-width: 640px)': { gridColumn: 'span 6 / span 6' },
            '@media (min-width: 1024px)': { gridColumn: 'span 4 / span 4' },
            background: 'linear-gradient(145deg, #1f2937, #374151)',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            transition: 'transform 0.3s ease',
            ':hover': {
              transform: 'scale(1.05)',
            },
          }}>
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
              }}>Summary</h3>
            </div>
            <p style={{
              display: 'flex',
              alignItems: 'center',
              color: '#d1d5db',
              marginBottom: '0.5rem',
            }}>
              <User style={{
                width: '1.5rem',
                height: '1.5rem',
                marginRight: '0.5rem',
                color: '#ec4899',
              }} />
              Total Students: {students.length}
            </p>
            <p style={{
              display: 'flex',
              alignItems: 'center',
              color: '#d1d5db',
            }}>
              <CheckCircle style={{
                width: '1.5rem',
                height: '1.5rem',
                marginRight: '0.5rem',
                color: '#ec4899',
              }} />
              Total Completed: {totalCompleted}/{totalAssignments}
            </p>
          </div>

          {/* Pie Chart for Assignment Status */}
          <div style={{
            gridColumn: 'span 12 / span 12',
            '@media (min-width: 640px)': { gridColumn: 'span 6 / span 6' },
            '@media (min-width: 1024px)': { gridColumn: 'span 4 / span 4' },
            background: 'linear-gradient(145deg, #1f2937, #374151)',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(236, 72, 153, 0.3)',
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
            }}>
              <FileText style={{
                width: '1.5rem',
                height: '1.5rem',
                marginRight: '0.5rem',
                color: '#f9a8d4',
              }} />
              Assignment Status
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={60}
                  label
                >
                  <Cell fill="#ec4899" />
                  <Cell fill="#374151" />
                </Pie>
                <Tooltip
                  contentStyle={{
                    fontSize: '14px',
                    backgroundColor: '#1f2937',
                    borderColor: '#ec4899',
                    color: '#ffffff',
                  }}
                />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ fontSize: '14px', color: '#d1d5db' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Student Cards */}
          <div style={{
            gridColumn: 'span 12 / span 12',
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
                <p style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#d1d5db',
                  marginBottom: '1rem',
                }}>
                  <CheckCircle style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    marginRight: '0.5rem',
                    color: '#ec4899',
                  }} />
                  Completed: {student.completed}/{student.total}
                </p>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    backgroundColor: '#4b5563',
                    height: '1rem',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                  }}>
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #ec4899, #f472b6)',
                        height: '1rem',
                        borderRadius: '9999px',
                        transition: 'width 0.5s ease',
                        width: `${student.total ? (student.completed / student.total) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                  <span style={{
                    position: 'absolute',
                    right: '0',
                    top: '1.25rem',
                    fontSize: '0.875rem',
                    color: '#d1d5db',
                  }}>
                    {student.total ? Math.round((student.completed / student.total) * 100) : 0}%
                  </span>
                </div>
              </div>
            ))}
          </div>
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

export default Dashboard;