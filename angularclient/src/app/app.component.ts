import { Component } from '@angular/core';
import { Http } from '@angular/http';

// Import rxjs map operator
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
   // Link to our api, pointing to localhost
  API = 'http://192.168.43.158:3000';

  // Testing?
  // Declare empty list of people
  people: any[] = [];

  constructor(private http: Http) {}

  // Angular 4 Life Cycle event when component has been initialized
  ngOnInit() {
    this.getAllPeople();
  }

  // Add one person to the API
  addPerson(name, age) {
    this.http.post(`${this.API}/users`, {name, age})
      .map(res => res.json())
      .subscribe(() => {
        this.getAllPeople();
      });
  }

  addUser(name, username, password) {
    this.http.post(`${this.API}/usersv`, {name, username, password})
    .map(res => res.json())
    .subscribe(() => {
      this.getAllPeople();
    });
  }

  // Get all users from the API
  getAllPeople() {
    this.http.get(`${this.API}/users`)
      .map(res => res.json())
      .subscribe(people => {
        console.log(people);
        this.people = people;
      });
  }
}
