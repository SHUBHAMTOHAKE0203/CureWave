import React, { useState, useEffect } from "react";
import axios from "axios";
import { MessageCircle, X, Send } from "lucide-react";

const CuremateLogo = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10">
    <circle cx="20" cy="20" r="18" fill="#ffffff" />
    <path
      d="M20 8 L20 32 M8 20 L32 20"
      stroke="#3B82F6"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle cx="20" cy="20" r="16" stroke="#3B82F6" strokeWidth="2" fill="none" />
  </svg>
);

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Dialogflow configurations
  const projectId = "health-gnmj";
  const sessionId = "441c5750-a3bf-4f78-968e-8256b5278700";
  const dialogflowUrl = `https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${sessionId}:detectIntent`;

  const sendMessage = async (message) => {
    try {
      const accessToken = "ya29.c.c0ASRK0GZC6I9YILTmKca1YrL55vlmhJyWuvI5B9g2MAPVr2oXunyJN9glxZYOP6-VrVQpSNc6-tWXND2VNKzIbadWpaRPYtqo0qLFUJFBy48azq7Vzo9uuANJrb-ADN523fYng9zqW0QKcejzhST2XLTVGr9skMfC5JFGETC9egRS2XfbhCwD3NhKX31Byg4Hp9gfAvYpXVQlLwn-PoVJPHD8P-zRh_2sZTQkUt9sQGO48llwBO-DVeUV8AP2hCSMIAGn0Rvx8UT4WGk1_G3QBOrMvYwklk82RjqWRfQBrrvNBrU6QxT_WjAR6YIUXqHAa5dGr45A8ZR8F-AFs55LG72OQ4r-FzwbjIECCkdihucOTcQlWutUn0YL384Pl0wtQWX7ubuvwQ0W19lYbJrsYzunR9v39ouIfvhd2RxFlVg3j3gm6SaI-3qvVv1QvjxxVadznW1anesdm6eVmtfSIp0S9_zemISrBd75i9Q09g17Y6uWM_1ic1a6zSnakrWl9u9YvRqtY5-owdQiaQp9WqfYWU4jRF1pSmj_37zwYUQXQB6RpZ1cy-8qIdneqVS17cZSbY1Z6IfVxb0UmRJs9zwe__ehlzBsinZXSYm3J-BOia_JsdYIzVY4ksu4I-VOnJt4yyZiy9bBpd6ySaIa_ji569-nWYsFi8JVMsMhbi-83So_Bp-hWm_p4QIf4-rOmYdSIh1hbOYYXtajx6-VxztYcIiR0aeF8MvVZ2kcjc-O_0z9gktbYQeBv_gMqxio-oseQ734M2g8gIYc0rR2_BuJQnuy9VF_OnckxVkxiu1pqoUZWMdSXIRWWx3gse_qZdVYxQU-Ff5chxVzs0yVo6aaxaJw3Sv3ZssltuuBzjk23Qbs-4fnojQk-2fU0dnUx7UhfqhF-B5MSqmS7Sh0ii3jJV1j0g9wdMU14aajlFB_bsqk0O8d4kfqgQ9nF0Ywakhpnk4yo45_sw0o9fnsepSb1OoWg5bBv8wm1rIY4rM59O55b21-omu";
      
      const response = await axios.post(
        dialogflowUrl,
        {
          queryInput: {
            text: {
              text: message,
              languageCode: "en",
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const botResponse = response.data.queryResult.fulfillmentText || "No response";
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
      setIsTyping(false);
    } catch (error) {
      console.error("Error communicating with Dialogflow:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
      setIsTyping(false);
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { sender: "user", text: input.trim() };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      setIsTyping(true);
      await sendMessage(input.trim());
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            sender: "bot",
            text: "Hello! I'm your CureMate assistant. How may I help you today?",
          },
        ]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform ${
          isOpen ? "rotate-180" : "animate-bounce"
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white flex items-center space-x-3">
            <div className="flex-shrink-0">
              <CuremateLogo />
            </div>
            <div>
              <h3 className="font-bold text-lg">CureMate</h3>
              <p className="text-sm opacity-90">Your Healthcare Assistant</p>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] mb-4 ${
                  msg.sender === "user" ? "ml-auto" : "mr-auto"
                }`}
              >
                <div
                  className={`rounded-lg p-3 shadow-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                      : "bg-white text-gray-800 border border-gray-100"
                  } animate-fadeIn`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex space-x-2 p-3 bg-white rounded-lg w-16 animate-pulse shadow-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <button
                onClick={handleSend}
                className="p-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
