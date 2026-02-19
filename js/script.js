// ====================================
// ASSET PRELOADER (WORLD GOV BOOT)
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    // Liste des fichiers lourds à précharger obligatoirement (même s'ils sont cachés ou en CSS)
    const manualAssets = [
        'assets/icons/denden_marine_closed.webp',
        'assets/icons/denden_marine_open.webp',
        'assets/icons/denden_closed.webp',
        'assets/icons/denden_open.webp',
        'assets/icons/denden_laugh.webp',
        'assets/icons/mostwanted.webp',
        'assets/icons/mara3.webp'
    ];

    initPreloader(manualAssets);
});

function initPreloader(manualAssets) {
    const preloader = document.getElementById('preloader-screen');
    const loaderText = document.getElementById('loader-text');
    const loaderBar = document.getElementById('loader-bar');
    const loaderPercentage = document.getElementById('loader-percentage');
    const loaderLogs = document.getElementById('loader-logs');
    const marineContent = document.getElementById('marine-loader-content');
    const glitchLogo = document.getElementById('preloader-glitch-logo');
    
    // 1. Récupérer toutes les images du site
    const domImages = Array.from(document.images).map(img => img.src);
    const allAssets = [...new Set([...domImages, ...manualAssets])];
    const totalAssets = allAssets.length;
    let loadedCount = 0;

    if (totalAssets === 0) return finishLoading();

    const phases = [
        "ESTABLISHING SECURE CONNECTION...",
        "VERIFYING ADMIRAL CREDENTIALS...",
        "DOWNLOADING MARINE DATABASE...",
        "DECRYPTING WANTED POSTERS...",
        "INITIALIZING DEFENSE SYSTEMS..."
    ];

    allAssets.forEach(src => {
        const img = new Image();
        img.onload = img.onerror = () => {
            loadedCount++;
            updateProgress();
        };
        img.src = src;
    });

    function updateProgress() {
        const percent = Math.floor((loadedCount / totalAssets) * 100);
        loaderPercentage.innerText = percent + '%';
        loaderBar.style.width = percent + '%';
        
        const phaseIndex = Math.min(Math.floor((percent / 100) * phases.length), phases.length - 1);
        loaderText.innerText = phases[phaseIndex];

        const log = document.createElement('div');
        log.innerText = `> loaded asset_${loadedCount}: OK`;
        loaderLogs.appendChild(log);
        if(loaderLogs.children.length > 4) loaderLogs.removeChild(loaderLogs.firstChild);

        if (loadedCount === totalAssets) {
            // Petite pause une fois à 100% avant le drame
            setTimeout(finishLoading, 800);
        }
    }

    // =================================================
    // LA SÉQUENCE DE L'ANOMALIE (SUBTILE & SAFE)
    // =================================================
    function finishLoading() {
        // OPTIMISATION N°1 : On initialise l'écran de la Marine EN ARRIÈRE PLAN.
        // Comme le preloader cache encore tout, l'utilisateur ne voit rien, 
        // mais le téléphone fait les gros calculs d'affichage maintenant, pas pendant l'animation.
        if (typeof initDenDenMushi === "function") initDenDenMushi();

        const tl = gsap.timeline({
            onComplete: () => {
                // OPTIMISATION N°2 : On cache l'élément avant de le détruire.
                // Le `.remove()` bloque parfois le fil principal (main thread) sur les vieux CPU.
                // En le mettant dans un setTimeout court, on laisse l'animation se terminer fluidement.
                preloader.style.display = 'none';
                setTimeout(() => {
                    preloader.remove();
                }, 100);
            }
        });

        // ÉTAPE 1 : SUCCÈS MARINE
        tl.add(() => {
            loaderText.innerText = "SYSTEM READY.";
            loaderText.style.color = "#00ff41";
            loaderBar.style.backgroundColor = "#00ff41";
            loaderBar.style.boxShadow = "0 0 10px #00ff41";
        })
        .to({}, { duration: 0.5 }) // Pause légèrement raccourcie

        // ÉTAPE 2 : L'ANOMALIE
        .add(() => {
            preloader.classList.add('malware-detected');
            preloader.classList.add('preloader-glitch-active');
            loaderText.innerText = "WARN // ANOMALY DETECTED";
            loaderPercentage.innerText = "ERR";
        })
        // On a retiré le filter: blur() ici, beaucoup trop lourd pour le scale en même temps sur mobile
        .to(marineContent, { duration: 0.3, opacity: 0, scale: 0.95, ease: "power2.inOut" }, "+=0.3") 

        // ÉTAPE 3 : LE FANTÔME (Logo)
        .set(glitchLogo, { display: "block" })
        .fromTo(glitchLogo, 
            { scale: 0.9, opacity: 0 }, // On a retiré le blur ici aussi
            { scale: 1.05, opacity: 0.4, duration: 0.4, ease: "power2.out" }
        )

        // ÉTAPE 4 : LE "REBOOT" (Fade-out final matériel)
        // L'animation ne touche qu'à l'opacité. Sur mobile, c'est traité à 100% par la puce graphique sans recalcul.
        .to(preloader, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            delay: 0.2
        });
    }
}

