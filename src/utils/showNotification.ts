import { Notification } from 'electron';

export default function showNotification(title: string, body: string) {
  const notification = {
    title,
    body,
    subtitle: title,
    silent: true,
  };
  const myNotification = new Notification(notification);
  myNotification.show();
}
