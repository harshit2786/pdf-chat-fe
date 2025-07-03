"use client"

import { useState } from "react"
import { Card, CardBody, Button, Chip } from "@heroui/react"
import { Check } from "lucide-react"

const colorOptions = [
  { value: "bg-blue-500", label: "Blue", bgClass: "bg-blue-500", hoverClass: "hover:bg-blue-600" },
  { value: "bg-purple-500", label: "Purple", bgClass: "bg-purple-500", hoverClass: "hover:bg-purple-600" },
  { value: "bg-green-500", label: "Green", bgClass: "bg-green-500", hoverClass: "hover:bg-green-600" },
  { value: "bg-orange-500", label: "Orange", bgClass: "bg-orange-500", hoverClass: "hover:bg-orange-600" },
  { value: "bg-indigo-500", label: "Indigo", bgClass: "bg-indigo-500", hoverClass: "hover:bg-indigo-600" },
  { value: "bg-pink-500", label: "Pink", bgClass: "bg-pink-500", hoverClass: "hover:bg-pink-600" },
  { value: "bg-teal-500", label: "Teal", bgClass: "bg-teal-500", hoverClass: "hover:bg-teal-600" },
  { value: "bg-red-500", label: "Red", bgClass: "bg-red-500", hoverClass: "hover:bg-red-600" },
]

interface ColorPickerProps {
  selectedColor?: string
  onColorChange?: (color: string) => void
  label?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "compact" | "grid"
}

export default function ColorPicker({
  selectedColor = "bg-blue-500",
  onColorChange,
  label = "Choose a color",
  size = "md",
  variant = "default",
}: ColorPickerProps) {
  const [selected, setSelected] = useState(selectedColor)

  const handleColorSelect = (color: string) => {
    setSelected(color)
    onColorChange?.(color)
  }

  const getColorSize = () => {
    switch (size) {
      case "sm":
        return "w-6 h-6"
      case "lg":
        return "w-12 h-12"
      default:
        return "w-8 h-8"
    }
  }

  const getGridCols = () => {
    switch (variant) {
      case "compact":
        return "grid-cols-8"
      case "grid":
        return "grid-cols-4"
      default:
        return "grid-cols-4 sm:grid-cols-8"
    }
  }

  if (variant === "compact") {
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <div className={`grid ${getGridCols()} gap-2`}>
          {colorOptions.map((color) => (
            <button
              key={color.value}
              onClick={() => handleColorSelect(color.value)}
              className={`${color.bgClass} ${getColorSize()} rounded-full border-2 transition-all duration-200 ${
                selected === color.value
                  ? "border-gray-900 scale-110 shadow-lg"
                  : "border-gray-200 hover:border-gray-400 hover:scale-105"
              }`}
              title={color.label}
            >
              {selected === color.value && (
                <Check
                  className={`${size === "sm" ? "w-3 h-3" : size === "lg" ? "w-6 h-6" : "w-4 h-4"} text-white mx-auto`}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {label && <label className="text-sm font-medium text-gray-700" >{label}</label>}

      {variant === "grid" ? (
        <div className={`grid ${getGridCols()} gap-3`}>
          {colorOptions.map((color) => (
            <Card
              key={color.value}
              className={`border-2 transition-all duration-200 cursor-pointer ${
                selected === color.value
                  ? "border-gray-900 shadow-lg scale-105"
                  : "border-gray-200 hover:border-gray-400 hover:scale-102"
              }`}
              isPressable
              onPress={() => handleColorSelect(color.value)}
            >
              <CardBody className="p-3 flex flex-col items-center space-y-2">
                <div className={`${color.bgClass} ${getColorSize()} rounded-full flex items-center justify-center`}>
                  {selected === color.value && (
                    <Check
                      className={`${size === "sm" ? "w-3 h-3" : size === "lg" ? "w-6 h-6" : "w-4 h-4"} text-white`}
                    />
                  )}
                </div>
                <span className="text-xs font-medium text-gray-700">{color.label}</span>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border border-gray-200 mt-2">
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Selected Color</span>
              <Chip size="sm" variant="flat" className="bg-gray-100 text-gray-700">
                {colorOptions.find((c) => c.value === selected)?.label}
              </Chip>
            </div>

            <div className={`grid ${getGridCols()} gap-3`}>
              {colorOptions.map((color) => (
                <Button
                  key={color.value}
                  className={`${color.bgClass} ${color.hoverClass} ${getColorSize()} min-w-0 p-0 border-2 transition-all duration-200 ${
                    selected === color.value
                      ? "border-gray-900 scale-110 shadow-lg"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  onPress={() => handleColorSelect(color.value)}
                  title={color.label}
                >
                  {selected === color.value && (
                    <Check
                      className={`${size === "sm" ? "w-3 h-3" : size === "lg" ? "w-6 h-6" : "w-4 h-4"} text-white`}
                    />
                  )}
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
}
