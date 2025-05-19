package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String paginaInicial() {
        return "index";
    }

    @GetMapping("/agendamentos")
    public String mostrarAgendamentos() {
        return "agendamentos";
    }

    @GetMapping("/cadastro")
    public String mostrarCadastro() {
        return "cadastro";
    }

    @GetMapping("/confirmacao")
    public String mostrarConfirmacao() {
        return "confirmacao";
    }

    @GetMapping("/contato")
    public String mostrarContato() {
        return "contato";
    }

    @GetMapping("/crud")
    public String mostrarCrud() {
        return "crud";
    }

    @GetMapping("/entrar-cadastrar")
    public String mostrarEntrarCadastrar() {
        return "entrar-cadastrar";
    }
}

