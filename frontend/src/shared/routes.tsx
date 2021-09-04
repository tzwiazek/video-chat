import React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import Room from '../components/room/room';
import ChatsPage from '../pages/chats-page/chats-page';
import ContactsPage from '../pages/contacts-page/contacts-page';
import HomePage from '../pages/home-page/home-page';
import SettingsPage from '../pages/settings-page/settings-page';

export const CreateRoutes = () => (
  <Switch>
    <Route path={["/", "/home"]} exact component={HomePage} />
    <Route path="/chats" component={ChatsPage} />
    <Route path="/contacts" component={ContactsPage} />
    <Route path="/settings" component={SettingsPage} />
    <Route path="/room/:roomID" component={Room} />
  </Switch>
);

export default CreateRoutes;