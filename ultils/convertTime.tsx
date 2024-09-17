import moment from 'moment';

function convertTimeFireStore(timestamp) {
  //extract the seconds and nanos values from your Firestore timestamp object
  const date = timestamp?.toDate();
  //combine the seconds and nanos values into a single timestamp in milliseconds
  //use Moment.js to convert the timestamp to a date
  return moment(date).format('HH:mm:ss');
}

export default convertTimeFireStore;
