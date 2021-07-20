from coinbase.wallet.client import Client
from apikey import coinbase_api_key, coinbase_api_secret
from coinbase.wallet.error import AuthenticationError

client = Client(coinbase_api_key, coinbase_api_secret)

# get balance for each wallet
total = 0
message = []
accounts = client.get_accounts()

for wallet in accounts.data:
    message.append( str(wallet['name']) + ' ' + str(wallet['native_balance']) )
    value = str( wallet['native_balance']).replace('USD','')
    total += float(value)
message.append( 'Total Balance: ' + 'USD ' + str(total) )
# print out total
print ('\n'.join( message ))
# send balance as push notification
# replace value of token and user with your keys from Pushover
# conn = httplib.HTTPSConnection("api.pushover.net:443")
# conn.request("POST", "/1/messages.json",
#   urllib.urlencode({
#     "token": "xxxxxx",
#     "user": "xxxxxxxx",
#     "message": message,
#   }), { "Content-type": "application/x-www-form-urlencoded" })
# conn.getresponse()