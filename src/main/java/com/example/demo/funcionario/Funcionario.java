package com.example.demo.funcionario;

import com.example.demo.usuario.Usuario;

import jakarta.persistence.*;

@Entity
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFuncionario;

    @OneToOne
    @JoinColumn(name = "id_usuario", unique = true)
    private Usuario usuario;

    private String especialidade;

    @Column(unique = true)
    private String numCfo;

    public Funcionario() {}

    public Funcionario(Usuario usuario, String especialidade, String numCfo) {
        this.usuario = usuario;
        this.especialidade = especialidade;
        this.numCfo = numCfo;
    }

    public Integer getIdFuncionario() {
        return idFuncionario;
    }

    public void setIdFuncionario(Integer idFuncionario) {
        this.idFuncionario = idFuncionario;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public String getNumCfo() {
        return numCfo;
    }

    public void setNumCfo(String numCfo) {
        this.numCfo = numCfo;
    }
}

