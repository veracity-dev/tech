import React from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

const uppy = Uppy({
  meta: { type: "foobar" },
  restrictions: { maxNumberOfFiles: 5 },
  autoProceed: false,
});

uppy.use(Tus, {
  endpoint: "http://localhost:1080/files",
  resume: true,
  retryDelays: [0, 1000, 3000, 5000],
});

uppy.on("complete", (result) => {
  console.log("Uploaded completed");
  console.log(result);
});

function Uploader() {
  return <Dashboard uppy={uppy} />;
}

export default Uploader;
