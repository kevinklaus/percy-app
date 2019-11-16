import React from 'react';
import { PrivateRoute } from '../Common/PrivateRoute.component';
import Presentation from './Presentation.component';
import PresentationStart from './PresentationStart.component';
import PresentationTeam from './PresentationTeam.component';
import PresentationQuestion from './PresentationQuestion.component';
import PresentationSurvey from './PresentationSurvey.component';
import PresentationResearch from './PresentationResearch.component';
import PresentationIdea from './PresentationIdea.component';
import PresentationConcept from './PresentationConcept.component';
import PresentationTech from './PresentationTech.component';
import PresentationPercy from './PresentationPercy.component';
import PresentationEnd from './PresentationEnd.component';

function PresentationRoutes() {
  return (
    <div>
      <PrivateRoute path="/presentation/" component={Presentation} />
      <PrivateRoute path="/presentation/start" component={PresentationStart} />
      <PrivateRoute path="/presentation/team" component={PresentationTeam} />
      <PrivateRoute path="/presentation/question" component={PresentationQuestion} />
      <PrivateRoute path="/presentation/survey" component={PresentationSurvey} />
      <PrivateRoute path="/presentation/research" component={PresentationResearch} />
      <PrivateRoute path="/presentation/idea" component={PresentationIdea} />
      <PrivateRoute path="/presentation/concept" component={PresentationConcept} />
      <PrivateRoute path="/presentation/tech" component={PresentationTech} />
      <PrivateRoute path="/presentation/percy" component={PresentationPercy} />
      <PrivateRoute path="/presentation/end" component={PresentationEnd} />
    </div>
  );
}

export default PresentationRoutes;
