import Layout from '../components/wrapper';
import { Container, Grid, Header, Card, Form, Button } from 'semantic-ui-react';
import { withRouter } from 'next/router';
import HotOrNot from '../../ethereum/hotornot';
import web3 from '../../ethereum/web3';

class Contest extends React.Component {

    state = { amount: '1', done: false };

    static async getInitialProps(props) {
        const contract = HotOrNot(props.query.a);
        const hotOrNot = await contract.methods.getDetails().call();
        return { hotOrNot: hotOrNot, contract: contract }
    }

    vote = async (val) => {
        const accounts = await web3.eth.getAccounts();
        if (val === 'y') {
            await this.props.contract.methods.voteYes().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.amount, 'ether')
            });
        } else {
            await this.props.contract.methods.voteNo().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.amount, 'ether')
            });
        }
        this.setState({ done: true })
    }

    render() {
        return (
            <Layout title='Crypto Hot or Not Contest'>
                <Container style={{marginTop:'70px'}}>
                    <Grid>
                        <Grid.Row centered columns={1}>
                            <Grid.Column>
                                <Header as='h1' size='huge'>Vote on this Contest</Header>
                                <Card fluid>
                                    <Card.Header>
                                        <h2>{this.props.contract.options.address}</h2>
                                    </Card.Header>
                                    <Card.Meta>
                                        <h2>
                                            Yes: {web3.utils.fromWei(this.props.hotOrNot[0], 'ether')},
                                            No: {web3.utils.fromWei(this.props.hotOrNot[1], 'ether')}
                                        </h2>
                                    </Card.Meta>
                                    <Card.Description>
                                        <img src={this.props.hotOrNot[2]} />
                                    </Card.Description>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                            <div style={{display: this.state.done ? 'none' : 'inline'}}>
                                <Form onSubmit={() => false}>
                                    <Form.Group>
                                        <Form.Field>
                                            <label>Amount</label>
                                            <input type='number'
                                                value={this.state.amount}
                                                onChange={event => this.setState({ amount: event.target.value })} />
                                        </Form.Field>
                                        <Button color='green' onClick={() => this.vote('y')}>
                                            Vote Yes
                                        </Button>
                                        <Button color='red' onClick={() => this.vote('n')}>
                                            Vote No
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Layout>
        );
    }
}

export default withRouter(Contest);
