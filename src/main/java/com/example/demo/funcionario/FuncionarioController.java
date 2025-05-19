package com.example.demo.funcionario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioRepository funcionarioRepository; // Injetando o repositório

    // Listar todos os funcionários
    @GetMapping
    public List<Funcionario> listarFuncionarios() {
        return funcionarioRepository.findAll(); // Chama o método do repositório
    }

    // Buscar funcionário por ID
    @GetMapping("/{id}")
    public Optional<Funcionario> buscarFuncionarioPorId(@PathVariable Integer id) {
        return funcionarioRepository.findById(id); // Chama o método do repositório
    }

    // Salvar um novo funcionário
    @PostMapping
    public Funcionario salvarFuncionario(@RequestBody Funcionario funcionario) {
        return funcionarioRepository.save(funcionario); // Chama o método do repositório
    }

    // Excluir funcionário por ID
    @DeleteMapping("/{id}")
    public void excluirFuncionario(@PathVariable Integer id) {
        funcionarioRepository.deleteById(id); // Chama o método do repositório
    }
}
