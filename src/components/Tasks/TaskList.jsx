import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Headline from 'grommet/components/Headline';
import Section from 'grommet/components/Section';
import Sidebar from 'grommet/components/Sidebar';
import _ from 'lodash';
import classnames from 'classnames';
import TaskItem from '../../containers/TaskItem';

import '!style-loader!css-loader!sass-loader!./TaskList.scss'; // eslint-disable-line

function renderTaskItems(tasks) {
  const taskItems = [];
  for (let index = 0; index < tasks.length; index += 1) {
    const taskProps = tasks[index];
    if (taskProps) {
      taskItems.push(<TaskItem key={index} task={taskProps} />);
    }
  }
  return taskItems;
}

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.tasks,
    };
  }

  matchTaskLabelsWithLabelFilter(labels) {
    const { labelFilters } = this.props;
    if (labelFilters.length) {
      for (let i = 0; i < labels.length; i += 1) {
        if (labelFilters.indexOf(labels[i]) !== -1) {
          return true;
        }
      }
      return false;
    }
    return true;
  }

  filterTasks(tasks) {
    const { searchInput } = this.props;
    return tasks.filter(
      (d) => {
        const matchesSearchInput = d.title &&
          d.title.toLowerCase().startsWith(searchInput.toLowerCase());
        const matchesLabelFilters = this.matchTaskLabelsWithLabelFilter(
          d.labels.map(label => label.title),
        );
        return matchesSearchInput && matchesLabelFilters;
      },
    );
  }

  renderTaskSection() {
    const { tasks } = this.props;
    const filteredTasks = {
      daily: tasks.daily && this.filterTasks(tasks.daily),
      weekly: tasks.weekly && this.filterTasks(tasks.weekly),
      monthly: tasks.monthly && this.filterTasks(tasks.monthly),
    };
    const taskTypes = Object.keys(filteredTasks);
    const taskSections = [];
    let count = 0;
    taskTypes.forEach((tasksType) => {
      const scheduledTasks = filteredTasks[tasksType];
      if (scheduledTasks && scheduledTasks.length) {
        taskSections.push(
          <Section key={count}>
            <Headline align="center" size="small">
              {_.capitalize(tasksType)}
            </Headline>
            {renderTaskItems(scheduledTasks)}
          </Section>,
        );
      }
      count += 1;
    });
    return taskSections;
  }

  render() {
    return (
      <Sidebar
        className={classnames('task-list', { 'white-mode': this.props.whiteMode })}
        size="small"
        full={false}
      >
        <Headline align="center" size="small">
          TASKS
        </Headline>
        {this.renderTaskSection()}
      </Sidebar>
    );
  }
}

TaskList.propTypes = {
  tasks: PropTypes.object,
  searchInput: PropTypes.string,
  labelFilters: PropTypes.array,
  whiteMode: PropTypes.bool,
};

TaskList.defaultProps = {
  tasks: {},
  labelFilters: [],
  searchInput: '',
  whiteMode: false,
};
