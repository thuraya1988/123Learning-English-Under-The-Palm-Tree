#!/usr/bin/env bash
set -euo pipefail

VOICES_DIR="${VOICES_DIR:-/voices}"
BASE_URL="https://raw.githubusercontent.com/thuraya1988/123Learning-English-Under-The-Palm-Tree/main/public/tts-voices"

mkdir -p "${VOICES_DIR}"

for f in \
    "en_GB-alan-low.onnx" \
    "en_GB-alan-low.onnx.json" \
    "ar_JO-kareem-medium.onnx" \
    "ar_JO-kareem-medium.onnx.json"
do
    out="${VOICES_DIR}/${f}"
    if [[ ! -s "${out}" ]]; then
        echo "Downloading ${f}..."
        curl -fsSL "${BASE_URL}/${f}" -o "${out}"
    fi
done

echo "Voices ready in ${VOICES_DIR}:"
ls -lh "${VOICES_DIR}"

exec uvicorn app:app --host 0.0.0.0 --port "${PORT:-7860}"
