import { toast } from "react-toastify";

export class Notification {
  static info(message: string): void {
    Notification.generic("info", message);
  }

  static error(message: string): void {
    Notification.generic("error", message);
  }

  private static generic(type: "info" | "error", message: string): void {
    toast[type](message, {
      position: "top-center",
      theme: "colored",
      delay: 5000,
    })
  }
}
