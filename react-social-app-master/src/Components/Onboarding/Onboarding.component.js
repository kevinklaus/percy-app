import React from 'react';
import './onboarding.css';
import { ChatCard } from '../Common/ChatCard.component';
import { Grid } from '@material-ui/core';
import { RouteButton } from '../Common/RouteButton.component';

/**
 * @memberof Onboarding
 * This function redirects the user to create the first group
 */

function renderStart() {
  return (
    <div>
      <p>Start by adding your first group...</p>
      <Grid container justify="flex-end">
        <Grid item>
          <div>
            <RouteButton
              color="primary"
              text="Let's go!"
              route="/groups/create"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

/**
 * Renders the Onboarding including child components. Cards are delayed to appear as a chat conversation.
 * Different Percy types are used.
 * @namespace
 * @name Onboarding
 */
function Onboarding() {
  return (
    <div className="onboarding">
      <ChatCard
        content="Hey! I'm Percy, the social racoon. Nice to meet you!"
        variant="pointingPercy"
      />
      <ChatCard
        content="Sometimes even a social racoon like me is full of work and I forget to say Hi to my friends. Do you know that feeling? We can take care of this together! "
        delay="1000ms"
      />
      <ChatCard
        content="I'll help you by organising your friends in groups and you can decide how often you want me to remind you to get in touch with them."
        variant="percy"
        delay="3000ms"
      />
      <ChatCard
        content="Whenever you contact someone I'll count the Karma you collect. Karma circles will show up around your contacts to indicate how much Karma you have collected. In case someones Karma is runnig low I will let you know, so you can get in touch with that person."
        delay="5000ms"
      />
      <ChatCard
        content={renderStart}
        color="secondary"
        variant="happyPercy"
        delay="7000ms"
      />
    </div>
  );
}

export default Onboarding;
