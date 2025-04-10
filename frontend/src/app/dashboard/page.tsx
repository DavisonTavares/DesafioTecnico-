"use client"

import UploadModal from "@/components/UploadModal"
import { useState } from "react"

const mockDocs = [
    {
        id: 1,
        nome: "Contrato.pdf",
        data: "2025-04-01",
        status: "Preservado",
    },
    {
        id: 2,
        nome: "Ficha Cadastral.pdf",
        data: "2025-04-02",
        status: "Iniciada",
    },
    {
        id: 3,
        nome: "Recibo.pdf",
        data: "2025-04-03",
        status: "Falha",
    },
]

export default function DashboardPage() {
    const [search, setSearch] = useState("")
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="min-h-screen bg-blue-50 p-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-blue-700 mb-8">📄 Meus Documentos</h2>

                {/* Filtros */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-6 flex flex-col md:flex-row gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Buscar por nome ou metadados..."
                        className="w-full md:flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <input
                        type="date"
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="date"
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Filtrar
                    </button>
                </div>

                {/* Tabela */}
                <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                    <table className="min-w-full text-sm text-gray-800">
                        <thead className="bg-blue-100 text-blue-700 text-left">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Nome</th>
                                <th className="p-4">Data</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockDocs.map((doc) => (
                                <tr key={doc.id} className="border-t hover:bg-blue-50 transition">
                                    <td className="p-4 font-medium">{doc.id}</td>
                                    <td className="p-4">{doc.nome}</td>
                                    <td className="p-4">{doc.data}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${doc.status === "Preservado"
                                                    ? "bg-green-100 text-green-700"
                                                    : doc.status === "Iniciada"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {doc.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center space-x-2">
                                        <button className="text-blue-600 hover:underline font-medium">
                                            Download
                                        </button>
                                        <button className="text-blue-600 hover:underline font-medium">
                                            Ver mais
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Botão novo documento */}
                <div className="mt-8 text-right">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-green-700 transition">
                        ➕ Preservar novo documento
                    </button>
                </div>

                {/* Modal de upload */}
                <UploadModal isOpen={showModal} onClose={() => setShowModal(false)} />
            </div>
        </div>
    )
}
