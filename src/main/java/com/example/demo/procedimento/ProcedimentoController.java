package com.example.demo.procedimento;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/procedimentos")
public class ProcedimentoController {

    @Autowired
    private ProcedimentoRepository procedimentoRepository; // Injetando o repositório

    // Listar todos os procedimentos
    @GetMapping
    public List<Procedimento> listarProcedimentos() {
        return procedimentoRepository.findAll(); // Chama o método do repositório
    }


    // Buscar um procedimento por ID
    @GetMapping("/{id}")
    public Optional<Procedimento> buscarProcedimentoPorId(@PathVariable Integer id) {
        return procedimentoRepository.findById(id); // Chama o método do repositório
    }

    // Salvar um novo procedimento
    @PostMapping
    public Procedimento salvarProcedimento(@RequestBody Procedimento procedimento) {
        return procedimentoRepository.save(procedimento); // Chama o método do repositório
    }

    // Excluir procedimento por ID
    @DeleteMapping("/{id}")
    public void excluirProcedimento(@PathVariable Integer id) {
        procedimentoRepository.deleteById(id); // Chama o método do repositório
    }
    @PutMapping("/{id}")
public Procedimento atualizarProcedimento(@PathVariable Integer id, @RequestBody Procedimento procedimento) {
    procedimento.setId(id); // Garante que o ID está correto
    return procedimentoRepository.save(procedimento); // Atualiza o procedimento
}

}

