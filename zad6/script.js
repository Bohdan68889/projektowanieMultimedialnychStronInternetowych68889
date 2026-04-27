const themeBtn = document.getElementById("themeBtn");
const toggleBtn = document.getElementById("toggleBtn");
const sekcja = document.getElementById("doswiadczenie");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("red");
    document.body.classList.toggle("green");
});

toggleBtn.addEventListener("click", () => {
    sekcja.style.display = (sekcja.style.display === "none") ? "block" : "none";
});

async function fetchData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        document.getElementById("profil-tekst").textContent = data.profil;
        document.getElementById("wyksztalcenie-tekst").textContent = data.wyksztalcenie;

        const listaDoswiadczenie = document.getElementById("lista-doswiadczenie");
        data.doswiadczenie.forEach(item => {
            let li = document.createElement("li");
            li.textContent = item;
            listaDoswiadczenie.appendChild(li);
        });

        const listaUmiejetnosci = document.getElementById("lista-umiejetnosci");
        data.umiejetnosci.forEach(skill => {
            let li = document.createElement("li");
            li.textContent = skill;
            listaUmiejetnosci.appendChild(li);
        });
    } catch (err) {
        console.error(err);
    }
}

fetchData();

const form = document.getElementById("form");
const error = document.getElementById("error");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    let imie = document.getElementById("imie").value.trim();
    let nazwisko = document.getElementById("user-last-name").value.trim(); // Adjusted to match generic logic
    let email = document.getElementById("email").value.trim();
    let wiadomosc = document.getElementById("wiadomosc").value.trim();

    let nameRegex = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!imie || !nazwisko || !email || !wiadomosc) {
        error.textContent = "Wszystkie pola są wymagane!";
        error.style.color = "red";
        return;
    }
    if (!nameRegex.test(imie) || !nameRegex.test(nazwisko)) {
        error.textContent = "Imię i nazwisko nie mogą zawierać cyfr!";
        error.style.color = "red";
        return;
    }
    if (!emailRegex.test(email)) {
        error.textContent = "Niepoprawny email!";
        error.style.color = "red";
        return;
    }

    error.style.color = "green";
    error.textContent = "Formularz wysłany poprawnie!";
});