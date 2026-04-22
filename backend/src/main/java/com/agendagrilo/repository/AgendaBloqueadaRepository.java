package com.agendagrilo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agendagrilo.model.AgendaBloqueada;

public interface AgendaBloqueadaRepository
        extends JpaRepository<AgendaBloqueada, Long> {

}