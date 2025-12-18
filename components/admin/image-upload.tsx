"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, X, ImageIcon, LinkIcon, Loader2 } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
}

export function ImageUpload({ images, onChange }: ImageUploadProps) {
  const [urlInput, setUrlInput] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragCounter, setDragCounter] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddUrl = () => {
    if (!urlInput.trim()) {
      toast.error("Введите URL изображения")
      return
    }

    if (images.includes(urlInput)) {
      toast.error("Это изображение уже добавлено")
      return
    }

    onChange([...images, urlInput])
    setUrlInput("")
    toast.success("Изображение добавлено")
  }

  const uploadFile = async (file: File) => {
    try {
      setIsUploading(true)

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Ошибка загрузки")
      }

      const { url } = await response.json()
      onChange([...images, url])
      toast.success("Изображение загружено")
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Не удалось загрузить изображение")
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} не является изображением`)
        continue
      }
      await uploadFile(file)
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragCounter((prev) => prev + 1)
    if (e.dataTransfer.types.includes("Files")) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragCounter((prev) => {
      const newCounter = prev - 1
      if (newCounter === 0) {
        setIsDragging(false)
      }
      return newCounter
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    setDragCounter(0)

    const files = e.dataTransfer.files
    if (!files || files.length === 0) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} не является изображением`)
        continue
      }
      await uploadFile(file)
    }
  }

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
    toast.success("Изображение удалено")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddUrl()
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="file" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="file">
            <Upload className="mr-2 h-4 w-4" />
            Загрузить файл
          </TabsTrigger>
          <TabsTrigger value="url">
            <LinkIcon className="mr-2 h-4 w-4" />
            По ссылке
          </TabsTrigger>
        </TabsList>

        <TabsContent value="file" className="space-y-4">
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
              isDragging ? "border-primary bg-primary/5" : "border-slate-300 bg-slate-50 hover:border-primary/50"
            } ${isUploading ? "pointer-events-none opacity-50" : ""}`}
            onClick={() => fileInputRef.current?.click()}
          >
            {isUploading ? (
              <div className="text-center">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-sm font-medium text-slate-700">Загрузка изображения...</p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-slate-400" />
                <p className="mt-4 text-sm font-medium text-slate-700">
                  Перетащите изображения сюда или нажмите для выбора
                </p>
                <p className="mt-2 text-xs text-slate-500">PNG, JPG, WEBP до 10MB</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
          </div>
        </TabsContent>

        <TabsContent value="url" className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button type="button" onClick={handleAddUrl}>
              Добавить
            </Button>
          </div>
          <p className="text-xs text-slate-500">Вставьте ссылку на изображение</p>
        </TabsContent>
      </Tabs>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((image, index) => (
            <div key={index} className="group relative aspect-square overflow-hidden rounded-lg border bg-slate-100">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => handleRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 rounded bg-primary px-2 py-1 text-xs text-white">Главное</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed bg-slate-50">
          <div className="text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-slate-400" />
            <p className="mt-2 text-sm text-slate-600">Добавьте изображения товара</p>
          </div>
        </div>
      )}

      <p className="text-sm text-slate-500">
        Первое изображение будет использоваться как главное. Можно добавить несколько изображений.
      </p>
    </div>
  )
}
