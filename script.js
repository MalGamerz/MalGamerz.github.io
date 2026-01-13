// ==========================================
// 1. GLOBAL CONFIGURATION & NAVIGATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadGlobalElements();
    initTypewriter();
    initParallax();
    
    // Initialize the first tab (Intro) when on learn.html
    if (document.getElementById('learn-content-container')) {
        switchTab('topic-5-1'); 
        initLoopSimulator(); 
    }
});

const navLinks = [
    { name: 'Home', path: 'index.html' },
    { name: 'Learn', path: 'learn.html' },
    { name: 'Tutorial', path: 'tutorial.html' },
    { name: 'Activity', path: 'activity.html', isButton: true }
];

function loadGlobalElements() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const header = document.getElementById('dynamic-header');
    const footer = document.getElementById('dynamic-footer');

    // Header HTML Generation
    if(header) {
        let navHTML = '';
        let mobileNavHTML = '';

        navLinks.forEach(link => {
            const activeClass = (link.path === currentPath) ? 'text-white border-b-2 border-sky-400' : 'text-slate-400 hover:text-white';
            const btnClass = 'bg-sky-500 hover:bg-sky-400 text-[#0f172a] px-6 py-2.5 rounded-full font-bold transition shadow-[0_0_15px_rgba(14,165,233,0.3)]';

            if (link.isButton) navHTML += `<a href="${link.path}" class="${btnClass} text-sm">${link.name}</a>`;
            else navHTML += `<a href="${link.path}" class="${activeClass} text-sm font-medium transition">${link.name}</a>`;
            
            mobileNavHTML += `<a href="${link.path}" class="block px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition">${link.name}</a>`;
        });

        header.innerHTML = `
            <div class="w-full px-8 h-20 flex justify-between items-center bg-[#0f172a]/95 backdrop-blur-xl border-b border-slate-800">
                <a href="index.html" class="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500 hover:opacity-80 transition">CSC402</a>
                <nav class="hidden md:flex space-x-8 items-center">${navHTML}</nav>
                <button id="mobile-btn" class="md:hidden text-white text-2xl focus:outline-none">☰</button>
            </div>
            <div id="mobile-menu" class="hidden md:hidden bg-[#1e293b] border-b border-slate-700 p-4 absolute w-full left-0 top-20 shadow-xl z-50">${mobileNavHTML}</div>
        `;

        const mobBtn = document.getElementById('mobile-btn');
        if(mobBtn) {
            mobBtn.addEventListener('click', () => {
                document.getElementById('mobile-menu').classList.toggle('hidden');
            });
        }
    }

    // UPDATED FOOTER SECTION
    if(footer) {
        const year = new Date().getFullYear();
        footer.innerHTML = `
            <div class="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm text-slate-400">
                <div class="col-span-2">
                    <h3 class="text-white font-bold text-lg mb-4 flex items-center gap-2">
                        <span class="text-sky-500 text-2xl">❖</span> CSC402 Learning Module
                    </h3>
                    <p class="leading-relaxed opacity-80 max-w-sm">
                        An interactive multimedia platform designed for the College of Computing, Informatics and Media. Simplify your C++ journey with visual simulations.
                    </p>
                </div>
                <div>
                    <h4 class="text-white font-bold mb-4">Sitemap</h4>
                    <ul class="space-y-2">
                        <li><a href="learn.html" class="hover:text-sky-400 transition">Topic 5: Arrays</a></li>
                        <li><a href="tutorial.html" class="hover:text-sky-400 transition">Virtual Labs</a></li>
                        <li><a href="activity.html" class="hover:text-sky-400 transition">Student Assessment</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-bold mb-4">Help Center</h4>
                    <ul class="space-y-3 opacity-80">
                        <li class="flex items-center gap-2">
                            <span>📧</span> <a href="mailto:support@uitm.edu.my" class="hover:text-white transition">support@uitm.edu.my</a>
                        </li>
                        <li class="flex items-center gap-2">
                            <span>🏫</span> UiTM Shah Alam
                        </li>
                    </ul>
                </div>
            </div>
            <div class="text-center py-6 border-t border-slate-800 text-xs text-slate-600">
                © ${year} Universiti Teknologi MARA (UiTM). All Rights Reserved.
            </div>
        `;
    }
}

