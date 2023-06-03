/* On va devoir ...
1) Scénographie : 
    1.1. Importer les modules readline nécessaires à l'interaction avec utilisateur+ création de l'interface;
    1.2. Créer la liste des tâches ==> array;
    1.3. Créer les fonctions utiles : ==> functions
        - afficher taches : titre suivi de la liste des taches;
        - retirer tache : supprime la tache et display un message de confirmation;
        - ajouter tâche : ajoute une tache et display un message de confirmation;
        - checked tache : réinitialise la tache correspondant a l'input en "✓ valeurDeLaTacheCorrespondante" et display une confirmation;


2) Répétitions :
    2.1. Habillage du menu qui devra à l'exécution du fichier (juste une succession de strings);
    > 2.2. Poser une question à l'utilisateur; --> rl.question 
    > > 2.3. Réagir : --> swicth (appeler la fonction utile, ensuite le menu, puis break)


3) Scène : Appeler le menu

*/


//1.1. Modules+Interface

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


//1.2. Tâches --> array

let tasks = ["HoOoOooo damn! I think I'm in hell", "Don't forget to breath.", "Wait ... Hmmm interesting!" , "Ho, but ... Hihaaaa! It wooooorks!", "Don't forget to thank your coach for discovering bliss in struggling! Have a nice we Diogo!"];



//1.3. Fonctions
// Afficher liste : Attention à la numérotation index >< numero de l'item!


function afficheListe() {
    console.log("\nTaches a effectuer:");
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]) {
            console.log(`${i + 1}. ${tasks[i]}`);
        }
    }
}

/*
function afficheListe() {
    console.log("\nTaches a effectuer:");
    tasks.forEach(function(item, index) {
        console.log(`${index + 1}. ${item}`);
    });
};
*/


// REMOVE : --> .slice(index, nombre d'éléments à supprimer)
// index<tasks.length !!!

function removeTask(i) {
    if (i >= 0 && i < tasks.length) {
        tasks.splice(i, 1);
        console.log("Task removed successfully.");
    } else {
        console.log("Try again!");
    }
};


//ADD : --> .push
//(a effacer ulterieurement : task>>item???)

function addTask(item) {
    tasks.push(item);
    console.log("Task added successfully.");
};


//CHECKED: 
// logique --> la fonction parcourt la liste, pour tout index valide (breath!, index-1 sera précisé dans le swicth pour correspondre à l'entrée utilisateur), la tache qui correspond a cet index vaut maintenant "✓" suivi de la valeur initiale de cette tâche.
function checkedTask(i) {
    if (i >= 0 && i < tasks.length) {
        tasks[i] = `✓ ${tasks[i]}`;
        console.log("Task marked as done.");
    } else {
        console.log("Try again!");
    }
};


/*CREATION DE LA FONCTION MENU : 
2) 2.1. Habillage du menu affiché à l'exécution du fichier : --> console.log
    > 2.2. Poser une question à l'utilisateur; --> rl.question 
    > > 2.3. Réagir : --> swicth (appeler la fonction utile, ensuite le menu, puis break)
*/

function menu() {
    console.log("\nHey hey! Looks like you've got some checking to do. Let's see! Press:");
    console.log("1. To display the task list.");
    console.log("2. To remove a task.");
    console.log("3. To add a task.");
    console.log("4. To mark a task already complete.");
    console.log("5. To quit task manager.");

    rl.question("Select an option: ", function(option) {
        switch (option) {
            case '1':
                afficheListe();
                menu();
                break;
            case '2':
                rl.question("Enter the index of the completed task: ", function(index) {
                    removeTask(index - 1);
                    afficheListe();
                    menu();
                });
                break;
            case '3':
                rl.question("Enter the task to add: ", function(item) {
                    addTask(item);
                    afficheListe();
                    menu();
                });
                break;
            case '4':
                rl.question("Enter the index of the task to mark as done: ", function(index) {
                    checkedTask(index - 1);
                    afficheListe();
                    menu();
                });
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log("Invalid option. Please try again.");
                menu();
                break;
        }
    });
};


//A ne pas oublier!!!
menu();
