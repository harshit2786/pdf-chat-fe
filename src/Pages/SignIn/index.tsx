
import type React from "react"

import { useState } from "react"
import { Button, Card, CardBody, Input, Link, Tab, Tabs, Divider, Checkbox } from "@heroui/react"
import { FileText, Eye, EyeOff, Mail, Lock, User } from "lucide-react"

export default function AuthPage() {
  const [selected, setSelected] = useState("signin")
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-foreground">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PDFChat</span>
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
            ← Back to Home
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <Card className="border-none shadow-2xl">
            <CardBody className="p-8">
              {/* Welcome Text */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {selected === "signin" ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-gray-600">
                  {selected === "signin"
                    ? "Sign in to continue chatting with your PDFs"
                    : "Join thousands of users managing their documents"}
                </p>
              </div>

              {/* Tabs */}
              <Tabs
                selectedKey={selected}
                onSelectionChange={(key) => setSelected(key as string)}
                className="w-full mb-6"
                classNames={{
                  tabList: "grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg",
                  cursor: "bg-white shadow-sm",
                  tab: "h-10 font-medium",
                  tabContent: "group-data-[selected=true]:text-blue-600",
                }}
              >
                <Tab key="signin" title="Sign In" />
                <Tab key="signup" title="Sign Up" />
              </Tabs>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {selected === "signup" && (
                  <Input
                    type="text"
                    // label="Full Name"
                    placeholder="Enter your full name"
                    startContent={<User className="w-4 h-4 text-gray-400" />}
                    variant="bordered"
                    classNames={{
                      input: "text-gray-900 outline-none",
                      inputWrapper: "border-gray-200 hover:border-blue-400",
                    }}
                    required
                  />
                )}

                <Input
                  type="email"
                //   label="Email"
                  placeholder="Enter your email"
                  startContent={<Mail className="w-4 h-4 text-gray-400" />}
                  variant="bordered"
                  classNames={{
                    input: "text-gray-900 outline-none",
                    inputWrapper: "border-gray-200 hover:border-blue-400 focus-within:border-blue-600",
                  }}
                  required
                />

                <Input
                //   label="Password"
                  placeholder="Enter your password"
                  startContent={<Lock className="w-4 h-4 text-gray-400" />}
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                  classNames={{
                    input: "text-gray-900 outline-none",
                    inputWrapper: "border-gray-200 hover:border-blue-400 focus-within:border-blue-600",
                  }}
                  required
                />

                {selected === "signup" && (
                  <Input
                    // label="Confirm Password"
                    placeholder="Confirm your password"
                    startContent={<Lock className="w-4 h-4 text-gray-400" />}
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                    classNames={{
                      input: "text-gray-900 outline-none    ",
                      inputWrapper: "border-gray-200 hover:border-blue-400 focus-within:border-blue-600",
                    }}
                    required
                  />
                )}

                

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold h-12 text-base"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading
                    ? selected === "signin"
                      ? "Signing In..."
                      : "Creating Account..."
                    : selected === "signin"
                      ? "Sign In"
                      : "Create Account"}
                </Button>
              </form>

              {/* Footer Text */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  {selected === "signin" ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setSelected(selected === "signin" ? "signup" : "signin")}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {selected === "signin" ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Security Notice */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              Protected by industry-standard encryption. Your data is secure with us.
            </p>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
