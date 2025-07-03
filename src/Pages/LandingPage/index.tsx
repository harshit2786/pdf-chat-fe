
import { Button, Card, CardBody, Chip } from "@heroui/react"
import { FileText, FolderPlus, MessageSquare, Upload } from "lucide-react"
import { useNavigate } from "raviger"

export default function LandingPage() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/login')
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PDFChat</span>
          </div>
          <Button
            onPress={handleNavigate}
            color="primary"
            variant="solid"
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
          >
            Login
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Chip color="primary" variant="flat" className="mb-6">
            AI-Powered Document Intelligence
          </Chip>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Chat with Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> PDFs</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Organize your documents in folders, upload multiple PDFs, and have intelligent conversations with your
            content. Get instant answers from all your documents at once.
          </p>

          <Button
            onPress={handleNavigate}
            color="primary"
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-3 text-lg"
          >
            Get Started - Login
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make document management and querying effortless
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardBody className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FolderPlus className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Folders</h3>
              <p className="text-gray-600 leading-relaxed">
                Organize your documents by creating custom folders. Keep related PDFs together for better management and
                targeted queries.
              </p>
            </CardBody>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardBody className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload PDFs</h3>
              <p className="text-gray-600 leading-relaxed">
                Easily upload multiple PDF documents to your folders. Support for batch uploads and automatic content
                indexing.
              </p>
            </CardBody>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardBody className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Query & Chat</h3>
              <p className="text-gray-600 leading-relaxed">
                Ask questions about your documents and get intelligent answers. Query across all PDFs in a folder
                simultaneously.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Get started in three simple steps</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Folders</h3>
                <p className="text-gray-600">Set up organized folders for different projects or topics</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload PDFs</h3>
                <p className="text-gray-600">Add your PDF documents to the relevant folders</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Chatting</h3>
                <p className="text-gray-600">Ask questions and get instant answers from your documents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
            <div className="text-gray-600">Documents Processed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Document Workflow?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already chatting with their PDFs and getting instant insights.
          </p>
          <Button
            onPress={handleNavigate}
            color="default"
            size="lg"
            className="bg-white text-blue-600 font-semibold px-8 py-3 text-lg hover:bg-gray-50"
          >
            Login to Get Started
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">PDFChat</span>
            </div>
            <div className="text-gray-400">© 2024 PDFChat. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
