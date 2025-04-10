"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

const schema = z.object({
  title: z.string().min(2, "Título obrigatório"),
  author: z.string().min(2, "Autor obrigatório"),
  category: z.string().min(2, "Categoria obrigatória"),
  description: z.string().min(5, "Descrição muito curta"),
  file: z
    .any()
    .refine((file) => file?.length === 1, "É necessário enviar um PDF")
    .refine(
      (file) => file?.[0]?.type === "application/pdf",
      "Somente arquivos PDF são aceitos"
    ),
})

type FormData = z.infer<typeof schema>

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function UploadModal({ isOpen, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    const formData = new FormData()
    formData.append("file", data.file[0])
    formData.append("title", data.title)
    formData.append("author", data.author)
    formData.append("category", data.category)
    formData.append("description", data.description)

    try {
      console.log("Enviando dados:", data)
      setTimeout(() => {
        onClose()
        setLoading(false)
      }, 1500)
    } catch (err) {
      console.error("Erro:", err)
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold text-blue-700 mb-4">Preservar novo documento</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            {...register("title")}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

          <input
            type="text"
            placeholder="Autor"
            {...register("author")}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.author && <p className="text-sm text-red-500">{errors.author.message}</p>}

          <input
            type="text"
            placeholder="Categoria"
            {...register("category")}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}

          <textarea
            placeholder="Descrição"
            {...register("description")}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}

          <input type="file" accept="application/pdf" {...register("file")} className="block" />
          {typeof errors.file?.message === "string" && (
            <p className="text-sm text-red-500">{errors.file?.message}</p>
        )}


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Preservando..." : "Preservar"}
          </button>
        </form>
      </div>
    </div>
  )
}
