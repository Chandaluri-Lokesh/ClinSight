import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getPatientById } from '../data/mockPatients'
import { User, Mail, Shield, KeyRound, IdCard } from 'lucide-react'

export default function Profile() {
  const { user, changePassword } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New password and confirmation do not match.' })
      return
    }
    if (newPassword.length < 4) {
      setMessage({ type: 'error', text: 'New password must be at least 4 characters.' })
      return
    }
    setIsSubmitting(true)
    const result = changePassword(currentPassword, newPassword)
    setIsSubmitting(false)
    if (result.success) {
      setMessage({ type: 'success', text: 'Password updated successfully.' })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } else {
      setMessage({ type: 'error', text: result.error ?? 'Failed to update password.' })
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">View your account details and change your password.</p>
      </div>

      {/* Profile info card */}
      <div className="bg-white rounded-card shadow-card border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-900">Account information</h2>
          <p className="text-xs text-gray-500 mt-0.5">Your details as shown in the system.</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Full name</p>
              <p className="text-gray-900 font-medium">{user!.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400 shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-500">Email</p>
              <p className="text-gray-900">{user!.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gray-400 shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-500">Role</p>
              <p className="text-gray-900 capitalize">{user!.role}</p>
            </div>
          </div>
          {user!.role === 'patient' && (
            <div className="flex items-center gap-3">
              <IdCard className="w-5 h-5 text-gray-400 shrink-0" />
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500">Patient ID</p>
                <p className="text-gray-900 font-mono">{user!.id}</p>
                {getPatientById(user!.id) && (
                  <>
                    <p className="text-xs font-medium text-gray-500 mt-2">MRN</p>
                    <p className="text-gray-900 font-mono">{getPatientById(user!.id)!.mrn}</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change password card */}
      <div className="bg-white rounded-card shadow-card border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <KeyRound className="w-4 h-4" />
            Change password
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Update your password. Use at least 4 characters.</p>
        </div>
        <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
              Current password
            </label>
            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-button text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
              New password
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-button text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              minLength={4}
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm new password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-button text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              minLength={4}
            />
          </div>
          {message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                message.type === 'success'
                  ? 'bg-success-50 border border-success-100 text-success-700'
                  : 'bg-danger-50 border border-danger-100 text-danger-700'
              }`}
            >
              {message.text}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="py-2.5 px-5 bg-primary-500 text-white font-medium rounded-button shadow-sm hover:bg-primary-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  )
}
