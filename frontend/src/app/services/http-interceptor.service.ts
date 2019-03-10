import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req, next) {
    const authService = this.injector.get(AuthService);
    const token = authService.getJwtToken();

    if (token) {
      req = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token}`)
      });
    }

    if (!req.headers.has("Content-Type")) {
      req = req.clone({
        headers: req.headers.set("Content-Type", "application/json")
      });
    }

    req = req.clone({
      headers: req.headers.set("Accept", "application/json")
    });

    return next.handle(req);
  }
}
