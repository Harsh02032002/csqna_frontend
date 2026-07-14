document.addEventListener("DOMContentLoaded", function () {
    // 1. Inject HTML structure
    const chatContainer = document.createElement("div");
    chatContainer.id = "csqna-chatbot-container";
    chatContainer.innerHTML = `
        <div id="chatbot-window">
            <div id="chatbot-header">
                CSQNA AI Assistant
                <button id="chatbot-close-btn">&times;</button>
            </div>
            <div id="chatbot-messages">
                <div class="chat-msg ai">Hello! I am the CSQNA AI Assistant. How can I help you with your cybersecurity certifications today?</div>
            </div>
            <div id="chatbot-input-container">
                <input type="text" id="chatbot-input" placeholder="Type your message..." />
                <button id="chatbot-send-btn">&#10148;</button>
            </div>
        </div>
        <button id="chatbot-toggle-btn">&#128172;</button>
    `;
    document.body.appendChild(chatContainer);

    // 2. DOM Elements
    const toggleBtn = document.getElementById("chatbot-toggle-btn");
    const closeBtn = document.getElementById("chatbot-close-btn");
    const chatWindow = document.getElementById("chatbot-window");
    const sendBtn = document.getElementById("chatbot-send-btn");
    const chatInput = document.getElementById("chatbot-input");
    const messagesContainer = document.getElementById("chatbot-messages");

    // Message History for Context
    let messageHistory = [];

    // 3. Event Listeners
    toggleBtn.addEventListener("click", () => {
        chatWindow.classList.add("open");
        toggleBtn.style.display = "none";
    });

    closeBtn.addEventListener("click", () => {
        chatWindow.classList.remove("open");
        toggleBtn.style.display = "flex";
    });

    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    sendBtn.addEventListener("click", sendMessage);

    // 4. Send Message Logic
    async function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        appendMessage("user", text);
        chatInput.value = "";
        
        // Add to history
        messageHistory.push({ role: "user", content: text });

        // Show typing indicator
        const typingId = showTypingIndicator();
        sendBtn.disabled = true;

        try {
            // Determine API URL based on environment (development vs production)
            const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
                ? 'http://localhost:5003/v1/chat' 
                : 'https://api.csqna.com/v1/chat';

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ messages: messageHistory })
            });

            removeTypingIndicator(typingId);
            sendBtn.disabled = false;

            const data = await response.json();

            if (data.status === true && data.data && data.data.choices && data.data.choices.length > 0) {
                const aiResponse = data.data.choices[0].message.content;
                appendMessage("ai", aiResponse);
                messageHistory.push({ role: "assistant", content: aiResponse });
            } else {
                appendMessage("ai", "Sorry, I am having trouble connecting right now. " + (data.message || ""));
            }

        } catch (error) {
            removeTypingIndicator(typingId);
            sendBtn.disabled = false;
            console.error("Chatbot Error:", error);
            appendMessage("ai", "An error occurred while trying to connect to the server.");
        }
    }

    // 5. UI Helpers
    function appendMessage(sender, text) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `chat-msg ${sender}`;
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const id = "typing-" + Date.now();
        const msgDiv = document.createElement("div");
        msgDiv.id = id;
        msgDiv.className = `chat-msg ai`;
        msgDiv.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    function removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) {
            el.remove();
        }
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});
