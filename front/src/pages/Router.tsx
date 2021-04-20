import * as React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Routes from "./routes";

import {Root} from "./Root";
import {Login} from "./Login";
import {CounterPage} from './Counter';
import {Register} from "./Register";
import News from './News';
import {Unmask} from "./UnmaskForm";
import {ResultsPage} from "./Results";

export const Router: React.FC = () => {
  return(
    <BrowserRouter>
      <React.Suspense fallback={<div/>}>
        <Switch>
          <Route exact path={Routes.ROOT} component={Root}/>
          <Route exact path={Routes.LOGIN} component={Login}/>
          <Route exact path={Routes.NEWS} component={News}/>
          <Route exact path={Routes.REGISTER} component={Register}/>
          <Route exact path={Routes.UNMASK} component={Unmask}/>
          <Route path={`/bastards/:bastard`} component={ResultsPage} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}
