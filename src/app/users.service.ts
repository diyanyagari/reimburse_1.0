import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import gql from 'graphql-tag';
// import { User } from './user.model';
import { User, Query } from './types';

@Injectable()
export class UsersService {


  constructor(private apollo: Apollo) { }

  getUser(): Observable<User[]> {
  	return this.apollo.watchQuery<Query>({
  		query: gql `
  		query{
  			allUsers {
  				name
  				email
          role
  			}
  		}
  		`
  	})
  	.valueChanges
  	.pipe(
  		map(result => result.data.allUsers)
  	)
  }

  // newUser(myName, myEmail, myPassword, myRole) {
  //   console.log("AWWWWW"),
  //   this.apollo.mutate({
  //     mutation: gql `
  //       mutation{
  //         newUser(input: {
  //           name: "myName"
  //           email: myEmail
  //           password: myPassword
  //           role: myRole
  //         })
  //       }
  //     `, variables: {
  //       name: myName
  //     },
  //   })
  // }

  newUser(myName, myEmail, myPassword, myRole) {
    console.log("AWWWWW"),
    this.apollo.mutate({
      mutation: gql `
        mutation newUser($myName: String, $myEmail: String, $myPassword: String, $myRole: String){
          newUser(input: {
            name: $myName
            email: $myEmail
            password: $myPassword
            role: $myRole
          }) {
            id
          }
        }
      `,variables: {
        myName: myName,
        myEmail: myEmail,
        myPassword: myPassword,
        myRole: myRole
      },
    }).subscribe(({ data }) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
