/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.46.0(21007360cad28648bdf46282a2592cb47c3a7a6f)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/


// src/basic-languages/r/r.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "r",
  extensions: [".r", ".rhistory", ".rmd", ".rprofile", ".rt"],
  aliases: ["R", "r"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/r/r"], resolve, reject);
      });
    } else {
      return import("./r.js");
    }
  }
});
