from elevenlabs.client import ElevenLabs
from elevenlabs import stream
import sys

def smthing(text):
  client = ElevenLabs(
    api_key="sk_b893517e82b40bd8b3516b1d7f48555d7d3f6807df34bde0", # Defaults to ELEVEN_API_KEY
  )

  audio_stream = client.generate(
    text=text,
    stream=True
  )

  stream(audio_stream)


smthing(sys.argv[1])
f = open("res.txt", "w")
f.write("DONE")
f.close()
sys.stdout.flush()
sys.exit(2)