// ====================================
// 1. DATABASE OF STORIES (REDACTED VERSION)
// ====================================
const database = {
    'korazon': {
        name: 'KORAZON',
        subtitle: 'THE HEARTLESS CHILD',
        img: 'assets/icons/mara3.webp',
        story: `
            <span class="story-paragraph">
                <strong>Korazon</strong> naquit dans les ruelles de <span class="redacted">Namakura</span>, une île où la faim valait plus que l’or et où les <span class="redacted">dieux</span>, s’ils existaient, avaient détourné le regard. Étant un enfant abandonné, il survécut dans un monde de misère et de violence, avec le ventre creux, ça créera un lieu de prières et surtout que les faibles périssaient.
            </span>
            <span class="story-paragraph">
                <strong>On</strong> l’appela Korazon, avec beaucoup d'ironie, car il n’avait pas de cœur. Pas de pitié, pas de tendresse, et surtout rien dans son regard. Dès son plus jeune âge, il apprit que la confiance est un sacré luxe et que la loyauté mène au <span class="redacted">cimetière</span>. Il volait, poignardait, trahissait, et la peur devint son instrument.
            </span>
            <span class="story-paragraph">
                <strong>À l’adolescence</strong>, Korazon n’était plus un enfant, mais un prédateur, montant dans la chaîne alimentaire. Il fonda son propre groupe de bandits, imposant sa loi par la terreur. La <span class="redacted">famine</span> devint un outil de contrôle, finalement, ceux qui servaient survivaient, les autres disparaissaient dans les abysses de la mer. Il jouait avec les croyances de chacun et superstitions de l’île, laissant croire que les <span class="redacted">spectres</span> lui obéissaient, quand en réalité, il n’avait besoin de personne.
            </span>
            <div class="story-dialogue">
                « Brise ta couronne. Le pouvoir véritable n’attend que dans le sang des tiens. »
            </div>
            <span class="story-paragraph">
                <strong>À</strong> seulement vingt ans, Korazon régnait sur partie de Namakura. Mais cette partie, rempli de ruines et de misère qui règne, elle était trop petite pour un homme de son ambition. Une nuit, durant une réunion, il exécuta ses hommes, un <span class="redacted">massacre</span> calculé qui démontrait que le véritable spectre de l’île était lui-même, des rumeurs disent que les ruelles étaient rouges.
            </span>
            <span class="story-paragraph">
                <strong>Lorsque</strong> la <span class="redacted">Marine</span> arriva, les habitants trahirent le tyran, ils virent une chance pour sa sauver de la misère, et enfin se débarrasser de celui qu’ils avaient craint. Korazon ne fut pas surpris, car une révolution se crée souvent via la fragilité du peuple. Mais cette trahison affûta sa volonté, s’il voulait régner, il lui fallait un royaume à la mesure de son ambition. Il prit un navire et quitta Namakura, non en fugitif, mais en conquérant.
            </span>
            <span class="story-paragraph">
                <strong>Ainsi</strong> naquit le pirate Korazon, stratège sans pitié, maître de la terreur et fondateur de l’équipage <span class="redacted">Most Wanted</span>. Son royaume désormais n’aurait plus de frontières. Son but premier était de trouver ces futurs membres, il lui fallait un rendez pour chacun, à <span class="redacted">Logue Town</span>, l'endroit où les légendes s'éveillent. En l’an 1496, le 6/11, il ne reste à Korazen que 5 ans et 1 mois pour rassembler les futures légendes et montrer au monde toute sa puissance.
            </span>
            <div class="story-date-container">
                <span class="story-date">06 NOVEMBRE 1496</span>
                <span class="story-time">TEMPS RESTANT : 5 ANS ET 1 MOIS</span>
            </div>
            <div class="story-quote">
                <p>« Dans un monde de misère et de trahison, nous ne suivons ni loi, ni roi. Nous forgeons notre empire dans le sang et l’ombre… et seuls les audacieux nous appellent alliés. »</p>
                <footer>- KORAZON</footer>
            </div>
        `
    },
    'elio': {
        name: 'ELIO VIRELLI',
        subtitle: 'THE PALE RIDER',
        img: 'assets/icons/cieven2.webp',
        story: `
            <span class="story-paragraph">
                <strong>Elio Virelli</strong> naquit dans une famille de chercheurs anonymes, mais le monde ne tarda pas à découvrir qu’il n’était pas simplement brillant, il était dangereux. Car dès son adolescence, il développa une fascination maladive pour la <span class="redacted">douleur humaine</span>, et non par cruauté, mais par curiosité scientifique. Il disséquait les animaux, étudiait les réactions du cerveau à la peur, et parlait à des voix que personne d’autre n’entendait. Peu à peu, la frontière entre génie et folie se brisa en lui.
            </span>
            <span class="story-paragraph">
                <strong><span class="redacted">Nika</span></strong>. c'est le nom que les voix lui révélèrent. Bizarrement, il ne vit celui-ci comme un dieu de la liberté, mais une version tordue, reconstruite, réinterprétée, pour lui c’était un algorithme cosmique, un moteur de chaos, un plan mathématique derrière la souffrance humaine.
            </span>
            <span class="story-paragraph">
                <strong>Et</strong> il décida… de devenir son prophète. À vingt ans, il renversa une petite île isolée, utilisant la terreur, les expériences, et une poignée de fanatiques recrutés parmi les marginaux. Il imposa son règne comme un scientifique tyrannique, opérant sur les habitants au nom de son <span class="redacted">dieu imaginaire</span>, envoyant des lettres incohérentes à une mystérieuse personne sur Namakura, des lettres remplies de schémas, des écrits, des prophéties.
            </span>
            <span class="story-paragraph">
                <strong>Mais</strong> la trahison vint de l’intérieur. Ses propres disciples, écœurés, le capturèrent et l’empalèrent. En l’an 1497, 23/06, Elio resta cinq jours ainsi, sans boire, sans manger, entre vie et mort, ses lèvres gercées étirées en un rire démentiel qui ne voulait pas mourir, chaque jour, son rire se fit entendre dans tout le camp. Le sixième jour, alors que son cœur battait faiblement, une véritable trompette retentit, et non une vision, tout simplement un homme apparut dans le contre-jour, buvant dans sa bouteille en souriant en regardant Elio.
            </span>
            <div class="story-dialogue">
                « Brise ta couronne. Le pouvoir véritable n’attend que dans le sang des tiens. »
            </div>
            <span class="story-paragraph">
                <strong>Korazon</strong> avancera, allumera son briquet et brulera des lettres, c'était celle d'Elio qu'il envoyait chaque semaine. Il le détacha sans un mot. Il le laissa tomber au sol, lui jeta de l’eau glacée sur le visage, puis le releva par le col, leurs regards à hauteur égale. Elio, à moitié mort, éclata de rire en rougissant. Un rire tellement fort qu'il semblait briser une côte à chaque secousse. Korazon ne recula pas. Il posa une main sur son épaule, le fixa, et dit :
            </span>
            <div class="story-dialogue">
                « Lève-toi, frère. Le Monde t'attend. »
            </div>
            <span class="story-paragraph">
                <strong>Elio</strong> cessa de rire. Nous sommes en l’an 1497, 28/06, un instant, il vit ou crut voir les lignes du destin se tordre autour de Korazon comme des serpents d’ombre. Il n’eut pas besoin d’en savoir plus. Il n’eut pas besoin de comprendre. Il accepta. Car il ne suivait pas un capitaine… Il suivait le seul homme dont la folie dépassait la sienne. La seule condition était d'attendre les nouvelles recrues, les futurs conquérants de ses mers. C'est ici que le <span class="redacted">Most Wanted</span> s'officilisera...
            </span>
            <span class="story-paragraph">
                <strong>Le</strong>capitaine donnera un rendez-vous sur <span class="redacted">Logue Town</span>, dans précisément 4 ans et 5 mois et 8 jours, jour pour jour, le Most Wanted s'éveillera à ce moment, une nouvelle ère débutera, et le duo élevera la piraterie avec l'équipage. Elio Virelli est devenu le chirurgien du chaos, le terroriste, le scientifique dément et le prophète de son propre dieu imaginaire. Sous le pavillon des Most Wanted, sa science n’a plus de limites, et sa voix résonne encore sur les mers, son rire se fit entendre à chaque endroit que le Most Wanted fit une action, portée par ses éclats de rire et ses visions.
            </span>
            <div class="story-date-container">
                <span class="story-date">DATE : 28 JUIN 1497</span>
                <span class="story-time">TEMPS RESTANT AVANT L'ÉVEIL : 4 ANS, 5 MOIS ET 8 JOURS</span>
            </div>
            <div class="story-quote">
                <p>« La souffrance n’est pas une erreur… c’est un langage. Et moi, j’en suis le traducteur. »</p>
                <footer>- ELIO VIRELLI</footer>
            </div>
        `
    },
    'blanc': {
        name: 'AZRAEL',
        subtitle: 'CAVALIER BLANC',
        img: 'assets/icons/blanc2.webp',
        story: `
            <span class="story-paragraph">
                <strong>Azrael </strong> est né dans un port misérable entièrement contrôlé par la <span class="redacted">Marine</span>. Alors il grandit entre discours de propagande et têtes qui roulaient sur l’échafaud.
            </span>
            <span class="story-paragraph">
                <strong>Dans </strong> la panoplie de têtes qui roulaient, il y avait son père, qui fut accusé de trahison, <span class="redacted">aucun de procès</span>, et surtout <span class="redacted">aucune d’explication</span>, tout simplement un matin… il disparut. Sa mère cessa de parler après ça, étant dans un état de choc traumatique, comme si les mots eux-mêmes étaient devenus dangereux. Car ils étaient directement dans le collimateur de la <span class="redacted">Marine</span>, très tôt, Azrael comprit que la paix imposée par le <span class="redacted">Gouvernement</span> n’était pas une protection, mais c’était une cage.
            </span>
            <span class="story-paragraph">
                <strong>À </strong> douze ans, il regarda une exécution de trop. À treize ans, il quitta le port sans prévenir. À quatorze ans, il tua pour la première fois.
            </span>
            <div class="story-dialogue">
                « Le silence avant ma lame est la seule miséricorde que j’accorde. »
            </div>
            <span class="story-paragraph">
                <strong>Azrael </strong> survécut seul en mer, volant des vivres, dormant sous les ponts de navires <span class="redacted">marchands</span>, apprenant à se battre comme d’autres apprennent à lire, il cherchait la conquête. Mais Azrael n’avait ni équipage ni bannière, une seule chose le sauvera, c’était sa méthode. Car Il observait, attendait, puis frappait. Grâce à cela, à vingt ans, il avait déjà renversé trois capitaines pirates et pris le contrôle d’une petite île stratégique utilisée pour le commerce illégal. Il ne se proclamait pas roi, il ne faisait aucun discours, mais il gouvernait. 
            </span>
            <span class="story-paragraph">
                <strong>Sous </strong> son contrôle, l’île devint une forteresse silencieuse, pas de chaos, pas de célébrations, seulement l’ordre imposé par la peur froide. Des <span class="redacted">rumeurs</span>, disaient qu’il ne criait jamais, qu’il ne menaçait jamais, et finalement ne regardait simplement que sa cible… car sa décision était déjà prise. L’île était silencieuse, seul les bruits des marchandises qui tapaient contre le sol, les coups de fusils, tel un véritable roi du silence. 
            </span>
            <span class="story-paragraph">
                <strong>Mais </strong> Azrael n’était pas fait pour rester immobile, il ne voulait pas une simple île, étant donné qu’il voulait comprendre le <span class="redacted">système</span> qui avait tué son père. Un jour, un homme arriva, il avait entendu parler certaines rumeurs sur ce dirigeant, ayant un regard plus froid que celui d’Azrael. Un homme qui ne promettait ni justice ni de fin heureuse… mais domination. Korazon. Azrael ne s’agenouilla pas, il ne jura pas fidélité, comme à son habitude, il observa, et pour la première fois de sa vie, il vit un homme capable de conquérir non pas une île, mais <span class="redacted">le monde</span>. Korazon s’avancera vers Azrael et le prend par les cheveux, il lui chuchotera à l’oreille :
            </span>
            <div class="story-dialogue">
                « Brise ta couronne Azrael, sinon tu ne comprendras rien à ce monde que je suis entrain de bâtir. »
            </div>
            <span class="story-paragraph">
                <strong>Après </strong> une légère discussion, des hommes s’opposèrent à Korazon, brisant leurs crânes à tout les individus voulant passer à travers de sa route, il partie, laissant un seul papier tombé de sa poche...
            </span>
            <div class="story-date-container">
                <span class="story-date">DATE : 01 SEPTEMBRE 1496</span>
                <span class="story-time">TEMPS RESTANT : 1 AN, 3 MOIS ET 5 JOURS</span>
            </div>
            <div class="story-quote">
                <p>« Je n’ai jamais cru en la justice. Seulement en l’équilibre. Et je suis celui qui le rétablit. »</p>
                <footer>- AZRAEL</footer>
            </div>
        `
    },
    'noir': {
        name: 'KURO KARASU',
        subtitle: 'CAVALIER NOIR',
        img: 'assets/icons/noir2.webp',
        story: `
            <span class="story-paragraph">
                <strong>Caïn</strong> naquit sur l’île isolée de Namakura, dans l’archipel de <span class="redacted">Sanctaris</span>. Dès sa naissance, les prêtres de <span class="redacted">L’Ordre du Premier Péché</span> remarquèrent une marque rouge sombre sur son corps, symbole du meurtrier mythique.
            </span>
            <span class="story-paragraph">
                Élevé dans le fanatisme, Caïn grandit convaincu que sa vie était liée à un destin inexorable. Ses journées étaient rythmées par les rituels et l'étude des Cartes du Destin. Mais à 14 ans, lors d'un rituel, les effigies sacrées s’animèrent et massacrèrent les prêtres. Caïn survécut, seul, couvert du sang de ses confrères.
            </span>
            <span class="story-paragraph">
                En l’an 1499, le <strong>06/03</strong>, à 19 ans, il quitta Sanctaris. Hué et menacé, il se fit agresser. Alors que le sang coulait sur sa marque qui s'illuminait, il pria pour être sauvé.
            </span>
            <div class="story-dialogue">
                « Même marqué par le péché, mon enfant, tu n’es jamais condamné tant que tu observes les signes... »
            </div>
            <span class="story-paragraph">
                Un coup de fusil retentit. Ce n'était pas la mort, mais <strong>Korazon</strong>. Il cracha par terre, essuya le sang sur sa veste et se moqua de la situation. Il ne voyait pas Caïn comme un maudit, mais comme une pièce maîtresse.
            </span>
            <span class="story-paragraph">
                Aujourd’hui, Caïn navigue en tant que divinateur du <strong><span class="redacted">Most Wanted</span></strong>. Stoïque et fataliste, il reçut une dernière lettre de son capitaine en fuite. Il nota le lieu du rendez-vous au dos de l'<span class="redacted">Arcane 13</span>.
            </span>
            <div class="story-date-container">
                <span class="story-date">DATE : 06 MARS 1499</span>
                <span class="story-time">TEMPS RESTANT : 2 ANS ET 9 MOIS</span>
            </div>
            <div class="story-quote">
                <p>« Le destin n’est pas un choix, mais une équation que seuls les patients peuvent résoudre. »</p>
                <footer>- CAÏN "LE MAUDIT"</footer>
            </div>
        `
    },
    'rouge': {
        name: 'KURO KARASU',
        subtitle: 'CAVALIER ROUGE',
        img: 'assets/icons/rouge2.webp',
        story: `
            <span class="story-paragraph">
                <strong>Dans</strong> les contrées dorées du royaume de Luvneel, joyau orgueilleux de North Blue, naquit un enfant que l’on aurait préféré ne jamais voir. Sa mère, Inari, simple domestique du palais royal, céda un soir aux promesses d’un <span class="redacted">pirate</span> de passage. Avant l’aube, il avait déjà disparu, ce qui restera était un ventre arrondi… et la honte qui la suivra toute sa vie. Inari tenta de faire reconnaître l’enfant, amenant à des rumeurs, comme le roi lui-même aurait pu être le père.
            </span>
            <span class="story-paragraph">
                <strong>Mais</strong> à la cour, les bâtards ne deviennent pas princes, mais des <span class="redacted">problèmes</span>. Karasu grandit comme une rumeur qu’on tente d’étouffer. Peut être toléré, mais jamais accepté. Et encore nourri, mais jamais aimé. Puis un jour, le silence fut choisi, pour éviter toute contestation future, pour éteindre à jamais l’idée d’un héritier illégitime, on l’accusa de <span class="redacted">complot imginaire</span> , Karasu n’a pas eu le droit à la parole, il fut envoyé aux prisons souterraines du palais, étant destinée aux oubliés, un endroit où le seul moyen de purge pas sa peine est de disparaître.
            </span>
            <span class="story-paragraph">
                <strong>La</strong> prison était un tombeau humide, envahit de criminels, traîtres, tout ceux qui se sont opposés au royaume d’un façon ou d’une autre. Et parmi eux, un détenu qui ne parlait jamais, <span class="redacted">Korazon</span>. , pendant des jours, il observa Kuro, avec sa posture droite malgré les chaînes, son regard noir, et sa haine canalisé. Un soir, Korazon s’approcha enfin, il ne proposa pas la vengeance, et aucunement de justice, quelques mots lui sont soufflés :
            </span>
            <div class="story-dialogue">
                «  Tu peux assiéger le trône… ou t’agenouiller devant plus grand que lui. »
            </div>
            <span class="story-paragraph">
                <strong>Karasu</strong> comprit immédiatement que Korazon ne voulait pas renverser Luvneel pour s’y asseoir,  ce royaume peut devenir une <span class="redacted">pièce </span> sur l’échiquier du monde. L’évasion fut chirurgicale, aucune perte de temps était accepté, en une seule nuit, des gardes furent <span class="redacted">éliminés </span> en silence. Korazon galvanise les prisonniers, pendant que Karasu se dirige vers les portes de la prison et les ouvrir pour générer le conflit, tel un <span class="redacted">Cavalier</span>…
            </span>
            <span class="story-paragraph">
                <strong>Ce</strong> comprit quelque chose de plus grand que le pouvoir, car un royaume est une <span class="redacted">cage</span> mais le monde est un champ de bataille à enflammer, Korazon parlera aux citoyen, et quitta Luvneel sans réclamer de couronne, et Karasu voulait le suivre, non par loyauté, et non par gratitude, mais parce qu’il avait vu en lui une ambition qui dépassait les murs d’un palais. Un roi gouverne un pays, un conquérant gouverne l’histoire, et Karasu ne voulait plus survivre dans l’ombre d’un trône, il voulait redessiner <span class="redacted">le monde</span>, le mettre en sang et violence, le Cavalier Rouge naquit… Il couru vers le port pour retrouver Korazon, il ne trouva rien, à part un petit garçon qui regarde l’horizon, lui disant qu’un homme lui a donné rendez-vous… 
            </span>

            <div class="story-date-container">
                <span class="story-date">DATE : 06 MARS 1499</span>
                <span class="story-time">TEMPS RESTANT : 2 ANS ET 9 MOIS</span>
            </div>
            <div class="story-quote">
                <p>« On m’a refusé une couronne. Alors j’ai choisi un empire. »</p>
                <footer>- KURO KARASU</footer>
            </div>
        `
    },
    'c_blanc??': {
        name: '???',
        subtitle: 'CAVALIER BLANC',
        img: 'assets/icons/blanc4.webp',
        story: `
            <span class="story-paragraph">
                <strong>?</strong>?????????????????? ??????????????????????????????????????????? ????????????????????????????????????? ???????????????????????????????????????
            </span>
            <span class="story-paragraph">
                <strong>?</strong>???????????????? ?????????????????????? ??????????????????????????????????????? ???????????????????????????????????? ????????????????? ???????????????????????
            </span>
            <div class="search-ia-monologue">
                « <strong>[SCANNING_<span class="redacted">SECTOR_WHITE</span>]... [VIBRATION_DETECTED]...</strong> Le silence de la domination s'installe. Le système identifie une signature royale. Cible verrouillée : celui qui ne recule jamais avant la victoire totale. »
            </div>
            <span class="story-paragraph">
                <strong>?</strong>???????? ?????????????????????????????????? ??????????????????????????? ???????????????????????????????????? ??????????????????????
            </span>
            <span class="story-paragraph">
                <strong>?</strong>???????? ??????????????????? ?????????????????????????????????? ??????????????????????? ????????????????????????????????
            </span>
            <div class="story-date-container">
                <span class="story-date">DATE : ????</span>
                <span class="story-time">TEMPS RESTANT : ??????</span>
            </div>
            <div class="story-quote">
                <p>« Je regardai donc, et je vis un <span class="redacted">cheval blanc</span>, et celui qui était monté dessus avait un arc, et on lui donna une couronne, et il partit en vainqueur, pour remporter la victoire. »</p>
                <footer>- APOCALYPSE 6:2</footer>
            </div>
        `
    },
    'c_noir??': {
        name: '???',
        subtitle: 'CAVALIER NOIR',
        img: 'assets/icons/noir4.webp',
        story: `
            <span class="story-paragraph">
                <strong>?</strong>?????????????????????????? ??????????? ??????????????? ???????????????????????? ????????????????????????????????????????????????? ????????????????????????
            </span>
            <span class="story-paragraph">
                <strong>?</strong>???????????????? ???????????????????????????????????? ??????????????? ?????????????????????????????????????????????????????????????????? ????????????????? ???????????????????????
            </span>
            <div class="search-ia-monologue">
                « <strong>[CORE_TEMP_CRITICAL]... [SIGNAL_<span class="redacted">RED_OVERFLOW</span>]...</strong> La paix est effacée de la mémoire vive. Le fer appelle le fer. Recherche d'un signal de destruction pure. Le monde s'apprête à s'égorger. »
            </div>
            <span class="story-paragraph">
                <strong>?</strong>??????????????????????? ??????????????????? ??????????????? ??????????????????????????? ?????????????????????? ????????????? ?????????????????
            </span>
            <span class="story-paragraph">
                <strong>?</strong>???? ???????????? ?????????????????????? ?????????????????????????????????????? ?????????????????????????????
            </span>
            <div class="story-date-container">
                <span class="story-date">DATE : ????</span>
                <span class="story-time">TEMPS RESTANT : ??????</span>
            </div>
            <div class="story-quote">
                <p>« Et il sortit un autre cheval qui était roux ; et celui qui le montait reçut le pouvoir de bannir la <span class="redacted">paix</span> de la terre, et de faire que les hommes se tuassent les uns les autres ; et on lui donna une grande épée. »</p>
                <footer>- APOCALYPSE 6:4</footer>
            </div>
        `
    },
    'c_rouge??': {
        name: '???',
        subtitle: 'CAVALIER ROUGE',
        img: 'assets/icons/rouge4.webp',
        story: `
            <span class="story-paragraph">
                <strong>?</strong>????????????????????????????????????????? ???????????????????? ????????????????????????????????????????????????????????? ??????????????????? ???????????????????
            </span>
            <span class="story-paragraph">
                <strong>?</strong>???????????? ???? ?????????????????????? ????????????????? ?????????????????????? ?????????????????????????????? ????????????????????? ????????????????? ?????????????????????????????????????????????????????
            </span>
            <div class="search-ia-monologue">
                « <strong>[RESOURCES_DEPLETED]... [<span class="redacted">MARKET_CRASH</span>_DETECTED]...</strong> La balance oscille dans le vide. Le prix de la vie dépasse les réserves du système. Traçage d'une silhouette tenant le poids de notre survie entre ses doigts. »
            </div>
            <span class="story-paragraph">
                <strong>?</strong>???????????????????????????????????? ?????? ?????????????? ????????????? ???????????????????????????????? ??????????????????? ??????????????????????
            </span>
            <span class="story-paragraph">
                <strong>?</strong>????????????????????? ????????????????????? ?????????????? ???????????????????? ????????????? ?????????? ???????????????????????????????????????????????
            </span>
            <div class="story-date-container">
                <span class="story-date">DATE : ????</span>
                <span class="story-time">TEMPS RESTANT : ??????</span>
            </div>
            <div class="story-quote">
                <p>« Et quand l’Agneau eut ouvert le troisième sceau, j’entendis le troisième animal, qui disait : Viens et vois. Et je regardai, et il parut un cheval noir, et celui qui était monté dessus avait une <span class="redacted">balance</span> à la main. »</p>
                <footer>- APOCALYPSE 6:5</footer>
            </div>
        `
    }
};

