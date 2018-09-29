const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledHotOrNotFactory = require('../ethereum/build/HotOrNotFactory.json');
const compiledHotOrNot = require('../ethereum/build/HotOrNot.json');
const imageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mona_Lisa-restored.jpg/1200px-Mona_Lisa-restored.jpg';

let accounts;
let hotOrNot;
let factory;
let hotOrNotAddress;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledHotOrNotFactory.interface))
                    .deploy({
                        data: compiledHotOrNotFactory.bytecode
                    })
                    .send({ from: accounts[0], gas: '1000000' });

    await factory.methods.createHotOrNot('100', '2', imageURL).send({
        from: accounts[0],
        gas: '1000000'
    });

    [hotOrNotAddress] = await factory.methods.getDeployedHotOrNots().call();
    hotOrNot = await new web3.eth.Contract(
        JSON.parse(compiledHotOrNot.interface),
        hotOrNotAddress
    );

});

describe('Hot or Not', async () => {
    it('deploys successfully', () => {
        assert.ok(hotOrNot.options.address);
        assert(hotOrNot.options.address.indexOf('0x') == 0);
    });

    it('sets the image url', async () => {
        const result = await hotOrNot.methods.imageURL().call();
        assert.equal(result, imageURL);
    });

    it('votes yes', async () => {
        await hotOrNot.methods.voteYes().send({
            from: accounts[0],
            value: '101'
        });

        const result = await hotOrNot.methods.yesAmount().call();
        assert.equal(result, '101');
    });

    it('votes no', async () => {
        await hotOrNot.methods.voteNo().send({
            from: accounts[0],
            value: '201'
        });

        const result = await hotOrNot.methods.noAmount().call();
        assert.equal(result, '201');
    });

    it('requires minimum', async () => {
        let e;
        try {
            await hotOrNot.methods.voteYes().send({
                from: accounts[0],
                value: '88'
            });

            await hotOrNot.methods.voteNo().send({
                from: accounts[0],
                value: '88'
            });
        } catch(err) {
            e = err;
        }
        assert(e);
    });

    it('has a balance', async () => {

    });

    it('closes on max votes', async () => {
        await hotOrNot.methods.voteYes().send({
            from: accounts[0],
            value: '101'
        });

        await hotOrNot.methods.voteYes().send({
            from: accounts[0],
            value: '101'
        });

        const isClosed = await hotOrNot.methods.isClosed().call();
        assert(isClosed);
    });

    it('stays open on less than max votes', async () => {
        await hotOrNot.methods.voteYes().send({
            from: accounts[0],
            value: '101'
        });

        const isClosed = await hotOrNot.methods.isClosed().call();
        assert(!isClosed);
    });

    it('does not allow votes when closed', async () => {
        let e;
        try {
            await hotOrNot.methods.voteYes().send({
                from: accounts[0],
                value: '101'
            });

            await hotOrNot.methods.voteYes().send({
                from: accounts[0],
                value: '101'
            });

            const isClosed = await hotOrNot.methods.isClosed().call();
            assert(isClosed);

            await hotOrNot.methods.voteYes().send({
                from: accounts[0],
                value: '101'
            });

        } catch(err) {
            e = err;
        }
        assert.ok(e);
    });

    it('transfers a balance', async () => {

        const balanceBefore = await web3.eth.getBalance(accounts[0]);

        await hotOrNot.methods.voteYes().send({
            from: accounts[1],
            value: '101'
        });

        await hotOrNot.methods.voteYes().send({
            from: accounts[2],
            value: '101'
        });

        const balanceAfter = await web3.eth.getBalance(accounts[0]);
        assert(balanceBefore < balanceAfter);
    });
});
