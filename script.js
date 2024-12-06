document.addEventListener("DOMContentLoaded", () => {
    const messageInput = document.getElementById("message-input");
    const submitBtn = document.getElementById("submit-btn");
    const messagesContainer = document.getElementById("messages");

    // 로컬 스토리지에서 메시지 가져오기 (없으면 빈 배열을 반환)
    let messages = JSON.parse(localStorage.getItem("messages")) || [];

    // 메시지 렌더링
    function renderMessages(filter = "all") {
        messagesContainer.innerHTML = "";  // 메시지 컨테이너 비우기

        // 필터링된 메시지
        const filteredMessages = 
            filter === "mine" ? messages.filter((msg) => msg.isMine) : messages;

        // 메시지 카드 추가
        filteredMessages.forEach((msg, index) => {
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

        // 삭제 버튼 이벤트 추가
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                messages.splice(index, 1); // 해당 메시지 삭제
                saveMessages(); // 로컬 스토리지 업데이트
                renderMessages(filter); // 메시지 리스트 재렌더링
            });
        });
    }

    // 메시지 추가
    function addMessage(text) {
        const newMessage = {
            name: "익명", // 기본 이름
            text: text,
            time: new Date().toLocaleString(),
            isMine: true,
        };
        messages.unshift(newMessage); // 최신 메시지가 위로
        saveMessages(); // 로컬 스토리지에 저장
        renderMessages(); // 메시지 렌더링
    }

    // 로컬 스토리지에 메시지 저장
    function saveMessages() {
        try {
            localStorage.setItem("messages", JSON.stringify(messages));
        } catch (error) {
            console.error("로컬 스토리지 저장에 실패했습니다:", error);
        }
    }

    // 작성 버튼 클릭 이벤트
    submitBtn.addEventListener("click", () => {
        const text = messageInput.value.trim();
        if (text) {
            addMessage(text);
            messageInput.value = ""; // 입력 필드 초기화
        }
    });

    // 네비게이션 탭 클릭 이벤트
    document.querySelectorAll(".nav-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            document
                .querySelectorAll(".nav-btn")
                .forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.tab;
            renderMessages(filter); // 해당 필터로 메시지 렌더링
        });
    });

    // "모든 메시지" 탭을 클릭하면 모든 메시지 출력
    document.querySelector(".nav-btn[data-tab='all']").addEventListener("click", () => {
        renderMessages("all");
    });

    // 페이지 로드 시 메시지 렌더링
    renderMessages(); // 초기 메시지 렌더링
});