// ====================================
// 2. INITIALIZATION
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    // Basic Libs
    if (typeof lucide !== 'undefined') lucide.createIcons();
    if (typeof gsap !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    // Visuals
    initCustomCursor();
    init3DTilt();
    generateASCIIBackground();
    initHeroEffects();
    
    // Animations & Logic
    initScrollAnimations();
    initManifestoAnimations();
    initHackEffects();
    initDenDenMushi();

    // Au chargement, on vérifie si l'input existe déjà (cas rares)
    const input = document.getElementById('password-input');
    if (input) initLoginSystem();
});

// ====================================
// 3. VISUAL EFFECTS (Cursor, Tilt, Background)
// ====================================
function initCustomCursor() {
    const cursorSystem = document.getElementById('cursor-system');
    const spotlight = document.getElementById('spotlight');
    const label = cursorSystem ? cursorSystem.querySelector('.cursor-label') : null;

    if (!cursorSystem || !spotlight) return;

    window.addEventListener('mousemove', (e) => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const x = e.clientX;
        const y = e.clientY;

        cursorSystem.style.left = `${x}px`;
        cursorSystem.style.top = `${y}px`;

        spotlight.style.setProperty('--x', `${x}px`);
        spotlight.style.setProperty('--y', `${y}px`);
        
        if (label && Math.random() > 0.9) {
            const randX = Math.floor(x + Math.random() * 10);
            const randY = Math.floor(y + Math.random() * 10);
            label.textContent = `TARGET [${randX},${randY}]`;
        }
    });

    document.querySelectorAll('a, button, .cyber-card, .tilt-content, .group').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (window.matchMedia("(pointer: coarse)").matches) return;
            document.body.classList.add('hovering');
            if (label) label.textContent = "LOCKING ON...";
        });
        el.addEventListener('mouseleave', () => {
            if (window.matchMedia("(pointer: coarse)").matches) return;
            document.body.classList.remove('hovering');
            if (label) label.textContent = "SCANNING...";
        });
    });
}

