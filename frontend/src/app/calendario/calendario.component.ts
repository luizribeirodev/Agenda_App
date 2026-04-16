import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { ListaComponent } from '../lista/lista.component';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule, ListaComponent],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  dataSelecionada!: string;
  dataISO!: string;

  calendarOptions!: CalendarOptions;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {

    const hoje = new Date();
    this.atualizarData(hoje);

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      locale: 'pt-br',
      plugins: [dayGridPlugin, interactionPlugin],

      // 🔥 ligação correta da função
      dateClick: this.handleDateClick.bind(this)
    };
  }

  handleDateClick(info: DateClickArg) {

    this.atualizarData(info.date);

    // força Angular atualizar o componente filho
    this.cd.detectChanges();

  }

  atualizarData(data: Date) {

    const diasSemana = [
      'Domingo','Segunda','Terça','Quarta',
      'Quinta','Sexta','Sábado'
    ];

    const meses = [
      'Jan','Fev','Mar','Abr','Mai','Jun',
      'Jul','Ago','Set','Out','Nov','Dez'
    ];

    const diaSemana = diasSemana[data.getDay()];
    const diaMes = data.getDate();
    const Tmes = meses[data.getMonth()];

    this.dataSelecionada = `${diaSemana}, ${diaMes} de ${Tmes}`;

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');

    this.dataISO = `${ano}-${mes}-${dia}`;

  }
}