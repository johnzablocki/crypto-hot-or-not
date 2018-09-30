import MainNav from './navbar';
import Head from 'next/head';
import { Container } from 'semantic-ui-react';


export default ({children, title = 'Crypto Hot or Not'}) => (
    <div>
        <Head>
            <title>{title}</title>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
        </Head>
        <header>
            <MainNav />
        </header>
        <Container style={{marginTop:'70px'}}>
            {children}
        </Container>
    </div>
);
