import React, { Component } from 'react';
import './App.css';
import MUIDataTable from "mui-datatables";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
const columns = ["Employee ID", "Employee Name", "Average Hours", "Total Hours"];

const data = [
 [1234, "Eswar Prasad", 7, 40],
 [7894, "Aadhavan Mani", 2.1, 25],
 [2587, "Sri ram", 4.50, 30],
 [9514, "Sundar", 9.53, 65],
];

const options = {
  filterType: 'checkbox',
};


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  fab: {
    margin: theme.spacing.unit,
    float: 'right'
  },
});

const searchOptions = [
  {
    value: 1,
    label: 'MONTHLY',
  },
  {
    value: 2,
    label: 'Weekly',
  },
  {
    value: 3,
    label: 'Custom Dates',
  }
];

class App extends Component {
  state = {
    selectedSearchOption:1,
    selectedDate: new Date()
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;

    return (
      <div style={{ maxWidth: '100%',padding:'2vw',/* backgroundImage: `url(${Background})` */ }}>
      <form  className="search-bar" noValidate autoComplete="off" >
      <label className="search-text">
        SEARCH BY
      </label>
      <div className="search-borders">
        
        <TextField
          id="select-option"
          select
          
          className={classes.textField}
          value={this.state.selectedSearchOption}
          onChange={this.handleChange('selectedSearchOption')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your search option"
          margin="normal"
        >
          {searchOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker value={selectedDate} onChange={this.handleDateChange} />
        </MuiPickersUtilsProvider>
        <Fab color="primary" aria-label="Search"  className={classes.fab}>
            <SearchIcon />
        </Fab>
        </div>
        
      </form>
      
      <MUIDataTable 
        title={"Employee List"} 
        data={data} 
        columns={columns} 
        options={options} 
      />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
