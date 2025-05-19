document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#formContato"); 
    const popup = document.createElement("div");
    popup.id = "popup-confirmacao";
    popup.innerHTML = `
        <div class="popup-content">
            <p>Formulário enviado com sucesso! Entraremos em contato em breve.</p>
            <button id="fechar-popup">Fechar</button>
        </div>
    `;
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "white";
    popup.style.padding = "20px";
    popup.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.1)";
    popup.style.display = "none"; 
    document.body.appendChild(popup);

    
    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        
        popup.style.display = "block";
    });

    
    document.getElementById("fechar-popup").addEventListener("click", function () {
        popup.style.display = "none"; 
        form.reset(); 
    });
});
