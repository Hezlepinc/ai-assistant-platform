(function () {
  const CHAT_URL = 'https://incharge-frontend.onrender.com'; // Replace with your frontend iframe URL
  const iframeId = 'incharge-chat-iframe';
  const buttonId = 'incharge-chat-button';

  const style = document.createElement('style');
  style.textContent = `
    #${iframeId} {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 360px;
      height: 500px;
      border: none;
      border-radius: 12px;
      box-shadow: 0 0 20px rgba(0,0,0,0.2);
      z-index: 100000;
      display: none;
    }
    #${buttonId} {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #FF6600;
      color: white;
      padding: 14px 18px;
      border-radius: 24px;
      font-size: 16px;
      font-weight: bold;
      border: none;
      cursor: pointer;
      z-index: 100001;
      box-shadow: 0 0 12px rgba(0,0,0,0.2);
    }
  `;
  document.head.appendChild(style);

  const iframe = document.createElement('iframe');
  iframe.src = CHAT_URL;
  iframe.id = iframeId;
  document.body.appendChild(iframe);

  const button = document.createElement('button');
  button.id = buttonId;
  button.innerText = 'Chat with Us';
  button.onclick = () => {
    iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
  };
  document.body.appendChild(button);
})();