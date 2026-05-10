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

const inputProjekt = document.getElementById("inputProjekt");
const addBtn = document.getElementById("addBtn");
const listaProjektowUI = document.getElementById("listaProjektow");

let projekty = JSON.parse(localStorage.getItem("mojeProjekty")) || [];

function renderProjects() {
    listaProjektowUI.innerHTML = "";
    projekty.forEach((tekst, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${tekst} <button class="del-btn" onclick="deleteProject(${index})">Usuń</button>`;
        listaProjektowUI.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    const tekst = inputProjekt.value.trim();
    if (tekst) {
        projekty.push(tekst);
        localStorage.setItem("mojeProjekty", JSON.stringify(projekty));
        inputProjekt.value = "";
        renderProjects();
    }
});

window.deleteProject = (index) => {
    projekty.splice(index, 1);
    localStorage.setItem("mojeProjekty", JSON.stringify(projekty));
    renderProjects();
};
renderProjects();

const form = document.getElementById("form");
const error = document.getElementById("error");

form.addEventListener("submit", async function(e) {
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

    const formData = { imie, nazwisko, email, wiadomosc };
    error.style.color = "blue";
    error.textContent = "Wysyłanie...";

    try {
        await fetch("https://webhook.site/ac6dbeef-3f58-4d91-a161-6a7b890f6479", {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        // Тепер код дійде сюди без помилок
        error.style.color = "green";
        error.textContent = "Wysłano!";
        form.reset(); 
    } catch (err) {
        error.style.color = "red";
        error.textContent = "Błąd połączenia!";
        console.error("Szczegóły błędu:", err);
    }
});
