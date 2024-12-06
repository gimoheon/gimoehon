document.addEventListener("DOMContentLoaded", () => {
    const messageInput = document.getElementById("message-input");
    const nameInput = document.getElementById("name-input");
    const submitBtn = document.getElementById("submit-btn");
    const messagesContainer = document.getElementById("messages");

    // 로컬 스토리지에서 메시지 로드
    let messages = JSON.parse(localStorage.getItem("messages")) || [];

    function saveMessages() {
        localStorage.setItem("messages", JSON.stringify(messages));
    }

    function renderMessages() {
        messagesContainer.innerHTML = "";

        messages.forEach((msg, index) => {
            const card = document.createElement("div");
            card.classList.add("message-card");
            card.innerHTML = `
                <h3>${msg.name}</h3>
                <p>${msg.text}</p>
                <small>${msg.time}</small>
                <button class="delete-btn" data-index="${index}">삭제</button>
            `;
            messagesContainer.appendChild(card);
        });

        // 삭제 버튼 추가
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                messages.splice(index, 1);
                saveMessages();
                renderMessages();
            });
        });
    }

    function addMessage(name, text) {
        const newMessage = {
            name: name || "익명",
            text: text,
            time: new Date().toLocaleString(),
        };
        messages.unshift(newMessage);
        saveMessages();
        renderMessages();
    }

    submitBtn.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const text = messageInput.value.trim();
        if (text) {
            addMessage(name, text);
            messageInput.value = "";
            nameInput.value = "";
        }
    });

    // 페이지 로드 시 메시지 렌더링
    renderMessages();
});