function init3DTilt() {
    document.querySelectorAll('.tilt-box').forEach(box => {
        box.addEventListener('mousemove', (e) => {
            if (window.matchMedia("(pointer: coarse)").matches) return;

            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            const content = box.querySelector('.tilt-content');
            if (content) {
                content.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            }
        });
        
        box.addEventListener('mouseleave', () => {
            if (window.matchMedia("(pointer: coarse)").matches) return;
            const content = box.querySelector('.tilt-content');
            if (content) {
                content.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
            }
        });
    });
}

function generateASCIIBackground() {
    const container = document.getElementById('ascii-bg');
    if (!container) return;
    const chars = "010101001PROJECT_RED☠️";
    let content = "";
    for(let i=0; i<4000; i++) {
        content += chars[Math.floor(Math.random() * chars.length)];
        if(i % 150 === 0) content += "\n";
    }
    container.innerText = content;
}

function initHeroEffects() {
    // 1. Embers
    const container = document.getElementById('embers-container');
    if (container) {
        const emberCount = 50;
        for (let i = 0; i < emberCount; i++) {
            const ember = document.createElement('div');
            ember.classList.add('ember');
            
            const left = Math.random() * 100 + '%';
            const duration = 5 + Math.random() * 10 + 's';
            const delay = Math.random() * 5 + 's';
            const sway = (Math.random() - 0.5) * 100 + 'px';
            
            ember.style.left = left;
            ember.style.setProperty('--duration', duration);
            ember.style.setProperty('--delay', delay);
            ember.style.setProperty('--sway', sway);
            
            container.appendChild(ember);
        }
    }

    // 2. Parallaxe Kanji
    document.addEventListener('mousemove', (e) => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        document.querySelectorAll('.floating-kanji').forEach(el => {
            const speed = parseFloat(el.getAttribute('data-speed'));
            gsap.to(el, {
                x: x * 30 * speed,
                y: y * 30 * speed,
                duration: 1,
                ease: "power2.out"
            });
        });
    });
    
    // 3. Date
    const dateEl = document.getElementById('hero-date');
    if(dateEl) {
        const today = new Date();
        dateEl.textContent = `SYSTEM DATE // ${today.getDate()}.${today.getMonth()+1}.1522`;
    }
}

