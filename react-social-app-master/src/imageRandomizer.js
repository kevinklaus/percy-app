import romy from '../src/img/contacts/romy.jpg';
import mark from '../src/img/contacts/mark.jpg';
import kev from '../src/img/contacts/kev.jpg';
import guelcan from '../src/img/contacts/guelcan.jpg';
import kat from '../src/img/contacts/kat.jpg';
import pavel from '../src/img/contacts/pavel.jpg';

let imageSrc = null;
const images = [romy, mark, kev, guelcan, kat, pavel];
const index = Math.floor(Math.random() * (images.length - 1) + 1) ;

imageSrc = images[index];

export default imageSrc;

