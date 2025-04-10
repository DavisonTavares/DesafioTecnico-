"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Logo ou nome da plataforma */}
        <div className="text-2xl font-bold tracking-tight">
          Mundo<span className="text-yellow-300">Docs</span>
        </div>

        {/* Links de navegação */}
        <div className="hidden md:flex gap-4 ml-8 text-sm font-medium">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </div>
      </div>

      {/* Botão de logout */}
      <div>
        <button
          onClick={() => console.log("logout")}
          className="bg-white text-blue-600 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition"
        >
          Sair
        </button>
      </div>
    </nav>
  )
}
