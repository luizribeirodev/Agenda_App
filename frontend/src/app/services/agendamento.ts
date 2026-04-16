import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agendamento } from '../models/agendamento.model';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
                    //endereço web http://localhost:8080/AgendaGrilo/agendamentos
                    //endereço emulador http://10.0.2.2:8080/AgendaGrilo/agendamentos
                    //endereço cell http://10.0.0.141:8080/AgendaGrilo
                    private apiUrl = 'http://localhost:8080/AgendaGrilo';

  constructor(private http: HttpClient) {}

  buscarPorData(data: string) {
  return this.http.get<Agendamento[]>(
    `${this.apiUrl}/agendamentos?data=${data}`
  );
 }

  criar(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(
      `${this.apiUrl}/agendamentos`, agendamento
    );
  }

  update(id: number, agendamento: Agendamento) {
  return this.http.put<Agendamento>(
    `${this.apiUrl}/agendamentos/${id}`, 
    agendamento
  );
}

  deletar(id: number) {
    return this.http.delete(
      `${this.apiUrl}/agendamentos/${id}`
    );
  }
}
