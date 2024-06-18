import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../constants/api";
import {JwtUtilService} from "./jwt.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<string>;

    constructor(private http: HttpClient, private jwtService: JwtUtilService) {
        this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('currentUser') as string);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): string {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(API_URL.LOGIN, {username, password})
            .pipe(map(response => {
                if (response && response.data.token) {
                    localStorage.setItem('current_user', JSON.stringify(response));
                    localStorage.setItem('access_token', JSON.stringify(response.data.token));
                    // this.currentUserSubject.next(response.token);
                }
                return response;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('current_user');
        localStorage.removeItem('access_token');

        this.currentUserSubject.next(null);
    }

    isLoggedIn() {
        let currentUser = localStorage.getItem('access_token');
        if (currentUser) {
            return !this.jwtService.isTokenExpired(currentUser)
        } else {
            return false;
        }
    }
}