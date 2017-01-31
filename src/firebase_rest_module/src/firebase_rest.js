import * as firebase from 'firebase';
import _             from 'lodash';

const GET = 'get';
const POST = 'post';
const PUT = 'put';
const DEL = 'del';

export default class FirebaseREST {
  constructor(config){
    this.app = firebase.initializeApp(config);
    this.database = firebase.database();
    this.models = {};
    this.pluralMap = {};
    this.routes = {};
  }
  //TODO error handling
  model(modelShape){
    this.models[modelShape.__NAME__] = modelShape;
    const pluralName = _.last(modelShape.__NAME__) === 's' ?
      `${_.snakeCase(modelShape.__NAME__)}es` :
      `${_.snakeCase(modelShape.__NAME__)}s`;
    this.pluralMap[pluralName] = modelShape.__NAME__;
  }

  buildRoutes(){
    _.forEach(this.pluralMap, (val, key) => {
      this.routes[`${key}`] = [GET, POST];
      this.routes[`${key}/:id`] = [GET, PUT, DEL];
    });
  }

  buildApi(){
    this.buildRoutes();
    const parent = this;
    const api = class {

      constructor(){
        this.routes = parent.routes;
        this.app = parent.app;
        this.models = parent.models;
        this.pluralMap = parent.pluralMap;
        this.database = parent.database;
      }

      get(url, includeRelationShips){
        const database = this.database;
        return {
          end(callback){
            database.ref(`${url}`).once('value').then((snapshot) => {
              callback(snapshot.val());
            });
          }
        }
      }

      post(url){
        const database = this.database;
        return {
          send: (body)=>{
            return {
              end: (callback)=>{
                const newPostKey = database.ref().child(url).push().key;
                database.ref(`${url}/${newPostKey}`).set({...body, id: newPostKey});
                callback({...body, id: newPostKey});
              }
            }
          }
        }
      }

      put(url){}
      del(url){}
      live(url, onEvent){}
      validateUrl(url){}
      validateBody(){}
    }
    return new api();
  }

}
