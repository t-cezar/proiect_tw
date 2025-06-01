window.onload = function () {
    document.getElementById("filtrare").onclick = function () {
        let inpNume = document.getElementById("inp-nume").value.trim().toLowerCase();
        let inpDescriere = document.getElementById("inp-descriere").value.trim().toLowerCase();
        let inpTara = document.getElementById("inp-tara").value.trim().toLowerCase();

        // --------------------------- Etapa 6; Cerinta 10) Validare inputuri -----------------------------
        let eroareValidare = "";

        // Validare Nume: nu permite cifre sau caractere speciale
        if (inpNume && !/^[a-zăâîșțA-ZĂÂÎȘȚ\s\-]+$/.test(inpNume)) {
            eroareValidare += "Numele nu trebuie să conțină cifre sau caractere speciale.\n";
        }

        // Validare Descriere: daca exista, sa nu fie doar spatii sau simboluri
        if (inpDescriere && !/[a-zăâîșțA-ZĂÂÎȘȚ]/.test(inpDescriere)) {
            eroareValidare += "Textarea descriere trebuie să conțină cel puțin un cuvânt valid.\n";
        }

        // Validare Tara: doar litere, spatii, liniute
        if (inpTara && !/^[a-zăâîșțA-ZĂÂÎȘȚ\s\-]+$/.test(inpTara)) {
            eroareValidare += "Țara trebuie să conțină doar litere și eventual spații sau liniuțe.\n";
        }


        if (eroareValidare) {
            alert("Eroare validare:\n" + eroareValidare);
            return;
        }


        let vectRadio = document.getElementsByName("gr_rad");
        let inpGrosime = null;
        let minGrosime = null;
        let maxGrosime = null;
        for (let rad of vectRadio) {
            if (rad.checked) {
                inpGrosime = rad.value;
                if (inpGrosime != "toate") {
                    [minGrosime, maxGrosime] = inpGrosime.split(":");
                    minGrosime = parseFloat(minGrosime);
                    maxGrosime = parseFloat(maxGrosime);
                }
                break;
            }
        }

        let inpPret = parseFloat(document.getElementById("inp-pret").value);

        let inpCategorie = document.getElementById("inp-categorie").value.trim().toLowerCase();

        let selectMateriale = document.getElementById("inp-materiale");
        let materialeSelectate = Array.from(selectMateriale.selectedOptions).map(opt => opt.value.trim().toLowerCase());

        let checkboxTehnici = document.querySelectorAll("input[name='tehnici']:checked");
        let tehniciSelectate = Array.from(checkboxTehnici).map(cb => cb.value.trim().toLowerCase());

        let produse = document.getElementsByClassName("produs");
        for (let prod of produse) {
            prod.style.display = "none";

            let nume = prod.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
            console.log("Nume produs:", nume);
            let cond1 = nume.startsWith(inpNume);

            let grosime = parseFloat(prod.getElementsByClassName("val-grosime")[0].innerHTML.trim());
            let cond2 = (inpGrosime == "toate") || (minGrosime <= grosime && grosime < maxGrosime);

            let pret = parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML.trim());
            let cond3 = (inpPret <= pret);

            let categorie = prod.getElementsByClassName("val-categorie")[0].innerHTML.trim().toLowerCase();
            let cond4 = (inpCategorie == "toate" || inpCategorie == categorie);

            let material = prod.getElementsByClassName("val-material")[0].innerHTML.trim().toLowerCase();
            let cond5 = (materialeSelectate.length == 0 || materialeSelectate.includes(material));

            let tehnicaProdus = prod.getElementsByClassName("val-tehnici")[0].innerHTML.trim().toLowerCase().split(/[\s,]+/);
            let cond6 = (tehniciSelectate.length == 0 || tehniciSelectate.some(t => tehnicaProdus.includes(t)));

            let descriere = prod.getElementsByClassName("val-descriere")[0].innerHTML.trim().toLowerCase();
            let cond7 = true;
            if (inpDescriere !== "") {
                let cuvinte = inpDescriere.split(",").map(c => c.trim()).filter(Boolean);
                cond7 = cuvinte.some(cuv => descriere.includes(cuv));
            }

            let tara = prod.getElementsByClassName("val-tara")[0].innerHTML.trim().toLowerCase();
            let cond8 = (inpTara == "" || tara.includes(inpTara));


            if (cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8) {
                prod.style.display = "block";
            }

        }
    }


    document.getElementById("inp-pret").onchange = function () {
        document.getElementById("infoRange").innerHTML = `(${this.value})`;
    }

    // --------------- Etapa6; Cerinta 9) Confirmare resetare filtre + revenire la ordinea initiala ------------------------------
    document.getElementById("resetare").onclick = function () {
        if (!confirm("Sigur dorești să resetezi toate filtrele?")) {
            return;
        }

        document.getElementById("inp-nume").value = "";
        document.getElementById("i_rad4").checked = true;
        document.getElementById("inp-pret").value = 0;
        document.getElementById("infoRange").innerHTML = `(0)`;
        document.getElementById("inp-categorie").value = "toate";
        document.getElementById("inp-descriere").value = "";
        document.getElementById("inp-tara").value = "";

        let optiuniMateriale = document.getElementById("inp-materiale").options;
        for (let opt of optiuniMateriale) {
            opt.selected = false;
        }

        let checkboxTehnici = document.querySelectorAll("input[name='tehnici']");
        for (let cb of checkboxTehnici) {
            cb.checked = false;
        }

        let produse = document.getElementsByClassName("produs");
        for (let prod of produse) {
            prod.style.display = "block";
        }

        // Revin la ordinea initiala pe baza id-ului
        let container = document.querySelector(".grid-produse");
        let copii = Array.from(container.children);
        copii.sort((a, b) => {
            let idA = parseInt(a.id.slice(3));
            let idB = parseInt(b.id.slice(3));
            return idA - idB;
        });
        for (let c of copii) container.appendChild(c);
    }


    document.getElementById("sortCrescNume").onclick = function () {
        sorteaza(1)
    }

    document.getElementById("sortDescrescNume").onclick = function () {
        sorteaza(-1)
    }

    function sorteaza(semn) {
        let produse = document.getElementsByClassName("produs");
        let vProduse = Array.from(produse);

        vProduse.sort(function (a, b) {
            let pretA = parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML.trim());
            let pretB = parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML.trim());

            if (pretA != pretB)
                return semn * (pretA - pretB);

            // a doua cheie: tehnici
            let tehniciA = a.getElementsByClassName("val-tehnici")[0].innerHTML.trim().split(",").length;
            let tehniciB = b.getElementsByClassName("val-tehnici")[0].innerHTML.trim().split(",").length;
            return semn * (tehniciA - tehniciB);
        });

        for (let prod of vProduse) {
            prod.parentNode.appendChild(prod);
        }
    }


    window.onkeydown = function (e) {
        if (e.key == "c" && e.altKey) {
            let produse = document.getElementsByClassName("produs");
            let sumaPreturi = 0;
            for (let prod of produse) {
                if (prod.style.display != "none") {
                    let pret = parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML.trim());
                    sumaPreturi += pret;
                }
            }
            if (!document.getElementById("suma_preturi")) {
                let pRezultat = document.createElement("p");
                pRezultat.innerHTML = sumaPreturi;
                pRezultat.id = "suma_preturi";
                let p = document.getElementById("p-suma");
                p.parentNode.insertBefore(pRezultat, p.nextElementSibling);
                setTimeout(function () {
                    let p1 = document.getElementById("suma_preturi");
                    if (p1) {
                        p1.remove();
                    }
                }, 2000);
            }
        }
    }
}
