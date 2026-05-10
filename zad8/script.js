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

    // 1. Walidacja
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


    const formData = {
        imie: imie,
        nazwisko: nazwisko,
        email: email,
        wiadomosc: wiadomosc
    };

    error.style.color = "blue";
    error.textContent = "Wysyłanie danych...";


    try {
        // TUTAJ WSTAW SWÓJ URL (np. z Webhook.site lub Firebase)
        const response = await fetch("https://webhook.site/ac6dbeef-3f58-4d91-a161-6a7b890f6479", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            error.style.color = "green";
            error.textContent = "Dane zostały poprawnie wysłane na serwer!";
            form.reset(); // Czyszczenie formularza po wysłaniu
        } else {
            throw new Error("Błąd serwera");
        }
    } catch (err) {
        error.style.color = "red";
        error.textContent = "Błąd połączenia z serwerem!";
        console.error("Szczegóły błędu:", err);
    }
});