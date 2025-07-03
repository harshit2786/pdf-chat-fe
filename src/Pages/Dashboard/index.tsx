import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Pagination,
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
  Input,
  useDisclosure,
} from "@heroui/react";
import {
  FileText,
  FolderPlus,
  Folder,
  MoreVertical,
  Plus,
  Search,
  Settings,
  LogOut,
  Calendar,
  File,
  ArrowRight,
  Edit,
  Trash,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  createFolder,
  deleteFolder,
  fetchFolderList,
  updateFolder,
  type FinalListResponse,
} from "./api";
import { useAuthHook } from "../../hooks/useAuth";
import { formatTimestampToDate } from "../../Utils/api";
import ColorPicker from "../../Components/ColorPicker";
import toast from "react-hot-toast";
import { navigate } from "raviger";

export default function DashboardPage() {
  const [selectedUpdateId, setSelectedUpdateId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { token, user, signOut } = useAuthHook();
  const {
    data: folderResp,
    refetch,
    isFetching,
  } = useQuery<FinalListResponse>({
    queryKey: ["folders"],
    queryFn: () => fetchFolderList(token!, currentPage, searchQuery),
    enabled: false,
    retry: false,
  });
  const handleMutate = async () => {
    if (!newFolderDescription.trim() || !newFolderName.trim()) {
      toast.error("Please fill required fields");
      return;
    }
    if (selectedUpdateId) {
      await updateFolder(
        token!,
        newFolderName.trim(),
        newFolderDescription.trim(),
        newFolderColor,
        selectedUpdateId
      );
    } else {
      await createFolder(
        token!,
        newFolderName.trim(),
        newFolderDescription.trim(),
        newFolderColor
      );
    }
    await refetch();
    setNewFolderDescription("");
    setNewFolderColor("bg-blue-500");
    setNewFolderName("");
    onOpenChange();
  };
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderDescription, setNewFolderDescription] = useState("");
  const [newFolderColor, setNewFolderColor] = useState("bg-blue-500");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      refetch().then((res) => {
        const data = res.data;
        if (data && currentPage !== data.currentPage) {
          setCurrentPage(data.currentPage); // Adjust page if out-of-bound
        }
      });
    }, 1000); // debounce of 1000ms

    return () => clearTimeout(debounceTimeout); // cleanup
  }, [currentPage, searchQuery]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on new search
  }, [searchQuery]);

  if (!folderResp) {
    return <>Loading...</>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PDFChat</span>
            </div>

            {/* User Menu */}
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button variant="light" className="p-0 min-w-0 h-auto">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700 hidden sm:block">
                      {user?.name}
                    </span>
                    <Avatar
                      size="sm"
                      src="/placeholder.svg?height=32&width=32"
                      className="w-8 h-8"
                      fallback="JD"
                    />
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu">
                <DropdownItem
                  key="profile"
                  startContent={<Settings className="w-4 h-4" />}
                >
                  Profile Settings
                </DropdownItem>
                <DropdownItem
                  onPress={signOut}
                  key="logout"
                  startContent={<LogOut className="w-4 h-4" />}
                  className="text-danger"
                  color="danger"
                >
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {user?.name}
            </span>
            ! 👋
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Manage your document folders and start chatting with your PDFs.
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              variant="bordered"
              classNames={{
                input: "text-gray-900 outline-none",
                inputWrapper:
                  "border-gray-200 hover:border-blue-400 focus-within:border-blue-600",
              }}
            />
          </div>
          <Button
            onPress={() => {
              setSelectedUpdateId(null);
              onOpen();
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
            startContent={<Plus className="w-4 h-4" />}
          >
            New Folder
          </Button>
        </div>

        {/* Folders Grid */}
        {isFetching ? (
          <>Loading...</>
        ) : folderResp.folders.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {folderResp.folders.map((folder) => (
                <Card
                  key={folder.id}
                  className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  isPressable
                  onPress={() => navigate(`/folder/${folder.id}`)}
                >
                  <CardBody className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 ${folder.color} rounded-lg flex items-center justify-center`}
                      >
                        <Folder className="w-6 h-6 text-white" />
                      </div>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            variant="light"
                            size="sm"
                            className="min-w-0 w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Folder actions">
                          <DropdownItem
                            onPress={() => navigate(`/folder/${folder.id}`)}
                            startContent={<ArrowRight className=" size-4" />}
                            key="open"
                          >
                            Open Folder
                          </DropdownItem>
                          <DropdownItem
                            startContent={<Edit className=" size-4" />}
                            onPress={() => {
                              setSelectedUpdateId(folder.id);
                              setNewFolderColor(folder.color);
                              setNewFolderDescription(folder.description);
                              setNewFolderName(folder.name);
                              onOpen();
                            }}
                            key="rename"
                          >
                            Update
                          </DropdownItem>
                          <DropdownItem
                            startContent={<Trash className=" size-4" />}
                            onPress={async () => {
                              await deleteFolder(token!, folder.id);
                              await refetch();
                            }}
                            key="delete"
                            className="text-danger"
                            color="danger"
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {folder.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {folder.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <Chip
                        size="sm"
                        variant="flat"
                        startContent={<File className="w-3 h-3" />}
                        className="bg-gray-100 text-gray-700"
                      >
                        {folder.pdfNum} files
                      </Chip>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatTimestampToDate(folder.createdAt)}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {folderResp.totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  total={folderResp.totalPages}
                  page={currentPage}
                  onChange={setCurrentPage}
                  showControls
                  classNames={{
                    cursor:
                      "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
                  }}
                />
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FolderPlus className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? "No folders found" : "No folders yet"}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchQuery
                ? `No folders match "${searchQuery}". Try a different search term.`
                : "Create your first folder to start organizing and chatting with your PDFs."}
            </p>
            {!searchQuery && !isFetching && (
              <Button
                onPress={() => {
                  setSelectedUpdateId(null);
                  onOpen();
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
                startContent={<Plus className="w-4 h-4" />}
              >
                Create Your First Folder
              </Button>
            )}
          </div>
        )}
      </main>

      {/* Create Folder Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Folder
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Folder Name"
                  labelPlacement="outside-top"
                  placeholder="Enter folder name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  variant="bordered"
                  classNames={{
                    input: "text-gray-900 outline-none",
                    inputWrapper:
                      "border-gray-200 hover:border-blue-400 focus-within:border-blue-600",
                  }}
                />
                <Input
                  label="Folder Description"
                  labelPlacement="outside-top"
                  placeholder="Enter folder description"
                  value={newFolderDescription}
                  onChange={(e) => setNewFolderDescription(e.target.value)}
                  variant="bordered"
                  classNames={{
                    input: "text-gray-900 outline-none",
                    inputWrapper:
                      "border-gray-200 hover:border-blue-400 focus-within:border-blue-600",
                  }}
                />
                <ColorPicker
                  selectedColor={newFolderColor}
                  onColorChange={setNewFolderColor}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  onPress={handleMutate}
                  isDisabled={
                    !newFolderName.trim() || !newFolderDescription.trim()
                  }
                >
                  {selectedUpdateId ? "Update Folder" : "Create Folder"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
