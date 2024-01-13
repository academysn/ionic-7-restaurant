import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, where } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface User {
  uid?: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _users = new BehaviorSubject<User[]>([]);
  usersArray: User[] = [];

  get users() {
    return this._users.asObservable();
  }

  constructor(
    private firestore: Firestore,
    private authService: AuthService // Inject AuthService
  ) { }

  async getusers() {
    try {
      const uid = this.authService.getCurrentUserId();

      if (!uid) {
        throw new Error('User is not authenticated.');
      }

      const dataRef = collection(this.firestore, 'users');
      const querySnapshot = await getDocs(dataRef);

      const users = querySnapshot.docs.map((doc) => {
        let item: any = doc.data();
        item.id = doc.id;
        return item as User;
      });

      // Filter users based on uid
      const filteredUsers = users.filter(user => user.uid === uid);

      this._users.next(filteredUsers);

      // console.log('users: ', filteredUsers);

    } catch (e) {
      throw e;
    }
  }

  async logout() {
    try {
      // Call the logout method from AuthService
      await this.authService.logout();
    } catch (e) {
      // Handle the exception if needed
      console.error('Logout failed:', e);
    }
  }


  


  // async getNoteById(id: string) {
  //   try {
  //     const dataRef: any = doc(this.firestore, `orders/${id}`);
  //     const docSnap = await getDoc(dataRef);
  //     if (docSnap.exists()) {
  //       // return docSnap.data() as Note;
  //       let item: any = docSnap.data();
  //       item.id = docSnap.id;
  //       return {...item} as Order;
  //     } else {
  //       console.log("No such document!");
  //       throw("No such document!");
  //     }
  //   } catch(e) {
  //     throw(e);
  //   }
  // }

}
