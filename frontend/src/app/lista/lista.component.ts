import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideNgxMask } from 'ngx-mask'; //Maskara baixada da biblioteca
import { NgxMaskPipe } from 'ngx-mask';
import { AgendamentoService } from '../services/agendamento';
import { Agendamento } from '../models/agendamento.model';
import { Component, Input, OnChanges, SimpleChanges,ChangeDetectorRef} from '@angular/core';

  interface hBlock{
    motivo: string;
    horario: string;
    data: string;
  }
  
@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, FormsModule,NgxMaskPipe],  
  providers: [provideNgxMask()], 
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})

export class ListaComponent implements OnChanges{
  constructor(
    private agendamentoService: AgendamentoService,
    private cd: ChangeDetectorRef
) {}

  @Input() data?: string;
  @Input() dataTexto?: string;
  dataEdicao: string = '';
  // Horarios  
  novoHorario = false;
  nome: string = '';
  tell: string = '';  
  tipoSelecionado: string = '';
  horarios: string[] = [];
  horarioSelecionado: string = '';
  // Block
  bloquearHorario = false;
  motivoBlock: string ='';
  horarioBlock: string ='';
  // Remarcar
  agendamentoSelecionado: Agendamento | null = null;
  remarcar = false;
  //tabLista
  abaAtiva: 'agendamentos' | 'bloqueados' = 'agendamentos'; // A abaLista ira começar em agendamentos Variavel limitada Union Type
  
  agendamentos: Agendamento[] = [];
  block: hBlock[] =[];
  
  abrirNovo(){
    this.novoHorario = true;
  }
  fecharNovo(){
    this.novoHorario = false;
  }
  abrirBloquear(){
    this.bloquearHorario = true;
  }
  fecharBlock(){
    this.bloquearHorario = false;
    this.motivoBlock="";
    this.horarioBlock="";
  }
  salvarBlock(){
    if(!this.horarioBlock){
      alert("Falta informar horario!")
      return
    }
    if(!this.motivoBlock){
      this.motivoBlock = "Pausa";
    }
    const novoBlock: hBlock = {
      motivo:this.motivoBlock,
      horario:this.horarioBlock,
      data:this.data!
    };

    this.block.push(novoBlock);
    this.bloquearHorario = false;
    this.motivoBlock ="";
    this.horarioBlock="";
  }
  abrirRemarcar(a: Agendamento) {
  this.agendamentoSelecionado = { ...a };

  this.nome = a.nome;
  this.tell = a.cell;
  this.tipoSelecionado = a.servico;
  this.horarioSelecionado = a.hora;
  this.dataEdicao = a.data;

  this.remarcar = true;
}

  fecharRemarcar(){
    this.remarcar = false;
    this.agendamentoSelecionado = null;
    // 🔥 força nova referência
    this.agendamentos = [...this.agendamentos];

      this.nome = '';
      this.tell = '';
      this.tipoSelecionado = '';
      this.horarioSelecionado = '';
  }
  salvarRemarcar() {

  if (!this.nome || !this.tipoSelecionado || !this.horarioSelecionado) {
    alert('Falta informação para Remarcar!');
    return;
  }

  const atualizado: Agendamento = {
    ...this.agendamentoSelecionado,
    nome: this.nome,
    cell: this.tell,
    servico: this.tipoSelecionado,
    hora: this.horarioSelecionado + ':00',
    data: this.dataEdicao
  };

  this.agendamentoService.update(atualizado.id!, atualizado)
    .subscribe({
      next: (res: Agendamento) => {
        // 🔥 Atualiza lista sem refetch
        this.agendamentos = this.agendamentos.map(a =>
          a.id === res.id ? res : a
        );
        this.carregarAgendamentos();
        this.fecharRemarcar();
        this.cd.detectChanges();
        
      },
      error: (err: any) => {
        console.error(err);
        alert(JSON.stringify(err.error));
      }
    });
}

