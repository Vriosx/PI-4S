package com.example.demo.procedimento;

import jakarta.persistence.*;

@Entity
public class Procedimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nomePro; // Nome do procedimento
    private Integer cid;
    private String responsavel; // Nome do responsável // Data e hora do procedimento
    private String emailResponsavel;  // novo campo
    private String valor; // Valor do procedimento


    // Construtor padrão
    public Procedimento() {}

    // Construtor com parâmetros


    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public Procedimento(Integer id, String nomePro, Integer cid, String responsavel, String valor) {
        this.id = id;
        this.nomePro = nomePro;
        this.cid = cid;
        this.responsavel = responsavel;
        this.valor = valor;
    }

    
    public String getEmailResponsavel() {
        return emailResponsavel;
    }

    public void setEmailResponsavel(String emailResponsavel) {
        this.emailResponsavel = emailResponsavel;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNomePro() {
        return nomePro;
    }

    public void setNomePro(String nomePro) {
        this.nomePro = nomePro;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public String getValor() {
        return valor;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }
}

