import configparser
import json
import asyncio
from datetime import date, datetime
import os

from telethon import TelegramClient
from telethon.errors import SessionPasswordNeededError
from telethon.tl.functions.channels import JoinChannelRequest
from telethon.tl.functions.messages import (GetHistoryRequest)
from telethon.tl.types import (
    PeerChannel
)
from telethon import TelegramClient, events
import requests

# some functions to parse json date
class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()

        if isinstance(o, bytes):
            return list(o)

        return json.JSONEncoder.default(self, o)


# Reading Configs
config = configparser.ConfigParser()
print("ENV " + os.getenv('NODE_ENV'))
config.read("config." + os.getenv('NODE_ENV', 'hla') + ".ini")

# Setting configuration values
api_id = config['Telegram']['api_id']
api_hash = config['Telegram']['api_hash']
channel_url = config['Telegram']['channel_url']
api_key = config['Twee']['api_key']
api_url = config['Twee']['api_url']

api_hash = str(api_hash)

client = TelegramClient('twee.hla', api_id, api_hash)

@client.on(events.NewMessage(chats=channel_url))
async def channel_event_handler(event):
    if "👉 Click To Tweet 👈" not in event.raw_text:
        print("Message recevied from Click To Tweet Channel")
        print("Message: %s" % event.raw_text.encode())
        # datetime object containing current date and time
        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        print("Received Date: ", dt_string)

        requests.post(
            api_url,
            data=event.raw_text.encode(),
            headers={'Content-Type': 'text/plain', 'API_KEY': api_key}
        )

        print("Tweets sent...\n")


async def main():
    await client.start()
    print("Telegram Client Created")

    await client.run_until_disconnected()

with client:
    client.loop.run_until_complete(main())