

import { ErrorHandler } from '@angular/core';
import * as $ from 'jquery';

export class JrummyErrors implements ErrorHandler {
  handleError(error) {

    console.log("log" + error);
    $(document).trigger("jrummy-error-raised");
  }
}