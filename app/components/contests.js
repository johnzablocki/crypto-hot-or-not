import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import Link from 'next/link';
import factory from '../../ethereum/factory';

export default class Contests extends React.Component {

    constructor(props) {
        super(props);
    }


    renderHotOrNots() {
        const items = this.props.items.map((address) => {
            return {
                header: address,
                fluid: true,
                description: (
                    <Link href={`/contest?a=${address}`} as={`/contest/${address}`}>
                        <Button basic color='green' style={{margin:'10px'}}>
                            <p>Vote</p>
                        </Button>
                    </Link>
                )
            }
        });

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <div>
                {this.renderHotOrNots()}
            </div>
        );
    }
}
