import type { ConsultingRequest } from '../types';

export const requests: ConsultingRequest[] = [
  {
    id: 'req-001',
    clientId: 'mueller-partner',
    title: 'KI-Strategie Beratung',
    description: 'Wir möchten eine Beratung zur Integration von KI in unsere Finanzprozesse.',
    requestedBy: 'Dr. Klaus Müller',
    submittedAt: '2024-06-10',
    status: 'open',
    priority: 'high',
  },
  {
    id: 'req-002',
    clientId: 'techvision-ag',
    title: 'Vertragsverlängerung Cloud Review',
    description: 'Anfrage zur Verlängerung des bestehenden Cloud Review Projekts um 3 Monate.',
    requestedBy: 'Sarah Weber',
    submittedAt: '2024-06-05',
    status: 'in-progress',
    priority: 'medium',
  },
  {
    id: 'req-003',
    clientId: 'logistik-nord',
    title: 'Workshop: Agile Methoden',
    description: 'Ganztägiger Workshop für das Führungsteam zu agilen Arbeitsmethoden.',
    requestedBy: 'Thomas Becker',
    submittedAt: '2024-05-20',
    status: 'resolved',
    priority: 'low',
  },
  {
    id: 'req-004',
    clientId: 'datastream',
    title: 'Notfall-Consulting: Datenleck',
    description: 'Dringende Unterstützung nach entdecktem Sicherheitsvorfall.',
    requestedBy: 'Markus Hoffmann',
    submittedAt: '2024-06-12',
    status: 'open',
    priority: 'high',
  },
];
