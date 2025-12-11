"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ProductGalleryModalProps {
  product: {
    id: number
    name: string
    image: string
    images?: string[]
  } | null
  open: boolean
  onClose: () => void
}

export function ProductGalleryModal({ product, open, onClose }: ProductGalleryModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  const images = product?.images || ([product?.image].filter(Boolean) as string[])

  useEffect(() => {
    if (open) {
      setCurrentImageIndex(0)
      setZoomLevel(1)
      setPosition({ x: 0, y: 0 })
    }
  }, [open, product])

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 0.5, 1)
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 })
      }
      return newZoom
    })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      setPosition({ x: newX, y: newY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setZoomLevel(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setZoomLevel(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!open) return
    if (e.key === "ArrowLeft") handlePrevImage()
    if (e.key === "ArrowRight") handleNextImage()
    if (e.key === "Escape") onClose()
    if (e.key === "+" || e.key === "=") handleZoomIn()
    if (e.key === "-") handleZoomOut()
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, currentImageIndex])

  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0 bg-black/95 border-none">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
            {images.length > 1 && (
              <p className="text-sm text-white/70">
                {currentImageIndex + 1} / {images.length}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-black/50 rounded-lg p-1 backdrop-blur-sm">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-white text-sm px-2 min-w-[3rem] text-center">{Math.round(zoomLevel * 100)}%</span>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Main Image */}
        <div
          ref={imageRef}
          className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="transition-transform duration-200 ease-out"
            style={{
              transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
            }}
          >
            <img
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={`${product.name} - image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain select-none"
              draggable={false}
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex gap-2 justify-center overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index)
                    setZoomLevel(1)
                    setPosition({ x: 0, y: 0 })
                  }}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    currentImageIndex === index ? "border-primary scale-110" : "border-white/30 hover:border-white/60"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full pointer-events-none">
          {zoomLevel > 1 ? "Перетащите для перемещения" : "Используйте колесо мыши или кнопки + / - для увеличения"}
        </div>
      </DialogContent>
    </Dialog>
  )
}
