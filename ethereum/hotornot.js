import web3 from './web3';
import HotOrNot from './build/HotOrNot.json';

export default (address) => {
    return new web3.eth.Contract(JSON.parse(HotOrNot.interface), address);
};
