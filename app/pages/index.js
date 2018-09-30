import Layout from '../components/wrapper';
import { Container, Grid, Header } from 'semantic-ui-react';
import Contests from '../components/contests';
import factory from '../../ethereum/factory';

class Index extends React.Component {

    static async getInitialProps({ req }) {
        const deployedHotOrNots = await factory.methods.getDeployedHotOrNots().call();
        return { contests: deployedHotOrNots }
    }

    render() {
        return (
            <Layout title='Welcome to Crypto Hot or Not'>
                <Grid>
                    <Grid.Row centered columns={1}>
                        <Grid.Column>
                            <Header as='h1' size='huge'>Welcome to Crypto Hot or Not</Header>
                            <p>
                                Welcome to Crytpo Hot or Not - <em>the</em> Decentralized Application
                                where users earn ether for being voted hot.
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Contests items={this.props.contests} />
            </Layout>
        );
    }
}

export default Index;

