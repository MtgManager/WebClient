import React from 'react';
import { ButtonGroup, DropdownButton, MenuItem, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';

const THEME_OPTIONS = [
  'default',
  'cerulean',
  'cosmo',
  'cyborg',
  'darkly',
  'flatly',
  'journal',
  'lumen',
  'paper',
  'readable',
  'sandstone',
  'simplex',
  'slate',
  'spacelab',
  'superhero',
  'united',
  'yeti',
];

const DropdownSelector = (props) => {
  const formatOption = option => `${option.charAt(0).toUpperCase()}${option.slice(1)}`;
  return (
    <DropdownButton
      bsStyle={props.bsStyle || 'primary'}
      title={`${props.title} (${formatOption(props.default)})`}
      id={`${props.title}-dropdown`}
    >
      {
        props.options.map((option, i) => (
          <MenuItem
            eventKey={`${i}`}
            onClick={() => props.handleSelect(option)}
            key={option}
          >
            { formatOption(option) }
          </MenuItem>
          ))
      }
    </DropdownButton>
  );
};

class MainNav extends React.Component {
  constructor(...props) {
    super(...props);

    this.state = {};
  }

  render() {
    return (
      <Navbar fixedTop inverse>
        <Navbar.Header>
          <Navbar.Brand>
            MTG Deck Builder
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullRight>
            <ButtonGroup>
              <DropdownSelector
                title="Theme"
                default={this.props.theme}
                options={THEME_OPTIONS}
                handleSelect={theme => this.props.dispatch({ type: 'SET_THEME', theme })}
              />
            </ButtonGroup>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

// Function to map the redux state to object properties
const mapStateToProps = state => ({
  theme: state.main.theme,
});

export default connect(mapStateToProps)(MainNav);
