document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("cadastro-form");
    const telefoneInput = document.getElementById("telefone");
    const cpfInput = document.getElementById("CPF");

    // Formatação de telefone
    telefoneInput.addEventListener("input", function() {
        this.value = formatarTelefone(this.value);
    });

    // Formatação de CPF
    cpfInput.addEventListener("input", function() {
        this.value = formatarCPF(this.value);
    });

    // Evento de submit
    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        
        if (validarFormulario()) {
            await cadastrarUsuario();
        }
    });

    function validarFormulario() {
        let valido = true;
        const nome = document.getElementById("nome");
        const email = document.getElementById("email");
        const telefone = document.getElementById("telefone");
        const senha = document.getElementById("senha");
        const confirmarSenha = document.getElementById("confirmar-senha");
        const cpf = document.getElementById("CPF");

        limparErros();

        // Validação do nome
        if (nome.value.trim().length < 3) {
            exibirErro(nome, "O nome deve ter pelo menos 3 caracteres.");
            valido = false;
        }

        // Validação do email
        if (!validarEmail(email.value)) {
            exibirErro(email, "Por favor, insira um e-mail válido.");
            valido = false;
        }

        // Validação do telefone
        if (!validarTelefone(telefone.value)) {
            exibirErro(telefone, "Por favor, insira um telefone válido (DDD) XXXXX-XXXX.");
            valido = false;
        }

        // Validação do CPF
        if (!validarCPF(cpf.value)) {
            exibirErro(cpf, "Por favor, insira um CPF válido.");
            valido = false;
        }

        // Validação da senha
        if (senha.value.length < 6) {
            exibirErro(senha, "A senha deve ter pelo menos 6 caracteres.");
            valido = false;
        }

        // Validação de confirmação de senha
        if (senha.value !== confirmarSenha.value) {
            exibirErro(confirmarSenha, "As senhas não coincidem.");
            valido = false;
        }

        return valido;
    }

    async function cadastrarUsuario() {
        try {
            const usuario = {
                nome: document.getElementById("nome").value,
                email: document.getElementById("email").value,
                telefone: document.getElementById("telefone").value.replace(/\D/g, ''),
                cpf: document.getElementById("CPF").value.replace(/\D/g, ''),
                senha: document.getElementById("senha").value,
                tipoUsuario: "usuario"
            };

            const response = await fetch('http://localhost:8080/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao cadastrar usuário');
            }

            localStorage.setItem("usuarioLogado", JSON.stringify({
                email: usuario.email,
                role: usuario.tipoUsuario
            }))
            alert("Cadastro realizado com sucesso!");
            window.location.href = "/entrar-cadastrar";

        } catch (error) {
            console.error("Erro no cadastro:", error);
            alert(error.message || "Erro ao cadastrar. Tente novamente.");
        }
    }

    // Funções auxiliares
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validarTelefone(telefone) {
        const re = /^\(\d{2}\) \d{5}-\d{4}$/;
        return re.test(telefone);
    }

    function validarCPF(cpf) {
        const re = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return re.test(cpf);
    }

    function formatarTelefone(telefone) {
        telefone = telefone.replace(/\D/g, "");
        telefone = telefone.slice(0, 11);
        telefone = telefone.replace(/(\d{2})(\d)/, "($1) $2");
        telefone = telefone.replace(/(\d{5})(\d)/, "$1-$2");
        return telefone;
    }

    function formatarCPF(cpf) {
        cpf = cpf.replace(/\D/g, "");
        cpf = cpf.slice(0, 11);
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1-$2");
        return cpf;
    }

    function exibirErro(campo, mensagem) {
        const erro = document.createElement("div");
        erro.className = "invalid-feedback";
        erro.textContent = mensagem;
        campo.classList.add("is-invalid");
        campo.parentNode.appendChild(erro);
    }

    function limparErros() {
        document.querySelectorAll(".is-invalid").forEach(el => {
            el.classList.remove("is-invalid");
        });
        document.querySelectorAll(".invalid-feedback").forEach(el => {
            el.remove();
        });
    }
});