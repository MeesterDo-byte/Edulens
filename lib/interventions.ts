interface Intervention {
  id: string
  school_id: string
  titel: string
  beschrijving: string
  type: string
  duur: string
  start_datum: string
  status: 'actief' | 'gepland' | 'afgerond'
  student_ids: string[]
  voortgang: number
  created_at: string
  updated_at: string
}

const INTERVENTIONS_KEY = 'edulens_interventions'

export const interventionService = {
  // Get all interventions for school
  getInterventions: (schoolId: string) => {
    const interventions = JSON.parse(localStorage.getItem(INTERVENTIONS_KEY) || '[]')
    return interventions.filter((i: Intervention) => i.school_id === schoolId)
  },

  // Get single intervention
  getIntervention: (interventionId: string) => {
    const interventions = JSON.parse(localStorage.getItem(INTERVENTIONS_KEY) || '[]')
    return interventions.find((i: Intervention) => i.id === interventionId)
  },

  // Create intervention
  createIntervention: (data: Omit<Intervention, 'id' | 'created_at' | 'updated_at'>) => {
    const interventions = JSON.parse(localStorage.getItem(INTERVENTIONS_KEY) || '[]')
    const newIntervention: Intervention = {
      ...data,
      id: `intervention_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    interventions.push(newIntervention)
    localStorage.setItem(INTERVENTIONS_KEY, JSON.stringify(interventions))
    return newIntervention
  },

  // Update intervention
  updateIntervention: (interventionId: string, updates: Partial<Intervention>) => {
    const interventions = JSON.parse(localStorage.getItem(INTERVENTIONS_KEY) || '[]')
    const index = interventions.findIndex((i: Intervention) => i.id === interventionId)
    if (index !== -1) {
      interventions[index] = {
        ...interventions[index],
        ...updates,
        updated_at: new Date().toISOString(),
      }
      localStorage.setItem(INTERVENTIONS_KEY, JSON.stringify(interventions))
      return interventions[index]
    }
    return null
  },

  // Delete intervention
  deleteIntervention: (interventionId: string) => {
    const interventions = JSON.parse(localStorage.getItem(INTERVENTIONS_KEY) || '[]')
    const filtered = interventions.filter((i: Intervention) => i.id !== interventionId)
    localStorage.setItem(INTERVENTIONS_KEY, JSON.stringify(filtered))
  },
}
