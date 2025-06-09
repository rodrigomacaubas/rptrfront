import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { KeycloakService } from 'keycloak-angular';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  disabled?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatTooltipModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'raptorfrontend';
  isMinimized = signal(false);
  userProfile: any = {};
  
  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'home',
      children: [
        { label: 'Perfil', icon: 'person', route: '/profile' }
      ]
    },
    {
      label: 'Sistema de Slots',
      icon: 'casino',
      children: [
        { label: 'Slots Legacy', icon: 'gamepad', route: '/slotslegacy' },
        { label: 'Slots Evrima', icon: 'games', route: '/slotsevrima', disabled: true }
      ]
    },
    {
      label: 'Economia',
      icon: 'attach_money',
      children: [
        { label: 'Transferir', icon: 'send', route: '/transfer' },
        { label: 'Loja Legacy', icon: 'store', route: '/storelegacy' },
        { label: 'Loja Evrima', icon: 'storefront', route: '/storeevrima', disabled: true },
        { label: 'Extrato da Conta', icon: 'receipt', route: '/transactionhistory' }
      ]
    }
  ];

  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  async ngOnInit() {
    if (this.keycloakService.isLoggedIn()) {
      this.userProfile = await this.keycloakService.loadUserProfile();
    }
    this.router.navigate(['/home']);
  }

  toggleSidebar() {
    this.isMinimized.update(value => !value);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  getInitials(): string {
    const firstName = this.userProfile.firstName || '';
    const lastName = this.userProfile.lastName || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }

  logout() {
    this.keycloakService.logout();
  }
}