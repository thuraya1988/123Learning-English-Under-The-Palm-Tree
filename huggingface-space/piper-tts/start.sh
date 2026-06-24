#!/usr/bin/env bash
set -euo pipefail

VOICES_DIR="${VOICES_DIR:-/voices}"
HF_BASE="https://huggingface.co/rhasspy/piper-voices/resolve/main"

mkdir -p "${VOICES_DIR}"

# Medium-quality voices — much more natural than "low".
declare -A VOICES=(
    ["en_GB-alan-medium.onnx"]="en/en_GB/alan/medium/en_GB-alan-medium.onnx"
    ["en_GB-alan-medium.onnx.json"]="en/en_GB/alan/medium/en_GB-alan-medium.onnx.json"
    ["ar_JO-kareem-medium.onnx"]="ar/ar_JO/kareem/medium/ar_JO-kareem-medium.onnx"
    ["ar_JO-kareem-medium.onnx.json"]="ar/ar_JO/kareem/medium/ar_JO-kareem-medium.onnx.json"
)

for fname in "${!VOICES[@]}"; do
    out="${VOICES_DIR}/${fname}"
    if [[ ! -s "${out}" ]]; then
        echo "Downloading ${fname}..."
        curl -fsSL "${HF_BASE}/${VOICES[$fname]}" -o "${out}"
    fi
done

echo "Voices ready in ${VOICES_DIR}:"
ls -lh "${VOICES_DIR}"

exec uvicorn app:app --host 0.0.0.0 --port "${PORT:-7860}"