// ==========================================
// 2. TAB LOGIC 
// ==========================================
window.switchTab = function(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active');
    });

    const target = document.getElementById(tabId);
    if(target) {
        target.classList.add('active');
    } else {
        console.error(`Tab ID '${tabId}' not found!`);
        return;
    }

    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active', 'bg-slate-800/50', 'text-white', 'border-sky-400');
        el.classList.add('text-slate-400', 'border-transparent');
    });
    
    const deskBtn = document.getElementById(`btn-${tabId}`);
    if(deskBtn) {
        deskBtn.classList.add('active', 'bg-slate-800/50', 'text-white', 'border-sky-400');
        deskBtn.classList.remove('text-slate-400', 'border-transparent');
    }

    document.querySelectorAll('.mob-link').forEach(el => {
        el.classList.remove('active', 'bg-sky-600', 'text-white', 'shadow-lg');
        el.classList.add('bg-slate-800', 'text-slate-400', 'border', 'border-slate-700');
    });

    const mobBtn = document.getElementById(`mob-${tabId}`);
    if(mobBtn) {
        mobBtn.classList.remove('bg-slate-800', 'text-slate-400', 'border', 'border-slate-700');
        mobBtn.classList.add('active', 'bg-sky-600', 'text-white', 'shadow-lg');
        
        const container = document.getElementById('mobile-nav-container');
        if(container) {
            const scrollLeft = mobBtn.offsetLeft - container.offsetLeft - 20;
            container.parentNode.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }
    
    const mainContainer = document.querySelector('main');
    if(mainContainer) mainContainer.scrollTop = 0;
}

// ==========================================
// 3. INTERACTIVE VISUALIZERS
// ==========================================

// --- Loop Simulator State & Functions ---
let loopCurrentIndex = 0;
const LOOP_SIZE = 5;
let loopArray = [];

window.setupInitialLoopButton = function() {
    const btnContainer = document.getElementById('loop-btn-container');
    if (btnContainer) {
        btnContainer.innerHTML = `<button onclick="simulateLoopStep()" id="loop-next-btn" class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-lg transition shrink-0">Run Step</button>`;
    }
}

window.renderLoopArray = function() {
    const container = document.getElementById('loop-array-visualizer');
    let html = '';
    for (let i = 0; i < LOOP_SIZE; i++) {
        const isActive = (i === loopCurrentIndex && loopCurrentIndex < LOOP_SIZE) ? 'bg-indigo-600 ring-4 ring-indigo-400 shadow-xl' : 'bg-slate-800';
        const valueClass = loopArray[i] === '?' ? 'text-slate-500' : 'text-white';
        html += `
            <div id="loop-box-${i}" class="w-14 h-16 rounded flex flex-col items-center justify-center font-bold border-2 border-slate-600 transition-all duration-300 ${isActive}">
                <span class="text-lg ${valueClass}">${loopArray[i]}</span>
                <span class="text-xs text-slate-400 mt-1">[${i}]</span>
            </div>
        `;
    }
    container.innerHTML = html;
}

window.initLoopSimulator = function() {
    loopCurrentIndex = 0;
    loopArray = new Array(LOOP_SIZE).fill('?');
    setupInitialLoopButton(); 
    renderLoopArray();
    const consoleOutput = document.getElementById('loop-console-output');
    if (consoleOutput) {
        consoleOutput.innerHTML = `<span class='text-slate-500'>// Console: Click 'Run Step' to begin (i=0)...</span>`;
    }
    const inputField = document.getElementById('loop-input-value');
    if (inputField) {
        inputField.value = '';
        inputField.placeholder = `Enter number for index [0]`;
    }
}

window.simulateLoopStep = function() {
    const inputField = document.getElementById('loop-input-value');
    const outputConsole = document.getElementById('loop-console-output');
    const inputValue = inputField.value.trim();

    if (loopCurrentIndex >= LOOP_SIZE) {
        outputConsole.innerHTML = `<span class='text-yellow-400'>// Loop finished! Click Restart.</span>`;
        return;
    }

    if (inputValue === "" || isNaN(parseInt(inputValue))) {
        outputConsole.innerHTML = `<span class='text-red-400'>// ERROR: Please enter a valid number for index [${loopCurrentIndex}]</span>`;
        return;
    }
    
    loopArray[loopCurrentIndex] = inputValue;
    outputConsole.innerHTML = `<span class='text-green-400'>// Input Processed: scores[${loopCurrentIndex}] = ${inputValue};</span>`;
    loopCurrentIndex++;
    renderLoopArray();

    if (loopCurrentIndex < LOOP_SIZE) {
        outputConsole.innerHTML += `<br><span class='text-slate-300'>// Next: i=${loopCurrentIndex}. Enter value.</span>`;
        inputField.placeholder = `Enter number for index [${loopCurrentIndex}]`;
        inputField.value = '';
    } else {
        outputConsole.innerHTML = `<span class='text-yellow-400'>// Loop finished! Final Array: [${loopArray.join(', ')}]</span>`;
        const btnContainer = document.getElementById('loop-btn-container');
        if (btnContainer) {
            btnContainer.innerHTML = `<button onclick="initLoopSimulator()" id="loop-restart-btn" class="bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3 rounded-lg transition shrink-0">Restart Loop</button>`;
        }
    }
}

