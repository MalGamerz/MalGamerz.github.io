// ==========================================
// 1. GLOBAL CONFIGURATION & NAVIGATION
// ==========================================

// Global State for Input Simulator
const INPUT_SIZE = 5;
let inputState = {
    step: 0, // 0: Check, 1: Wait for Input, 2: Assign, 3: Increment
    i: 0,
    finished: false
};
let inputArrayData = Array(INPUT_SIZE).fill('?');

document.addEventListener('DOMContentLoaded', () => {
    loadGlobalElements();
    initTypewriter();
    initParallax();
    
    // Initialize specific simulators when on learn.html
    const learnContainer = document.getElementById('learn-content-container');
    if (learnContainer) {
        setTimeout(() => {
            switchTab('topic-5-1'); 
            initInputVisualizer(); // Start Input Simulator
        }, 50);
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

    // Footer HTML Generation
    if(footer) {
        const year = new Date().getFullYear();
        footer.innerHTML = `
            <div class="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm text-slate-400">
                <div class="col-span-2">
                    <h3 class="text-white font-bold text-lg mb-4 flex items-center gap-2">
                        <span class="text-sky-500 text-2xl">❖</span> CSC402 Learning Module
                    </h3>
                    <p class="leading-relaxed opacity-80 max-w-sm">
                        An interactive multimedia platform designed for the Faculty of Computer & Mathematical Sciences. Simplify your C++ journey with visual simulations.
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
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active');
    });

    const target = document.getElementById(tabId);
    if(target) {
        target.classList.add('active');
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

    // Mobile Nav Updates
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

/* --- NEW: INPUT SIMULATOR LOGIC (Topic 5.3) --- */
function initInputVisualizer() {
    const container = document.getElementById('visual-array-container');
    const pointerContainer = document.getElementById('array-pointer-container');
    
    if (!container || !pointerContainer) return; 
    
    container.innerHTML = '';
    pointerContainer.innerHTML = '';
    
    // Create empty boxes
    for(let i=0; i<INPUT_SIZE; i++) {
        const box = document.createElement('div');
        box.id = `input-box-${i}`;
        box.className = 'w-14 h-16 bg-slate-700 border-2 border-slate-500 rounded-lg flex flex-col items-center justify-center text-lg font-bold text-slate-400 transition-all duration-300 shadow-md relative';
        box.innerHTML = `
            ${inputArrayData[i]}
            <span class="absolute -bottom-6 text-[10px] text-slate-500">Idx ${i}</span>
        `;
        container.appendChild(box);

        const ptr = document.createElement('div');
        ptr.className = 'w-14 flex justify-center';
        ptr.innerHTML = ``; 
        pointerContainer.appendChild(ptr);
    }
    
    updateInputUI();
}

function resetInputSimulator() {
    inputState = { step: 0, i: 0, finished: false };
    inputArrayData = Array(INPUT_SIZE).fill('?');
    initInputVisualizer();
    
    const status = document.getElementById('loop-status');
    const btn = document.getElementById('step-btn');
    const inputField = document.getElementById('user-number-input');
    const submitBtn = document.getElementById('input-submit-btn');
    
    if(status) status.innerHTML = "Ready. Click 'Start Loop'.";
    if(btn) {
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    if(inputField) {
        inputField.disabled = true;
        inputField.value = '';
    }
    if(submitBtn) submitBtn.disabled = true;
    
    highlightLine(0);
}

function stepInputLoop() {
    if (inputState.finished) return;

    // Check bounds
    if (inputState.i >= INPUT_SIZE) {
        document.getElementById('loop-status').innerHTML = "<span class='text-green-400 font-bold'>Population Complete!</span>";
        highlightLine(2); 
        const btn = document.getElementById('step-btn');
        if(btn) {
            btn.disabled = true;
            btn.classList.add('opacity-50', 'cursor-not-allowed');
        }
        inputState.finished = true;
        updatePointer(false); // remove pointer
        return;
    }

    // STATE MACHINE
    if (inputState.step === 0) {
        // Step 0: Pointer Arrives (Visualize 'i')
        highlightLine(2);
        updatePointer(true);
        document.getElementById('loop-status').innerHTML = `Loop Condition Check: i = ${inputState.i} < 5. <span class="text-green-400 font-bold">TRUE</span>`;
        inputState.step = 1;

    } else if (inputState.step === 1) {
        // Step 1: Wait for Input
        highlightLine(3);
        document.getElementById('loop-status').innerHTML = `<span class="text-yellow-400 animate-pulse">Waiting for User Input...</span>`;
        
        // Disable main stepper, Enable input
        const stepBtn = document.getElementById('step-btn');
        const inputField = document.getElementById('user-number-input');
        const submitBtn = document.getElementById('input-submit-btn');
        
        stepBtn.disabled = true;
        stepBtn.classList.add('opacity-50', 'cursor-not-allowed');
        
        inputField.disabled = false;
        inputField.focus();
        submitBtn.disabled = false;
        
        // Highlight active box slightly
        const activeBox = document.getElementById(`input-box-${inputState.i}`);
        if(activeBox) activeBox.classList.add('border-yellow-400');

    } else if (inputState.step === 2) {
        // Step 2: Assign Value (Done by handleUserSubmit)
        // This block acts as a bridge after submit is clicked
        
    } else if (inputState.step === 3) {
        // Step 3: Increment
        highlightLine(2); 
        inputState.i++;
        updatePointer(true); // Move pointer
        document.getElementById('loop-status').innerHTML = `Incrementing i...`;
        
        // Remove highlight from previous box
        const prevBox = document.getElementById(`input-box-${inputState.i-1}`);
        if(prevBox) {
             prevBox.classList.remove('bg-sky-600', 'text-white', 'scale-105');
             prevBox.classList.add('bg-slate-700', 'text-slate-400');
        }

        inputState.step = 0; // Loop back
    }
}

function handleUserSubmit() {
    const inputField = document.getElementById('user-number-input');
    const val = parseInt(inputField.value);
    
    if(isNaN(val)) {
        alert("Please enter a valid number!");
        return;
    }
    
    // Update Data
    inputArrayData[inputState.i] = val;
    
    // Update UI Box
    const box = document.getElementById(`input-box-${inputState.i}`);
    if(box) {
        box.innerHTML = `
            ${val}
            <span class="absolute -bottom-6 text-[10px] text-slate-500">Idx ${inputState.i}</span>
        `;
        box.classList.remove('bg-slate-700', 'text-slate-400', 'border-yellow-400');
        box.classList.add('bg-sky-600', 'text-white', 'scale-105', 'border-sky-400');
    }

    // Reset Input Controls
    inputField.value = '';
    inputField.disabled = true;
    document.getElementById('input-submit-btn').disabled = true;
    
    // Re-enable Main Stepper
    const stepBtn = document.getElementById('step-btn');
    stepBtn.disabled = false;
    stepBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    
    document.getElementById('loop-status').innerHTML = `Value <span class="text-sky-400 font-bold">${val}</span> stored at index ${inputState.i}.`;
    
    inputState.step = 3; // Move to increment next
}

function updateInputUI() {
    // Helper to refresh whole array if needed (rarely used in this flow)
}

function updatePointer(show) {
    const pointerContainer = document.getElementById('array-pointer-container');
    if(!pointerContainer) return;
    
    // Clear old pointer
    Array.from(pointerContainer.children).forEach(child => child.innerHTML = '');

    if (show && inputState.i < INPUT_SIZE) {
        const targetWrapper = pointerContainer.children[inputState.i];
        if(targetWrapper) {
            targetWrapper.innerHTML = `
                <div class="flex flex-col items-center animate-bounce text-sky-400">
                    <span class="text-xl font-bold">↑</span>
                    <span class="text-xs font-mono font-bold">i=${inputState.i}</span>
                </div>
            `;
        }
    }
}

function highlightLine(lineNum) {
    [1, 2, 3, 4].forEach(n => {
        const el = document.getElementById(`code-line-${n}`);
        if(el) el.className = "p-2 rounded transition-colors text-slate-400 border-l-2 border-transparent";
    });

    if (lineNum > 0) {
        const el = document.getElementById(`code-line-${lineNum}`);
        if(el) el.className = "p-2 rounded transition-colors text-white bg-slate-800 border-l-2 border-sky-500 shadow-sm";
    }
}

// --- Memory Reveal (5.1) ---
function toggleMemory(index) {
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

// -- String Visualizer (5.3) --
function visualizeString() {
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
            Size in RAM: <span class="text-white">${input.length} chars</span> + <span class="text-orange-400">1 null</span> = <span class="text-sky-400 font-bold">${totalBytes} bytes</span>
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

// Expose functions to window (optional but good for HTML onclick handlers)
window.switchTab = switchTab;
window.resetInputSimulator = resetInputSimulator;
window.stepInputLoop = stepInputLoop;
window.handleUserSubmit = handleUserSubmit;
window.toggleMemory = toggleMemory;
window.visualizeString = visualizeString;
