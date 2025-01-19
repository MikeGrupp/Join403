function msgRender() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    if (msg) {
        createToast(msg);
    }
  }

  function goToBoard() {
    window.location.href = 'board.html';
  }