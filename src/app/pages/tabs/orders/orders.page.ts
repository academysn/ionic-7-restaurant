import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonModal, IonicModule } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Subscription } from 'rxjs';
import { Order, OrdersService } from 'src/app/services/orders/orders.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OrdersPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  orderSub!: Subscription;
  model: any = {};
  orders: Order[] = [];
  isOpen: boolean = false;
  orders2: any[] = [];

  constructor(private order: OrdersService) { }

  ngOnInit(): void {
    this.orders2 = [
       { id: 1, name: "Hamburger", lieu: "Baobabs", date: "05/01/23", amount: "320.50" },
       { id: 2, name: "Pizza", lieu: "Baobabs", date: "05/01/23", amount: "320.50" },
       { id: 3, name: "Tacos", lieu: "Baobabs", date: "05/01/23", amount: "320.50" },
       { id: 4, name: "Double Burger", lieu: "Baobabs", date: "05/01/23", amount: "320.50" },
       { id: 5, name: "Sardine", lieu: "Baobabs", date: "05/01/23", amount: "320.50" },
     ];

     this.order.getOrders();
     this.orderSub = this.order.orders.subscribe({
       next: (orders) => {
         this.orders = orders;
       },
       error: (e) => {
         console.log(e);
      }
     });
     
    // this.orderSub = this.order.getRealtimeNotes().subscribe({
    //   next: (orders) => {
    //     this.orders = orders;
    //   },
    //   error: (e) => {
    //     console.log(e);
    //   }
    // });

  // onWillDismiss(event: Event) {
  //   const ev = event as CustomEvent<OverlayEventDetail<string>>;
  //   this.model = {};
  //   this.isOpen = false;
  // }

  // cancel() {
  //   this.modal.dismiss(null, 'cancel');
  // }

  // async save(form: NgForm) {
  //   try {
  //     if(!form.valid) {
  //       // alert
  //       return;
  //     }
  //     console.log(form.value);
  //     if(this.model?.id) await this.order.updateNote(this.model.id, form.value);
  //     else await this.order.addNote(form.value);
  //     this.modal.dismiss();
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }

  // async deleteNote(order: Order) {
  //   try {
  //     await this.order.deleteNote(order?.id!);
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }

  // async editNote(order: Order) {
  //   try {
  //     this.isOpen = true;
  //     this.model = { ...order };
  //     // const data: Note = await this.note.getNoteById(note?.id!);
  //     // console.log('data: ', data);
  //     // this.model = { ...data };
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }

  // ngOnDestroy(): void {
  //     if(this.orderSub) this.orderSub.unsubscribe();
  // }
}
}
