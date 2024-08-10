import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {getHttpMultiPartOption, getHttpRestOption} from "../shared/utils/http.util";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("REQUEST HEADERS:", req.headers);

    // Check if the request is a multipart request
    const isFormData = req.body instanceof FormData;
    let authReq;
    if (isFormData) {
      console.log("Request body is FormData");
      authReq = req.clone(getHttpMultiPartOption());
    } else {
      console.log("Request body is not FormData");
      authReq = req.clone(getHttpRestOption());
    }
    // Get the auth token from the service.
    return next.handle(authReq);
  }
}
