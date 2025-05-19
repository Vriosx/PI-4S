package com.example.demo.agendamento;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAgendamento; // auto-incremento
    
    @Column(nullable = true)
    private Integer idCliente;


    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String whatsapp;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private LocalDateTime dataHoraAgendamento;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String procedimento;

    @Column(nullable = false)
    private String profissional;


    // Construtor completo
    public Agendamento( String nome, String whatsapp, String email, 
                       LocalDateTime dataHoraAgendamento, String status, 
                       String procedimento, String profissional) {
     
        this.nome = nome;
        this.whatsapp = whatsapp;
        this.email = email;
        this.dataHoraAgendamento = dataHoraAgendamento;
        this.status = status;
        this.procedimento = procedimento;
        this.profissional = profissional;
    }

    // Getters e Setters
    
    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }
    
    public Integer getIdAgendamento() {
        return idAgendamento;
    }

    public void setIdAgendamento(Integer idAgendamento) {
        this.idAgendamento = idAgendamento;
    }


    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getWhatsapp() {
        return whatsapp;
    }

    public void setWhatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getDataHoraAgendamento() {
        return dataHoraAgendamento;
    }

    public void setDataHoraAgendamento(LocalDateTime dataHoraAgendamento) {
        this.dataHoraAgendamento = dataHoraAgendamento;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getProcedimento() {
        return procedimento;
    }

    public void setProcedimento(String procedimento) {
        this.procedimento = procedimento;
    }

    public String getProfissional() {
        return profissional;
    }

    public void setProfissional(String profissional) {
        this.profissional = profissional;
    }

    // Construtor vazio para JPA
    public Agendamento() {}
}
