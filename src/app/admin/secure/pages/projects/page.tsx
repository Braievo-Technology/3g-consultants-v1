'use client'
import { MapPinIcon } from 'lucide-react'
import { CalendarIcon } from 'lucide-react'
import {
    projectService,
    Project as ApiProject,
} from '../../services/projectService'
import {useEffect, useState} from "react";
import {Badge} from "@/app/admin/secure/components/UI/Badge";

import {AddButton} from "@/app/admin/secure/components/UI/AddButton";
import {DataTable} from "@/app/admin/secure/components/UI/DataTable";
import {Modal} from "@/app/admin/secure/components/UI/Modal";
import {ProjectForm} from "@/app/admin/secure/components/Projects/ProjectForm";
import { PageTransition } from '../../components/UI/PageTransition';


interface Project {
    id: number
    name: string
    description: string
    location: string
    startDate: string
    endDate: string
    status: string
    budget?: string
    images?: string[]
}
const Projects: React.FC = () => {
    const [projects, setProjects] = useState<ApiProject[]>([])
    const [filteredProjects, setFilteredProjects] = useState<ApiProject[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingProject, setEditingProject] = useState<ApiProject | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const fetchProjects = async () => {
        try {
            const data = await projectService.getAllProjects()
            setProjects(data)
            setFilteredProjects(data)
        } catch (error) {
            console.error('Failed to fetch projects:', error)

        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchProjects()
    }, [])
    useEffect(() => {
        const filtered = projects.filter((project) => {
            const searchString = searchTerm.toLowerCase()
            return (
                project.project_name.toLowerCase().includes(searchString) ||
                project.description.toLowerCase().includes(searchString) ||
                project.location.toLowerCase().includes(searchString) ||
                project.status.toLowerCase().includes(searchString)
            )
        })
        setFilteredProjects(filtered)
    }, [searchTerm, projects])
    const handleAddProject = async (data: any) => {
        try {
            const formattedData = {
                project_name: data.name,
                description: data.description,
                location: data.location,
                start_date: new Date(data.startDate),
                end_date: new Date(data.endDate),
                status: data.status,
                budget: parseFloat(data.budget),
                images: data.images,
            }
            await projectService.createProject(formattedData)
            await fetchProjects()
            setIsModalOpen(false)

        } catch (error) {
            console.error('Failed to create project:', error)

        }
    }
    const handleUpdate = async (data: any) => {
        if (!editingProject) return
        try {
            const formattedData = {
                project_name: data.name,
                description: data.description,
                location: data.location,
                start_date: new Date(data.startDate),
                end_date: new Date(data.endDate),
                status: data.status,
                budget: parseFloat(data.budget),
                images: data.images,
            }
            await projectService.updateProject(editingProject.id, formattedData)
            await fetchProjects()
            setIsModalOpen(false)
            setEditingProject(null)

        } catch (error) {
            console.error('Failed to update project:', error)

        }
    }
    const handleDelete = async (project: ApiProject) => {
        if (
            window.confirm(
                `Are you sure you want to delete "${project.project_name}"?`,
            )
        ) {
            try {
                await projectService.deleteProject(project.id)
                await fetchProjects()

            } catch (error) {
                console.error('Failed to delete project:', error)

            }
        }
    }
    const handleEdit = (project: ApiProject) => {
        setEditingProject(project)
        setIsModalOpen(true)
    }
    const getBadgeColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'planning':
                return 'blue'
            case 'in-progress':
                return 'yellow'
            case 'completed':
                return 'green'
            case 'on-hold':
                return 'gray'
            default:
                return 'gray'
        }
    }
    const columns = [
        {
            key: 'project_name',
            header: 'Project Name',
            width: '20%',
            render: (value: string, row: ApiProject) => (
                <div>
                    <div className="flex items-center space-x-3">
                        {row.images && row.images.length > 0 && (
                            <div className="relative h-10 w-10 flex-shrink-0">
                                <img
                                    src={row.images[0].image_name}
                                    alt={value}
                                    className="h-full w-full rounded-lg object-cover"
                                />
                                {row.images.length > 1 && (
                                    <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                                        +{row.images.length - 1}
                                    </div>
                                )}
                            </div>
                        )}
                        <div>
                            <div className="font-medium text-gray-900">{value}</div>
                            <div className="text-sm text-gray-500">
                                {row.budget ? `Budget: $${row.budget}` : 'No budget set'}
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: 'description',
            header: 'Description',
            width: '30%',
            render: (value: string) => (
                <div className="max-w-xs md:max-w-full">
                    <div className="line-clamp-2 text-sm text-gray-600">{value}</div>
                </div>
            ),
        },
        {
            key: 'location',
            header: 'Location',
            width: '15%',
            render: (value: string) => (
                <div className="flex items-center">
                    <MapPinIcon size={16} className="mr-1 text-gray-400" />
                    <span className="text-sm">{value}</span>
                </div>
            ),
        },
        {
            key: 'timeline',
            header: 'Timeline',
            width: '20%',
            render: (_: any, row: ApiProject) => (
                <div className="space-y-1 text-sm">
                    <div className="flex items-center text-gray-600">
                        <CalendarIcon size={14} className="mr-1" />
                        <span>Start: {new Date(row.start_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <CalendarIcon size={14} className="mr-1" />
                        <span>End: {new Date(row.end_date).toLocaleDateString()}</span>
                    </div>
                </div>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            width: '15%',
            render: (value: string) => (
                <div className="flex items-center space-x-2">
                    <Badge text={value} color={getBadgeColor(value)} />
                </div>
            ),
        },
    ]
    return (
        <PageTransition>
            <div className="px-4 py-6 md:px-6 lg:px-8">
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-xl font-medium">Project Management</h2>
                    <AddButton
                        label="Add Project"
                        onClick={() => {
                            setEditingProject(null)
                            setIsModalOpen(true)
                        }}
                    />
                </div>
                <div className="space-y-4">
                    <DataTable
                        columns={columns}
                        data={filteredProjects}
                        searchPlaceholder="Search projects..."
                        filterOptions={{
                            label: 'Filter by status',
                            options: [
                                {
                                    label: 'Planning',
                                    value: 'Planning',
                                },
                                {
                                    label: 'In Progress',
                                    value: 'In-progress',
                                },
                                {
                                    label: 'Completed',
                                    value: 'Completed',
                                },
                                {
                                    label: 'On Hold',
                                    value: 'On-hold',
                                },
                            ],
                        }}
                        onSearch={setSearchTerm}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    <div className="text-sm text-gray-500">
                        Showing {filteredProjects.length} of {projects.length} projects
                    </div>
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        setEditingProject(null)
                    }}
                    title={editingProject ? 'Edit Project' : 'Add New Project'}
                >
                    <ProjectForm
                        onSubmit={editingProject ? handleUpdate : handleAddProject}
                        initialData={editingProject}
                    />
                </Modal>
            </div>
        </PageTransition>
    )
}
export default Projects
