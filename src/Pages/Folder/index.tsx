import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
  Divider,
  Textarea,
} from "@heroui/react";
import {
  FileText,
  MoreVertical,
  Send,
  ArrowLeft,
  Download,
  Trash2,
  Plus,
  Bot,
  User,
  Paperclip,
} from "lucide-react";
import { useAuthHook } from "../../hooks/useAuth";
import { fetchSingleFolder, type SingleFolder } from "./api";
import { useQuery } from "@tanstack/react-query";
import { formatTimestampToDate, setBaseUrl } from "../../Utils/api";
import toast from "react-hot-toast";

// Mock data for PDFs in folder
const mockPDFs = [
  {
    id: 1,
    name: "Research_Paper_AI_2024.pdf",
    size: "2.4 MB",
    uploadedAt: "2024-01-20",
    pages: 24,
  },
  {
    id: 2,
    name: "Machine_Learning_Fundamentals.pdf",
    size: "5.1 MB",
    uploadedAt: "2024-01-18",
    pages: 156,
  },
  {
    id: 3,
    name: "Deep_Learning_Architecture.pdf",
    size: "3.8 MB",
    uploadedAt: "2024-01-15",
    pages: 89,
  },
  {
    id: 4,
    name: "Neural_Networks_Guide.pdf",
    size: "1.9 MB",
    uploadedAt: "2024-01-12",
    pages: 45,
  },
  {
    id: 5,
    name: "Computer_Vision_Techniques.pdf",
    size: "4.2 MB",
    uploadedAt: "2024-01-10",
    pages: 112,
  },
];

// Mock chat messages
const initialMessages = [
  {
    id: 1,
    type: "ai" as const,
    content:
      "Hello! I'm ready to help you with questions about your PDFs. What would you like to know?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
];

interface Message {
  id: number;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  sources?: string[];
}

export default function FolderPage({ params }: { params: { id: string } }) {
  const { token, user } = useAuthHook();
  const {
    data: folderResp,
    refetch,
    isFetching,
  } = useQuery<SingleFolder>({
    queryKey: ["folder", params.id],
    queryFn: () => fetchSingleFolder(token!, params.id),
    enabled: true,
    retry: false,
  });
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: `Based on your PDFs, I can help you with that question. Here's what I found in your documents...`,
        timestamp: new Date(),
        sources: [
          "Research_Paper_AI_2024.pdf",
          "Machine_Learning_Fundamentals.pdf",
        ],
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (files.length > 1) {
        toast.error("You can add only file at a time!");
        setSelectedFiles(null);
        onOpen();
        return;
      }
      setSelectedFiles(files);
      onOpen();
    }
  };

  const confirmUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const formData = new FormData();
    formData.append("file", selectedFiles[0]); // Uploading first file for simplicity

    try {
      const res = await fetch(setBaseUrl(`/pdf/upload/${params.id}`), {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // if auth protected
        },
      });

      if (!res.ok) {
        toast.error("Error uploading file");
        throw new Error("Upload failed");
      }

      await res.json();
      toast.success("File uploaded successfully");
      await refetch();
    } catch (e) {
      console.error(e);
    }

    setSelectedFiles(null);
    onOpenChange(); // Close modal
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  if (!folderResp) {
    return <>Loading...</>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="light"
                size="sm"
                startContent={<ArrowLeft className="w-4 h-4" />}
                className="text-gray-600 hover:text-gray-900"
              >
                Back to Dashboard
              </Button>
              <Divider orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {folderResp.name}
                </h1>
                <p className="text-sm text-gray-600">
                  {folderResp.pdfs.length} documents
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PDFChat</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - PDF List */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Upload Section */}
          <div className="p-4 border-b border-gray-100">
            <Button
              onPress={handleFileUpload}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
              startContent={<Plus className="w-4 h-4" />}
            >
              Upload PDFs
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* PDF List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Documents
              </h3>
              <div className="space-y-2">
                {folderResp.pdfs.map((pdf) => (
                  <Card
                    fullWidth
                    isPressable
                    onPress={() => window.open(pdf.url)}
                    key={pdf.id}
                    className="border border-gray-100 hover:border-blue-200 transition-colors"
                  >
                    <CardBody className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0 flex flex-col gap-2">
                          <div className="flex items-center space-x-2 mb-1">
                            <FileText className="w-4 h-4 text-red-500 flex-shrink-0" />
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {pdf.fileName}
                            </h4>
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <span>
                              <Chip
                                size="sm"
                                variant="flat"
                                color={
                                  pdf.status === "INQUEUE"
                                    ? "warning"
                                    : "success"
                                }
                              >
                                {pdf.status}
                              </Chip>
                            </span>
                            {pdf.status === "PROCESSED" && <span>{pdf.totalPages} pages</span>}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {formatTimestampToDate(pdf.uploadedAt)}
                          </div>
                        </div>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              variant="light"
                              size="sm"
                              className="min-w-0 w-6 h-6 p-0"
                            >
                              <MoreVertical className="w-3 h-3" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="PDF actions">
                            <DropdownItem
                              key="download"
                              startContent={<Download className="w-4 h-4" />}
                            >
                              Download
                            </DropdownItem>
                            <DropdownItem
                              key="delete"
                              startContent={<Trash2 className="w-4 h-4" />}
                              className="text-danger"
                              color="danger"
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Chat Interface */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                <p className="text-sm text-gray-600">
                  Ask questions about your {folderResp.pdfs.length} documents
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex space-x-3 max-w-3xl ${
                    message.type === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <Avatar
                    size="sm"
                    className={`flex-shrink-0 ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600"
                        : "bg-gray-100"
                    }`}
                    fallback={
                      message.type === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-600" />
                      )
                    }
                  />
                  <div
                    className={`flex flex-col ${
                      message.type === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                    {message.sources && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {message.sources.map((source, index) => (
                          <Chip
                            key={index}
                            size="sm"
                            variant="flat"
                            className="text-xs"
                          >
                            <Paperclip className="w-3 h-3 mr-1" />
                            {source}
                          </Chip>
                        ))}
                      </div>
                    )}
                    <span className="text-xs text-gray-500 mt-1">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex space-x-3 max-w-3xl">
                  <Avatar
                    size="sm"
                    className="bg-gray-100 flex-shrink-0"
                    fallback={<Bot className="w-4 h-4 text-gray-600" />}
                  />
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                    <Spinner size="sm" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex space-x-3">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question about your documents..."
                variant="bordered"
                classNames={{
                  input: "text-gray-900 outline-none",
                  inputWrapper:
                    "border-gray-200 hover:border-blue-400 focus-within:border-blue-600",
                }}
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white min-w-0 px-4"
                isDisabled={!inputMessage.trim() || isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>

      {/* Upload Confirmation Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload PDFs
              </ModalHeader>
              <ModalBody>
                <p className="text-gray-600">
                  You're about to upload {selectedFiles?.length} file(s) to "
                  {folderResp.name}".
                </p>
                {selectedFiles && (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {Array.from(selectedFiles).map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 bg-gray-50 rounded"
                      >
                        <FileText className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-900 flex-1 truncate">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(1)} MB
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  onPress={confirmUpload}
                >
                  Upload Files
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
