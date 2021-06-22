/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */
import { useContext } from 'react';
import { LeftoverContext } from '../LeftoverContext';
import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import video from '../assets/dinner720.mov';
import video480 from '../assets/dinner480.mov';
import leftoversjpg from '../assets/leftovers.jpg';
import fatboy from '../assets/fatbobyslim.png';
import React, { Component, useEffect, useCallback } from 'react';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react';
import logo from '../assets/3dwhite.svg';
import { auto } from '@popperjs/core';

const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 768,
        computer: 1024,
    },
});

const HomepageHeading = ({ mobile }) => (
    <Container text>
        <Header
            as="h1"
            content="Fight food waste"
            inverted
            style={{
                fontSize: mobile ? '2em' : '4em',
                fontWeight: 'normal',
                // marginBottom: 0,
                marginTop: mobile ? '1.5em' : '3em',
            }}
        />
        <Header
            as="h2"
            content="Help others enjoy your party's food."
            inverted
            style={{
                fontSize: mobile ? '1.5em' : '1.7em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '1.5em',
            }}
        />
        <Button size="huge" as={Link} to="/havefood">
            Have Food
        </Button>
        <Button size="huge" as={Link} to="/public">
            Need Food
        </Button>
    </Container>
);

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
    static contextType = LeftoverContext;

    state = {};

    hideFixedMenu = () => this.setState({ fixed: false });
    showFixedMenu = () => this.setState({ fixed: true });

    render() {
        const { children } = this.props;
        const { fixed } = this.state;

        return (
            <Media greaterThan="mobile">
                <Segment
                    inverted
                    textAlign="center"
                    // THIS IS WHERE WE HAD THE MIN HEIGHT
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        margin: 0,
                        padding: 0,
                        display: 'block',
                        overflow: 'auto',
                    }}
                    vertical
                >
                    <video
                        className="videoTag"
                        autoPlay
                        loop
                        muted
                        style={{
                            margin: 0,
                            padding: 0,
                            minWidth: '100vw',
                            width: '100%',
                        }}
                    >
                        <source src={video} type="video/mp4" />
                    </video>
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            minWidth: '100%',
                            minHeight: '100vh',
                            background: 'rgba(0,0,0,.5)',
                        }}
                    ></div>
                </Segment>

                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign="center"
                        // THIS IS WHERE WE HAD THE MIN HEIGHT
                        style={{ backgroundColor: 'rgba(6,6,6,0)' }}
                        vertical
                    >
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing
                            secondary={!fixed}
                            size="large"
                            style={{ top: 0 }}
                        >
                            <Container>
                                <Menu.Item as={Link} to="/" active>
                                    <Image
                                        src={logo}
                                        width={30}
                                        style={{
                                            margin: 'auto',
                                            marginTop: '25px',
                                        }}
                                    />
                                    <h3 id="logo">Leftovers</h3>
                                </Menu.Item>
                                <Menu.Item position="right">
                                    {this.context.state.loggedIn ? (
                                        <>
                                            {'Hi, ' +
                                                this.context.state.username}
                                            <Button
                                                as={Link}
                                                to="/add-leftover"
                                                animated="fade"
                                                inverted
                                                style={{ marginLeft: '10px' }}
                                            >
                                                <Button.Content visible>
                                                    <Icon name="add" /> Add
                                                    Leftover
                                                </Button.Content>
                                                <Button.Content hidden>
                                                    <Icon
                                                        color="red"
                                                        name="heart"
                                                    />{' '}
                                                    Add Love
                                                </Button.Content>
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                as={Link}
                                                to="/login"
                                                inverted={!fixed}
                                            >
                                                Log in
                                            </Button>
                                            <Button
                                                as={Link}
                                                to="/signup"
                                                inverted={!fixed}
                                                primary={fixed}
                                                style={{ marginLeft: '0.5em' }}
                                            >
                                                Sign Up
                                            </Button>
                                        </>
                                    )}
                                </Menu.Item>
                            </Container>
                        </Menu>
                        <HomepageHeading />
                    </Segment>
                </Visibility>

                {children}
            </Media>
        );
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
};

class MobileContainer extends Component {
    static contextType = LeftoverContext;

    state = {};

    handleSidebarHide = () => this.setState({ sidebarOpened: false });

    handleToggle = () => this.setState({ sidebarOpened: true });

