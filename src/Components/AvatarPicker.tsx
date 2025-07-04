import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Card,
  CardBody,
} from "@heroui/react";
import { Check, User } from "lucide-react";

// Predefined avatars with unique IDs
const avatarOptions = [
  {
    id: "avatar1",
    src: "/avatar1.svg?height=80&width=80&text=👨‍💼",
    alt: "Avatar",
    category: "Professional",
  },
  {
    id: "avatar2",
    src: "/avatar2.svg?height=80&width=80&text=👩‍💼",
    alt: "Professional Woman",
    category: "Professional",
  },
  {
    id: "avatar3",
    src: "/avatar3.svg?height=80&width=80&text=👨‍💻",
    alt: "Developer Man",
    category: "Tech",
  },
  {
    id: "avatar4",
    src: "/avatar4.svg?height=80&width=80&text=👩‍💻",
    alt: "Developer Woman",
    category: "Tech",
  },
  {
    id: "avatar5",
    src: "/avatar5.svg?height=80&width=80&text=👨‍🎓",
    alt: "Student Man",
    category: "Academic",
  },
  {
    id: "avatar6",
    src: "/avatar6.svg?height=80&width=80&text=👩‍🔬",
    alt: "Scientist Woman",
    category: "Academic",
  },
  {
    id: "avatar7",
    src: "/avatar7.svg?height=80&width=80&text=👨‍🎨",
    alt: "Artist Man",
    category: "Creative",
  },
  {
    id: "avatar8",
    src: "/avatar8.svg?height=80&width=80&text=👩‍🎨",
    alt: "Artist Woman",
    category: "Creative",
  },
  {
    id: "avatar9",
    src: "/avatar9.svg?height=80&width=80&text=🧑‍🚀",
    alt: "Astronaut",
    category: "Fun",
  },
  {
    id: "avatar10",
    src: "/avatar10.svg?height=80&width=80&text=🦸‍♂️",
    alt: "Superhero Man",
    category: "Fun",
  },
  {
    id: "avatar11",
    src: "/avatar11.svg?height=80&width=80&text=🦸‍♀️",
    alt: "Superhero Woman",
    category: "Fun",
  },
  {
    id: "avatar12",
    src: "/avatar12.svg?height=80&width=80&text=🤖",
    alt: "Robot",
    category: "Tech",
  }
];

interface AvatarPickerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentAvatarId?: string;
  onAvatarSelect: (avatarId: string, avatarSrc: string) => void;
  isLoading?: boolean;
}

export default function AvatarPicker({
  isOpen,
  onOpenChange,
  currentAvatarId,
  onAvatarSelect,
  isLoading = false,
}: AvatarPickerProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAvatarId, setSelectedAvatarId] = useState(
    currentAvatarId || ""
  );

  const filteredAvatars = avatarOptions.filter(
    (avatar) =>
      selectedCategory === "All" || avatar.category === selectedCategory
  );

  const handleAvatarClick = (avatarId: string) => {
    setSelectedAvatarId(avatarId);
  };

  const handleSave = () => {
    const selectedAvatar = avatarOptions.find(
      (avatar) => avatar.id === selectedAvatarId
    );
    if (selectedAvatar) {
      onAvatarSelect(selectedAvatar.id, selectedAvatar.src);
    }
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSelectedAvatarId(currentAvatarId || "");
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      placement="center"
      classNames={{
        base: "max-h-[90vh]",
        body: "py-6",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Choose Your Avatar
                </h2>
              </div>
              <p className="text-sm text-gray-600 font-normal">
                Select an avatar that represents you
              </p>
            </ModalHeader>

            <ModalBody>
              {/* Category Filter */}
              {/* <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      size="sm"
                      variant={selectedCategory === category ? "solid" : "flat"}
                      className={
                        selectedCategory === category
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }
                      onPress={() => setSelectedCategory(category)}
                      startContent={category === "Premium" ? <Sparkles className="w-3 h-3" /> : undefined}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div> */}

              {/* Current Selection Preview */}
              {selectedAvatarId && (
                <Card className="mb-6 border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
                  <CardBody className="p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar
                        src={
                          avatarOptions.find((a) => a.id === selectedAvatarId)
                            ?.src
                        }
                        size="lg"
                        className="border-2 border-white shadow-lg"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Selected Avatar
                        </h4>
                        
                        
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Avatar Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 max-h-80 overflow-y-auto p-4">
                {filteredAvatars.map((avatar) => (
                  <div key={avatar.id} className="relative">
                    <button
                      onClick={() => handleAvatarClick(avatar.id)}
                      className={`relative w-full aspect-square rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                        selectedAvatarId === avatar.id
                          ? "border-blue-600 shadow-lg scale-105"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      title={avatar.alt}
                    >
                      <Avatar
                        src={avatar.src}
                        className="w-full h-full"
                        classNames={{
                          base: "w-full h-full",
                          img: "object-cover",
                        }}
                      />

                      {/* Selection Indicator */}
                      {selectedAvatarId === avatar.id && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>

                    {/* Avatar Label */}
                    
                  </div>
                ))}
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                onPress={handleSave}
                isDisabled={!selectedAvatarId || isLoading}
                isLoading={isLoading}
              >
                {isLoading ? "Saving..." : "Save Avatar"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
