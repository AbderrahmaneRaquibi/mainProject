"use client"; // Ensures this is treated as a Client Component

import { useEffect, useState } from "react";

export default function Terminal() {
  const [socket, setSocket] = useState(null);
  const [output, setOutput] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent SSR issues

    const ws = new WebSocket("ws://localhost:8086/ws");

    ws.onopen = () => {
      console.log("Connected to ttyd WebSocket");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      setOutput((prev) => prev + event.data + "\n");
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      setIsConnected(false);
    };

    ws.onerror = (err) => console.error("WebSocket error:", err);

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendCommand = () => {
    if (socket && isConnected) {
      socket.send("dir\n"); // Replace with your command
    } else {
      console.error("WebSocket not connected");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl mb-2">Live Terminal</h1>

      <div className="w-full h-[300px] bg-black text-green-400 p-2 overflow-auto border rounded">
        <pre>{output}</pre>
      </div>

      <button
        onClick={sendCommand}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!isConnected}
      >
        {isConnected ? "Run `dir`" : "Connecting..."}
      </button>
    </div>
  );
}
