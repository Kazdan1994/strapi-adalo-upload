# strapi-adalo-upload
A component for uploading files to an external strapi API via adalo.

## Running Locally

First run:

```
yarn             # Install dependencies
npx adalo login  # Login to adalo locally
```

Then run:

```
yarn start
```

This will make the package available in Adalo.

##Upload files related to an entry

To upload files that will be linked to a specific entry.
###Request parameters

- files: The file(s) to upload. The value(s) can be a Buffer or Stream.
- path (optional): The folder where the file(s) will be uploaded to (only supported on strapi-provider-upload-aws-s3).
- refId: The ID of the entry which the file(s) will be linked to.
- ref: The name of the model which the file(s) will be linked to (see more below).
- source (optional): The name of the plugin where the model is located.
- field: The field of the entry which the file(s) will be precisely linked to.

## Examples

The `Restaurant` model attributes:

```json
{
  "attributes": {
    "name": {
      "type": "string"
    },
    "cover": {
      "model": "file",
      "via": "related",
      "plugin": "upload"
    }
  }
}
```

- refId: `5c126648c7415f0c0ef1bccd`
- ref: `restaurant`.
- field: `cover`

##Upload files during entry creation
You can also add files during your entry creation.

- field: `cover`
- refId: ""
- ref: ""

## package.json

If you open `package.json` you will see that there is a new `"adalo"` section, which holds information about the adalo components in the package. This contains a list of components, by name (which correlates to the export name in `index.js`) and a `manifest` which refers to the location of the `manifest.json` file associated with the comonent. For more on this, see the [Library Documentation](https://github.com/AdaloHQ/docs). 
