import * as React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Routes from "./routes";

import {Root} from "./Root";
import {Login} from "./Login";
import {Register} from "./Register";
import {Unmask} from "./UnmaskForm";
import {ResultsPage} from "./Results";
import {Search} from "./Search";
import {VotePage} from "./VotePage";

export const Router: React.FC = (props) => {
  return(
    <BrowserRouter>
      <React.Suspense fallback={<div/>}>
        <Switch>
          <Route exact path={Routes.ROOT} component={Root}/>
          <Route exact path={Routes.LOGIN} component={Login}/>
          <Route exact path={Routes.REGISTER} component={Register}/>
          <Route exact path={Routes.UNMASK} component={Unmask}/>
          <Route path={`/bastards/:First_Name/:Middle_Name/:Last_Name`} component={ResultsPage}/>
          <Route exact path={Routes.SEARCH} component={Search}/>
          <Route exact path={Routes.VOTE} component={VotePage}/>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}
