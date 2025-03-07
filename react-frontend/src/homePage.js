import React from "react";
import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { UploadCloud, Send } from "lucide-react";

export default function HomePage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            setUploadStatus("Uploading...");
            const response = await fetch("http://localhost:8080/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            setUploadStatus(`Upload successful: ${result.message}`);
        } catch (error) {
            setUploadStatus("Upload failed. Please try again.");
        }
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() === "") return;
        setMessages([...messages, { text: inputMessage, sender: "user" }]);
        setInputMessage("");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-md p-6 shadow-lg rounded-lg bg-white">
                <CardContent className="flex flex-col items-center space-y-4">
                    <h2 className="text-xl font-semibold">Upload a PDF File</h2>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="border p-2 rounded w-full"
                    />
                    <Button onClick={handleUpload} className="w-full flex items-center gap-2 bg-blue-500 text-white">
                        <UploadCloud /> Upload
                    </Button>
                    {uploadStatus && <p className="text-sm text-gray-700">{uploadStatus}</p>}
                </CardContent>
            </Card>

            <div className="w-full max-w-md mt-6 p-4 bg-white shadow-lg rounded-lg flex flex-col h-80 overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-2 p-2">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-2 rounded-lg max-w-[75%] ${msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 border-t p-2">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 p-2 border rounded-lg"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <Button onClick={handleSendMessage} className="bg-green-500 text-white flex items-center gap-2">
                        <Send />
                    </Button>
                </div>
            </div>
        </div>
    );
}