    render() {
        const { children } = this.props;
        const { sidebarOpened } = this.state;

        return (
            <Media as={Sidebar.Pushable} at="mobile">
                <video
                    webkit-playsinline="true"
                    playsinline="true"
                    className="videoTag"
                    autoPlay
                    loop
                    muted
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        minWidth: '100vw',
                    }}
                >
                    <source src={video480} type="video/mp4" />
                </video>
                <Sidebar.Pushable>
                    <Sidebar
                        as={Menu}
                        animation="overlay"
                        inverted
                        onHide={this.handleSidebarHide}
                        vertical
                        visible={sidebarOpened}
                    >
                        <Image
                            src={logo}
                            width={40}
                            style={{ margin: 'auto', marginTop: '20px' }}
                        />
                        <h3
                            style={{
                                margin: 'auto',
                                color: 'white',
                                textAlign: 'center',
                            }}
                            id="logo"
                        >
                            Leftovers
                        </h3>
                        <Menu.Item active>Home</Menu.Item>
                        {this.context.state.loggedIn ? (
                            <>
                                <Menu.Item as={Link} to="/claims" inverted>
                                    My Claims
                                </Menu.Item>
                                <Menu.Item
                                    as={Link}
                                    to="/add-leftover"
                                    inverted
                                >
                                    Add Leftover
                                </Menu.Item>
                            </>
                        ) : (
                            <>
                                <Menu.Item as={Link} to="/login" inverted>
                                    Log in
                                </Menu.Item>
                                <Menu.Item as={Link} to="/signup" inverted>
                                    Sign Up
                                </Menu.Item>
                            </>
                        )}
                    </Sidebar>

                    <Sidebar.Pusher dimmed={sidebarOpened}>
                        <Segment
                            inverted
                            textAlign="center"
                            style={{
                                minHeight: 350,
                                padding: '1em 0em',
                                backgroundColor: 'rgba(6,6,6,.5)',
                            }}
                            vertical
                        >
                            <Container>
                                <Menu inverted pointing secondary size="large">
                                    <Menu.Item onClick={this.handleToggle}>
                                        <Icon name="sidebar" />
                                    </Menu.Item>
                                    <Menu.Item position="right">
                                        {this.context.state.loggedIn ? (
                                            <>
                                                {'Hi, ' +
                                                    this.context.state.username}
                                                <Button
                                                    as={Link}
                                                    to="/add-leftover"
                                                    animated="fade"
                                                    inverted
                                                    style={{
                                                        marginLeft: '10px',
                                                    }}
                                                >
                                                    <Button.Content visible>
                                                        <Icon name="add" /> Add
                                                        Leftover
                                                    </Button.Content>
                                                    <Button.Content hidden>
                                                        <Icon
                                                            color="red"
                                                            name="heart"
                                                        />{' '}
                                                        Add Love
                                                    </Button.Content>
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    as={Link}
                                                    to="/login"
                                                    inverted
                                                >
                                                    Log in
                                                </Button>
                                                <Button
                                                    as={Link}
                                                    to="/signup"
                                                    inverted
                                                    style={{
                                                        marginLeft: '0.5em',
                                                    }}
                                                >
                                                    Sign Up
                                                </Button>
                                            </>
                                        )}
                                    </Menu.Item>
                                </Menu>
                            </Container>
                            <HomepageHeading mobile />
                        </Segment>

                        {children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Media>
        );
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
    /* Heads up!
     * For large applications it may not be best option to put all page into these containers at
     * they will be rendered twice for SSR.
     */
    <MediaContextProvider>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
};

