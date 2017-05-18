import React,  { Component }                     from 'react';
import         { render    }                     from 'react-dom';
import Router, { Locations, Location, NotFound } from 'react-router-component';
import         { Grid, Row, Col }                from 'react-bootstrap';

import Main         from  './pages/main';
import NotFoundPage from  './pages/not-found-page';

class APP extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return(
			<Grid>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <Locations>
              <Location path="/" handler={Main} />
              <NotFound handler={NotFoundPage} />
            </Locations>
          </Col>
        </Row>
      </Grid>
		);
	}
}

render((<APP />), document.getElementById('app'));
