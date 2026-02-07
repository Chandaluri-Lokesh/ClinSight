import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, BrainCircuit } from 'lucide-react'

export default function DiagnosticSupportLookup() {
    const [patientId, setPatientId] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (patientId.trim()) {
            navigate(`/patient/${patientId}/support`)
        }
    }

    return (
        <div className="max-w-xl mx-auto mt-12">
            <div className="bg-white p-8 rounded-card shadow-card">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center">
                        <BrainCircuit className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Diagnostic Support</h1>
                        <p className="text-gray-500 text-sm">Find a patient to access AI-assisted diagnosis</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-2">
                            Patient ID / MRN
                        </label>
                        <div className="relative">
                            <input
                                id="patientId"
                                type="text"
                                value={patientId}
                                onChange={(e) => setPatientId(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-button focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                placeholder="Enter Patient ID (e.g. P1001)"
                                autoFocus
                            />
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                            Enter the patient's unique Medical Record Number to retrieve their data and generate diagnostic insights.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={!patientId.trim()}
                        className="w-full py-3 px-4 bg-primary-500 text-white font-medium rounded-button hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                        <BrainCircuit className="w-5 h-5" />
                        <span>Launch Analysis</span>
                    </button>
                </form>
            </div>
        </div>
    )
}
