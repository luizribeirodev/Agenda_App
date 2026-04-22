package com.agendagrilo.repository;

import java.time.LocalDate;
import java.sql.Time;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.agendagrilo.model.Agenda;

public interface AgendaRepository extends JpaRepository<Agenda, Long> {

    List<Agenda> findByDataOrderByHoraAsc(LocalDate data);

    boolean existsByDataAndHora(LocalDate data, Time hora);

    boolean existsByDataAndHoraAndIdNot(LocalDate data, Time hora, Long id);
}
