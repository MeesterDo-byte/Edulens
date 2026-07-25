interface Student {
  id: string
  naam: string
  groep: string
  geboortedatum: string
  ouders: string
  email: string
  telefoon: string
  school_id: string
  created_at: string
}

interface Score {
  student_id: string
  periode: string
  rekenen: number
  taal: number
  lezen: number
}

const STUDENTS_KEY = 'edulens_students'
const SCORES_KEY = 'edulens_scores'

export const studentService = {
  // Get all students for school
  getStudents: (schoolId: string) => {
    const students = JSON.parse(localStorage.getItem(STUDENTS_KEY) || '[]')
    return students.filter((s: Student) => s.school_id === schoolId)
  },

  // Get single student
  getStudent: (studentId: string) => {
    const students = JSON.parse(localStorage.getItem(STUDENTS_KEY) || '[]')
    return students.find((s: Student) => s.id === studentId)
  },

  // Add new student
  addStudent: (data: Omit<Student, 'id' | 'created_at'>) => {
    const students = JSON.parse(localStorage.getItem(STUDENTS_KEY) || '[]')
    const newStudent: Student = {
      ...data,
      id: `student_${Date.now()}`,
      created_at: new Date().toISOString(),
    }
    students.push(newStudent)
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students))
    return newStudent
  },

  // Update student
  updateStudent: (studentId: string, updates: Partial<Student>) => {
    const students = JSON.parse(localStorage.getItem(STUDENTS_KEY) || '[]')
    const index = students.findIndex((s: Student) => s.id === studentId)
    if (index !== -1) {
      students[index] = { ...students[index], ...updates }
      localStorage.setItem(STUDENTS_KEY, JSON.stringify(students))
      return students[index]
    }
    return null
  },

  // Delete student
  deleteStudent: (studentId: string) => {
    const students = JSON.parse(localStorage.getItem(STUDENTS_KEY) || '[]')
    const filtered = students.filter((s: Student) => s.id !== studentId)
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(filtered))
  },

  // Get student scores
  getScores: (studentId: string) => {
    const scores = JSON.parse(localStorage.getItem(SCORES_KEY) || '[]')
    return scores.filter((s: Score) => s.student_id === studentId)
  },

  // Add score
  addScore: (data: Score) => {
    const scores = JSON.parse(localStorage.getItem(SCORES_KEY) || '[]')
    scores.push(data)
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores))
    return data
  },

  // Get average score
  getAverageScore: (studentId: string) => {
    const scores = this.getScores(studentId)
    if (scores.length === 0) return 0
    const sum = scores.reduce(
      (acc: number, s: Score) => acc + (s.rekenen + s.taal + s.lezen) / 3,
      0
    )
    return Math.round(sum / scores.length)
  },
}
