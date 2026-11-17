// Contador sencillo: guarda las visitas en el navegador del visitante.
document.addEventListener("DOMContentLoaded", () => {
  const countElement = document.getElementById("visitorCount");
  if (countElement) {
    let visits = Number(localStorage.getItem("miamiTravelVisits") || 0);
    visits += 1;
    localStorage.setItem("miamiTravelVisits", visits);
    countElement.textContent = visits;
  }

  const welcomeButton = document.getElementById("welcomeBtn");
  if (welcomeButton) {
    welcomeButton.addEventListener("click", () => alert("¡Bienvenido/a a Miami Travel! "));
  }

  document.querySelectorAll("[data-info]").forEach(button => {
    button.addEventListener("click", () => {
      document.getElementById("modalText").textContent = button.dataset.info;
      bootstrap.Modal.getOrCreateInstance(document.getElementById("infoModal")).show();
    });
  });

  const calculateButton = document.getElementById("calculateBtn");
  if (calculateButton) {
    calculateButton.addEventListener("click", () => {
      const days = Number(document.getElementById("days").value);
      const daily = Number(document.getElementById("daily").value);
      const result = document.getElementById("budgetResult");
      if (!Number.isInteger(days) || days < 1 || daily < 0 || !Number.isFinite(daily)) {
        result.textContent = "Ingresá una cantidad de días válida y un presupuesto no negativo.";
        return;
      }
      result.textContent = `Presupuesto estimado: USD ${(days * daily).toLocaleString("es-AR")} para ${days} día(s).`;
    });
  }

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      document.getElementById("formMessage").innerHTML =
        `<div class="alert alert-success mb-0">¡Gracias, ${escapeHTML(name)}! Tu mensaje fue registrado en esta demostración.</div>`;
      form.reset();
    });
  }
});

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}
