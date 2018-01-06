import React from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Icon, Grid, Segment, Image, Header } from 'semantic-ui-react'

const styles = {
  dark: {
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.75)'
  },
}

const League = (props) => {
  const { league } = props;
  return <Link to={`/competitions/${league.id}`}>
    <Segment.Group>
      <Segment style={styles.dark}>
        <Grid columns={2} divided>
          <Grid.Column>
            <Header as='h2' floated='left' style={{ color: '#fff' }}>
              {league.caption}
            </Header>
            <Header floated='right' as='h1' style={styles.score}>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2' floated='right' style={{ color: '#fff' }}>
              {league.league}
            </Header>
            <Header floated='left' as='h1' style={styles.score}>
            </Header>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment style={styles.dark} size='huge'>
        <Grid columns={2}>
          <Grid.Column textAlign='left'>
            <Icon name='users' />{league.numberOfTeams} Teams
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Icon name='soccer' />{league.numberOfGames} Games
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  </Link>;
}

export default League;