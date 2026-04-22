package com.agendagrilo.model;
import java.sql.Time;
import java.time.LocalDate;


import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;

@Entity
@Table(name = "horarios_bloqueados")
public class AgendaBloqueada {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dia;
    @JsonFormat(pattern = "HH:mm:ss")
    private Time horario;
    private String motivo;

    public AgendaBloqueada() {}

    public AgendaBloqueada(Long id, LocalDate dia, Time horario, String motivo) {
        this.id = id;
        this.dia = dia;
        this.horario = horario;
        this.motivo = motivo;
    }
    // ===== GETTERS =====

    public Long getId() {
        return id;
    }

    public LocalDate getDia() {
        return dia;
    }

    public Time getHorario() {
        return horario;
    }

    public String getMotivo() {
        return motivo;
    }

    // ===== SETTERS =====

    public void setId(Long id) {
        this.id = id;
    }

    public void setDia(LocalDate dia) {
        this.dia = dia;
    }

    public void setHorario(Time horario) {
        this.horario = horario;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }
}
