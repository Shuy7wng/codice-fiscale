let CodFis = [];
let sesso = true;
let checkNome = true;

function stampa(){
    let genere = "";
    let cognome = document.getElementById("cognome").value;
    let nome = document.getElementById("nome").value;
    let luogo = document.getElementById("luogo").value;
    let comune = document.getElementById("input3").value;
    let data = document.getElementById("data").value;
    let provincia = document.getElementById("provincia").value;
    //check input del nome cognome
   if(isNaN(nome) && nome!=" " && isNaN(cognome) && cognome!=" " && nome.length >= 2 && cognome.length >= 2){
        CodFis = NomCogn(cognome,!checkNome).concat(NomCogn(nome,checkNome));
    }

    //check input del sesso
    if (document.getElementById("maschio").checked) {
        genere = "m";
        sesso = false;
    } else if (document.getElementById("femmina").checked) {           
        genere = "f";
        sesso = true;
    } else {
        alert("Selezionare il sesso");
    }

    CodFis = CodFis.concat(date(data,sesso)).concat(comune);       
    CodFis = CodFis.concat(checkdigit(CodFis));
    CodFis = CodFis.join("");
    apparizione(nome,cognome,data,luogo,provincia,genere);
}  

function NomCogn(parola,check) {
    let lettere = [];
    let cons = [];
    let cont = 0;
    let i = 0;
    let j = 0;

    parola = parola.toUpperCase().replace(/\s/g, '');
    
    //contare le consonanti
    for(let i = 0; i < parola.length; i++){
        if(parola.charAt(i) !== "A" && parola.charAt(i) !== "E" && parola.charAt(i) !== "I" && parola.charAt(i) !== "O" && parola.charAt(i) !== "U"){
            cons.push(parola.charAt(i));
        }
    }

    //prende le consonanti se è un nome con più di 4 consonanti
    if(check && cons.length >= 4){            
        cons.splice(1, 1);
        for(let i = 0; i < 3; i++){
            lettere.push(cons[i]);
        }
    }else{
        // prende le consonanti normalmente
        while(cont < 3 && i < parola.length){       
            if(parola.charAt(i) !== "A" && parola.charAt(i) !== "E" && parola.charAt(i) !== "I" && parola.charAt(i) !== "O" && parola.charAt(i) !== "U"){
                lettere.push(parola.charAt(i));
                cont++;
            }
            i++;
        }
        while(cont < 3 && j < parola.length){
            if(parola.charAt(j) === "A" || parola.charAt(j) === "E" || parola.charAt(j) === "I" || parola.charAt(j) === "O" || parola.charAt(j) === "U"){
                lettere.push(parola.charAt(j));
                cont++;
            }
            j++;
        }
    }
    //prende le vocali
    
    if(parola.length == 2){
        lettere.splice(2, 1,"X");
    }
    return lettere;
}

function date(data,sesso){
    let lettMes = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];
    let dataCF = [];                                                                   //data codice fiscale
    let giorno = "";
    let mese = "";
    let anno = "";

    data = new Date(data);                                                             //trasforma la stringa in una data da cui noi successivamente possiamo prendendere giorni mesi ...

    giorno = data.getDate();                                                           // se ho 06 mi restituisce 6 
        if(sesso){
            parseInt(giorno);
            giorno += 40;
        }else{
            if (giorno < 10)                                                            //così mi da 06
            giorno = '0' + giorno; 
        }

    mese = data.getMonth();

    anno = data.getFullYear().toString().slice(-2);                                     //Ottieni gli ultimi due caratteri dell'anno come stringa

    dataCF = anno.concat(lettMes[mese]).concat(giorno);
    
    return dataCF;
}

function showFile(input) {
    let testo = "";
    let inputfile = input.files[0];

    if (inputfile) {
        const reader = new FileReader();

        reader.readAsText(inputfile);

        reader.onload = function() {
            testo = reader.result;
            creaArray(testo);
        }
    }
}

function creaArray(testo) {
    const x = document.getElementById("input3");
    let comuniArray = [];
    let numeriArray = [];
    const righe = testo.split("\r\n");

    for (let i = 0; i < righe.length; i++) {
        const colonne = righe[i].split(";");
        const comune = colonne[0].trim();                               //.trim serve per rimuovere i psazi vuoti
        const numero = colonne[1].trim();

        comuniArray.push(comune);
        numeriArray.push(numero);

        const option = document.createElement("option");
        option.text = comune;
        option.value = numero;                               
        x.add(option);                                              //aggiunge il i comuni ad option
    }
}

function checkdigit(array) {

        array = array.map(String).join('').split(',').join('');
        const pari = {                                                                                      
            '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
            'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
            'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19,
            'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25
        };
        const dispari = {
            '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
            'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17, 'I': 19, 'J': 21,
            'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6, 'R': 8, 'S': 12, 'T': 14,
            'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23
        };
        const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
        const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
        let somma = 0;

        for (let i = 0; i < array.length; i++) {
            let lettera = array[i];
            let valore;
            if (i % 2 === 0) { // Caratteri pari
                valore = dispari[lettera];
                
            } else { // Caratteri dispari
                valore = pari[lettera];
            }
            somma += valore;
        }
    
        let resto = somma % 26;
        let checkdigit = alfabeto.charAt(x[resto]);
    
        return checkdigit;
    }


function apparizione(nome,cognome,data,luogo,provincia,sesso) {
        var divToRemove = document.getElementById('dati');
        
            divToRemove.remove(); 

            var img = document.createElement('img');
            img.src = './tessera.png'; 
            img.style.position = 'absolute';
            img.style.top = '50%';
            img.style.left = '37.5%'; 
            img.style.transform = 'translateY(-50%)';    // Trasla l'immagine indietro di metà della sua altezza per centrarla verticalmente
    
            
            var testo1 = document.createElement('p');
            testo1.innerHTML = "Codice fiscale  <br> <br> Cognome <br> <br> Nome <br> <br> Luogo di nascita <br> <br> Provincia <br> <br> Data di nascita";          
            testo1.style.position = 'absolute';
            testo1.style.top = '41%';                                         // verticale
            testo1.style.left = '43%';                                        // orizzontale 
            testo1.style.transform = 'translateX(-50%)'; 

            var testo2 = document.createElement('h2');
            testo2.innerHTML = CodFis + "<br> <br>" + cognome + "<br> <br>" + nome + "<br> <br>" + luogo + "<br> <br>" + provincia + "<br> <br>" + data;            
            testo2.style.position = 'absolute';
            testo2.style.top = '41%'; 
            testo2.style.left = '54%';
            testo2.style.transform = 'translateX(-50%)'; 

            var sesso1 = document.createElement('p');
            sesso1.innerHTML = "Sesso" ;
            sesso1.style.position = 'absolute';
            sesso1.style.top = '42%'; 
            sesso1.style.left = '65%';
            sesso1.style.transform = 'translateX(-50%)';

            var sesso2 = document.createElement('h2');
            sesso2.innerHTML = sesso ;
            sesso2.style.position = 'absolute';
            sesso2.style.top = '41%'; 
            sesso2.style.left = '68%';
            sesso2.style.transform = 'translateX(-50%)';

            document.body.appendChild(img);
            document.body.appendChild(testo1);
            document.body.appendChild(testo2);
            document.body.appendChild(sesso1);
            document.body.appendChild(sesso2);
    } 