import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  closeResult = '';
  ticketForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    acceptance_criteria: new FormControl(''),
    priority: new FormControl(''),
  });
  constructor(private modalService: NgbModal, private ticketService: TicketsService) { }

  ngOnInit(): void {
  }

  open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
        console.log(this.ticketForm.value)
        this.ticketService.create(this.ticketForm.value).subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          });
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  onSubmit() {
    console.log(this.ticketForm.value)
  }

}
