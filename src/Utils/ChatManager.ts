import toast from "react-hot-toast";
import type { Message } from "../Pages/Folder";

export class ChatManager {
  private folderId: string;
  private ws: WebSocket | null;

  constructor(folderId: string) {
    this.folderId = folderId;
    this.ws = null;
  }

  public checkConnection() {
    return this.ws && this.ws.readyState === WebSocket.OPEN ? true : false;
  }

  public sendMessage(
    setMessage: React.Dispatch<React.SetStateAction<Message[]>>,
    query: string,
    index: string,
    history: Message[]
  ) {
    // Add user message immediately
    const queryToSend = JSON.stringify([
      ...history,
      { id: index, type: "user", content: query },
    ]);
    setMessage((prev) => [
      ...prev,
      { id: index, type: "user", content: query },
    ]);

    // Create new WebSocket connection
    this.ws = new WebSocket(
      import.meta.env.REACT_APP_WS_ADDRESS ?? "ws://localhost:8000"
    );

    this.ws.onopen = () => {
      // Send the query to server when connection opens
      this.ws?.send(
        JSON.stringify({
          query: queryToSend,
          folderId: this.folderId,
          message_id: index,
        })
      );
    };

    this.ws.onmessage = (event) => {
      const newMes = JSON.parse(event.data);

      
      if (newMes.type === "error") {
        toast.error(newMes.data);
      }

      if (
        newMes.message_id === String(Number(index) + 1) &&
        newMes.type === "token"
      ) {
        setMessage((prev) => {
          // Find if AI message already exists
          const existingIndex = prev.findIndex(
            (m) => m.id === newMes.message_id
          );

          if (existingIndex >= 0) {
            // Append to existing message
            return prev.map((msg, i) =>
              i === existingIndex
                ? { ...msg, content: msg.content + newMes.data }
                : msg
            );
          } else {
            // Create new AI message
            return [
              ...prev,
              {
                id: newMes.message_id,
                type: "ai",
                content: newMes.data,
              },
            ];
          }
        });
      }
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }

  public closeConnection() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
