document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;

            try {
                // 1. Fazer a requisição GET com os parâmetros na URL
                const response = await fetch("http://localhost:8080/usuarios/login");

                // 2. Verificar se a resposta foi bem-sucedida
                if (!response.ok) {
                    throw new Error('Credenciais inválidas ou usuário não encontrado');
                }

                // 3. Obter os dados dos usuários
                const usuarios = await response.json();
                console.log(usuarios);

                // 4. Encontrar o usuário com o email e senha fornecidos
                const usuario = usuarios.find(u => u.email === email && u.senha === senha);

                if (!usuario) {
                    throw new Error('Credenciais inválidas');
                }

                // 5. Armazenar informações do usuário (incluindo senha para fins didáticos)
                localStorage.setItem("usuarioLogado", JSON.stringify({
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha,
                role: usuario.tipoUsuario,
}));

// Teste para conferir se salvou mesmo
console.log("Usuário salvo no localStorage:", JSON.parse(localStorage.getItem("usuarioLogado")));


                localStorage.setItem("nome", usuario.nome);
                localStorage.setItem("email", usuario.email); // <-- esta linha salva o e-mail separadamente

                // 6. Redirecionar para a página principal
                window.location.href = "/";

            } catch (error) {
                console.error('Erro no login:', error);
                alert("Falha no login. Verifique suas credenciais e tente novamente.");
            }
        });
    }
});
