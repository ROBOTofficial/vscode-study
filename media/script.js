
//上手く実行できない

(() => {
    const uri = document.getElementById("audioUri").value;
    const audio = new Audio(uri);
    audio.addEventListener("canplaythrough", async (event) => {
        audio.play();
    });
})();