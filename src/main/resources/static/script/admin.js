document.addEventListener("DOMContentLoaded", function () {
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    if (usuarioLogado) {
        const usuario = JSON.parse(usuarioLogado);

        // Exibe opções do menu com base na role
        const menuLogout = document.getElementById("menu-logout");
        const menuLogin = document.getElementById("menu-login");
        const menuCrud = document.getElementById("menu-crud");
        const menuAgendamentos = document.getElementById("menu-agendamentos");

        if (menuLogout) menuLogout.classList.remove("d-none");
        if (menuLogin) menuLogin.classList.add("d-none");

        if (usuario.role === "admin") {
            if (menuCrud) menuCrud.classList.remove("d-none");
        }

        if (usuario.role === "usuario" || usuario.role === "funcionario") {
            if (menuAgendamentos) menuAgendamentos.classList.remove("d-none");
        }

        // Se estiver na página de agendamentos, carrega os dados
        if (document.getElementById("procedimentos-table")) {
            carregarConsultasHTTP();
        }
    }

    // Lógica de login
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;

            try {
                const response = await fetch("http://localhost:8080/usuarios");
                if (!response.ok) {
                    throw new Error("Erro ao buscar usuários");
                }

                const usuarios = await response.json();
                const usuario = usuarios.find(u => u.email === email && u.senha === senha);

                if (usuario) {
                    localStorage.setItem("usuarioLogado", JSON.stringify({
                        email: usuario.email,
                        role: usuario.tipoUsuario,
                        nome: usuario.nome
                    }));

                    alert("Login bem-sucedido!");

                    // Redirecionamento baseado no papel do usuário
                    if (usuario.tipoUsuario === "admin") {
                        window.location.href = "/";
                    } else if (usuario.tipoUsuario === "funcionario") {
                        window.location.href = "/";
                    } else {
                        window.location.href = "/";
                    }

                } else {
                    alert("E-mail ou senha incorretos!");
                }

            } catch (error) {
                console.error("Erro no login:", error);
                alert("Erro ao tentar fazer login. Tente novamente.");
            }
        });
    }

    // Lógica de logout
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
        logoutLink.addEventListener("click", function (event) {
            event.preventDefault();
            localStorage.removeItem("usuarioLogado");
            alert("Logout realizado com sucesso!");
            window.location.href = "/";
        });
    }

    // Carregamento de agendamentos
    async function carregarConsultasHTTP() {
        try {
            const response = await fetch("http://localhost:8080/consultasAgendadas");
            if (!response.ok) {
                throw new Error("Erro ao buscar agendamentos");
            }

            const agendamentos = await response.json();
            const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

            const tbody = document.getElementById("procedimentos-table");
            if (!tbody) return;

            tbody.innerHTML = "";

            agendamentos.forEach(agendamento => {
});


        } catch (error) {
            console.error("Erro ao carregar agendamentos:", error);
            alert("Erro ao carregar os agendamentos.");
        }
    }
});
