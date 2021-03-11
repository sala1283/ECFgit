var films = [{
        name: "Deadpool",
        years: 2016,
        authors: "Tim Miller"
    },
    {
        name: "Spiderman",
        years: 2002,
        authors: "Sam Raimi"
    },
    {
        name: "Scream",
        years: 1996,
        authors: "Wes Craven"
    },
    {
        name: "It: chapter 1",
        years: 2019,
        authors: "Andy Muschietti"
    }
];

//le bouton à ajouter
const addButton = document.getElementById("ajouter");
//le formulaire pour ajouter un film.
const addForm = document.getElementById("formeAjouter");
const formTitle = document.getElementById("titre");
const formYear = document.getElementById("année");
const formDirector = document.getElementById("réalisateur");
//montre le formulaire d'ajouter
function ShowForm() {
    addForm.style.display = "block";
}
//cacher le formulaire d'ajouter
function HideForm() {
    addForm.style.display = "none";
}
//tbody dans le html
const filmsList = document.getElementById("filmsList");
//la fonction principale qui remplit le tableau avec les elements du var films
function RemplirTableau() {

    //à chaque changement on efface les elements HTML et puis on commence le remplissage
    filmsList.innerHTML = "";

    for (var i = 0; i < films.length; i++) {
        var row = filmsList.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = films[i].name;
        cell2.innerHTML = films[i].years;
        cell3.innerHTML = films[i].authors;
        var btnSupp = document.createElement('button');
        btnSupp.innerHTML = "Supprimer";
        btnSupp.value = i;
        btnSupp.addEventListener('click', function () {
            if (confirm("Supprimer ?")) {
                films.splice(this.value, 1);
                RemplirTableau();
            }

        })
        cell4.appendChild(btnSupp)

    }
}

RemplirTableau();

//cette fonction verifie les criteres et si ca passe, l'element est ajouté dans le tableau films
function AddEntry() {
    if (formTitle.value.length > 2) {
        // formYear.length == 4 
        let date = new Date().getFullYear();
        if ((formYear.value >= 1900 && formYear.value < date)) {
            if (formDirector.value.length > 5) {
                films.push({
                    name: mettreEnMaj(formTitle.value),
                    years: formYear.value,
                    authors: mettreEnMaj(formDirector.value)
                })
                RemplirTableau();
                alert("Film ajouter avec succès");

            } else {
                alert("Erreur dans le formulaire du réalisateur");
            }
        } else {
            alert("Erreur dans le formulaire de l\'année");
        }
    } else {
        alert("Erreur dans le formulaire du titre");
    }
}

function mettreEnMaj(texte) {
    return texte.charAt(0).toUpperCase() + texte.substring(1);
}

var filtre = document.getElementById("filtre")

filtre.addEventListener('change', function () {
    if (this.value == "titre") {
        // sort by name
        films.sort(function (a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
    }

    if (this.value == "annee") {
        // sort by value
        films.sort(function (a, b) {
            return b.years - a.years;
        });
    }

    RemplirTableau();
})