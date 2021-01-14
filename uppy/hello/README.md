# Hello Uppy

An example of resumable file uploads with [Uppy](https://uppy.io/) and Tus.

[tusd](https://github.com/tus/tusd) is the reference server implemntation for the [tus](https://tus.io/) protocol- the open protocol for resumable file uploads over HTTP.

## Get this running

### Start the tusd server

Download the latest tusd binary for your platform from the [Github releases page](https://github.com/tus/tusd/releases/latest) and copy it to the `bin` folder, and start it with:

```shell
bin/tusd -upload-dir=./uploads
```

This will start **tusd** at port 1080 by default, and expose the endpoint for uploading files at: http://0.0.0.0:1080/files/

Uploaded files are saved in the `./uploads` folder.

### Start the web app

This is a React web app. Start it with:

```shell
yarn
yarn start
```

This starts the development server at port 3000 by default, so open http://localhost:3000 and, try uploading some files.

- Verify that the uploaded files are saved in the `./uploads` folder.
- Try pausing and resuming an upload in progress (it would be helpful to try with Dev Tools > Network > Slow 3G/Offline so that upload speed is throttled)
- When an upload is in progress check the content of the `./hello-uppy-server/uploads` folder. You should see the partial file and a lock file with the same name.

## How it works

On the web app, we create an [Uppy](https://uppy.io/docs/uppy/) object with some [configuration options](https://uppy.io/docs/uppy/#Options).

Then we add the Tus plugin to Uppy, giving it the URL of our tusd powered Tus server in the config object.

```javascript
uppy.use(Tus, {
  endpoint: "http://localhost:1080/files",
  resume: true,
  retryDelays: [0, 1000, 3000, 5000],
});
```

Our uppy object has various [events](https://uppy.io/docs/uppy/#Events) that we can attach to- e.g.

```javascript
uppy.on("complete", (result) => {
  console.log("Uploaded completed");
  console.log(result);
});
```

In our UI, we use the [Dashboard](https://uppy.io/docs/dashboard/) component which pretty much encapsulates the whole upload experience:

```jsx
<Dashboard uppy={uppy} />
```

The styles for Uppy and the Uppy Dashboard are imported respectivly as:

```javascript
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
```

