// Élements du DOM

const form = document.getElementById("add-form");
const titreInput = document.getElementById("titre");
const genreInput = document.getElementById("genre");
const statutInput = document.getElementById("statut");

const tableBody = document.getElementById("films-body");

const statTotal = document.getElementById("stat-total");
const statAVoir = document.getElementById("stat-a-voir");
const statEnCours = document.getElementById("stat-en-cours");
const statVu = document.getElementById("stat-vu");

const filterSelect = document.getElementById("filter-status");

form.addEventListener("submit", function (event) {
    event.preventDefault();  // Évite le rechargement de page

    addFilm();
});

function addFilm() {
    const titre = titreInput.value.trim();  // .trim() enleve espaces du debut et de la fin d'un string
    const genre = genreInput.value();
    const statut = statutInput.value();

    // Validation
    if (!titre || !genre || !statut) {      // si un des trois champs est vide 
        alert("Veuillez remplir tous les champs");
        return; // sortir de la fonction
    }

    // Création d'une nouvelle ligne
    const newRow = document.createElement('tr');

    // Ajouter les cellules dans la nouvelle ligne
    newRow.innerHTML = `
        <td>${titre}</td>
        <td>${genre}</td>
        <td>${statut}</td>
        <td><button class="delete-btn">Supprimer</button></td>
        
    `;

    // Ajouter nouvelle ligne dans tableau
    tableBody.appendChild(newRow);

    // Réinitialiser le formulaire
    form.reset();

    // Mettre a jour les statistiques
    updateStats();
}

tableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {     // si utilisateur clique sur bouton supprimer
        event.target.closest("tr").remove();   
        UpdateStats(); 

    }
});

function updateStats() {
    const rows = tableBody.querySelectorAll("tr"); // selectionne toutes les tr sous id films-body

    // initialisation des variables de tbody
    let total = 0;
    let aVoir = 0;
    let enCours = 0;
    let vu = 0;

    rows.forEach(row => {
        total++;    // Pour chaque incrementation de row, total ++

        const statut = row.children[2].textContent  // Contenu texte du troisieme element du tableau

        if (statut === "À voir") aVoir++;
        else if (statut === "En cours") enCours++;
        else if (statut === "Vu") vu++;
    });

    // Met à jour contenu texte de chaque categorie statistique
    statTotal.textContent = total;
    statAVoir.textcontent = aVoir;
    statEnCours.textcontent = enCours;
    statVu.textcontent = vu;
}

filterSelect.addEventListener("change", function() {
    const filter = filterSelect.value;
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const statut = row.children[2].textcontent;

        if (filter === "tous" || statut === filter) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

