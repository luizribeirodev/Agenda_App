package com.agendagrilo.model;

import java.sql.Time;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table(name = "agenda_horarios")
public class Agenda {           //Criando o objeto agenda
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate data;
    private Time hora;
    private String servico;
    private String nome;
    private String cell;
                                //Construtor                                     
    public Agenda(Long id, LocalDate data, Time hora, String servico, String nome, String cell ){
        this.id = id;
        this.data = data;
        this.hora = hora;
        this.servico = servico;
        this.nome = nome; 
        this.cell = cell;

    }

    public Agenda() {
}
    
    public Long getId(){ 
        return id;
    }

    public void setId(Long id){
        this.id= id;
    }

    public LocalDate getData(){
        return data;
    }

    public void setData(LocalDate data){
        this.data = data;
    }

    public Time getHora(){
        return hora;
    }

    public void setHora(Time hora){
        this.hora = hora;
    }

    public String getServico(){
        return servico;
    }

    public void setServico(String servico){
        this.servico = servico;
    }

    public String getNome(){
            return nome;
        }

    public void setNome(String nome){
        this.nome = nome;
    }

    public String getCell(){
        return cell;
    }

    public void setCell(String cell){
        this.cell = cell;
    }

}
