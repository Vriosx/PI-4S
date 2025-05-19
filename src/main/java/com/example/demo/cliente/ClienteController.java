package com.example.demo.cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository; // Injetando o repositório

    // Listar todos os clientes
    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteRepository.findAll(); // Chama o método do repositório
    }

    // Buscar cliente por ID
    @GetMapping("/{id}")
    public Optional<Cliente> buscarClientePorId(@PathVariable Integer id) {
        return clienteRepository.findById(id); // Chama o método do repositório
    }

    // Salvar um novo cliente
    @PostMapping
    public Cliente salvarCliente(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente); // Chama o método do repositório
    }

    // Excluir cliente por ID
    @DeleteMapping("/{id}")
    public void excluirCliente(@PathVariable Integer id) {
        clienteRepository.deleteById(id); // Chama o método do repositório
    }
}
