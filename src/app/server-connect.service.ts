import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectService {

  constructor(private http: HttpClient) { }
  getMessage() {
    return this.http.get(`http://ec2-3-135-190-176.us-east-2.compute.amazonaws.com`);
  }
}
