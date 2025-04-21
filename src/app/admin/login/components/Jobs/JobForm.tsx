import React, { useState } from 'react'
interface JobFormProps {
    onSubmit: (data: any) => void
    initialData?: any
}
export const JobForm: React.FC<JobFormProps> = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        title: initialData?.job_title || '',
        type: initialData?.employment_type?.toLowerCase() || 'fulltime',
        department: initialData?.department || '',
        location: initialData?.location || '',
        deadline: initialData?.application_deadline?.split('T')[0] || '',
        description: initialData?.job_description || '',
        requirements: initialData?.requirements || '',
        status: initialData?.status || 'DRAFT',
    })
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Job Title
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Employment Type
                    </label>
                    <select
                        value={formData.type}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                type: e.target.value,
                            }))
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="fulltime">Full Time</option>
                        <option value="parttime">Part Time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Department
                    </label>
                    <input
                        type="text"
                        value={formData.department}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                department: e.target.value,
                            }))
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                location: e.target.value,
                            }))
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Application Deadline
                    </label>
                    <input
                        type="date"
                        value={formData.deadline}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                deadline: e.target.value,
                            }))
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        value={formData.status}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                status: e.target.value,
                            }))
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="DRAFT">Draft</option>
                        <option value="ACTIVE">Active</option>
                        <option value="CLOSED">Closed</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Job Description
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Requirements
                </label>
                <textarea
                    value={formData.requirements}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            requirements: e.target.value,
                        }))
                    }
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="flex justify-end space-x-3 border-t border-gray-200 pt-4">
                <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {initialData ? 'Update Job' : 'Post Job'}
                </button>
            </div>
        </form>
    )
}
