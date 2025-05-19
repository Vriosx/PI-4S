package com.example.demo.agendamento;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

@Repository
@RequestMapping("/agendamento")
public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer>{
    List<Agendamento> findByEmail(String email);
    List<Agendamento> findByProfissional(String profissional);
    @Query("SELECT a FROM Agendamento a WHERE UPPER(a.profissional) LIKE UPPER(CONCAT('%', :nomeProfissional, '%'))")
    List<Agendamento> findByProfissionalContainingIgnoreCase(@Param("nomeProfissional") String nomeProfissional);

}
