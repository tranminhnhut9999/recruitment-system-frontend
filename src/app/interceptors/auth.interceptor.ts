import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {getHttpRestOption} from "../shared/utils/http.util";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
      const authReq = req.clone(getHttpRestOption());
      return next.handle(authReq);
  }
}
