//1. Importation du module pour lire les inputs + Création de l'interface de lecture(entrées><affichage)

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//2. Initialisation de notre array

let tasks = ["task1", "task2", "task3", "task4", "task5"];


//3. Création d'une fonction qui affichera notre liste de taches après que l'utilisateur ait opéré son action. Attention à la numérotation index >< numero de l'item!
//Mais ... "Taches a effectuer"?

const afficheListe = () => {
    console.log("\nTaches a effectuer:");
    tasks.forEach((item, index) => {
        console.log(`${index + 1}. ${item}`);
    });
};


//4. Création des autres fonctions utiles.
// REMOVE : -->slice(index, nombre d'éléments à supprimer)
// index<tasks.length !!!

const removeTask = (index) => {
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        console.log("Task removed successfully.");
    } else {
        console.log("Try again!");
    }
};

//ADD : -->push
//(a effacer ulterieurement : task>>item???)

const addTask = (item) => {
    tasks.push(item);
    console.log("Task added successfully.");
};


//MARQUER item déja réalisé : "Checked" : 
// logique --> la fonction parcourt la liste, pour tout index valide (breath!, index-1 sera précisé dans le swicth pour correspondre à l'entrée utilisateur), la tache qui correspond a cet index vaut maintenant "✓" suivi de la valeur initiale de cette tâche.
const checkedTask = (index) => {
    if (index >= 0 && index < tasks.length) {
        tasks[index] = `✓ ${tasks[index]}`;
        console.log("Task marked as done.");
    } else {
        console.log("Try again!");
    }
};


// CREATION DE LA FONCTION MENU : 
//1. Display du menu interactif : -->fonction menu
//2. Pour que l'utilisateur puisse input : il faut qu'une question lui soit posée avec un espace pour répondre : --> rl.question("MaQuestionIci: ",input) 
//3. Différentes actions suivant l'input a définir avec "switch"

const menu = () => {
    console.log("\nHey hey! Looks like you've got some checking to do. Let's see! Press:");
    console.log("1. To display the task list.");
    console.log("2. To remove a task.");
    console.log("3. To add a task.");
    console.log("4. To mark a task already complete.");
    console.log("5. To quit task manager.");

    rl.question("Select an option: ", (option) => {
        switch (option) {
            case '1':
                afficheListe();
                menu();
                break;
            case '2':
                rl.question("Enter the index of the completed task: ", (index) => {
                    removeTask(index - 1);
                    afficheListe();
                    menu();
                });
                break;
            case '3':
                rl.question("Enter the task to add: ", (item) => {
                    addTask(item);
                    afficheListe();
                    menu();
                });
                break;
            case '4':
                rl.question("Enter the index of the task to mark as done: ", (index) => {
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

menu();
