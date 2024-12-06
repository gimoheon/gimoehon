document.addEventListener("DOMContentLoaded", () => {
    const messages = []; // 메시지 저장 배열
    const messageInput = document.getElementById("message-input");
    const submitBtn = document.getElementById("submit-btn");
    const messagesContainer = document.getElementById("messages");
  
    // 메시지 렌더링
    function renderMessages(filter = "all") {
      messagesContainer.innerHTML = "";
  
      const filteredMessages =
        filter === "mine" ? messages.filter((msg) => msg.isMine) : messages;
  
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
      renderMessages();
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
        renderMessages(filter);
      });
    });

     // 모든 메시지를 화면에 표시하는 함수
  function showMessages(filter) {
    messagesContainer.innerHTML = ''; // 기존 메시지 제거
    const filteredMessages = filter === 'all'
      ? messages
      : messages.filter(msg => msg.user === currentUser); // '내 메시지' 필터링

    // 필터링된 메시지를 화면에 추가
    filteredMessages.forEach(msg => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');
      messageDiv.innerHTML = `<strong>${msg.user}</strong>: ${msg.content} <br><small>${msg.timestamp}</small>`;
      messagesContainer.appendChild(messageDiv);
    });
  }

// 탭 버튼 클릭 시 메시지 표시 방식 전환
navButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const tab = e.target.dataset.tab;
    // 탭 활성화 상태 변경
    navButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    showMessages(tab); // 선택된 탭에 맞는 메시지 표시
  });
});

// 페이지 로드 시 모든 메시지 표시
showMessages('all');
});

    // 초기 렌더링
    renderMessages(); {

    }