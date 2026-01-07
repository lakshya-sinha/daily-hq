'use client'
import { useUser } from '@/context/UserContext'

export default function Component() {
  const loggedUser = useUser()

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="relative w-full max-w-sm rounded-2xl border border-gray-700/60 
                      bg-gradient-to-br from-[#0b0f1a]/80 to-[#0f172a]/80 
                      backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] p-6">

        {/* Avatar */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt="profile"
              className="w-24 h-24 rounded-full border-2 border-blue-500/60 shadow-md"
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full 
                             bg-green-500 border-2 border-[#0b0f1a]" />
          </div>

          {/* Name */}
          <h2 className="text-xl font-semibold text-white tracking-wide">
            {loggedUser.fullName}
          </h2>

          {/* Meta */}
          <p className="text-sm text-gray-400 mt-1">
            {loggedUser.shopName}
          </p>

          <p className="text-sm text-gray-400">
            {loggedUser.address}
          </p>

          <p className="text-sm mt-2 text-blue-400 font-medium">
            Admin Access: {loggedUser.isOwner ? 'Yes' : 'No'}
          </p>

          <p className="text-sm text-gray-300 mt-1">
            {loggedUser.mobileNo}
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-gray-700/60 my-5" />

          {/* Actions */}
          <div className="flex gap-3 w-full">
            <button
              className="flex-1 rounded-xl px-4 py-2 text-sm font-medium
                         bg-red-500/20 text-red-400 border border-red-500/30
                         hover:bg-red-500/30 transition">
              Delete
            </button>

            <button
              className="flex-1 rounded-xl px-4 py-2 text-sm font-medium
                         bg-blue-500/20 text-blue-400 border border-blue-500/30
                         hover:bg-blue-500/30 transition">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
