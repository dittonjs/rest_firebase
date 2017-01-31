import FirebaseREST from '../firebase_rest_module';
import config from '../secrets';
const restAPI = new FirebaseREST(config);
restAPI.model({
  __NAME__: 'User',
  name: 'string',
  email: 'string',
  hasMany: 'Post',
});

restAPI.model({
  __NAME__: 'Post',
  message: 'string',
  userId: 'number',
  belongsTo: 'User',
})

export default restAPI.buildApi();