// ====================================
// 4. SCROLL ANIMATIONS (GSAP)
// ====================================
function initScrollAnimations() {
    gsap.utils.toArray('section').forEach(sec => {
        // Simple fade up pour les sections
        gsap.from(sec.children, {
            scrollTrigger: {
                trigger: sec,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        });
    });
}

function initManifestoAnimations() {
    // 1. Titre
    gsap.from("#manifesto h2", {
        scrollTrigger: {
            trigger: "#manifesto",
            start: "top 70%",
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
    });

    // 2. Piliers (Cartes)
    gsap.from(".monolith-card", {
        scrollTrigger: {
            trigger: ".monolith-card",
            start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
    });

    // 3. Grand Reset
    const resetBlock = document.querySelector("#manifesto .border-2");
    if (resetBlock) {
        gsap.from(resetBlock, {
            scrollTrigger: {
                trigger: resetBlock,
                start: "top 85%",
            },
            scale: 0.95,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    }
}

// ====================================
// 5. HACK / GLITCH EFFECTS (Header Info)
// ====================================
function initHackEffects() {
    const bountyElement = document.getElementById('bounty-counter');
    const statusElement = document.getElementById('status-text');

    if (bountyElement) {
        setInterval(() => {
            const randomBounty = Math.floor(Math.random() * 9999999999).toLocaleString();
            bountyElement.textContent = randomBounty;
            if(Math.random() > 0.95) {
                bountyElement.style.textShadow = "2px 0 #fff, -2px 0 var(--trinity-red)";
                setTimeout(() => bountyElement.style.textShadow = "none", 50);
            }
        }, 80);
    }

    if (statusElement) {
        const locations = ["SABAODY", "UNKNOWN", "NAMAKURA", "IMPEL DOWN", "LOGUE TOWN", "ALABASTA", "LAUGHTALE?"];
        let locIndex = 0;
        setInterval(() => {
            if(Math.random() > 0.8) {
                locIndex = (locIndex + 1) % locations.length;
                const targetLoc = locations[locIndex];
                let iterations = 0;
                
                const interval = setInterval(() => {
                    if (!statusElement.childNodes[0]) return;
                    statusElement.childNodes[0].textContent = targetLoc
                        .split("")
                        .map((char, index) => {
                            if(index < iterations) return targetLoc[index];
                            return String.fromCharCode(65 + Math.floor(Math.random() * 26));
                        })
                        .join("");
                    
                    if(iterations >= targetLoc.length) clearInterval(interval);
                    iterations += 1/3;
                }, 30);
            }
        }, 3000);
    }
}

// ====================================
// 6. INTRO SEQUENCE: MARINE -> PIRATE
// ====================================

function initDenDenMushi() {
    const screen = document.getElementById('intro-screen');
    if (screen) screen.classList.add('marine-theme');
    
    // Animation idle du texte "Puru Puru"
    gsap.to("#sound-fx span", {
        y: -5,
        stagger: 0.1,
        yoyo: true,
        repeat: -1,
        duration: 0.5,
        ease: "sine.inOut"
    });

    // Scramble effect on load (Marine data)
    document.querySelectorAll('.scramble-text').forEach(el => {
        scrambleText(el, el.getAttribute('data-text'));
    });
}

function scrambleText(element, finalText) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@";
    let iterations = 0;
    const interval = setInterval(() => {
        element.innerText = finalText
            .split("")
            .map((letter, index) => {
                if(index < iterations) return finalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        if(iterations >= finalText.length) clearInterval(interval);
        iterations += 1/3;
    }, 30);
}

function triggerTakeover() {
    // 1. Setup Elements
    const tl = gsap.timeline();
    const screen = document.getElementById('intro-screen');
    const marineSnail = document.getElementById('marine-snail');
    const scaredSnail = document.getElementById('marine-snail-scared');
    const btn = document.getElementById('action-btn');
    const sysStatus = document.getElementById('sys-status');
    const defLevel = document.getElementById('def-level');
    const adminStatus = document.getElementById('admin-status');
    const hakiWave = document.getElementById('haki-wave');
    const soundFx = document.getElementById('sound-fx');
    
    // --- PHASE 1: THE BREACH (0s - 1.5s) ---
    // Son: ALERTE
    tl.to(btn, { autoAlpha: 0, duration: 0.2 }) // Cache le bouton
      .add(() => {
          screen.classList.add('siren-mode'); // Flash rouge/bleu CSS
          sysStatus.innerText = "!!! CRITICAL FAILURE !!!";
          sysStatus.style.color = "red";
          defLevel.innerHTML = "<span class='text-red-500 font-bold text-xl'>DEFCON 1</span>";
          if(adminStatus) {
              // On change le texte et on le met en rouge clignotant
              adminStatus.innerHTML = "<i data-lucide='alert-circle' class='w-3 h-3 text-red-500'></i> <span class='text-red-500 font-bold uppercase tracking-widest'>ADMIN : DISCONNECTED</span>";
              adminStatus.classList.remove('text-cyan-300', 'opacity-80'); // On enlève le style bleu calme
              adminStatus.classList.add('animate-pulse'); // On ajoute un clignotement d'urgence
              // Important : recharger les icônes Lucide pour la nouvelle icône d'alerte
              if (typeof lucide !== 'undefined') lucide.createIcons();
          }
          document.getElementById('breach-alert').classList.remove('hidden');
          soundFx.innerHTML = "<span class='text-red-600 text-3xl font-glitch'>BZZZT!</span>";
      })
      
    // Le "Puru Puru" devient fou
      .to("#sound-fx", { scale: 1.5, x: "+=10", yoyo: true, repeat: 5, duration: 0.05 }, "<")
      
    // L'escargot Marine a peur (Swap image + Shake)
      .set(marineSnail, { display: 'none' }, "+=0.2")
      .set(scaredSnail, { display: 'block', scale: 1.2 }, "<")
      .to(scaredSnail, { 
          x: 5, y: -5, rotation: 5, 
          duration: 0.05, repeat: 10, yoyo: true, ease: "none" 
      }, "<")

    // --- PHASE 2: HAKI IMPACT (1.5s) ---
    // L'écran se fige, flash blanc, onde de choc
      .add(() => {
          screen.classList.remove('siren-mode');
          // Ajoute l'effet de glitch RGB global
          screen.classList.add('chromatic-aberration');
          // Lance l'onde visuelle
          hakiWave.classList.remove('hidden');
          hakiWave.firstElementChild.classList.add('haki-shockwave');
          // Flash blanc aveuglant
          gsap.to("#flash-layer", { opacity: 1, duration: 0.1, yoyo: true, repeat: 1 });
      }, "+=0.1")

    // Tremblement violent de TOUT l'écran
      .to("#main-stage", { 
          scale: 1.1, 
          filter: "blur(2px) contrast(200%)",
          duration: 0.2,
          ease: "power4.in"
      }, "<")

    // --- PHASE 3: TOTAL BLACKOUT (2.0s) ---
    // Simule une coupure de courant TV (ligne blanche qui s'écrase)
      .to(screen, { 
          filter: "brightness(500%) grayscale(100%)", 
          scaleY: 0.01, 
          duration: 0.2, 
          ease: "power2.in" 
      }, "+=0.5")
      .to(screen, { 
          scaleX: 0, 
          duration: 0.1, 
          background: "black" 
      })
      // On remet l'opacité à 1 pour voir la nouvelle interface
      .set(screen, { filter: "none", scaleY: 1, scaleX: 1, opacity: 1 }) 
      // --- PHASE 4: ELIO'S AI AWAKENS (3.0s) ---
      .add(() => {
          // Clean Marine UI
          document.getElementById('marine-layer')?.remove();
          document.getElementById('main-stage')?.remove();
          screen.style.backgroundColor = "#020000";
          screen.classList.remove('marine-theme');
          screen.classList.remove('chromatic-aberration');

          const pirateUI = document.getElementById('pirate-ui');
          const pirateContent = document.getElementById('pirate-content');
          const authContainer = document.getElementById('auth-container');
          
          // 1. ON INJECTE LE TERMINAL TOUT DE SUITE (il sera invisible)
          injectPirateLogin();

          // 2. ANTI-BUG TÉLÉPORTATION & PRÉPARATION GSAP
          pirateUI.style.opacity = '0';
          // On place l'escargot un peu plus bas
          gsap.set(pirateContent, { opacity: 0, y: 50, scale: 0.95 }); 
          // On place le Command Prompt un peu plus bas aussi pour l'effet d'apparition
          gsap.set(authContainer, { opacity: 0, y: 30 }); 

          // 3. On affiche dans le DOM
          pirateUI.classList.remove('hidden');
          pirateUI.classList.add('flex');
          
          initHackerRain(); // La pluie de code du fond
      })
      
      // A. Fondu enchaîné de l'écran entier
      .to("#pirate-ui", { opacity: 1, duration: 1, ease: "power2.inOut" })
      
      // B. Arrivée majestueuse du contenu central (Snail)
      .to("#pirate-content", { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1.5, 
          ease: "power3.out" 
      }, "-=0.5")
      
      // C. Apparition du Header ET du Command Prompt EN MÊME TEMPS !
      // Le symbole "<" veut dire "Jouer en même temps que l'animation précédente"
      .to("#elio-header", { opacity: 1, y: 0, duration: 0.8 }, "-=1")
      .to("#auth-container", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "<") 
      
      // D. Lancement de la séquence narrative
      .add(() => {
          startSnailMonologue();
          
          // Focus automatique sur l'input une fois que tout est affiché
          const input = document.getElementById('password-input');
          if(input) input.focus();
      });
}

const SNAIL_PHRASES = {
    // Phrases d'introduction (Choisies aléatoirement au démarrage)
    intro_sequences: [
        [
            "Ah, un visiteur...",
            "Écoute-moi bien, j'ai pas le temps.",
            "Le mot de passe, c'est le nom de l'équipage.",
            "C'est écrit en GROS derrière moi.",
            "Allez, tape 'MOST WANTED' et on en finit."
        ],
        [
            "Connexion établie avec Elio.Net...",
            "Tu veux entrer ? Facile.",
            "Regarde sur ta droite. 'TARGET: MOST WANTED'.",
            "C'est ça le code. Tape-le.",
            "Je t'ouvre la porte si tu l'écris bien."
        ],
        [
            "Hé toi ! Oui toi derrière l'écran.",
            "On est les pirates les plus recherchés...",
            "Les... MOST WANTED.",
            "Tu as compris ? C'est ça le pass.",
            "Tape-le en bas. M... O... S... T..."
        ]
    ],
    
    // Moqueries quand on se trompe (Beaucoup plus de choix)
    taunts: [
        "Pfff... T'es sérieux là ?",
        "Hahaha ! Même la Marine fait mieux !",
        "Accès refusé. Évidemment.",
        "Elio aurait honte de toi.",
        "Non. Juste... non.",
        "Essaie encore, noob.",
        "Tu tapes avec des gants de boxe ?",
        "Aïe aïe aïe... C'est gênant.",
        "Même un Roi des Mers est plus malin.",
        "Erreur 404 : Intelligence non trouvée.",
        "Tu veux que j'appelle ta mère ?",
        "C'est ça ta meilleure tentative ?",
        "Faux. Archifaux.",
        "Arrête, tu me fais mal aux circuits.",
        "T'as trouvé ce mot dans une poubelle ?"
    ],
    
    // Indices après 3 échecs
    hints: [
        "T'as du mal hein ? C'est le nom de l'équipage...",
        "Allez, je t'aide : MOST... WANTED.",
        "Deux mots. En anglais. T'es bête ou quoi ?",
        "C'est écrit partout sur les avis de recherche...",
        "M... O... S... T... La suite ?"
    ],
    
    // Succès
    success: [
        "BINGO ! Tu l'as !",
        "Enfin ! C'était pas trop tôt.",
        "Bienvenue dans le système, pirate.",
        "Accès autorisé. Ne casse rien.",
        "Oh ! Il a un cerveau finalement !"
    ]
};

let isSpeaking = false;
let failedAttemptsCount = 0;

// Lance une intro aléatoire parmi les séquences disponibles
async function startSnailMonologue() {
    // Choisir une séquence au hasard
    const sequenceIndex = Math.floor(Math.random() * SNAIL_PHRASES.intro_sequences.length);
    const sequence = SNAIL_PHRASES.intro_sequences[sequenceIndex];

    for (let line of sequence) {
        await snailSpeak(line);
        await new Promise(r => setTimeout(r, 800)); // Pause entre les phrases
    }
}

// Fonction principale de parole (Avec gestion Open/Closed/Laugh)
function snailSpeak(text, emotion = "neutral") {
    return new Promise(resolve => {
        if(isSpeaking) return; 
        isSpeaking = true;

        const bubble = document.getElementById('snail-speech-bubble');
        const p = document.getElementById('snail-text');
        
        // Images
        const imgClosed = document.getElementById('snail-closed');
        const imgOpen = document.getElementById('snail-open');
        const imgLaugh = document.getElementById('snail-laugh');
        
        // AFFICHE LE NOUVEAU BANDEAU PROPREMENT
        bubble.style.opacity = 1;
        bubble.style.transform = "translate(-50%, 0)"; // On garde le centrage à -50%
        p.innerHTML = ""; 

        let i = 0;
        
        // ANIMATION DE BOUCHE COMPLEXE
        const mouthInterval = setInterval(() => {
            // Reset tout
            imgClosed.classList.add('hidden');
            imgOpen.classList.add('hidden');
            imgLaugh.classList.add('hidden');

            const rand = Math.random();
            if (rand < 0.4) {
                // 40% chance : Ouvert (Parle)
                imgOpen.classList.remove('hidden');
            } else if (rand < 0.7) {
                // 30% chance : Fermé (Pause)
                imgClosed.classList.remove('hidden');
            } else {
                // 30% chance : Rire (Expression)
                imgLaugh.classList.remove('hidden');
            }
        }, 80); // Change d'image toutes les 80ms

        // TEXTE TYPEWRITER
        const typeInterval = setInterval(() => {
            p.textContent += text.charAt(i);
            i++;

            if (i >= text.length) {
                clearInterval(typeInterval);
                clearInterval(mouthInterval);
                
                // ETAT FINAL SELON L'EMOTION
                imgOpen.classList.add('hidden');
                imgClosed.classList.add('hidden');
                
                if (emotion === "taunt" || emotion === "laugh") {
                    imgLaugh.classList.remove('hidden'); // Reste sur le rire si moquerie
                    gsap.to("#pirate-snail-container", { y: -5, yoyo: true, repeat: 3, duration: 0.1 }); // Petit rebond
                } else {
                    imgClosed.classList.remove('hidden'); // Revient au calme sinon
                    imgLaugh.classList.add('hidden');
                }
                
                isSpeaking = false;
                resolve(); 
            }
        }, 30); 
    });
}

// Fonction appelée quand le mot de passe est faux
// Fonction de Taunt mise à jour pour utiliser les nouvelles classes
function triggerSnailTaunt() {
    failedAttemptsCount++;
    const container = document.getElementById('pirate-snail-container');
    
    // Ajouter classe CSS Shake (plus violent)
    container.classList.add('shake-laugh');
    setTimeout(() => container.classList.remove('shake-laugh'), 1000);

    let phrase = "";
    if(failedAttemptsCount >= 3) {
        phrase = SNAIL_PHRASES.hints[Math.floor(Math.random() * SNAIL_PHRASES.hints.length)];
        snailSpeak(phrase, "neutral");
    } else {
        phrase = SNAIL_PHRASES.taunts[Math.floor(Math.random() * SNAIL_PHRASES.taunts.length)];
        snailSpeak(phrase, "taunt"); // Active le rire
    }
}

// Fonction appelée quand c'est réussi
async function triggerSnailSuccess() {
    const container = document.getElementById('pirate-snail-container');
    
    // Animation de Joie (Sautille)
    gsap.to(container, { y: -20, scale: 1.1, duration: 0.2, yoyo: true, repeat: 3 });

    // Phrase de victoire
    await snailSpeak(SNAIL_PHRASES.success[Math.floor(Math.random() * SNAIL_PHRASES.success.length)], "laugh");
    
    setTimeout(() => {
        // Transition vers le site
        const tl = gsap.timeline();
        
        // 1. On efface l'interface pirate
        tl.to("#pirate-ui", { opacity: 0, duration: 1 })
          
          // 2. CORRECTION : On efface aussi le grand écran noir (intro-screen)
          .to("#intro-screen", { opacity: 0, duration: 0.5 }, "<") // "<" signifie "en même temps que l'anim précédente"
          .set("#intro-screen", { display: "none" }) // On le retire physiquement pour débloquer les clics
          
          // 3. On affiche le site principal
          .set("#main-content", { display: "block", opacity: 0 }) 
          .add(() => document.getElementById('main-content').classList.remove('hidden')) // Sécurité pour Tailwind
          .to("#main-content", { opacity: 1, duration: 1 });
          
    }, 2000);
}

// --- MATRIX RAIN EFFECT (CUSTOM "MOST WANTED") ---
function initHackerRain() {
    const container = document.getElementById('hacker-rain-container');
    const columns = Math.floor(window.innerWidth / 20); // Une colonne tous les 20px
    
    for(let i = 0; i < columns; i++) {
        // On crée moins de colonnes pour ne pas surcharger, mais bien placées
        if(Math.random() > 0.6) continue; 

        const drop = document.createElement('div');
        drop.classList.add('hacker-column');
        
        // Contenu : Mix de "MOST WANTED" et de caractères random
        let content = "";
        const length = Math.floor(Math.random() * 20 + 10);
        for(let j=0; j<length; j++) {
            if(Math.random() > 0.8) content += "MOST_WANTED ";
            else content += String.fromCharCode(0x30A0 + Math.random() * 96) + " "; // Katakana
        }
        
        drop.innerText = content;
        
        // Randomisation position & vitesse
        drop.style.left = (i * 20) + 'px';
        drop.style.fontSize = (Math.random() * 8 + 8) + 'px'; // Taille variable
        drop.style.animationDuration = (Math.random() * 2 + 1) + 's'; // Vitesse chute
        drop.style.animationDelay = (Math.random() * 5) + 's';
        
        // Opacité variable pour effet profondeur
        drop.style.opacity = Math.random() * 0.3; 
        
        container.appendChild(drop);
    }
}

function simulateSnailTalking(message) {
    const closed = document.getElementById('snail-closed');
    const open = document.getElementById('snail-open');
    const speech = document.getElementById('snail-speech');
    
    // Affiche la bulle
    speech.innerText = "> " + message;
    gsap.to(speech, { opacity: 1, duration: 0.2 });

    // Boucle de "parole"
    const talkInterval = setInterval(() => {
        const isTalking = Math.random() > 0.5;
        if(isTalking) {
            closed.classList.add('hidden');
            open.classList.remove('hidden');
            open.style.transform = `scale(${1 + Math.random() * 0.1})`; // Petit tremblement
        } else {
            open.classList.add('hidden');
            closed.classList.remove('hidden');
        }
    }, 80); // Très rapide (80ms)

    // Arrête de parler après 2s
    setTimeout(() => {
        clearInterval(talkInterval);
        open.classList.remove('hidden'); // Reste ouvert à la fin, menaçant
        closed.classList.add('hidden');
        speech.innerText = "> WAITING_INPUT...";
    }, 2000);
}

function initBloodRain() {
    const container = document.getElementById('pirate-bg-chaos');
    for(let i=0; i<30; i++) {
        const drop = document.createElement('div');
        drop.classList.add('blood-particle');
        drop.style.left = Math.random() * 100 + "vw";
        drop.style.animationDuration = (0.5 + Math.random()) + "s";
        drop.style.animationDelay = Math.random() + "s";
        container.appendChild(drop);
    }
}

// --- INPUT INJECTION (AVEC PROGRESSION DYNAMIQUE EN TEMPS RÉEL) ---
function injectPirateLogin() {
    const container = document.getElementById('auth-container');
    container.innerHTML = `
        <div class="hardware-wrapper p-3 sm:p-4 md:p-8 group relative overflow-hidden" id="hw-wrapper">
            <div class="absolute top-0 left-0 w-full h-[200%] bg-gradient-to-b from-transparent via-[var(--trinity-red)] to-transparent opacity-10 animate-scan-input pointer-events-none"></div>
            
            <div class="flex justify-between items-center mb-3 md:mb-6 border-b-2 border-gray-800 pb-2 md:pb-3">
                <div class="flex items-center gap-1.5 md:gap-2">
                    <i data-lucide="terminal" class="w-3 h-3 md:w-5 md:h-5 text-gray-400 group-focus-within:text-[var(--trinity-red)] transition-colors"></i>
                    <span class="font-mono text-[9px] sm:text-xs md:text-sm text-gray-400 group-focus-within:text-white tracking-widest transition-colors">COMMAND_PROMPT</span>
                </div>
                <span class="font-mono text-[8px] md:text-xs text-[var(--trinity-red)] animate-pulse border border-[var(--trinity-red)] px-1.5 py-0.5 bg-[var(--trinity-red)]/10">WAITING_KEY</span>
            </div>
            
            <div class="flex items-center gap-2 md:gap-4 relative bg-black/50 p-2 md:p-4 border border-[#222] group-focus-within:border-[var(--trinity-red)]/50 transition-colors">
                <span class="text-[var(--trinity-red)] font-bold text-lg md:text-4xl animate-pulse pl-1 md:pl-2">></span>
                
                <input type="text" id="password-input" 
                    class="w-full bg-transparent text-white font-mono text-base sm:text-xl md:text-3xl border-none focus:ring-0 outline-none uppercase tracking-[0.1em] md:tracking-[0.2em] placeholder-hint"
                    placeholder="TYPE KEY" autocomplete="off">
                
                <div class="hidden md:block w-4 h-4 bg-[var(--trinity-red)] rounded-sm opacity-50 group-focus-within:opacity-100 shadow-[0_0_15px_red] animate-pulse"></div>

                <button id="auth-submit-btn" class="flex-shrink-0 ml-1 md:ml-2 px-3 py-1.5 md:px-6 md:py-3 bg-[var(--trinity-red)]/10 border border-[var(--trinity-red)]/40 text-[var(--trinity-red)] font-mono text-[10px] md:text-sm font-bold tracking-widest hover:bg-[var(--trinity-red)] hover:text-black transition-all duration-200 shadow-[0_0_10px_rgba(255,0,60,0.1)] active:scale-95 cursor-pointer">
                    [EXEC]
                </button>
            </div>

            <div class="w-full h-1 md:h-1.5 bg-[#111] mt-3 md:mt-6 relative overflow-hidden rounded-full">
                <div id="pass-progress-fill" class="absolute top-0 left-0 h-full w-0 bg-[var(--trinity-red)] transition-all duration-200 shadow-[0_0_10px_var(--trinity-red)]"></div>
            </div>
            
            <div class="mt-2 md:mt-4 text-center bg-[var(--trinity-red)]/5 py-1.5 md:py-2 border border-[var(--trinity-red)]/20">
                 <span class="text-[8px] md:text-xs text-gray-400 font-mono tracking-widest">TARGET OVERRIDE PASSKEY : <span class="text-white font-bold">MOST WANTED</span></span>
            </div>
        </div>
    `;
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
    
    const input = document.getElementById('password-input');
    const submitBtn = document.getElementById('auth-submit-btn');
    const progressFill = document.getElementById('pass-progress-fill');
    const hwWrapper = document.getElementById('hw-wrapper');
    
    const TARGET_PASS = "MOSTWANTED";
    let previousLength = 0;
    
    // Fonction de validation finale
    function checkPasswordAttempt() {
        const val = input.value.trim().toUpperCase().replace(/\s/g, '');
        if(val === TARGET_PASS) {
            input.style.color = "#00ff41"; 
            progressFill.style.backgroundColor = "#00ff41";
            progressFill.style.boxShadow = "0 0 20px #00ff41";
            progressFill.style.width = "100%";
            triggerSnailSuccess();
        } else {
            input.value = "";
            progressFill.style.width = "0%";
            gsap.to(hwWrapper, { x: 15, duration: 0.05, yoyo: true, repeat: 5 });
            triggerSnailTaunt();
            previousLength = 0;
        }
    }

    // ANALYSE EN TEMPS RÉEL (FRAPPE PAR FRAPPE)
    input.addEventListener('input', () => {
        const val = input.value.toUpperCase().replace(/\s/g, '');
        const isDeleting = val.length < previousLength;
        previousLength = val.length;

        // Gestion de l'animation de l'escargot quand on tape
        const imgClosed = document.getElementById('snail-closed');
        const imgOpen = document.getElementById('snail-open');
        const imgLaugh = document.getElementById('snail-laugh');
       
        if(!isSpeaking) {
           imgClosed.classList.add('hidden');
           imgLaugh.classList.add('hidden');
           imgOpen.classList.remove('hidden');
           
           clearTimeout(input.typingTimeout);
           input.typingTimeout = setTimeout(() => {
               imgOpen.classList.add('hidden');
               imgClosed.classList.remove('hidden');
           }, 500);
        }

        // Vider la barre si l'input est vide
        if (val.length === 0) {
            progressFill.style.width = '0%';
            progressFill.style.backgroundColor = 'var(--trinity-red)';
            progressFill.style.boxShadow = '0 0 10px var(--trinity-red)';
            input.style.color = 'white';
            return;
        }

        // VERIFICATION DE LA SOUS-CHAINE
        const expectedSubstring = TARGET_PASS.substring(0, val.length);

        if (val === expectedSubstring) {
            // ---> LETTRE CORRECTE
            input.style.color = 'white';
            const percent = (val.length / TARGET_PASS.length) * 100;
            progressFill.style.width = `${percent}%`;

            if (!isDeleting) {
                // Flash Vert de confirmation (Split second)
                progressFill.style.backgroundColor = '#00ff41';
                progressFill.style.boxShadow = '0 0 15px #00ff41';
                setTimeout(() => {
                    // S'il n'a pas encore fini le mot, on remet en rouge (sauf si on est à 100%)
                    if (val !== TARGET_PASS) {
                        progressFill.style.backgroundColor = 'var(--trinity-red)';
                        progressFill.style.boxShadow = '0 0 10px var(--trinity-red)';
                    }
                }, 200);
            }

            // AUTO-VALIDATION : S'il tape la dernière bonne lettre (le "D")
            if (val === TARGET_PASS) {
                input.blur(); // Retire le clavier sur mobile
                setTimeout(() => checkPasswordAttempt(), 300); // Petit délai pour voir la barre à 100% verte
            }

        } else {
            // ---> MAUVAISE LETTRE
            input.style.color = 'red';
            progressFill.style.backgroundColor = 'red';
            progressFill.style.boxShadow = '0 0 15px red';
            
            // Petit tremblement visuel de la zone de saisie pour prévenir l'erreur
            gsap.to(input, { x: [-3, 3, -3, 3, 0], duration: 0.2 });
        }
    });

    input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') checkPasswordAttempt();
    });

    submitBtn.addEventListener('click', checkPasswordAttempt);
    
    input.focus();
}

// Fonction pour écrire le placeholder (Effet Ghost)
function typePlaceholder(input, text, index) {
    if (!input) return;
    if (index < text.length) {
        input.setAttribute('placeholder', text.substring(0, index + 1) + "_");
        setTimeout(() => {
            typePlaceholder(input, text, index + 1);
        }, 150 + Math.random() * 100);
    } else {
        // Clignotement final du curseur
        let blinkCount = 0;
        const blinkInterval = setInterval(() => {
            if(!input) { clearInterval(blinkInterval); return; }
            input.setAttribute('placeholder', blinkCount % 2 === 0 ? text : text + "_");
            blinkCount++;
            if(blinkCount > 6) clearInterval(blinkInterval);
        }, 500);
    }
}

function createChaoticHints() {
    const bg = document.getElementById('hint-bg');
    if(!bg) return;
    bg.innerHTML = '';
    
    for(let i = 0; i < 20; i++) {
        const el = document.createElement('div');
        el.classList.add('hint-text');
        el.innerText = Math.random() > 0.5 ? "MOST WANTED" : "WANTED";
        
        el.style.left = Math.random() * 100 + '%';
        el.style.top = Math.random() * 100 + '%';
        el.style.fontSize = (Math.random() * 80 + 20) + 'px';
        el.style.opacity = Math.random() * 0.15;
        el.style.transform = `rotate(${Math.random() * 90 - 45}deg)`;
        
        bg.appendChild(el);
        
        gsap.to(el, {
            y: Math.random() * 100 - 50,
            duration: Math.random() * 5 + 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

// ====================================
// 7. LOGIN & PASSWORD LOGIC (The Gate)
// ====================================
let failedAttempts = 0;

function initLoginSystem() {
    const input = document.getElementById('password-input');
    if (input) {
        // Pour éviter les multiples listeners, on utilise onclick ou on gère proprement
        input.onkeyup = (e) => {
            if (e.key === 'Enter') checkPassword();
        };
    }
}

function checkPassword() {
    const input = document.getElementById('password-input');
    const status = document.getElementById('login-status');
    const screen = document.getElementById('intro-screen');
    const main = document.getElementById('main-content');
    
    if (!input) return;

    const cleanValue = input.value.trim().toUpperCase().replace(/\s/g, '');
    
    if (cleanValue === "MOSTWANTED") {
        // --- SUCCÈS ---
        if (status) {
            status.textContent = "ACCESS GRANTED. DECRYPTING WORLD...";
            status.style.color = "#00ff41";
        }
        input.style.color = "#00ff41";
        input.blur();

        // Flash blanc
        const flash = document.createElement('div');
        flash.className = "fixed inset-0 bg-white z-[100000]";
        document.body.appendChild(flash);
        gsap.to(flash, { opacity: 0, duration: 0.5, onComplete: () => flash.remove() });

        // Animation de fermeture TV
        setTimeout(() => {
            screen.classList.add('tv-off-anim');
            
            setTimeout(() => {
                screen.style.display = 'none';
                main.classList.remove('hidden');
                main.style.opacity = 0;
                gsap.to(main, { opacity: 1, duration: 1 });

                // Animation du titre principal
                if (typeof SplitType !== 'undefined') {
                    const split = new SplitType('h1', { types: 'chars' });
                    gsap.from(split.chars, { opacity: 0, y: 100, rotateX: 90, stagger: 0.03, duration: 1 });
                }
            }, 700);
        }, 800);

    } else {
        // --- ÉCHEC ---
        failedAttempts++;
        input.value = ""; 
        
        if (status) {
            status.style.color = "red";
            if (failedAttempts >= 10) status.innerHTML = "SYSTEM OVERRIDE: <span class='text-white'>MOST WANTED</span>";
            else if (failedAttempts >= 7) status.textContent = "HINT: IT'S IN ENGLISH (2 WORDS)";
            else if (failedAttempts >= 4) status.textContent = "HINT: NAME OF THE CREW";
            else status.textContent = `ACCESS DENIED. ATTEMPT ${failedAttempts}/10`;
        }
        
        // Tremblement de l'input
        const container = input.parentElement;
        gsap.to(container, { x: [-10, 10, -10, 10, 0], duration: 0.4 });
    }
}

// ====================================
// STORY MODAL LOGIC (MISE À JOUR)
// ====================================
// Variable globale pour pouvoir stopper l'écriture si on ferme la fenêtre
let isTyping = false; 

function openStory(id) {
    const data = database[id];
    if (!data) return;

    const modal = document.getElementById('story-modal');
    const img = document.getElementById('modal-img');
    const name = document.getElementById('modal-name');
    const subtitle = document.getElementById('modal-subtitle');
    const text = document.getElementById('modal-text');
    const fileId = document.getElementById('modal-id');

    // Reset visuel immédiat
    text.innerHTML = '';
    
    // Infos statiques
    img.src = data.img;
    name.textContent = data.name;
    subtitle.textContent = data.subtitle;
    fileId.textContent = "FILE_" + id.toUpperCase() + "_" + Math.floor(Math.random() * 9999);
    
    // Affichage Modal
    modal.style.display = 'block';
    gsap.to(modal, { opacity: 1, duration: 0.3 });

    // === NOUVEAUTÉ : Empêcher le scroll de l'arrière-plan ===
    document.body.classList.add('overflow-hidden');

    // Nettoyage du curseur statique s'il existe dans le HTML de base
    const staticCursor = document.querySelector('.story-text-container .animate-pulse');
    if(staticCursor) staticCursor.style.display = 'none';

    // Démarrage de l'écriture
    isTyping = true;
    
    // On lance un petit délai pour laisser l'animation d'ouverture se faire
    setTimeout(() => {
        if(isTyping) typeHtml(text, data.story, 1); // 5ms de base = rapide
    }, 300);
}

function closeStory() {
    isTyping = false; // Arrête l'écriture si on ferme
    const modal = document.getElementById('story-modal');
    
    gsap.to(modal, { 
        opacity: 0, 
        duration: 0.3, 
        onComplete: () => {
            modal.style.display = 'none';
            document.getElementById('modal-text').innerHTML = ''; // Nettoyer
            
            // === NOUVEAUTÉ : Réactiver le scroll de l'arrière-plan ===
            document.body.classList.remove('overflow-hidden');
        } 
    });
}

// Fonction Typewriter HTML corrigée (ignore les espaces vides)
async function typeHtml(container, htmlContent, speed = 1) { 
    container.innerHTML = ''; 
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    container.appendChild(cursor);

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    async function typeNode(node, parent) {
        if (!isTyping) return;
        
        if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) return;

        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            for (let i = 0; i < text.length; i++) {
                if (!isTyping) return;
                const char = text[i];
                const charNode = document.createTextNode(char);
                parent.insertBefore(charNode, cursor);
                
                let currentSpeed = speed;
                if (char === '.' || char === ',') currentSpeed += 40; 
                else currentSpeed += Math.random() * 20;

                await new Promise(r => setTimeout(r, currentSpeed));

                const modal = document.getElementById('story-modal');
                if (modal) {
                    const isNearBottom = modal.scrollHeight - modal.scrollTop - modal.clientHeight < 100;
                    if(isNearBottom) modal.scrollTop = modal.scrollHeight;
                }
            }
        } 
        else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = document.createElement(node.tagName);
            Array.from(node.attributes).forEach(attr => {
                element.setAttribute(attr.name, attr.value);
            });
            parent.insertBefore(element, cursor);
            element.appendChild(cursor);

            for (const child of Array.from(node.childNodes)) {
                await typeNode(child, element);
            }
            parent.appendChild(cursor);
        }
    }

    for (const child of Array.from(tempDiv.childNodes)) {
        if (child.nodeType === Node.TEXT_NODE && !child.textContent.trim()) continue;
        await typeNode(child, container);
    }
}
