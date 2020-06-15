import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Select } from 'grommet';
import { toast } from 'react-toastify';
// eslint-disable-next-line
import { capitalize } from 'lodash';
import {
  Brush,
  ChatOption,
  Configure,
  Github,
  Globe,
  MailOption,
  Note,
  Twitter,
} from 'grommet-icons';

import { changeCwdEvent } from 'Utils/events';
import GistSync from 'Containers/GistSync';
import ErrorBoundary from 'UI/Error';
import Header from 'UI/Header';
import CloseButton from 'UI/CloseButton';
import Button from 'UI/Button';
import FolderPicker from 'UI/FolderPicker';
import BoardsDialog from './BoardsDialog';
import { CODE_THEMES } from './MarkdownEditorThemes';

import './Settings.scss';

const renderAppInfo = () => (
  <Box direction="row" className="app-info" responsive>
    <Box direction="row" justify="between" align="start">
      <Header>
        <Text size="xxlarge" as="h1">
        MDyna
        </Text>
        <Text>{window.appVersion}</Text>
      </Header>
      <Box direction="column">
        <Text size="large" color="brand">
          <a href="https://mdyna.dev">
            <Globe color="brand" />
        Website
          </a>
        </Text>
        <Text size="large" color="brand">
          <ChatOption color="brand" />
          <a href="https://spectrum.chat/mdyna/">Community</a>
        </Text>
        <Text size="large" color="brand">
          <Github color="brand" />
          <a href="https://github.com/mdyna/mdyna-app/">GitHub</a>
        </Text>
      </Box>
    </Box>
  </Box>
);
class Settings extends PureComponent {
  render() {
    const {
      toggleSettings,
      changeCodeTheme,
      cardsPerPage,
      changeCardsPerPage,
      codeTheme,
      changeActiveBoard,
      createBoard,
      deleteBoard,
      activeBoard,
      changeTheme,
      changeBoardName,
      githubAuthOn,
      changeCwd,
      boards,
      cwd,
      boardNames,
    } = this.props;
    return (
      <Box className="settings" direction="column">
        <CloseButton
          action={() => toggleSettings()}
        />
        <ErrorBoundary>

          {renderAppInfo()}
          <Box align="center" direction="row" justify="between" className="credits">
            <Text>Created by David Morais</Text>
            <a href="https://twitter.com/Psybork">
              <Twitter color="brand" />
            </a>
            <a href="https://github.com/dmorais92">
              <Github color="brand" />
            </a>
            <a href="mailto:davidmorais92@gmail.com">
              <MailOption color="brand" />
            </a>
          </Box>
          <Box direction="row" justify="center" className="settings-layout">
            <Box
              direction="column"
              background="dark-2"
              className="settings-container"
            >
              <Text size="xxlarge" as="h1">
                <Configure color="brand" />
                Settings
              </Text>
              <Text size="large" as="h2">
                <Brush color="brand" />
                Theme
              </Text>
              <Box direction="row" className="settings-section">
                <Button
                  color="brand"
                  onClick={() => {
                    toast.success('Switched to Dark theme');
                    changeTheme('dark');
                  }}
                >
                  <Text>
                    <div id="dark-theme-picker">
                      <div className="main" />
                      <div className="secondary" />
                    </div>
                  MDyna Dark
                  </Text>
                </Button>
                <Button
                  color="brand"
                  onClick={() => {
                    toast.success('Switched to Light theme');
                    changeTheme('white');
                  }}
                >
                  <Text>
                    <div id="white-theme-picker">
                      <div className="main" />
                      <div className="secondary" />
                    </div>
                  MDyna White
                  </Text>
                </Button>
                <Button
                  color="brand"
                  onClick={() => {
                    toast.success('Switched to Black theme');
                    changeTheme('black');
                  }}
                >
                  <Text>
                    <div id="black-theme-picker">
                      <div className="main" />
                      <div className="secondary" />
                    </div>
                  Black
                  </Text>
                </Button>
                <Button
                  color="brand"
                  onClick={() => {
                    toast.success('Switched to Synth theme');
                    changeTheme('synth');
                  }}
                >
                  <Text>
                    <div id="synth-theme-picker">
                      <div className="main" />
                      <div className="secondary" />
                    </div>
                  Synth
                  </Text>
                </Button>
                <Button
                  color="brand"
                  onClick={() => {
                    toast.success('Switched to White theme');
                    changeTheme('flat');
                  }}
                >
                  <Text>
                    <div id="flat-theme-picker">
                      <div className="main" />
                      <div className="secondary" />
                    </div>
                  Flat White
                  </Text>
                </Button>
              </Box>
              <Box direction="row" className="settings-section">
                <Box direction="column">
                  <Text>Cards per page</Text>
                  <Select
                    label="Cards per page"
                    options={['2', '4', '8', '10']}
                    value={String(cardsPerPage)}
                    onChange={({ option }) => changeCardsPerPage(Number(option))
                    }
                  />
                </Box>
                <Box direction="column">
                  <Text>Code snippets theme</Text>
                  <Select
                    label="Cards per page"
                    options={[...Object.keys(CODE_THEMES)]}
                    value={codeTheme}
                    onChange={({ option }) => changeCodeTheme(option)}
                  />
                </Box>
              </Box>
              <Text size="large" as="h2">
                <Note color="brand" />
                Cards
              </Text>
              <Box direction="row" className="settings-section">
                <FolderPicker
                  label="Change directory"
                  placeholder={cwd}
                  className="menu-label"
                  onChange={(value) => {
                    changeCwd(value);
                    changeCwdEvent();
                  }}
                />
                <GistSync
                  githubAuthOn={githubAuthOn}
                />
              </Box>
              <BoardsDialog
                activeBoard={activeBoard}
                boards={boards}
                boardNames={boardNames}
                createBoard={createBoard}
                deleteBoard={deleteBoard}
                changeActiveBoard={changeActiveBoard}
                changeBoardName={changeBoardName}
              />
            </Box>
          </Box>
        </ErrorBoundary>
      </Box>
    );
  }
}

Settings.whyDidYouRender = true;

Settings.propTypes = {
  changeCwd: PropTypes.func,
  toggleSettings: PropTypes.func,
  createBoard: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  changeBoardName: PropTypes.func.isRequired,
  boards: PropTypes.array.isRequired,
  changeActiveBoard: PropTypes.func.isRequired,
  codeTheme: PropTypes.string,
  changeTheme: PropTypes.func,
  activeBoard: PropTypes.string.isRequired,
  githubAuthOn: PropTypes.bool.isRequired,
  boardNames: PropTypes.array,
  cwd: PropTypes.string,
  changeCodeTheme: PropTypes.func,
  changeCardsPerPage: PropTypes.func,
  cardsPerPage: PropTypes.number,
};

Settings.defaultProps = {
  changeCardsPerPage: null,
  changeCwd: null,
  boardNames: [],
  toggleSettings: null,
  changeCodeTheme: null,
  codeTheme: 'Default',
  changeTheme: false,
  cwd: '',
  cardsPerPage: 8,
};

export default Settings;
