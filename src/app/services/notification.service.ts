import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  verificarPermissao(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!('Notification' in window)) {
        reject('O navegador não suporta notificações.');
      } else if (Notification.permission === 'granted') {
        resolve('granted');
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission()
          .then(permission => {
            resolve(permission);
          })
          .catch(error => {
            reject(error);
          });
      } else {
        resolve('denied');
      }
    });
  }
}
