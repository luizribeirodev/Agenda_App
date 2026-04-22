package com.agendagrilo.service;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;

import com.agendagrilo.model.Agenda;
import com.agendagrilo.repository.AgendaRepository;  

@Service
public class AgendaService {

    private final AgendaRepository agendaRepository;

    public AgendaService(AgendaRepository agendaRepository){
        this.agendaRepository = agendaRepository;
    }
    
    public List<Agenda> listarPorData(LocalDate data){
        return agendaRepository.findByDataOrderByHoraAsc(data);
    }

    public Agenda save(Agenda agenda){
        boolean conflito = agendaRepository.existsByDataAndHora(
            agenda.getData(),
            agenda.getHora()
        );

        if (conflito) {
            throw new RuntimeException("Horário já está ocupado");
        }

        return agendaRepository.save(agenda);
    }

    public void delete(Long id){
        agendaRepository.deleteById(id);
    }

    public Agenda atualizar(Long id, Agenda novo){
        Agenda existente = agendaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

        boolean conflito = agendaRepository
            .existsByDataAndHoraAndIdNot(
                novo.getData(),
                novo.getHora(),
                id
            );

        if (conflito) {
            throw new RuntimeException("Horário já está ocupado");
        }

        existente.setData(novo.getData());
        existente.setHora(novo.getHora());
        existente.setNome(novo.getNome());

        return agendaRepository.save(existente);
    }
}