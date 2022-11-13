import { Component, OnInit } from '@angular/core';
import { Tickets } from 'src/app/models/tickets.model';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-get-tickets',
  templateUrl: './get-tickets.component.html',
  styleUrls: ['./get-tickets.component.scss']
})
export class GetTicketsComponent implements OnInit {
  tickets?: Tickets[];
  constructor(private ticketService: TicketsService) { }

  ngOnInit(): void {
    this.retrieveTickets();
  }

  retrieveTickets(): void {
    this.ticketService.getAll()
      .subscribe(
        data => {
          this.tickets = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
