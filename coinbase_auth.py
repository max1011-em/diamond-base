
from apikey import client_id, client_secret 
from coinbase.wallet.client import OAuthClient

client = OAuthClient(access_token, refresh_token)


params = {
            'response_type': 'code',
            'client_id': client_id,
            'redirect_uri': "http://0.0.0.0:5000/main",
        }

auth_url = 'https://coinbase.com/oauth/authorize?'

params = urllib.parse.urlencode(params)

response = requests.post(auth_url,params)
user = client.get_current_user()
user_as_json_string = json.dumps(user)

print(user)

