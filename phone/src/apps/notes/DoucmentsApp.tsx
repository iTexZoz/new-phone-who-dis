import React from 'react';
import { AppWrapper } from '../../ui/components/AppWrapper';
import { AppContent } from '../../ui/components/AppContent';
import { AppTitle } from '../../ui/components/AppTitle';
import { useApp } from '../../os/apps/hooks/useApps';
import { NoteModal } from './modal/NoteModal';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useNoteDetail } from './hooks/useNoteDetail';
import useStyles from './notes.styles';
import InjectDebugData from '../../os/debug/InjectDebugData';
import { NotesThemeProvider } from './providers/NotesThemeProvider';
import { Route, useHistory } from 'react-router-dom';
import DocumentList from './list/DoucmentList';
import NoteList from './list/NoteList';

export const NotesApp = () => {
  const classes = useStyles();
  const history = useHistory();
  const notesApp = useApp('DOCUMENTS');
  const { setDetail } = useNoteDetail();

  const onClickCreate = () => {
    setDetail({ title: '', content: '' });
    history.push('/notes/detail');
  };

  return (
    <NotesThemeProvider>
      <AppWrapper id="documents-app">
        <AppTitle app={notesApp} />
        <Route path="/documents/notes/detail" component={NoteModal} />
        <AppContent>
          <Route path="/documents" exact component={DocumentList} />
          <Route path="/documents/notes" exact component={NoteList} />
        </AppContent>
      </AppWrapper>
    </NotesThemeProvider>
  );
};

InjectDebugData([
  {
    app: 'NOTES',
    method: 'setNotes',
    data: [
      {
        id: 1,
        title: 'First note',
        content: 'Hello, this is my shitty note',
      },
      {
        id: 2,
        title: 'Second note',
        content: 'Hello, this is another shitty note',
      },
    ],
  },
]);
