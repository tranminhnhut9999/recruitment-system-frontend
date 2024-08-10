import {HttpHeaders} from "@angular/common/http";

export function getHttpRestOption() {
  const token = localStorage.getItem("access_token");
  if (token) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token!.replaceAll('"', '')}` : ""
      })
    }
  } else {
    return {
      headers: new HttpHeaders({})
    }
  }
}

export function getHttpMultiPartOption() {
  const token = localStorage.getItem("access_token");
  if (token) {
    return {
      headers: new HttpHeaders({
        'Authorization': token ? `Bearer ${token!.replaceAll('"', '')}` : ""
      })
    }
  } else {
    return {
      headers: new HttpHeaders({})
    }
  }
}
