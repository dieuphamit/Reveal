// See https://developers.google.com/apps-script/guides/properties
// for instructions on how to set the script properties.
const apiKey = PropertiesService.getScriptProperties().getProperty('AIzaSyBqHGO6Enr3weZdoYd4pyxP-nyFcev_uoc');
const model = 'gemini-2.0-flash-lite';
const api = 'streamGenerateContent';
const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:${api}?key=${apiKey}`;

function main() {
  const payload = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `INSERT_INPUT_HERE`
          },
        ]
      },
    ],
    generationConfig: {
    },
  };

  const options = {
    method: 'POST',
    contentType: 'application/json',
    muteHttpExceptions: true,
    payload: JSON.stringify(payload),
  };

  const response = UrlFetchApp.fetch(url, options);
  const chunks = JSON.parse(response.getContentText());

  for (const chunk of chunks) {
    console.log(chunk.candidates[0].content.parts[0].text);
  }
}
