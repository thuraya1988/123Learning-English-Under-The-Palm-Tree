FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive \
    PIP_NO_CACHE_DIR=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=7860 \
    VOICES_DIR=/voices

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl ca-certificates espeak-ng \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir \
    "piper-tts" \
    "fastapi" \
    "uvicorn[standard]"

WORKDIR /app
COPY app.py /app/app.py
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh && mkdir -p ${VOICES_DIR}

EXPOSE 7860

CMD ["/app/start.sh"]
