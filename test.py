from googleapiclient import discovery
import json
from dotenv import dotenv_values

config = dotenv_values(".env")


API_KEY = config['PERSPECTIVE_API_KEY'] 

client = discovery.build(
  "commentanalyzer",
  "v1alpha1",
  developerKey=API_KEY,
  discoveryServiceUrl="https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1",
  static_discovery=False,
)

analyze_request = {
  'comment': { 'text': 'your project is ehh but u have no chance of winning lmfao.' },
  'requestedAttributes': {'TOXICITY': {}, 'INSULT' : {}, 'FLIRTATION' : {}}
}

response = client.comments().analyze(body=analyze_request).execute()
print(json.dumps(response, indent=2))