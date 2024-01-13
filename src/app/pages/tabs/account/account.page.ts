import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { IonModal, IonicModule } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Subscription } from 'rxjs';
import { User, UsersService } from 'src/app/services/users/users.service';


@Component({
  selector: 'app-orders',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AccountPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  model: any = {};
  users: User[] = [];
  isOpen: boolean = false;
  userSub: Subscription;
  options: any = {};

  constructor(
    private user: UsersService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.options = [
      { id: 1, name: 'Saved Addresses', img: 'address.png' },
      { id: 2, name: 'Jokar Pass', img: 'pass.png' },
      { id: 3, name: 'Refer a friend', icon: 'share-social', color: 'primary' },
      { id: 4, name: 'Support', img: 'life-guard.png' },
      { id: 5, name: 'About', icon: 'information' },
    ];

     this.user.getusers();
     this.userSub = this.user.users.subscribe({
       next: (users) => {
         this.users = users;
       },
       error: (e) => {
         console.log(e);
      }
     });

    }

    ngOnDestroy(): void {
      // Unsubscribe to avoid memory leaks
      if (this.userSub) {
        this.userSub.unsubscribe();
      }
    }
  
    // Example method to trigger the logout
    async logout() {
      try {
        await this.user.logout();
        this.router.navigateByUrl('/intro', {replaceUrl: true})
      } catch (e) {
        console.error('Logout failed:', e);
      }
    }
  }