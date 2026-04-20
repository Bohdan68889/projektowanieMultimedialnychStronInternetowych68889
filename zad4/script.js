const themeBtn = document.getElementById("themeBtn");
const toggleBtn = document.getElementById("toggleBtn");
const sekcja = document.getElementById("doswiadczenie");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("red");
    document.body.classList.toggle("green");
});

toggleBtn.addEventListener("click", () => {
    if (sekcja.style.display === "none") {
        sekcja.style.display = "block";
    } else {
        sekcja.style.display = "none";
    }
});