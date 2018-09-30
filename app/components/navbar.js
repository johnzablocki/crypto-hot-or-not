import { Menu, Container } from 'semantic-ui-react';
import Link from 'next/link';

class MainNav extends React.Component {

    state = { activeItem: 'home' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {

        const { activeItem } = this.state;

        return (
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                        >
                        <Link href="/">
                            <h2>Crytpo Hot Or Not</h2>
                        </Link>
                    </Menu.Item>
                    <Menu.Item name='newcontest'
                            header as='a'
                            active={activeItem === 'newcontest'}
                            onClick={this.handleItemClick}>
                        <Link href="/newcontest">
                            <span>New Contest</span>
                        </Link>
                    </Menu.Item>
                </Container>
            </Menu>
        )
    }
};

export default MainNav;
