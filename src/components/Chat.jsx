import React, { useState, useEffect } from "react";
import { supabase } from "../components/supabaseClient";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState(null);

  // Fetch messages from Supabase
  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const { error } = await supabase.from("messages").insert({
        content: newMessage,
        user_id: userId,
      });

      if (error) {
        console.error("Error sending message:", error);
      } else {
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Listen for real-time updates
  const listenForMessages = () => {
    const subscription = supabase
      .from("messages")
      .on("INSERT", (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          console.error("Error fetching user:", error);
        } else {
          setUserId(user?.id || null);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUser();
    fetchMessages();

    const unsubscribe = listenForMessages();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div id="chat" className="--dark-theme">
      <div className="chat__conversation-board">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat__conversation-board__message-container ${
              msg.user_id === userId ? "reversed" : ""
            }`}
          >
            <div className="chat__conversation-board__message__context">
              <div className="chat__conversation-board__message__bubble">
                <span>{msg.content}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="chat__conversation-panel">
        <input
          className="chat__conversation-panel__input"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="chat__conversation-panel__button"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
