import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatListModule],
  template: `
    <div class="profile-container">
      <h1>Perfil do Usuário</h1>
      
      <mat-card class="profile-card">
        <mat-card-header>
          <div mat-card-avatar class="profile-avatar">
            {{ getInitials() }}
          </div>
          <mat-card-title>{{ userProfile.firstName }} {{ userProfile.lastName }}</mat-card-title>
          <mat-card-subtitle>{{ userProfile.email }}</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <mat-list>
            <mat-list-item>
              <mat-icon matListItemIcon>person</mat-icon>
              <div matListItemTitle>Nome de usuário</div>
              <div matListItemLine>{{ userProfile.username }}</div>
            </mat-list-item>
            
            <mat-list-item>
              <mat-icon matListItemIcon>email</mat-icon>
              <div matListItemTitle>Email</div>
              <div matListItemLine>{{ userProfile.email }}</div>
            </mat-list-item>
            
            <mat-list-item>
              <mat-icon matListItemIcon>verified</mat-icon>
              <div matListItemTitle>Email verificado</div>
              <div matListItemLine>{{ userProfile.emailVerified ? 'Sim' : 'Não' }}</div>
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .profile-card {
      margin-top: 24px;
    }
    
    .profile-avatar {
      background: linear-gradient(45deg, #ff6600, #b71c1c);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    
    h1 {
      background: linear-gradient(45deg, #ff6600, #b71c1c);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 24px;
    }
  `]
})
export class ProfileComponent implements OnInit {
  userProfile: any = {};

  constructor(private keycloakService: KeycloakService) {}

  async ngOnInit() {
    if (this.keycloakService.isLoggedIn()) {
      this.userProfile = await this.keycloakService.loadUserProfile();
    }
  }

  getInitials(): string {
    const firstName = this.userProfile.firstName || '';
    const lastName = this.userProfile.lastName || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }
}