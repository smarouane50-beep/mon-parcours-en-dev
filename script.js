const levels = [
  {
    title: "Level 1 : Premiers battements d’ailes",
    text: "Au lycée, en STI2D option SIN, je découvre les bases de l’électronique et du développement. Mes premiers scripts, mes premières galères... mais aussi mes premiers frissons de logique. J’apprends à voler à ras du sol."
  },
  {
    title: "Level 2 : Montée en altitude",
    text: "J’intègre un BUT Science des Données. Statistiques, Python, algorithmes, analyse… mais au fond, il me manque quelque chose : je veux coder des interfaces, créer, construire, toucher au concret. Je survole un univers trop abstrait pour moi."
  },
  {
    title: "Level 3 : Zones de turbulences",
    text: "Réorientation vers MMI. Nouveau décor, nouvelles compétences : design, communication, développement… Je touche au dev plus sérieusement. Même si je galère parfois, je sens que je suis dans la bonne direction. Je valide 4 compétences sur 5. Le dev me résiste, mais je suis têtu."
  },
  {
    title: "Level 4 : Code des airs",
    text: "Je me plonge à fond dans le développement. HTML, CSS, JS, PHP… Je découvre la joie de voir un projet prendre vie. La SAE 203 me booste : je prends goût à coder, à chercher, à galérer, à réussir. C’est ici que je commence vraiment à voler de mes propres ailes."
  },
  {
    title: "Level 5 : Vol en solo - Été 2025",
    text: "Loin des regards, je bosse. Certificat Google, bouquins chez moi, tutos, et un projet de jeu web que je développe seul pour appuyer ma motivation. Je bosse mon portfolio, j’apprends par moi-même. Je suis en montée d'altitude."
  },
  {
    title: "Level 6 : Phoenix renaît de ses cendres",
    text: "Nouvelle rentrée, même objectif : passer en parcours Développement. Même si je n’ai pas validé cette compétence l’an dernier, j’ai progressé. J’ai rebondi, appris, et je suis revenu plus motivé que jamais. Je suis prêt à affronter le boss final."
  },
  {
    title: "Level 7 : Master et ciel international",
    text: "Ce jeu n’est pas fini. Je vise un Master en dev ou data, et un VIE à l’étranger pour repousser mes limites. Je veux continuer à apprendre, à créer, à voyager. Ce parcours en dev n’est pas juste un souhait, c’est une étape logique dans mon plan de vol."
  }
];


let current = 0;

function startGame() {
    document.getElementById("introScreen").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    document.addEventListener("keydown", handleKey);
}

function nextLevel() {
    current++;
    if (current >= levels.length) {
        endGame();
        return;
    }
    updateLevel();
}

function updateLevel() {
    document.getElementById("levelTitle").innerText = levels[current].title;
    document.getElementById("levelText").innerText = levels[current].text;
    document.getElementById("progress").style.width = `${(current / (levels.length - 1)) * 100}%`;
}

function endGame() {
    document.getElementById("levelTitle").innerText = "🏁 Bravo ! Tu as atteint la fin de l’aventure.";
    document.getElementById("levelText").innerText = "Ce parcours n’est pas un simple jeu : c’est mon histoire. Une histoire faite de rebonds, d’apprentissage, de passion pour le code. J’ai expérimenté, échoué parfois, appris souvent, persévéré toujours. Aujourd’hui, je suis prêt à franchir un nouveau cap. Intégrer le parcours Développement Web & Dispositifs Interactifs, c’est pour moi bien plus qu’un choix académique : c’est le tremplin qui me permettra d’avancer vers ce que je veux vraiment faire de ma vie. Continuer à créer. M’ouvrir au monde. Devenir un développeur solide, curieux et engagé. Merci d’avoir pris le temps de découvrir mon parcours. Et si vous m’accordez cette dernière chance, je saurai en faire quelque chose de grand.";
    document.getElementById("nextButton").style.display = "none";
    document.getElementById("progress").style.width = "100%";
}

// === Mouvement de l’aigle ===
let aigle = document.getElementById("aigle");
let aigleX = 0;
let isJumping = false;

function handleKey(e) {
    if (!aigle) aigle = document.getElementById("aigle");

    // Avancer (→)
    if (e.key === "ArrowRight" && !isJumping) {
        aigleX += 20;
        aigle.style.left = aigleX + "px";
        checkVictory();
    }

    // Saut (↑) vers l'avant en arc
    if (e.key === "ArrowUp" && !isJumping) {
        isJumping = true;

        let jumpHeight = 180;
        let jumpForward = 60;

        // Phase 1 : monter + avancer
        aigle.style.transition = "bottom 0.25s, left 0.25s";
        aigleX += jumpForward / 2;
        aigle.style.left = aigleX + "px";
        aigle.style.bottom = jumpHeight + "px";

        setTimeout(() => {
            // Phase 2 : descendre + finir d’avancer
            aigle.style.transition = "bottom 0.25s, left 0.25s";
            aigleX += jumpForward / 2;
            aigle.style.left = aigleX + "px";
            aigle.style.bottom = "120px";

            setTimeout(() => {
                isJumping = false;
            }, 250);
        }, 250);
    }

    checkCollision();
}



function checkCollision() {
    const aigleRect = aigle.getBoundingClientRect();
    const obstacleRect = document.getElementById("obstacle").getBoundingClientRect();

    if (
        aigleRect.right > obstacleRect.left &&
        aigleRect.left < obstacleRect.right &&
        aigleRect.bottom > obstacleRect.top
    ) {
        alert("💥 Oups ! L’aigle a percuté l’hélicoptère !");
        aigleX = 0;
        aigle.style.left = "0px";
    }
}

function checkVictory() {
    const aigleRect = aigle.getBoundingClientRect();
    const arriveeRect = document.getElementById("arrivee").getBoundingClientRect();

    if (aigleRect.right > arriveeRect.left) {
        nextLevel();
        aigleX = 0;
        aigle.style.left = "0px";
    }
}
