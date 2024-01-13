import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Order {
  name: string; 
  lieu: string;
  date: Date; // Change from 'date' to 'Date' for datetime
  amount: number;
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private _orders = new BehaviorSubject<Order[]>([]);
  ordersArray: Order[] = [];

  get orders() {
    return this._orders.asObservable();
  }

  constructor(
    private firestore: Firestore,
  ) { }

  async getOrders() {
    try {
      const dataRef: any = collection(this.firestore, 'orders');
      const querySnapshot = await getDocs(dataRef);
      const orders: Order[] = querySnapshot.docs.map((doc) => {
        let item: any = doc.data();
        item.id = doc.id;

        // Assuming 'date' is the timestamp field
        if (item.date instanceof Timestamp) {
          // Extract only the date portion
          item.date = item.date.toDate().toISOString().split('T')[0];
        }

        return item as Order;
      });

      // console.log('orders: ', orders);
      this._orders.next(orders);
      return orders;
    } catch (e) {
      throw e;
    }
  }
  

  // getRealtimeNotes(): Observable<Order[]> {
  //   return new Observable((observer) => {
  //     const dataRef = collection(this.firestore, 'orders');
  //     const unsubscribe = onSnapshot(dataRef, (snapshot) => {
  //       snapshot.docChanges().forEach((change) => {
  //         let order: any = change.doc.data();
  //         order.id = change.doc.id;

  //         if(this.ordersArray?.length == 0) {
  //           this.notesArray.push(order);
  //         } else {
  //           if (change.type === "added") {
  //               console.log("New city: ", order);
  //               this.notesArray.push(order);
  //           }
  //           if (change.type === "modified") {
  //               console.log("Modified city: ", order);
  //               const index = this.ordersArray.findIndex(x => x.id == order.id);
  //               this.notesArray[index] = order;
  //           }
  //           if (change.type === "removed") {
  //               console.log("Removed city: ", order);
  //               this.notesArray = this.notesArray.filter(x => x.id != order.id);
  //           }
  //         }
  //       });
  //       observer.next(this.ordersArray);
  //     });

  //     // Unsubscribe from the Firestore listener when the Observable is unsubscribed.
  //     return () => unsubscribe();
  //   });
  // }

  async getNoteById(id: string) {
    try {
      const dataRef: any = doc(this.firestore, `orders/${id}`);
      const docSnap = await getDoc(dataRef);
      if (docSnap.exists()) {
        // return docSnap.data() as Note;
        let item: any = docSnap.data();
        item.id = docSnap.id;
        return {...item} as Order;
      } else {
        console.log("No such document!");
        throw("No such document!");
      }
    } catch(e) {
      throw(e);
    }
  }

  // async getRealtimeNoteById(id: string) {
  //   return new Observable((observer) => {
  //     const dataRef: any = doc(this.firestore, `orders/${id}`);
  //     const unsub = onSnapshot(dataRef, (doc: any) => {
  //       let order: any = doc.data();
  //       order.id = doc.id;
  //       console.log("Current data: ", order);
  //       observer.next(order);
  //     });
  //     return () => unsub();
  //   });
  // }

  // async updateNote(id: string, data: Order) {
  //   try {
  //     const dataRef: any = doc(this.firestore, `orders/${id}`);
  //     await updateDoc(dataRef, data);
      // let currentNotes = this._notes.value;
      // const index = currentNotes.findIndex(x => x.id == id);
      // const latestData = {id, ...data};
      // currentNotes[index] = latestData;
      // this._notes.next(currentNotes);
      // return latestData;
  //   } catch(e) {
  //     throw(e);
  //   }
  // }

  // async deleteNote(id: string) {
  //   try {
  //     const dataRef: any = doc(this.firestore, `orders/${id}`);
  //     await deleteDoc(dataRef);
      // let currentNotes = this._notes.value;
      // currentNotes = currentNotes.filter(x => x.id != id);
      // this._notes.next(currentNotes);
  //   } catch(e) {
  //     throw(e);
  //   }
  // }


}
