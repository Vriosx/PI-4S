package com.example.demo.procedimento;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcedimentoRepository extends JpaRepository<Procedimento, Integer> {
    // Aqui você pode adicionar métodos personalizados se necessário
}

