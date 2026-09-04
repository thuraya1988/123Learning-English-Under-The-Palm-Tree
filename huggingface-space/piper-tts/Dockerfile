FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive \
    PIP_NO_CACHE_DIR=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=7860 \
    VOICES_DIR=/data/voices \
    HOME=/home/user

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl ca-certificates espeak-ng \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir \
    "piper-tts" \
    "fastapi" \
    "uvicorn[standard]"

# Hugging Face runs Docker Spaces as uid 1000, not root. Anything written at
# runtime — the voice models this app downloads on boot — must live in a
# directory that user owns, or the container dies and the Space shows
# "Runtime error" with no obvious cause.
RUN useradd -m -u 1000 user \
    && mkdir -p /data/voices /app \
    && chown -R user:user /data /app

WORKDIR /app
COPY --chown=user:user app.py /app/app.py
COPY --chown=user:user start.sh /app/start.sh
RUN chmod +x /app/start.sh

USER user

EXPOSE 7860

CMD ["/app/start.sh"]
