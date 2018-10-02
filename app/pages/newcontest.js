import React from 'react';
import Link from 'next/link';
import Layout from '../components/wrapper';
import { Grid, Header, Form, Message } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';

class NewContest extends React.Component {

    state = {
        url: 'https://i.telegraph.co.uk/multimedia/archive/03150/thatcher-bbc_3150455b.jpg',
        minAmount: '1',
        maxVoters: 10,
        complete: false,
        sending: false
    }

    onSubmit = async (event) => {
        event.preventDefault()
        this.setState({sending: true});
        const accounts = await web3.eth.getAccounts();
        await factory.methods.createHotOrNot(this.state.minAmount, this.state.maxVoters, this.state.url)
                .send({from: accounts[0]});

        this.setState({complete:true, sending: false});
    }

    render() {
        return (
            <Layout title='Create a new contest'>
                <div style={{display: ! this.state.complete ? 'none' : 'inline'}}>
                    <Message positive>
                        <Message.Header>Contest created</Message.Header>
                        <p>
                            Return <Link href='/'><a>Home</a></Link>
                        </p>
                    </Message>
                </div>
                <div style={{display: ! this.state.complete ? 'inline' : 'none'}}>
                <Grid>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Header as='h1' size='huge'>Create a new Crypto Hot or Not Contest</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Form onSubmit={this.onSubmit} >
                                <Form.Group>
                                    <Form.Field>
                                        <label>Minimum vote amount (in ether)</label>
                                        <input
                                            type='number'
                                            value={this.state.minAmount}
                                            onChange={event => this.setState({ value: event.target.value })} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Number of voters to close</label>
                                        <input type='number'
                                            value={this.state.maxVoters}
                                            onChange={event => this.setState({ value: event.target.value })} />
                                    </Form.Field>
                                </Form.Group>
                                <Form.Field>
                                    <label />
                                    <input value={this.state.url}
                                        onChange={event => this.setState({ url: event.target.value })}
                                        type='url' />
                                </Form.Field>
                                <Form.Button content={this.state.sending ? 'Wait' : 'Submit'} />
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </div>
            </Layout>
        );
    }
}

export default NewContest;
