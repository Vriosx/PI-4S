package com.example.demo.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admins")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository; // Injetando o repositório

    // Listar todos os admins
    @GetMapping
    public List<Admin> listarAdmins() {
        return adminRepository.findAll(); // Chama o método do repositório
    }

    // Buscar admin por ID
    @GetMapping("/{id}")
    public Optional<Admin> buscarAdminPorId(@PathVariable Integer id) {
        return adminRepository.findById(id); // Chama o método do repositório
    }

    // Salvar um novo admin
    @PostMapping
    public Admin salvarAdmin(@RequestBody Admin admin) {
        return adminRepository.save(admin); // Chama o método do repositório
    }

    // Excluir admin por ID
    @DeleteMapping("/{id}")
    public void excluirAdmin(@PathVariable Integer id) {
        adminRepository.deleteById(id); // Chama o método do repositório
    }
}
