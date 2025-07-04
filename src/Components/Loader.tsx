"use client"

import { useEffect, useState } from "react"
import { Spinner } from "@heroui/react"
import { FileText, Upload, MessageSquare, FolderPlus } from "lucide-react"

interface FullScreenLoaderProps {
  isVisible?: boolean
  message?: string
  submessage?: string
  variant?: "default" | "upload" | "processing" | "chat"
  progress?: number
}

const loaderVariants = {
  default: {
    icon: FileText,
    primaryColor: "from-blue-600 to-purple-600",
    secondaryColor: "from-blue-100 to-purple-100",
    message: "Loading...",
    submessage: "Please wait while we prepare everything for you",
  },
  upload: {
    icon: Upload,
    primaryColor: "from-green-600 to-blue-600",
    secondaryColor: "from-green-100 to-blue-100",
    message: "Uploading files...",
    submessage: "Processing your documents",
  },
  processing: {
    icon: MessageSquare,
    primaryColor: "from-purple-600 to-pink-600",
    secondaryColor: "from-purple-100 to-pink-100",
    message: "Processing...",
    submessage: "Analyzing your documents",
  },
  chat: {
    icon: FolderPlus,
    primaryColor: "from-blue-600 to-teal-600",
    secondaryColor: "from-blue-100 to-teal-100",
    message: "Preparing chat...",
    submessage: "Setting up your document assistant",
  },
}

export default function FullScreenLoader({
  isVisible = true,
  message,
  submessage,
  variant = "default",
  progress,
}: FullScreenLoaderProps) {
  const [dots, setDots] = useState("")
  const [mounted, setMounted] = useState(false)

  const config = loaderVariants[variant]
  const IconComponent = config.icon

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return ""
        return prev + "."
      })
    }, 500)

    return () => clearInterval(interval)
  }, [isVisible])

  if (!mounted || !isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br ${config.secondaryColor} rounded-full blur-3xl opacity-30`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr ${config.secondaryColor} rounded-full blur-3xl opacity-30`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r ${config.secondaryColor} rounded-full blur-3xl opacity-20`}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8 max-w-md mx-auto px-6">
        {/* Animated Logo */}
        <div className="relative">
          {/* Outer Ring */}
          <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${config.primaryColor} p-1 animate-spin`}>
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-r ${config.primaryColor} flex items-center justify-center`}
              >
                <IconComponent className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
          </div>

          {/* Floating Dots */}
          <div className="absolute -top-2 -right-2">
            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${config.primaryColor} animate-bounce`}></div>
          </div>
          <div className="absolute -bottom-2 -left-2">
            <div
              className={`w-3 h-3 rounded-full bg-gradient-to-r ${config.primaryColor} animate-bounce`}
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>
          <div className="absolute top-0 -left-4">
            <div
              className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.primaryColor} animate-bounce`}
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">
            {message || config.message}
            <span className="inline-block w-8 text-left">{dots}</span>
          </h2>
          <p className="text-gray-600 text-lg">{submessage || config.submessage}</p>
        </div>

        {/* Progress Bar (if progress is provided) */}
        {typeof progress === "number" && (
          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${config.primaryColor} rounded-full transition-all duration-300 ease-out`}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Spinner Alternative */}
        <div className="flex items-center space-x-2">
          <Spinner
            size="sm"
            classNames={{
              circle1: `border-b-blue-600`,
              circle2: `border-b-purple-600`,
            }}
          />
          <span className="text-sm text-gray-500">Working on it...</span>
        </div>

        {/* Pulsing Brand */}
        <div className="flex items-center space-x-2 opacity-60">
          <div
            className={`w-6 h-6 bg-gradient-to-r ${config.primaryColor} rounded flex items-center justify-center animate-pulse`}
          >
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">PDFChat</span>
        </div>
      </div>
    </div>
  )
}
