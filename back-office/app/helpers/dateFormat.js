import { helper } from '@ember/component/helper';
import moment from 'moment';

export function dateFormat(date) {
  return moment(date[0]).format('DD-MM-YYYY');
}

export default helper(dateFormat);