  ngOnInit() {
  console.log('COMPONENTE INICIOU');

  this.gerarHorarios();
      //teste
  if (this.data) {   
    console.log('DATA OK:', this.data);
    this.carregarAgendamentos();
  } else {
    console.log('DATA NULL!!!');
  }
      //teste
}

ngOnChanges(changes: SimpleChanges) {

  if (changes['data']) {

    const dataAnterior = changes['data'].previousValue;
    const dataAtual = changes['data'].currentValue;

    if (dataAtual && dataAtual !== dataAnterior) {
      this.carregarAgendamentos();
    }

  }

}

testarApi() {
  fetch('http://10.0.0.141:8080/AgendaGrilo/agendamentos?data=2026-03-26')
    .then(res => res.json())
    .then(data => console.log('FETCH OK:', data))
    .catch(err => console.error('FETCH ERROR:', err));
}


carregarAgendamentos() {

  if (!this.data) return;
   console.log("DATA ENVIADA:",this.data)
  this.agendamentoService.buscarPorData(this.data)
    .subscribe((res: Agendamento[]) => {

      this.agendamentos = res ?? [];

      // 🔥 força atualizar a tela
      this.cd.detectChanges();

    });

}

 get totalAgendamentosDoDia(): number {
 return this.agendamentos.length;
}
  gerarHorarios() {
    let hora = 8;
    let minuto = 0;

    while (hora < 23 || (hora === 23 && minuto === 0)) {
      const h = hora.toString().padStart(2, '0');
      const m = minuto.toString().padStart(2, '0');
      this.horarios.push(`${h}:${m}`);

      minuto += 30;
      if (minuto === 60) {
        minuto = 0;
        hora++;
      }
    }

}
  //      Lista

  salvarNovo() {
    // validação básica
    if (!this.nome || !this.tipoSelecionado || !this.horarioSelecionado) {
      alert('Falta informação para completar o Agendamento!');
      return;
    }

    // telefone padrão
    if (!this.tell) {
      this.tell = '0000000000';
    }

    // objeto sem id (backend cria)
    const novoAgendamento: Agendamento = {
      nome: this.nome,
      cell: this.tell,
      servico: this.tipoSelecionado,
      hora: this.horarioSelecionado + ':00',
      data: this.data!
    };

    // envia para o backend
    this.agendamentoService.criar(novoAgendamento)
      .subscribe({
        next: (resposta: Agendamento) => {

          // 🔥 adiciona direto na lista (SEM recarregar) refetch.
          this.agendamentos = [...this.agendamentos, resposta]
          .sort((a, b) => a.hora.localeCompare(b.hora)); // 🔥 ordena por hora
          // fechar modal
          this.novoHorario = false;
          // limpar campos
          this.nome = '';
          this.tell = '';
          this.tipoSelecionado = '';
          this.horarioSelecionado = '';

          this.novoHorario = false;
          this.cd.detectChanges(); 
        },

        error: (err: any) => {
        console.error('ERRO COMPLETO:', err);
        console.error('STATUS:', err.status);
        console.error('MENSAGEM:', err.message);
        console.error('BODY:', err.error);
        alert('Erro a tentar Salvar agendamentos');
      }
      });
  }
 

  apagarAgendamento(agendamento: Agendamento) {

    if (!agendamento.id) return;

    this.agendamentoService.deletar(agendamento.id)
      .subscribe({
        next: () => {
          // 🔥 RECARREGA DO BANCO
          this.carregarAgendamentos();
        },
        error: (err: any) => {
          console.error("Erro ao deletar:", err);
        }
      });
  }

 get horariosBloqueados(): hBlock[] {
  return this.block
    .filter(a => a.data === this.data)
    .slice() // cria uma cópia
    .sort((a, b) => a.horario.localeCompare(b.horario));
}

  get totalBlockDoDia() {
    return this.horariosBloqueados.length;
  }

  apagarHorarioBloqueado(horario: string, data: string) {
    this.block = this.block.filter(
      h => !(h.horario === horario && h.data === data)
    );
  }



}





 




  