const HomepageLayout = () => {
    const { api_url, setState } = useContext(LeftoverContext);

    const catchError = useCallback(error => {
        console.log(error);
    }, []);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetch(`${api_url}/current-user/`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                },
            })
                .then(res => {
                    if (!res.ok) {
                        catchError(res);
                        localStorage.removeItem('token');
                        setState({
                            loggedIn: false,
                            username: '',
                        });
                    } else {
                        console.log(res);
                        return res.json();
                    }
                })
                .then(json => {
                    console.log('Im inside the json', json);
                    setState({
                        loggedIn: true,
                        username: json.username,
                        userId: json.id,
                        name:
                            json.first_name.charAt(0).toUpperCase() +
                            json.first_name.slice(1).toLowerCase(),
                    });
                })
                .catch(err => console.log('THIS IS THE ERROR', err));
        }
    }, [setState, catchError, api_url]);

    return (
        <ResponsiveContainer>
            <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign="middle">
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header
                                as="h3"
                                style={{
                                    fontSize: '2em',
                                    backgroundColor: '#33ff00',
                                    padding: '.2rem',
                                }}
                            >
                                Leftovers was created to Fight Food Waste
                            </Header>
                            <Header
                                as="h3"
                                style={{
                                    fontSize: '2em',
                                    backgroundColor: 'white',
                                }}
                            >
                                Some Food for Thought
                            </Header>
                            <p
                                style={{
                                    fontSize: '1.33em',
                                    backgroundColor: 'white',
                                }}
                            >
                                The United States discards 80 billion pounds of
                                ediable food every year, While 35 million people
                                across America has food insecurity. That number
                                is expected to rise to as much as 50 million in
                                2021. Wasting food contributes to 11 percent of
                                the world's greenhouse gas emissions.
                            </p>
                            <Header
                                as="h3"
                                style={{
                                    fontSize: '2em',
                                    backgroundColor: 'white',
                                }}
                            >
                                Share your leftovers with other!
                            </Header>
                            <p
                                style={{
                                    fontSize: '1.33em',
                                    backgroundColor: 'white',
                                }}
                            >
                                12.8 percent of New Yorkers are food insecure.
                                The Natural Resources Defense Council (NRDC)
                                found that 68 percent of all discarded food was
                                considered still edible. 54 percent of food
                                waste was generated in residential settings,
                                while 20 percent were generated by restaurants
                                and caterers.
                            </p>
                        </Grid.Column>
                        <Grid.Column floated="right" width={6}>
                            <Image
                                bordered
                                rounded
                                size="medium"
                                src={leftoversjpg}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign="center">
                            <Button size="huge">Check Them Out</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment style={{ padding: '0em' }} vertical>
                <Grid celled="internally" columns="equal" stackable>
                    <Grid.Row textAlign="center">
                        <Grid.Column
                            style={{ paddingBottom: '5em', paddingTop: '5em' }}
                        >
                            <Header as="h3" style={{ fontSize: '2em' }}>
                                "What a Company"
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                That is what they all say about us
                            </p>
                        </Grid.Column>
                        <Grid.Column
                            style={{ paddingBottom: '5em', paddingTop: '5em' }}
                        >
                            <Header as="h3" style={{ fontSize: '2em' }}>
                                "Eat, sleep, leftovers, repeat!"
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                <Image avatar src={fatboy} />
                                <b>Fatboy Slim</b> International DJ
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment style={{ padding: '8em 0em' }} vertical>
                <Container text>
                    <Header as="h3" style={{ fontSize: '2em' }}>
                        Breaking The Grid, Grabs Your Attention
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                        Instead of focusing on content creation and hard work,
                        we have learned how to master the art of doing nothing
                        by providing massive amounts of whitespace and generic
                        content that can seem massive, monolithic and worth your
                        attention.
                    </p>
                    <Button as="a" size="large">
                        Read More
                    </Button>

                    <Divider
                        as="h4"
                        className="header"
                        horizontal
                        style={{
                            margin: '3em 0em',
                            textTransform: 'uppercase',
                        }}
                    >
                        <a href="#">Case Studies</a>
                    </Divider>

                    <Header as="h3" style={{ fontSize: '2em' }}>
                        Did We Tell You About Our Bananas?
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                        Yes I know you probably disregarded the earlier boasts
                        as non-sequitur filler content, but it's really true. It
                        took years of gene splicing and combinatory DNA
                        research, but our bananas can really dance.
                    </p>
                    <Button as="a" size="large">
                        I'm Still Quite Interested
                    </Button>
                </Container>
            </Segment>

            <Segment inverted vertical style={{ padding: '5em 0em' }}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Header inverted as="h4" content="About" />
                                <List link inverted>
                                    <List.Item as="a">Sitemap</List.Item>
                                    <List.Item as="a">Contact Us</List.Item>
                                    <List.Item as="a">
                                        Religious Ceremonies
                                    </List.Item>
                                    <List.Item as="a">Gazebo Plans</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as="h4" content="Services" />
                                <List link inverted>
                                    <List.Item as="a">
                                        Banana Pre-Order
                                    </List.Item>
                                    <List.Item as="a">DNA FAQ</List.Item>
                                    <List.Item as="a">How To Access</List.Item>
                                    <List.Item as="a">Favorite X-Men</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header as="h4" inverted>
                                    Footer Header
                                </Header>
                                <p>
                                    Extra space for a call to action inside the
                                    footer that could help re-engage users.
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </ResponsiveContainer>
    );
};

export default HomepageLayout;
