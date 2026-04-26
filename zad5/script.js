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

const form = document.getElementById("form");
const error = document.getElementById("error");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let imie = document.getElementById("imie").value.trim();
    let nazwisko = document.getElementById("nazwisko").value.trim();
    let email = document.getElementById("email").value.trim();
    let wiadomosc = document.getElementById("wiadomosc").value.trim();

    let nameRegex = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!imie || !nazwisko || !email || !wiadomosc) {
        error.textContent = "Wszystkie pola są wymagane!";
        error.style.color = "red";
        return;
    }

    if (!nameRegex.test(imie)) {
        error.textContent = "Imię nie może zawierać cyfr!";
        return;
    }

    if (!nameRegex.test(nazwisko)) {
        error.textContent = "Nazwisko nie może zawierać cyfr!";
        return;
    }

    if (!emailRegex.test(email)) {
        error.textContent = "Niepoprawny email!";
        return;
    }

    error.style.color = "green";
    error.textContent = "Formularz wysłany poprawnie!";
});