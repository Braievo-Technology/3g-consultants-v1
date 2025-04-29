import api from './api'
export interface ProjectImage {
    id: number
    projectId: number
    image_name: string
}
export interface Project {
    id: number
    project_name: string
    location: string
    start_date: string
    end_date: string
    budget: string
    status: string
    description: string
    category: string
    images: ProjectImage[]
}
export const getProjectsByCategory = async (category: string): Promise<Project[]> => {
    try {
        const response = await api.get(`/project?category=${category}`)
        return response.data
    } catch (error) {
        console.error('Error fetching projects:', error)
        return []
    }
}
export const generateDocument = async (data: {
    categories: string[]
    clientName: string
    projects: Project[]
}) => {
    try {
        const response = await api.post('/generate', data)
        return response.data
    } catch (error) {
        console.error('Error generating document:', error)
        throw error
    }
}
export const downloadGeneratedFile = async (filePath: string) => {
    try {
        const response = await api.get(`${filePath}`, {
            responseType: 'blob'
        })
        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        const filename = filePath.split('/').pop() || 'generated-document.docx'
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    } catch (error) {
        console.error('Error downloading file:', error)
        throw error
    }
}