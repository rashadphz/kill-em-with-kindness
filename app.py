import os, sys, json
from googleapiclient import discovery
from flask import Flask
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.environ['PERSPECTIVE_API_KEY']

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
client = discovery.build(
  "commentanalyzer",
  "v1alpha1",
  developerKey=API_KEY,
  discoveryServiceUrl="https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1"
)

@app.route('/api/<comment>/')
@cross_origin()
def api(comment):
    analyze_request = {
      'comment': {'text': comment},
      'requestedAttributes': {'TOXICITY': {}},
      'spanAnnotations': True
    }
    response = client.comments().analyze(body=analyze_request).execute()
    print(json.dumps(response, indent=4))
    spans = []
    for span in response['attributeScores']['TOXICITY']['spanScores']:
        spans.append({
            'begin': span['begin'],
            'end': span['end'],
            'toxicity_level': span['score']['value']
        })
    print(spans)
    return {
        'attributes': {
                'TOXICITY':response['attributeScores']['TOXICITY']['summaryScore']['value']
        },
        'spans': spans
    }

if __name__ == '__main__':
    app.run(debug=True)
