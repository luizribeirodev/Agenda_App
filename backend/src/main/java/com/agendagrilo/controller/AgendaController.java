package com.agendagrilo.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.agendagrilo.model.Agenda;
import com.agendagrilo.service.AgendaBloqueadaService;
import com.agendagrilo.service.AgendaService;
import com.agendagrilo.model.AgendaBloqueada;

@RestController
@RequestMapping("/AgendaGrilo")
@CrossOrigin(origins="*") // permite Angular acessar  Localhost[http://localhost:4200], Network[http://10.0.0.141:4200]
public class AgendaController {

    private final AgendaService agendaService;
    private final AgendaBloqueadaService agendaBloqueadaService;

    //  Injeção de dependência
    public AgendaController(
        AgendaService agendaService,
        AgendaBloqueadaService agendaBloqueadaService
    ){
        this.agendaService = agendaService;
        this.agendaBloqueadaService = agendaBloqueadaService;
    }

     @GetMapping("/")
    public String home() {
        return "API rodando!";
    }




    @GetMapping("/agendamentos")
    public List<Agenda> listarPorData(@RequestParam LocalDate data){
        return agendaService.listarPorData(data);
    }

    @GetMapping("/bloqueados")
    public List<AgendaBloqueada> getallBloqueadas(){
        return agendaBloqueadaService.getAll();
    }

    // ✅ ENDPOINT PARA SALVAR
    @PostMapping("/agendamentos")
    public Agenda salvar(@RequestBody Agenda agenda){
        return agendaService.save(agenda);
    }

    @DeleteMapping("/agendamentos/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        agendaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/agendamentos/{id}")
    public Agenda atualizar(
        @PathVariable Long id,
        @RequestBody Agenda agendamentoAtualizado
    ) {
        return agendaService.atualizar(id, agendamentoAtualizado);
    }



}
