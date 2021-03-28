import os, sys, json
from googleapiclient import discovery
from flask import Flask
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.environ['PERSPECTIVE_API_KEY']

app = Flask(__name__)
client = discovery.build(
  "commentanalyzer",
  "v1alpha1",
  developerKey=API_KEY,
  discoveryServiceUrl="https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1"
)

@app.route('/api/<comment>/')
def api(comment):
    analyze_request = {
      'comment': {'text': comment},
      'requestedAttributes': {'TOXICITY': {}, 'INSULT' : {}, 'FLIRTATION': {}}
    }
    response = client.comments().analyze(body=analyze_request).execute()
    print(json.dumps(response, indent=2))
    return {'attributes':
        {
            'TOXICITY':response['attributeScores']['TOXICITY']['spanScores'][0]['score']['value'],
            'INSULT':response['attributeScores']['INSULT']['spanScores'][0]['score']['value']
        }
    }

if __name__ == '__main__':
    app.run(debug=True)
