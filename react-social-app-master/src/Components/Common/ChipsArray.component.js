import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Code from '@material-ui/icons/Code';
import Add from '@material-ui/icons/AddCircle';
import {
  InputBase,
  Button,
  InputAdornment,
  IconButton,
  Grow,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { editContact } from '../../actions/contacts.action';
/**
 * ChipsArray is a component for reminding the last conversation topics
 * @namespace ChipsArray
 */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.4),
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.1),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.3),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  chipAdd: {
    pointerEvents: 'none',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 2),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));
/**
 * This function makes possible to add topics as a reminder of topics which were discussed the last time
 * @class
 * @param {object} props
 * @param {object} props.contact
 */
function ChipsArray(props) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState(
    props.contact
      ? props.contact.topics.map((t, i) => {
          return { key: i, label: t };
        })
      : []
  );

  const [topic, setTopic] = React.useState('');
  const [searchExpanded, setSearchExpanded] = React.useState(false);

  /**
   * @memberof ChipsArray
   * Condition to delete Chips (topics)
   * @param {object} chipToDelete
   * @param {string} chipToDelete.label
   */
  const handleDelete = chipToDelete => () => {
    if (chipToDelete.label === 'React') {
      alert('Why would you want to delete React?! :)');
      return;
    }

    const topics = chipData.filter(chip => chip.key !== chipToDelete.key);

    props.dispatch(
      editContact({ topics: topics.map(t => t.label) }, props.contact.id),
      setChipData(topics)
    );
  };

  /**
   * Declaration of the text field
   * @param {string} input
   */
  const focusUsernameInputField = input => {
    if (input) input.focus();
  };
  /**
   * Addition of Chips (topics)
   * @param {object} e - the click event
   */
  const addTopic = e => {
    e.preventDefault();
    setSearchExpanded(false);
    if (topic) {
      const topics = chipData.concat([{ label: topic }]);
      props.dispatch(
        editContact({ topics: topics.map(t => t.label) }, props.contact.id),
        setChipData(topics)
      );
      setTopic('');
    }
  };

  /**
   * Calls setTopic with the new value
   * @memberof ChipsArray
   * @param {object} e - the event
   */
  const setTopicValue = e => {
    setTopic(e.target.value);
  };

  /**
   * Sets the input field to visible
   * @memberof ChipsArray
   */
  const openInput = () => {
    setTopic('');
    setSearchExpanded(true);
  };

  return (
    <div>
      {chipData.map((data, i) => {
        let icon;
        const label = data.label.toLowerCase();
        if (
          ['react', 'js', 'javascript', 'html', 'css', 'java'].includes(label)
        ) {
          icon = <Code />;
        }

        return (
          <Chip
            key={i}
            icon={icon}
            label={data.label}
            onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
      <div>
        <Chip
          hidden={searchExpanded}
          icon={<Add />}
          label={'Add'}
          onClick={openInput}
          className={classes.chip}
          color="secondary"
        />
        <form onSubmit={addTopic}>
          <Grow in={searchExpanded}>
            <div className={classes.search}>
              <InputBase
                onBlur={() => setTimeout(() => setSearchExpanded(false), 100)}
                onChange={setTopicValue}
                value={topic}
                inputRef={focusUsernameInputField}
                hidden={!searchExpanded}
                placeholder="Topics..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'Search' }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="Add" type="submit">
                      <Add />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
          </Grow>
        </form>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    contact: state.contact,
  };
}

export default connect(mapStateToProps)(ChipsArray);
