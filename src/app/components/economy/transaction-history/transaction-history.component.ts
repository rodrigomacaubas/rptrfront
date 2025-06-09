import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  description: string;
  amount: number;
  currency: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatChipsModule],
  template: `
    <div class="history-container">
      <h1>Extrato da Conta</h1>
      
      <mat-card class="history-card">
        <mat-card-header>
          <mat-icon mat-card-avatar>receipt</mat-icon>
          <mat-card-title>Histórico de Transações</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <table mat-table [dataSource]="transactions" class="transaction-table">
            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef>Tipo</th>
              <td mat-cell *matCellDef="let transaction">
                <mat-icon [class]="'type-icon ' + transaction.type">
                  {{ getTypeIcon(transaction.type) }}
                </mat-icon>
              </td>
            </ng-container>

            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef>Descrição</th>
              <td mat-cell *matCellDef="let transaction">{{ transaction.description }}</td>
            </ng-container>

            <ng-container matColumnDef="amount">
              <th mat-header-cell *matHeaderCellDef>Valor</th>
              <td mat-cell *matCellDef="let transaction">
                <span [class]="'amount ' + transaction.type">
                  {{ transaction.type === 'expense' ? '-' : '+' }}{{ transaction.amount }}
                  <mat-icon class="currency-icon">{{ getCurrencyIcon(transaction.currency) }}</mat-icon>
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Data</th>
              <td mat-cell *matCellDef="let transaction">{{ transaction.date | date:'short' }}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let transaction">
                <mat-chip [class]="'status-chip ' + transaction.status">
                  {{ getStatusLabel(transaction.status) }}
                </mat-chip>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .history-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .history-card {
      margin-top: 24px;
    }
    
    .transaction-table {
      width: 100%;
    }
    
    .type-icon {
      font-size: 20px;
    }
    
    .type-icon.income {
      color: #4caf50;
    }
    
    .type-icon.expense {
      color: #f44336;
    }
    
    .type-icon.transfer {
      color: #2196f3;
    }
    
    .amount {
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .amount.income {
      color: #4caf50;
    }
    
    .amount.expense {
      color: #f44336;
    }
    
    .amount.transfer {
      color: #2196f3;
    }
    
    .currency-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }
    
    .status-chip {
      font-size: 12px;
    }
    
    .status-chip.completed {
      background: #e8f5e8;
      color: #2e7d32;
    }
    
    .status-chip.pending {
      background: #fff3e0;
      color: #f57c00;
    }
    
    .status-chip.failed {
      background: #ffebee;
      color: #c62828;
    }
    
    h1 {
      background: linear-gradient(45deg, #ff6600, #b71c1c);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `]
})
export class TransactionHistoryComponent {
  displayedColumns: string[] = ['type', 'description', 'amount', 'date', 'status'];
  
  transactions: Transaction[] = [
    {
      id: '1',
      type: 'income',
      description: 'Recompensa de slot',
      amount: 500,
      currency: 'np',
      date: new Date('2025-06-08T10:30:00'),
      status: 'completed'
    },
    {
      id: '2',
      type: 'expense',
      description: 'Compra de skin',
      amount: 300,
      currency: 'np',
      date: new Date('2025-06-07T15:45:00'),
      status: 'completed'
    },
    {
      id: '3',
      type: 'transfer',
      description: 'Transferência para João',
      amount: 100,
      currency: 'vidas',
      date: new Date('2025-06-06T09:15:00'),
      status: 'pending'
    }
  ];

  getTypeIcon(type: string): string {
    const icons = {
      'income': 'trending_up',
      'expense': 'trending_down',
      'transfer': 'swap_horiz'
    };
    return icons[type as keyof typeof icons] || 'help';
  }

  getCurrencyIcon(currency: string): string {
    const icons = {
      'np': 'toll',
      'vidas': 'favorite',
      'dna': 'science'
    };
    return icons[currency as keyof typeof icons] || 'help';
  }

  getStatusLabel(status: string): string {
    const labels = {
      'completed': 'Concluído',
      'pending': 'Pendente',
      'failed': 'Falhou'
    };
    return labels[status as keyof typeof labels] || status;
  }
}