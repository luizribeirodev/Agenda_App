package com.agendagrilo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.agendagrilo.model.AgendaBloqueada;
import com.agendagrilo.repository.AgendaBloqueadaRepository;

@Service
public class AgendaBloqueadaService {

    private final AgendaBloqueadaRepository agendaBloqueadaRepository;

    // Injeção por construtor (padrão Spring)
    public AgendaBloqueadaService(AgendaBloqueadaRepository agendaBloqueadaRepository) {
        this.agendaBloqueadaRepository = agendaBloqueadaRepository;
    }

    // ✅ Listar todos horários bloqueados
    public List<AgendaBloqueada> getAll() {
        return agendaBloqueadaRepository.findAll();
    }

    // ✅ Salvar bloqueio
    public AgendaBloqueada save(AgendaBloqueada bloqueado) {
        return agendaBloqueadaRepository.save(bloqueado);
    }

    // ✅ Deletar bloqueio
    public void delete(Long id) {
        agendaBloqueadaRepository.deleteById(id);
    }
}