// --- Memory Reveal (5.1) ---
window.toggleMemory = function(index) {
    const box = document.getElementById(`mem-box-${index}`);
    const val = document.getElementById(`mem-val-${index}`);
    if(box && val) {
        if (val.classList.contains('opacity-0')) {
            val.classList.remove('opacity-0', 'scale-50');
            val.classList.add('opacity-100', 'scale-100');
            box.classList.add('border-sky-400', 'bg-slate-700');
        } else {
            val.classList.add('opacity-0', 'scale-50');
            val.classList.remove('opacity-100', 'scale-100');
            box.classList.remove('border-sky-400', 'bg-slate-700');
        }
    }
}

// --- Access Simulator (5.3) ---
window.simulateAccess = function() {
    const indexInput = document.getElementById('access-input').value;
    const outputBox = document.getElementById('access-output');
    const visualBoxes = document.querySelectorAll('.visual-box'); 
    const ghostBox = document.getElementById('vbox-5'); 
    
    visualBoxes.forEach(b => {
        b.classList.remove('ring-4', 'ring-sky-400', 'ring-red-500', 'bg-red-900/50', 'bg-sky-600');
        b.classList.add('bg-slate-800'); 
    });

    if (ghostBox) {
        ghostBox.classList.remove('opacity-100', 'text-red-500', 'border-red-500', 'bg-red-900/20');
        ghostBox.classList.add('opacity-50', 'text-slate-700', 'border-slate-700');
    }

    const idx = parseInt(indexInput);
    if (isNaN(idx)) {
        outputBox.innerHTML = "<span class='text-slate-400'>Please enter a valid number.</span>";
        return;
    }

    if (idx >= 0 && idx < 5) {
        const targetBox = document.getElementById(`vbox-${idx}`);
        targetBox.classList.remove('bg-slate-800');
        targetBox.classList.add('bg-sky-600', 'ring-4', 'ring-sky-400');
        const value = targetBox.getAttribute('data-value');
        outputBox.innerHTML = `<span class='text-green-400'>Success! Retrieved: <strong>${value}</strong> at Index ${idx}</span>`;
    } 
    else {
        outputBox.innerHTML = `<span class='text-red-400 font-bold'>ERROR: Index Out of Bounds! Program Crashed.</span>`;
        visualBoxes.forEach(b => {
             b.classList.remove('bg-slate-800');
             b.classList.add('bg-red-900/50');
        });
        
        if(idx >= 5 && ghostBox) {
            ghostBox.classList.remove('opacity-50', 'text-slate-700', 'border-slate-700');
            ghostBox.classList.add('opacity-100', 'text-red-500', 'border-red-500', 'bg-red-900/20');
        }
    }
}

// -- String Visualizer (5.3) --
window.visualizeString = function() {
    const input = document.getElementById('char-input').value;
    const output = document.getElementById('char-output');
    
    if(!input) {
        output.innerHTML = "<span class='text-slate-500 italic'>Type to see memory layout...</span>";
        return;
    }

    let html = '<div class="flex flex-wrap gap-2 justify-center">';
    for(let i=0; i<input.length; i++) {
        html += `
            <div class="flex flex-col items-center">
                <div class="w-10 h-12 bg-slate-800 border border-slate-600 rounded flex items-center justify-center text-white text-lg font-bold font-mono shadow-md">
                    ${input[i]}
                </div>
                <span class="text-[9px] text-slate-500 mt-1">${i}</span>
            </div>
        `;
    }
    // Null Terminator
    html += `
        <div class="flex flex-col items-center">
            <div class="w-10 h-12 bg-orange-900/40 border border-orange-500 rounded flex items-center justify-center text-orange-400 text-lg font-bold font-mono shadow-md">
                \\0
            </div>
            <span class="text-[9px] text-orange-400 mt-1 font-bold">${input.length}</span>
        </div>
    `;
    html += '</div>';
    
    const totalBytes = input.length + 1;
    html += `
        <div class="mt-4 text-center text-xs text-slate-400 bg-black/20 p-2 rounded">
            Size in RAM: <span class="text-white">${input.length} chars</span> + <span class="text-orange-400">1 null</span> = <span class="text-sky-400 font-bold">${totalBytes} bytes}</span>
        </div>
    `;

    output.innerHTML = html;
}

// ==========================================
// 4. ANIMATION HELPERS
// ==========================================
function initTypewriter() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;
    const words = ["Arrays", "Memory", "Logic"];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            speed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 500;
        }
        setTimeout(type, speed);
    }
    type();
}

function initParallax() {
    const blobs = document.querySelectorAll('.parallax-blob');
    document.addEventListener('mousemove', (e) => {
        blobs.forEach(blob => {
            const speed = blob.getAttribute('data-speed');
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}
