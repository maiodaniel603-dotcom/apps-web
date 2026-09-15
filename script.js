// ========== RELÓGIO MUNDIAL ==========
function atualizarRelogios() {
    const zonas = {
        luanda: 'Africa/Luanda',
        lisboa: 'Europe/Lisbon',
        saopaulo: 'America/Sao_Paulo',
        novaiorque: 'America/New_York',
        londres: 'Europe/London',
        toquio: 'Asia/Tokyo'
    };

    for (let [id, zona] of Object.entries(zonas)) {
        const agora = new Date();
        const hora = agora.toLocaleString('pt-AO', {
            timeZone: zona,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById(id).textContent = hora;
    }
}

// Atualizar relógio a cada segundo
setInterval(atualizarRelogios, 1000);
atualizarRelogios();

// ========== TODO LIST ==========
const todoList = [];

function carregarTarefas() {
    const salvas = localStorage.getItem('tarefas');
    if (salvas) {
        todoList.push(...JSON.parse(salvas));
        renderizarTarefas();
    }
}

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(todoList));
}

function adicionarTarefa() {
    const input = document.getElementById('todoInput');
    const texto = input.value.trim();

    if (!texto) {
        alert('⚠️ Digite uma tarefa!');
        return;
    }

    const tarefa = {
        id: Date.now(),
        texto: texto,
        concluida: false,
        dataCriacao: new Date().toLocaleString('pt-AO')
    };

    todoList.push(tarefa);
    salvarTarefas();
    renderizarTarefas();
    input.value = '';
    input.focus();
}

function deletarTarefa(id) {
    const index = todoList.findIndex(t => t.id === id);
    if (index > -1) {
        todoList.splice(index, 1);
        salvarTarefas();
        renderizarTarefas();
    }
}

function marcarConcluida(id) {
    const tarefa = todoList.find(t => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        salvarTarefas();
        renderizarTarefas();
    }
}

function renderizarTarefas() {
    const lista = document.getElementById('todoList');
    lista.innerHTML = '';

    todoList.forEach(tarefa => {
        const li = document.createElement('li');
        li.className = `todo-item ${tarefa.concluida ? 'done' : ''}`;
        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${tarefa.concluida ? 'checked' : ''} 
                   onchange="marcarConcluida(${tarefa.id})">
            <span class="todo-text">${tarefa.texto}</span>
            <button class="todo-delete" onclick="deletarTarefa(${tarefa.id})">🗑️ Deletar</button>
        `;
        lista.appendChild(li);
    });

    atualizarStats();
}

function atualizarStats() {
    const total = todoList.length;
    const concluidas = todoList.filter(t => t.concluida).length;
    document.getElementById('totalTarefas').textContent = total;
    document.getElementById('tarefasConcluidas').textContent = concluidas;
}

// Enter para adicionar tarefa
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && document.getElementById('todoInput') === document.activeElement) {
        adicionarTarefa();
    }
});

carregarTarefas();

// ========== GERADOR DE PIADAS ==========
const piadas = [
    {
        pergunta: 'Por que a matemática foi à praia?',
        resposta: 'Para calcular a média de temperatura!'
    },
    {
        pergunta: 'Qual é o cúmulo do elétrico?',
        resposta: 'Levar um choque quando encontra o gás!'
    },
    {
        pergunta: 'Qual é o superlativo de pato?',
        resposta: 'Patíssimo!'
    },
    {
        pergunta: 'Como é o Papai Noel na Angola?',
        resposta: 'É o Papai Noel normal, mas em vez de trenó, vem de táxi!'
    },
    {
        pergunta: 'O que o carro disse para a moto?',
        resposta: 'Você não tem nem onde cair morto!'
    },
    {
        pergunta: 'Qual é a bebida favorita do Drácula?',
        resposta: 'Sangue tipo O negativo com gelo!'
    },
    {
        pergunta: 'Por que o livro de matemática se suicidou?',
        resposta: 'Porque tinha muitos problemas!'
    },
    {
        pergunta: 'O que é um crocodilo caindo?',
        resposta: 'Uma jacaré-ção!'
    },
    {
        pergunta: 'Qual é o comida favorita do programador?',
        resposta: 'Código com legumes!'
    },
    {
        pergunta: 'Como se chama um urso sem dentes?',
        resposta: 'Gummi bear!'
    }
];

let piadaAtual = null;

function gerarPiada() {
    piadaAtual = piadas[Math.floor(Math.random() * piadas.length)];
    const display = document.getElementById('jokeDisplay');
    
    display.innerHTML = `
        <div style="animation: fadeIn 0.5s ease-in;">
            <p style="color: var(--primary); font-weight: bold; margin-bottom: 1rem; font-size: 1.2rem;">
                ${piadaAtual.pergunta}
            </p>
            <p style="color: var(--accent); font-size: 1.1rem;">
                ${piadaAtual.resposta}
            </p>
        </div>
    `;
}

function compartilharPiada() {
    if (!piadaAtual) {
        alert('Primeiro gere uma piada!');
        return;
    }

    const texto = `${piadaAtual.pergunta}\n${piadaAtual.resposta}`;
    
    if (navigator.share) {
        navigator.share({
            title: '😂 Piada Hilariante!',
            text: texto
        }).catch(() => {});
    } else {
        // Fallback para copiar ao clipboard
        navigator.clipboard.writeText(texto);
        alert('✅ Piada copiada para o clipboard!');
    }
}

// Adicionar animação CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

console.log('🚀 Apps Web carregados com sucesso!');
console.log('✅ Relógio: Atualizado em tempo real');
console.log('✅ TODO: Salvo em localStorage');
console.log('✅ Piadas: 10 piadas disponíveis');