package com.example.demo.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository; // Injetando o repositório

    // Listar todos os usuários
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll(); // Chama o método do repositório
    }

    // Buscar um usuário por ID
    @GetMapping("/{id}")
    public Optional<Usuario> buscarUsuarioPorId(@PathVariable Integer id) {
        return usuarioRepository.findById(id); // Chama o método do repositório
    }

    // Salvar um novo usuário
    @PostMapping
    public Usuario salvarUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario); // Chama o método do repositório
    }

    @GetMapping("/login")
    public List<UsuarioLogin> buscarEmailESenha() {
        return usuarioRepository.findBy();
    }
    
    // Excluir um usuário por ID
    @DeleteMapping("/{id}")
    public void excluirUsuario(@PathVariable Integer id) {
        usuarioRepository.deleteById(id); // Chama o método do repositório
    }
}
