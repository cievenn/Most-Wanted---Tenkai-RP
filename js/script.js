        // ====================================
        // ASSET PRELOADER (WORLD GOV BOOT)
        // ====================================
        document.addEventListener('DOMContentLoaded', () => {
            const manualAssets = [
                'assets/icons/denden_marine_closed.webp',
                'assets/icons/denden_marine_open.webp',
                'assets/icons/denden_closed.webp',
                'assets/icons/denden_open.webp',
                'assets/icons/denden_laugh.webp',
                'assets/icons/mostwanted.webp',
                'assets/icons/cieven1.webp',
                'assets/icons/cieven2.webp'
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
            
            const domImages = Array.from(document.images).map(img => img.src);
            const allAssets = [...new Set([...domImages, ...manualAssets])];
            const totalAssets = allAssets.length;
            let loadedCount = 0;

            if (totalAssets === 0) return finishLoading();

            const phases = ["ESTABLISHING SECURE CONNECTION...", "VERIFYING ADMIRAL CREDENTIALS...", "DOWNLOADING MARINE DATABASE...", "DECRYPTING WANTED POSTERS...", "INITIALIZING DEFENSE SYSTEMS..."];

            allAssets.forEach(src => {
                const img = new Image();
                img.onload = img.onerror = () => { loadedCount++; updateProgress(); };
                img.src = src;
            });

            function updateProgress() {
                const percent = Math.floor((loadedCount / totalAssets) * 100);
                loaderPercentage.innerText = percent + '%';
                loaderBar.style.width = percent + '%';
                const phaseIndex = Math.min(Math.floor((percent / 100) * phases.length), phases.length - 1);
                loaderText.innerText = phases[phaseIndex];
                if (loadedCount === totalAssets) setTimeout(finishLoading, 800);
            }

            function finishLoading() {
                if (typeof initDenDenMushi === "function") initDenDenMushi();
                const tl = gsap.timeline({ onComplete: () => { preloader.style.display = 'none'; setTimeout(() => { preloader.remove(); }, 100); } });
                tl.add(() => { loaderText.innerText = "SYSTEM READY."; loaderText.style.color = "#00ff41"; loaderBar.style.backgroundColor = "#00ff41"; loaderBar.style.boxShadow = "0 0 10px #00ff41"; })
                  .to({}, { duration: 0.5 })
                  .add(() => { preloader.classList.add('malware-detected'); preloader.classList.add('preloader-glitch-active'); loaderText.innerText = "WARN // ANOMALY DETECTED"; loaderPercentage.innerText = "ERR"; })
                  .to(marineContent, { duration: 0.3, opacity: 0, scale: 0.95, ease: "power2.inOut" }, "+=0.3") 
                  .set(glitchLogo, { display: "block" })
                  .fromTo(glitchLogo, { scale: 0.9, opacity: 0 }, { scale: 1.05, opacity: 0.4, duration: 0.4, ease: "power2.out" })
                  .to(preloader, { opacity: 0, duration: 0.5, ease: "power2.inOut", delay: 0.2 });
            }
        }

        // ====================================
        // 1. DATABASE OF STORIES (Seulement Elio)
        // ====================================
        const database = {
            'elio': {
                name: 'ELIO VIRELLI',
                subtitle: 'THE MAD PROPHET OF IRON AND BLOOD',
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
                        <strong>Mais</strong> la trahison vint de l’intérieur. Ses propres disciples, écœurés, le capturèrent et l’empalèrent. En l’an XXXX, 23/06, Elio resta cinq jours ainsi, sans boire, sans manger, entre vie et mort, ses lèvres gercées étirées en un rire démentiel qui ne voulait pas mourir, chaque jour, son rire se fit entendre dans tout le camp. Le sixième jour, alors que son cœur battait faiblement, une véritable trompette retentit, et non une vision, tout simplement un homme apparut dans le contre-jour, buvant dans sa bouteille en souriant en regardant Elio.
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
                        <strong>Elio</strong> cessa de rire. Nous sommes en l’an XXXX, 28/06, un instant, il vit ou crut voir les lignes du destin se tordre autour de Korazon comme des serpents d’ombre. Il n’eut pas besoin d’en savoir plus. Il n’eut pas besoin de comprendre. Il accepta. Car il ne suivait pas un capitaine… Il suivait le seul homme dont la folie dépassait la sienne. La seule condition était d'attendre les nouvelles recrues, les futurs conquérants de ses mers. C'est ici que le <span class="redacted">Most Wanted</span> s'officilisera...
                    </span>
                    <span class="story-paragraph">
                        <strong>Le</strong> capitaine donnera un rendez-vous sur <span class="redacted">Logue Town</span>, dans précisément 4 ans et 5 mois et 8 jours, jour pour jour, le Most Wanted s'éveillera à ce moment, une nouvelle ère débutera, et le duo élevera la piraterie avec l'équipage. Elio Virelli est devenu le chirurgien du chaos, le terroriste, le scientifique dément et le prophète de son propre dieu imaginaire. Sous le pavillon des Most Wanted, sa science n’a plus de limites, et sa voix résonne encore sur les mers, son rire se fit entendre à chaque endroit que le Most Wanted fit une action, portée par ses éclats de rire et ses visions.
                    </span>
                    <div class="story-date-container">
                        <span class="story-date">DATE : 28 JUIN XXXX</span>
                        <span class="story-time">TEMPS RESTANT : 4 ANS, 5 MOIS ET 8 JOURS</span>
                    </div>
                    <div class="story-quote">
                        <p>« La souffrance n’est pas une erreur… c’est un langage. Et moi, j’en suis le traducteur. »</p>
                        <footer>- ELIO VIRELLI</footer>
                    </div>
                `
            }
        };

        // ====================================
        // 2. INITIALIZATION
        // ====================================
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof lucide !== 'undefined') lucide.createIcons();
            if (typeof gsap !== 'undefined') gsap.registerPlugin(ScrollTrigger);

            initCustomCursor();
            init3DTilt();
            generateASCIIBackground();
            initHeroEffects();
            initScrollAnimations();
            initManifestoAnimations();
            initHackEffects();
            initDenDenMushi();

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
                const x = e.clientX, y = e.clientY;
                cursorSystem.style.left = `${x}px`; cursorSystem.style.top = `${y}px`;
                spotlight.style.setProperty('--x', `${x}px`); spotlight.style.setProperty('--y', `${y}px`);
                if (label && Math.random() > 0.9) label.textContent = `TARGET [${Math.floor(x + Math.random() * 10)},${Math.floor(y + Math.random() * 10)}]`;
            });

            document.querySelectorAll('a, button, .cyber-card, .tilt-content, .group').forEach(el => {
                el.addEventListener('mouseenter', () => { if (window.matchMedia("(pointer: coarse)").matches) return; document.body.classList.add('hovering'); if (label) label.textContent = "LOCKING ON..."; });
                el.addEventListener('mouseleave', () => { if (window.matchMedia("(pointer: coarse)").matches) return; document.body.classList.remove('hovering'); if (label) label.textContent = "SCANNING..."; });
            });
        }

        function init3DTilt() {
            document.querySelectorAll('.tilt-box').forEach(box => {
                box.addEventListener('mousemove', (e) => {
                    if (window.matchMedia("(pointer: coarse)").matches) return;
                    const rect = box.getBoundingClientRect();
                    const x = e.clientX - rect.left, y = e.clientY - rect.top;
                    const centerX = rect.width / 2, centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -10, rotateY = ((x - centerX) / centerX) * 10;
                    const content = box.querySelector('.tilt-content');
                    if (content) content.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                });
                box.addEventListener('mouseleave', () => {
                    if (window.matchMedia("(pointer: coarse)").matches) return;
                    const content = box.querySelector('.tilt-content');
                    if (content) content.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
                });
            });
        }

        function generateASCIIBackground() {
            const container = document.getElementById('ascii-bg');
            if (!container) return;
            const chars = "010101001PROJECT_RED☠️";
            let content = "";
            for(let i=0; i<4000; i++) { content += chars[Math.floor(Math.random() * chars.length)]; if(i % 150 === 0) content += "\n"; }
            container.innerText = content;
        }

        function initHeroEffects() {
            const container = document.getElementById('embers-container');
            if (container) {
                for (let i = 0; i < 50; i++) {
                    const ember = document.createElement('div');
                    ember.classList.add('ember');
                    ember.style.left = Math.random() * 100 + '%';
                    ember.style.setProperty('--duration', (5 + Math.random() * 10) + 's');
                    ember.style.setProperty('--delay', (Math.random() * 5) + 's');
                    ember.style.setProperty('--sway', ((Math.random() - 0.5) * 100) + 'px');
                    container.appendChild(ember);
                }
            }
            document.addEventListener('mousemove', (e) => {
                if (window.matchMedia("(pointer: coarse)").matches) return;
                const x = (e.clientX / window.innerWidth - 0.5) * 2, y = (e.clientY / window.innerHeight - 0.5) * 2;
                document.querySelectorAll('.floating-kanji').forEach(el => {
                    gsap.to(el, { x: x * 30 * parseFloat(el.getAttribute('data-speed')), y: y * 30 * parseFloat(el.getAttribute('data-speed')), duration: 1, ease: "power2.out" });
                });
            });
            const dateEl = document.getElementById('hero-date');
            if(dateEl) { const today = new Date(); dateEl.textContent = `SYSTEM DATE // ${today.getDate()}.${today.getMonth()+1}.1522`; }
        }

        // ====================================
        // 4. SCROLL ANIMATIONS (GSAP)
        // ====================================
        function initScrollAnimations() {
            gsap.utils.toArray('section').forEach(sec => { gsap.from(sec.children, { scrollTrigger: { trigger: sec, start: "top 80%" }, y: 50, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out" }); });
        }

        function initManifestoAnimations() {
            gsap.from("#manifesto h2", { scrollTrigger: { trigger: "#manifesto", start: "top 70%" }, y: 100, opacity: 0, duration: 1.5, ease: "power3.out" });
            const resetBlock = document.querySelector("#manifesto .border-2");
            if (resetBlock) gsap.from(resetBlock, { scrollTrigger: { trigger: resetBlock, start: "top 85%" }, scale: 0.95, opacity: 0, duration: 1, ease: "power2.out" });
        }

        // ====================================
        // 5. HACK / GLITCH EFFECTS
        // ====================================
        function initHackEffects() {
            const bountyElement = document.getElementById('bounty-counter');
            if (bountyElement) {
                setInterval(() => {
                    bountyElement.textContent = Math.floor(Math.random() * 9999999999).toLocaleString();
                    if(Math.random() > 0.95) { bountyElement.style.textShadow = "2px 0 #fff, -2px 0 var(--trinity-red)"; setTimeout(() => bountyElement.style.textShadow = "none", 50); }
                }, 80);
            }
        }

        // ====================================
        // 6. INTRO SEQUENCE: MARINE -> PIRATE
        // ====================================
        function initDenDenMushi() {
            const screen = document.getElementById('intro-screen');
            if (screen) screen.classList.add('marine-theme');
            gsap.to("#sound-fx span", { y: -5, stagger: 0.1, yoyo: true, repeat: -1, duration: 0.5, ease: "sine.inOut" });
            document.querySelectorAll('.scramble-text').forEach(el => {
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@"; let iterations = 0; const finalText = el.getAttribute('data-text');
                const interval = setInterval(() => { el.innerText = finalText.split("").map((letter, index) => index < iterations ? finalText[index] : chars[Math.floor(Math.random() * chars.length)]).join(""); if(iterations >= finalText.length) clearInterval(interval); iterations += 1/3; }, 30);
            });
        }

        function triggerTakeover() {
            const tl = gsap.timeline();
            const screen = document.getElementById('intro-screen'), marineSnail = document.getElementById('marine-snail'), scaredSnail = document.getElementById('marine-snail-scared'), btn = document.getElementById('action-btn'), sysStatus = document.getElementById('sys-status'), defLevel = document.getElementById('def-level'), adminStatus = document.getElementById('admin-status'), hakiWave = document.getElementById('haki-wave'), soundFx = document.getElementById('sound-fx');
            
            tl.to(btn, { autoAlpha: 0, duration: 0.2 })
              .add(() => {
                  screen.classList.add('siren-mode'); sysStatus.innerText = "!!! CRITICAL FAILURE !!!"; sysStatus.style.color = "red"; defLevel.innerHTML = "<span class='text-red-500 font-bold text-xl'>DEFCON 1</span>";
                  if(adminStatus) { adminStatus.innerHTML = "<i data-lucide='alert-circle' class='w-3 h-3 text-red-500'></i> <span class='text-red-500 font-bold uppercase tracking-widest'>ADMIN : DISCONNECTED</span>"; adminStatus.classList.remove('text-cyan-300', 'opacity-80'); adminStatus.classList.add('animate-pulse'); if (typeof lucide !== 'undefined') lucide.createIcons(); }
                  document.getElementById('breach-alert').classList.remove('hidden'); soundFx.innerHTML = "<span class='text-red-600 text-3xl font-glitch'>BZZZT!</span>";
              })
              .to("#sound-fx", { scale: 1.5, x: "+=10", yoyo: true, repeat: 5, duration: 0.05 }, "<")
              .set(marineSnail, { display: 'none' }, "+=0.2").set(scaredSnail, { display: 'block', scale: 1.2 }, "<").to(scaredSnail, { x: 5, y: -5, rotation: 5, duration: 0.05, repeat: 10, yoyo: true, ease: "none" }, "<")
              .add(() => { screen.classList.remove('siren-mode'); screen.classList.add('chromatic-aberration'); hakiWave.classList.remove('hidden'); hakiWave.firstElementChild.classList.add('haki-shockwave'); gsap.to("#flash-layer", { opacity: 1, duration: 0.1, yoyo: true, repeat: 1 }); }, "+=0.1")
              .to("#main-stage", { scale: 1.1, filter: "blur(2px) contrast(200%)", duration: 0.2, ease: "power4.in" }, "<")
              .to(screen, { filter: "brightness(500%) grayscale(100%)", scaleY: 0.01, duration: 0.2, ease: "power2.in" }, "+=0.5")
              .to(screen, { scaleX: 0, duration: 0.1, background: "black" })
              .set(screen, { filter: "none", scaleY: 1, scaleX: 1, opacity: 1 }) 
              .add(() => {
                  document.getElementById('marine-layer')?.remove(); document.getElementById('main-stage')?.remove();
                  screen.style.backgroundColor = "#020000"; screen.classList.remove('marine-theme'); screen.classList.remove('chromatic-aberration');
                  const pirateUI = document.getElementById('pirate-ui'), pirateContent = document.getElementById('pirate-content'), authContainer = document.getElementById('auth-container');
                  injectPirateLogin();
                  pirateUI.style.opacity = '0'; gsap.set(pirateContent, { opacity: 0, y: 50, scale: 0.95 }); gsap.set(authContainer, { opacity: 0, y: 30 }); 
                  pirateUI.classList.remove('hidden'); pirateUI.classList.add('flex'); initHackerRain();
              })
              .to("#pirate-ui", { opacity: 1, duration: 1, ease: "power2.inOut" })
              .to("#pirate-content", { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }, "-=0.5")
              .to("#elio-header", { opacity: 1, y: 0, duration: 0.8 }, "-=1")
              .to("#auth-container", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "<") 
              .add(() => { startSnailMonologue(); const input = document.getElementById('password-input'); if(input) input.focus(); });
        }

        const SNAIL_PHRASES = {
            intro_sequences: [["Salut ! Ne me fixe pas comme ça... Tu veux entrer ? Facile.", "Regarde bien ton écran.", "Tu verras le code. Tape-le."]],
            taunts: ["Pfff... T'es sérieux là ?", "Hahaha ! Même la Marine fait mieux !", "Essaie encore, noob."],
            hints: ["T'as du mal hein ? C'est le nom de l'équipage...", "Allez, je t'aide : MOST... WANTED."],
            success: ["BINGO ! Tu l'as !", "Enfin ! C'était pas trop tôt.", "Bienvenue dans le système, pirate."]
        };

        let isSpeaking = false, failedAttemptsCount = 0, isHacked = false, currentTypeInterval = null, currentMouthInterval = null, currentSnailResolve = null;

        async function startSnailMonologue() {
            const sequence = SNAIL_PHRASES.intro_sequences[0];
            for (let line of sequence) { if (isHacked) break; await snailSpeak(line); if (isHacked) break; await new Promise(r => setTimeout(r, 800)); }
        }

        function snailSpeak(text, emotion = "neutral", interrupt = false) {
            return new Promise(resolve => {
                if(isSpeaking) { if (!interrupt) { resolve(); return; } else { clearInterval(currentTypeInterval); clearInterval(currentMouthInterval); if (currentSnailResolve) currentSnailResolve(); isSpeaking = false; } }
                isSpeaking = true; currentSnailResolve = resolve;
                const bubble = document.getElementById('snail-speech-bubble'), p = document.getElementById('snail-text'), imgClosed = document.getElementById('snail-closed'), imgOpen = document.getElementById('snail-open'), imgLaugh = document.getElementById('snail-laugh');
                bubble.style.opacity = 1; bubble.style.transform = "translate(-50%, 0)"; p.innerHTML = ""; let i = 0;
                currentMouthInterval = setInterval(() => { imgClosed.classList.add('hidden'); imgOpen.classList.add('hidden'); imgLaugh.classList.add('hidden'); const rand = Math.random(); if (rand < 0.4) imgOpen.classList.remove('hidden'); else if (rand < 0.7) imgClosed.classList.remove('hidden'); else imgLaugh.classList.remove('hidden'); }, 80); 
                currentTypeInterval = setInterval(() => {
                    p.textContent += text.charAt(i); i++;
                    if (i >= text.length) { clearInterval(currentTypeInterval); clearInterval(currentMouthInterval); imgOpen.classList.add('hidden'); imgClosed.classList.add('hidden'); if (emotion === "taunt" || emotion === "laugh") { imgLaugh.classList.remove('hidden'); gsap.to("#pirate-snail-container", { y: -5, yoyo: true, repeat: 3, duration: 0.1 }); } else { imgClosed.classList.remove('hidden'); imgLaugh.classList.add('hidden'); } isSpeaking = false; resolve(); }
                }, 30); 
            });
        }

        function triggerSnailTaunt() {
            failedAttemptsCount++; const container = document.getElementById('pirate-snail-container');
            container.classList.add('shake-laugh'); setTimeout(() => container.classList.remove('shake-laugh'), 1000);
            let phrase = failedAttemptsCount >= 3 ? SNAIL_PHRASES.hints[Math.floor(Math.random() * SNAIL_PHRASES.hints.length)] : SNAIL_PHRASES.taunts[Math.floor(Math.random() * SNAIL_PHRASES.taunts.length)];
            snailSpeak(phrase, failedAttemptsCount >= 3 ? "neutral" : "taunt", true); 
        }

        async function triggerSnailSuccess() {
            isHacked = true; const container = document.getElementById('pirate-snail-container');
            gsap.to(container, { y: -20, scale: 1.1, duration: 0.2, yoyo: true, repeat: 3 });
            await snailSpeak(SNAIL_PHRASES.success[Math.floor(Math.random() * SNAIL_PHRASES.success.length)], "laugh", true);
            setTimeout(() => {
                const tl = gsap.timeline();
                tl.to("#pirate-ui", { opacity: 0, duration: 1 }).to("#intro-screen", { opacity: 0, duration: 0.5 }, "<").set("#intro-screen", { display: "none" }).set("#main-content", { display: "block", opacity: 0 }).add(() => document.getElementById('main-content').classList.remove('hidden')).to("#main-content", { opacity: 1, duration: 1 });
            }, 2000);
        }

        function initHackerRain() {
            const container = document.getElementById('hacker-rain-container'); const columns = Math.floor(window.innerWidth / 20);
            for(let i = 0; i < columns; i++) {
                if(Math.random() > 0.6) continue; 
                const drop = document.createElement('div'); drop.classList.add('hacker-column');
                let content = ""; const length = Math.floor(Math.random() * 20 + 10);
                for(let j=0; j<length; j++) content += Math.random() > 0.8 ? "MOST_WANTED " : String.fromCharCode(0x30A0 + Math.random() * 96) + " "; 
                drop.innerText = content; drop.style.left = (i * 20) + 'px'; drop.style.fontSize = (Math.random() * 8 + 8) + 'px'; drop.style.animationDuration = (Math.random() * 2 + 1) + 's'; drop.style.animationDelay = (Math.random() * 5) + 's'; drop.style.opacity = Math.random() * 0.3; container.appendChild(drop);
            }
        }

        function injectPirateLogin() {
            const container = document.getElementById('auth-container');
            container.innerHTML = `
                <div class="hardware-wrapper p-3 sm:p-4 md:p-8 group relative overflow-hidden" id="hw-wrapper">
                    <div class="absolute top-0 left-0 w-full h-[200%] bg-gradient-to-b from-transparent via-[var(--trinity-red)] to-transparent opacity-10 animate-scan-input pointer-events-none"></div>
                    <div class="flex justify-between items-center mb-3 md:mb-6 border-b-2 border-gray-800 pb-2 md:pb-3">
                        <div class="flex items-center gap-1.5 md:gap-2"><i data-lucide="terminal" class="w-3 h-3 md:w-5 md:h-5 text-gray-400 group-focus-within:text-[var(--trinity-red)] transition-colors"></i><span class="font-mono text-[9px] sm:text-xs md:text-sm text-gray-400 group-focus-within:text-white tracking-widest transition-colors">COMMAND_PROMPT</span></div>
                        <span class="font-mono text-[8px] md:text-xs text-[var(--trinity-red)] animate-pulse border border-[var(--trinity-red)] px-1.5 py-0.5 bg-[var(--trinity-red)]/10">WAITING_KEY</span>
                    </div>
                    <div class="flex items-center gap-2 md:gap-4 relative bg-black/50 p-2 md:p-4 border border-[#222] group-focus-within:border-[var(--trinity-red)]/50 transition-colors">
                        <span class="text-[var(--trinity-red)] font-bold text-lg md:text-4xl animate-pulse pl-1 md:pl-2">></span>
                        <input type="text" id="password-input" class="w-full bg-transparent text-white font-mono text-base sm:text-xl md:text-3xl border-none focus:ring-0 outline-none uppercase tracking-[0.1em] md:tracking-[0.2em] placeholder-hint" placeholder="TYPE KEY" autocomplete="off">
                        <div class="hidden md:block w-4 h-4 bg-[var(--trinity-red)] rounded-sm opacity-50 group-focus-within:opacity-100 shadow-[0_0_15px_red] animate-pulse"></div>
                        <button id="auth-submit-btn" class="flex-shrink-0 ml-1 md:ml-2 px-3 py-1.5 md:px-6 md:py-3 bg-[var(--trinity-red)]/10 border border-[var(--trinity-red)]/40 text-[var(--trinity-red)] font-mono text-[10px] md:text-sm font-bold tracking-widest hover:bg-[var(--trinity-red)] hover:text-black transition-all duration-200 shadow-[0_0_10px_rgba(255,0,60,0.1)] active:scale-95 cursor-pointer">[EXEC]</button>
                    </div>
                    <div class="w-full h-1 md:h-1.5 bg-[#111] mt-3 md:mt-6 relative overflow-hidden rounded-full"><div id="pass-progress-fill" class="absolute top-0 left-0 h-full w-0 bg-[var(--trinity-red)] transition-all duration-200 shadow-[0_0_10px_var(--trinity-red)]"></div></div>
                    <div class="mt-2 md:mt-4 text-center bg-[var(--trinity-red)]/5 py-1.5 md:py-2 border border-[var(--trinity-red)]/20"><span class="text-[8px] md:text-xs text-gray-400 font-mono tracking-widest">TARGET OVERRIDE PASSKEY : <span class="text-white font-bold">MOST WANTED</span></span></div>
                </div>`;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            const input = document.getElementById('password-input'), submitBtn = document.getElementById('auth-submit-btn'), progressFill = document.getElementById('pass-progress-fill'), hwWrapper = document.getElementById('hw-wrapper'), TARGET_PASS = "MOSTWANTED"; let previousLength = 0;
            
            function checkPasswordAttempt() {
                if (isHacked) return;
                const val = input.value.trim().toUpperCase().replace(/\s/g, '');
                if(val === TARGET_PASS) { input.style.color = "#00ff41"; progressFill.style.backgroundColor = "#00ff41"; progressFill.style.boxShadow = "0 0 20px #00ff41"; progressFill.style.width = "100%"; triggerSnailSuccess(); }
                else { input.value = ""; progressFill.style.width = "0%"; gsap.to(hwWrapper, { x: 15, duration: 0.05, yoyo: true, repeat: 5 }); triggerSnailTaunt(); previousLength = 0; }
            }

            input.addEventListener('input', () => {
                const val = input.value.toUpperCase().replace(/\s/g, ''); const isDeleting = val.length < previousLength; previousLength = val.length;
                const imgClosed = document.getElementById('snail-closed'), imgOpen = document.getElementById('snail-open'), imgLaugh = document.getElementById('snail-laugh');
                if(!isSpeaking) { imgClosed.classList.add('hidden'); imgLaugh.classList.add('hidden'); imgOpen.classList.remove('hidden'); clearTimeout(input.typingTimeout); input.typingTimeout = setTimeout(() => { imgOpen.classList.add('hidden'); imgClosed.classList.remove('hidden'); }, 500); }
                if (val.length === 0) { progressFill.style.width = '0%'; progressFill.style.backgroundColor = 'var(--trinity-red)'; progressFill.style.boxShadow = '0 0 10px var(--trinity-red)'; input.style.color = 'white'; return; }
                const expectedSubstring = TARGET_PASS.substring(0, val.length);
                if (val === expectedSubstring) {
                    input.style.color = 'white'; progressFill.style.width = `${(val.length / TARGET_PASS.length) * 100}%`;
                    if (!isDeleting) { progressFill.style.backgroundColor = '#00ff41'; progressFill.style.boxShadow = '0 0 15px #00ff41'; setTimeout(() => { if (val !== TARGET_PASS) { progressFill.style.backgroundColor = 'var(--trinity-red)'; progressFill.style.boxShadow = '0 0 10px var(--trinity-red)'; } }, 200); }
                    if (val === TARGET_PASS) { input.blur(); if (!isHacked) setTimeout(() => checkPasswordAttempt(), 100); }
                } else { input.style.color = 'red'; progressFill.style.backgroundColor = 'red'; progressFill.style.boxShadow = '0 0 15px red'; gsap.to(input, { x: [-3, 3, -3, 3, 0], duration: 0.2 }); }
            });
            input.addEventListener('keyup', (e) => { if (e.key === 'Enter') checkPasswordAttempt(); });
            submitBtn.addEventListener('click', checkPasswordAttempt);
            input.focus();
        }

        // ====================================
        // STORY MODAL LOGIC 
        // ====================================
        let isTyping = false; 

        function openStory(id) {
            const data = database[id]; if (!data) return;
            const modal = document.getElementById('story-modal'), img = document.getElementById('modal-img'), name = document.getElementById('modal-name'), subtitle = document.getElementById('modal-subtitle'), text = document.getElementById('modal-text'), fileId = document.getElementById('modal-id');
            text.innerHTML = ''; img.src = data.img; name.textContent = data.name; subtitle.textContent = data.subtitle; fileId.textContent = "FILE_" + id.toUpperCase() + "_" + Math.floor(Math.random() * 9999);
            modal.style.display = 'block'; gsap.to(modal, { opacity: 1, duration: 0.3 }); document.body.classList.add('overflow-hidden');
            isTyping = true; setTimeout(() => { if(isTyping) typeHtml(text, data.story, 1); }, 300);
        }

        function closeStory() {
            isTyping = false; const modal = document.getElementById('story-modal');
            gsap.to(modal, { opacity: 0, duration: 0.3, onComplete: () => { modal.style.display = 'none'; document.getElementById('modal-text').innerHTML = ''; document.body.classList.remove('overflow-hidden'); } });
        }

        async function typeHtml(container, htmlContent, speed = 1) { 
            container.innerHTML = ''; const cursor = document.createElement('span'); cursor.className = 'typing-cursor'; container.appendChild(cursor);
            const tempDiv = document.createElement('div'); tempDiv.innerHTML = htmlContent;
            async function typeNode(node, parent) {
                if (!isTyping) return; if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) return;
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent;
                    for (let i = 0; i < text.length; i++) {
                        if (!isTyping) return; const char = text[i]; const charNode = document.createTextNode(char); parent.insertBefore(charNode, cursor);
                        let currentSpeed = speed; if (char === '.' || char === ',') currentSpeed += 40; else currentSpeed += Math.random() * 20;
                        await new Promise(r => setTimeout(r, currentSpeed));
                        const modal = document.getElementById('story-modal'); if (modal) { const isNearBottom = modal.scrollHeight - modal.scrollTop - modal.clientHeight < 100; if(isNearBottom) modal.scrollTop = modal.scrollHeight; }
                    }
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    const element = document.createElement(node.tagName); Array.from(node.attributes).forEach(attr => { element.setAttribute(attr.name, attr.value); }); parent.insertBefore(element, cursor); element.appendChild(cursor);
                    for (const child of Array.from(node.childNodes)) { await typeNode(child, element); } parent.appendChild(cursor);
                }
            }
            for (const child of Array.from(tempDiv.childNodes)) { if (child.nodeType === Node.TEXT_NODE && !child.textContent.trim()) continue; await typeNode(child, container); }
        }
