package com.example.demo.agendamento;

import com.example.demo.usuario.Usuario;
import com.example.demo.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/consultasAgendadas")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Listar todos os agendamentos
    @GetMapping
    public List<Agendamento> listarAgendamentos() {
        return agendamentoRepository.findAll();
    }

    // Buscar agendamento por ID
    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> buscarAgendamentoPorId(@PathVariable Integer id) {
        Optional<Agendamento> agendamento = agendamentoRepository.findById(id);
        return agendamento.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }


@GetMapping("/funcionario")
public ResponseEntity<List<Agendamento>> listarPorProfissional(@RequestParam String nomeProfissional) {
    List<Agendamento> agendamentos = agendamentoRepository.findByProfissionalContainingIgnoreCase(nomeProfissional);
    return ResponseEntity.ok(agendamentos);
}



    // Salvar um novo agendamento usando e-mail para buscar nome e telefone
    @PostMapping
    public ResponseEntity<Agendamento> salvarAgendamento(@RequestBody Agendamento agendamento) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(agendamento.getEmail());

        usuarioOpt.ifPresent(usuario -> {
            agendamento.setNome(usuario.getNome());
            agendamento.setWhatsapp(usuario.getTelefone());
        });

        // Se não encontrar, salva mesmo assim (opcional: você pode mudar para dar erro se quiser)
        Agendamento salvo = agendamentoRepository.save(agendamento);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/porEmail")
public List<Agendamento> listarPorEmail(@RequestParam String email) {
    return agendamentoRepository.findByEmail(email);
}


    // Excluir agendamento por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirAgendamento(@PathVariable Integer id) {
        if (agendamentoRepository.existsById(id)) {
            agendamentoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
