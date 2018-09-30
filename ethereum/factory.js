import web3 from './web3';
import HotOrNotFactory from './build/HotOrNotFactory.json';

const instance = new web3.eth.Contract(
            JSON.parse(HotOrNotFactory.interface),
            '0x80BC68Eb778e05cc6B0adEbeF80142DB18A07044'
        );

export default instance;
