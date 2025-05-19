document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.querySelector("#procedimentos-table");
    let agendamentos = [];
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
console.log("Usuário logado:", usuarioLogado);

const nomeProfissional = usuarioLogado?.nome || "";
console.log("Nome profissional para filtro:", nomeProfissional);



    if (!usuarioLogado) {
        alert("Usuário não autenticado.");
        window.location.href = "/";
        return;
    }

console.log("Usuário logado completo:", usuarioLogado);

    console.log("Nome profissional usado para filtro:", nomeProfissional);

    async function carregarConsultasHTTP() {
        try {
            let response;
            if (usuarioLogado.role === "admin") {
                response = await fetch("http://localhost:8080/consultasAgendadas");
            } else if (usuarioLogado.role === "funcionario") {
    response = await fetch(`http://localhost:8080/consultasAgendadas/funcionario?nomeProfissional=${encodeURIComponent(nomeProfissional)}`);
} else if (usuarioLogado.role === "usuario") {
                response = await fetch(`http://localhost:8080/consultasAgendadas/porEmail?email=${encodeURIComponent(usuarioLogado.email)}`);
            } else {
                alert("Role do usuário não suportada.");
                return;
            }

            if (!response.ok) throw new Error("Erro ao buscar agendamentos");
            agendamentos = await response.json();
            carregarConsultas(agendamentos);
        } catch (error) {
            console.error("Erro ao carregar agendamentos:", error);
            alert("Não foi possível carregar os agendamentos.");
        }
    }

    function carregarConsultas(lista) {
        tabela.innerHTML = "";

        if (lista.length === 0) {
            const row = document.createElement("tr");
            row.innerHTML = `<td colspan="6" class="text-center">Nenhum agendamento encontrado.</td>`;
            tabela.appendChild(row);
            return;
        }

        lista.forEach(agendamento => {
            const row = criarLinha(agendamento);
            tabela.appendChild(row);
        });
    }

    function criarLinha(agendamento) {
        const dataFormatada = new Date(agendamento.dataHoraAgendamento).toLocaleString("pt-BR");

        return Object.assign(document.createElement("tr"), {
            innerHTML: `
                <td>${agendamento.procedimento || agendamento.nomePro || "N/A"}</td>
                <td>${agendamento.nome}</td>
                <td>${agendamento.profissional}</td>
                <td>${dataFormatada}</td>
                <td>${agendamento.status}</td>
            `
        });
    }

    window.deletarAgendamento = async function (id) {
        if (!confirm("Deseja mesmo cancelar este atendimento?")) return;

        try {
            const response = await fetch(`http://localhost:8080/consultasAgendadas/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("Erro ao cancelar agendamento");

            agendamentos = agendamentos.filter(p => p.idAgendamento !== id);
            carregarConsultas(agendamentos);
        } catch (error) {
            console.error("Erro ao excluir:", error);
            alert("Erro ao cancelar agendamento.");
        }
    };

    window.buscarAgendamento = function () {
        const termo = document.getElementById("search").value.toLowerCase();
        const filtrados = agendamentos.filter(agendamento =>
            (agendamento.procedimento || agendamento.nomePro || "").toLowerCase().includes(termo) ||
            agendamento.nome.toLowerCase().includes(termo) ||
            agendamento.profissional.toLowerCase().includes(termo) ||
            agendamento.idAgendamento.toString() === termo
        );
        carregarConsultas(filtrados);
    };

    carregarConsultasHTTP();
});
