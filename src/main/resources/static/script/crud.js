document.addEventListener("DOMContentLoaded", function () {
    const tabelaProcedimentos = document.querySelector("#procedimentos-table");
    const tabelaAgendamentos = document.getElementById("agendamentos-table");

    let procedimentos = [];
    let procedimentoEditando = null;

    let agendamentos = [];
    let agendamentoEditando = null;
    let agendamentoExcluindo = null;

    const toggleProcedimentosBtn = document.getElementById("toggle-procedimentos-btn");
    const toggleAgendamentosBtn = document.getElementById("toggle-agendamentos-btn");
    const tabelaProcedimentosContainer = document.querySelector(".table-agend");
    const tabelaAgendamentosContainer = document.querySelector(".table-container");

    toggleProcedimentosBtn.addEventListener("click", function () {
        if (tabelaProcedimentosContainer.style.display === "none" || tabelaProcedimentosContainer.style.display === "") {
            tabelaProcedimentosContainer.style.display = "block";
            toggleProcedimentosBtn.textContent = "Esconder Tabela Procedimentos";
        } else {
            tabelaProcedimentosContainer.style.display = "none";
            toggleProcedimentosBtn.textContent = "Mostrar Tabela Procedimentos";
        }
    });

    toggleAgendamentosBtn.addEventListener("click", function () {
        if (tabelaAgendamentosContainer.style.display === "none" || tabelaAgendamentosContainer.style.display === "") {
            tabelaAgendamentosContainer.style.display = "block";
            toggleAgendamentosBtn.textContent = "Esconder Tabela Agendamentos";
        } else {
            tabelaAgendamentosContainer.style.display = "none";
            toggleAgendamentosBtn.textContent = "Mostrar Tabela Agendamentos";
        }
    });


    // --------- Procedimentos ---------

    async function carregarHTTP() {
        try {
            const response = await fetch('http://localhost:8080/procedimentos');
            if (!response.ok) throw new Error('Erro ao buscar procedimentos');

            procedimentos = await response.json();
            carregarProcedimentos();
        } catch (error) {
            console.error('Erro:', error);
            alert("Não foi possível carregar os procedimentos");
        }
    }

    function carregarProcedimentos(lista = procedimentos) {
        tabelaProcedimentos.innerHTML = "";
        lista.forEach(proc => tabelaProcedimentos.appendChild(criarLinha(proc)));
    }

    function criarLinha(proc) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${proc.cid}</td>
            <td>${proc.nomePro}</td>
            <td>${proc.responsavel}</td>
            <td>${proc.valor}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarProcedimento(${proc.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deletarProcedimento(${proc.id})">Excluir</button>
            </td>
        `;
        return row;
    }

    window.editarProcedimento = function (id) {
        procedimentoEditando = procedimentos.find(p => p.id === id);
        if (procedimentoEditando) {
            document.getElementById("edit-nome").value = procedimentoEditando.nomePro;
            document.getElementById("edit-preco").value = procedimentoEditando.valor;
            document.getElementById("edit-cid").value = procedimentoEditando.cid;
            document.getElementById("edit-func").value = procedimentoEditando.responsavel;
            new bootstrap.Modal(document.getElementById("edit-modal")).show();
        }
    };

    window.salvarEdicao = async function () {
        if (procedimentoEditando) {
            const nome = document.getElementById("edit-nome").value.trim();
            const preco = document.getElementById("edit-preco").value.trim();
            const cid = parseInt(document.getElementById("edit-cid").value.trim());
            const responsavel = document.getElementById("edit-func").value.trim();

            const procedimentoAtualizado = {
                id: procedimentoEditando.id,
                nomePro: nome,
                valor: preco,
                cid: cid,
                responsavel: responsavel
            };

            try {
                const response = await fetch(`http://localhost:8080/procedimentos/${procedimentoEditando.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(procedimentoAtualizado)
                });

                if (!response.ok) throw new Error("Erro ao atualizar procedimento");

                const atualizado = await response.json();
                const index = procedimentos.findIndex(p => p.id === atualizado.id);
                procedimentos[index] = atualizado;
                carregarProcedimentos();
                bootstrap.Modal.getInstance(document.getElementById("edit-modal")).hide();
            } catch (error) {
                console.error("Erro ao atualizar:", error);
                alert("Erro ao salvar edição.");
            }
        }
    };

    window.deletarProcedimento = async function (id) {
        if (!confirm("Tem certeza que deseja excluir este procedimento?")) return;

        try {
            const response = await fetch(`http://localhost:8080/procedimentos/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("Erro ao excluir procedimento");

            procedimentos = procedimentos.filter(p => p.id !== id);
            carregarProcedimentos();
        } catch (error) {
            console.error("Erro ao excluir:", error);
            alert("Erro ao excluir procedimento.");
        }
    };

    window.abrirAddModal = function () {
        document.getElementById("add-nome").value = "";
        document.getElementById("add-preco").value = "";
        document.getElementById("add-cid").value = "";
        document.getElementById("add-func").value = "";
        new bootstrap.Modal(document.getElementById("add-modal")).show();
    };

    window.adicionarProcedimento = async function () {
        const nome = document.getElementById("add-nome").value.trim();
        const preco = document.getElementById("add-preco").value.trim();
        const cid = parseInt(document.getElementById("add-cid").value.trim());
        const responsavel = document.getElementById("add-func").value.trim();

        if (!nome || !preco || !cid || !responsavel) {
            alert("Preencha todos os campos!");
            return;
        }

        const novoProcedimento = {
            nomePro: nome,
            valor: preco,
            cid: cid,
            responsavel: responsavel
        };

        try {
            const response = await fetch("http://localhost:8080/procedimentos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novoProcedimento)
            });

            if (!response.ok) throw new Error("Erro ao adicionar procedimento");

            const procedimentoSalvo = await response.json();
            procedimentos.push(procedimentoSalvo);
            carregarProcedimentos();
            bootstrap.Modal.getInstance(document.getElementById("add-modal")).hide();
        } catch (error) {
            console.error("Erro ao adicionar:", error);
            alert("Erro ao adicionar procedimento.");
        }
    };

    window.buscarProcedimento = function () {
        const termo = document.getElementById("search").value.toLowerCase();
        const filtrados = procedimentos.filter(p =>
            (p.nomePro && p.nomePro.toLowerCase().includes(termo)) ||
            (p.cid && p.cid.toString().includes(termo)) ||
            (p.responsavel && p.responsavel.toLowerCase().includes(termo)) ||
            p.id.toString() === termo
        );
        carregarProcedimentos(filtrados);
    };

    // --------- Agendamentos ---------

    // --------- Agendamentos ---------

async function carregarAgendamentos() {
    tabelaAgendamentos.innerHTML = ""; // limpa tabela antes

    try {
        const response = await fetch('http://localhost:8080/consultasAgendadas');
        if (!response.ok) throw new Error("Erro ao buscar agendamentos");

        agendamentos = await response.json();

        agendamentos.forEach(agendamento => {
            tabelaAgendamentos.appendChild(criarLinhaAgendamento(agendamento));
        });
    } catch (error) {
        console.error(error);
        alert("Não foi possível carregar os agendamentos.");
    }
}

function criarLinhaAgendamento(agendamento) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${agendamento.nome}</td>
        <td>${agendamento.profissional}</td>
        <td>${formatarData(agendamento.dataHoraAgendamento)}</td>
        <td>${agendamento.procedimento}</td>
        <td>
            <button class="btn btn-warning btn-sm" onclick="editarAgendamento(${agendamento.idAgendamento})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="abrirModalExcluirAgendamento(${agendamento.idAgendamento})">Excluir</button>
        </td>
    `;
    return row;
}

window.editarAgendamento = function (idAgendamento) {
    agendamentoEditando = agendamentos.find(a => a.idAgendamento === idAgendamento);
    if (agendamentoEditando) {
        document.getElementById("edit-ag-paciente").value = agendamentoEditando.nome;
        document.getElementById("edit-ag-dentista").value = agendamentoEditando.profissional;
        document.getElementById("edit-ag-data").value = agendamentoEditando.dataHoraAgendamento.slice(0, 10); // ISO date yyyy-mm-dd
        document.getElementById("edit-ag-procedimento").value = agendamentoEditando.procedimento;
        new bootstrap.Modal(document.getElementById("edit-agendamento-modal")).show();
    }
};

window.salvarEdicaoAgendamento = async function () {
    if (agendamentoEditando) {
        const paciente = document.getElementById("edit-ag-paciente").value.trim();
        const dentista = document.getElementById("edit-ag-dentista").value.trim();
        const data = document.getElementById("edit-ag-data").value.trim();
        const procedimento = document.getElementById("edit-ag-procedimento").value.trim();

        if (!paciente || !dentista || !data || !procedimento) {
            alert("Preencha todos os campos!");
            return;
        }

        const agendamentoAtualizado = {
            idAgendamento: agendamentoEditando.idAgendamento,
            nome: paciente,
            profissional: dentista,
            dataHoraAgendamento: data,
            procedimento: procedimento
        };

        try {
            const response = await fetch(`http://localhost:8080/consultasAgendadas/${agendamentoEditando.idAgendamento}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(agendamentoAtualizado)
            });

            if (!response.ok) throw new Error("Erro ao atualizar agendamento");

            const atualizado = await response.json();
            const index = agendamentos.findIndex(a => a.idAgendamento === atualizado.idAgendamento);
            agendamentos[index] = atualizado;
            carregarAgendamentos();
            bootstrap.Modal.getInstance(document.getElementById("edit-agendamento-modal")).hide();
        } catch (error) {
            console.error("Erro ao atualizar agendamento:", error);
            alert("Erro ao salvar edição do agendamento.");
        }
    }
};

window.abrirModalExcluirAgendamento = function (idAgendamento) {
    agendamentoExcluindo = agendamentos.find(a => a.idAgendamento === idAgendamento);
    if (agendamentoExcluindo) {
        new bootstrap.Modal(document.getElementById("delete-agendamento-modal")).show();
    }
};

window.confirmarExclusaoAgendamento = async function () {
    if (!agendamentoExcluindo) return;

    try {
        const response = await fetch(`http://localhost:8080/consultasAgendadas/${agendamentoExcluindo.idAgendamento}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Erro ao excluir agendamento");

        agendamentos = agendamentos.filter(a => a.idAgendamento !== agendamentoExcluindo.idAgendamento);
        carregarAgendamentos();
        bootstrap.Modal.getInstance(document.getElementById("delete-agendamento-modal")).hide();
    } catch (error) {
        console.error("Erro ao excluir agendamento:", error);
        alert("Erro ao excluir agendamento.");
    }
};


    function formatarData(dataISO) {
        const data = new Date(dataISO);
        return data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    // ---------- Inicialização ----------

    carregarHTTP();
    carregarAgendamentos();
});
