#!/usr/bin/env bash
set -uo pipefail

VOICES_DIR="${VOICES_DIR:-/data/voices}"
HF_BASE="https://huggingface.co/rhasspy/piper-voices/resolve/main"

# Fall back to a directory we can certainly write. Persistent storage is not
# enabled on every Space, and an unwritable voices directory used to kill the
# container on boot.
if ! mkdir -p "${VOICES_DIR}" 2>/dev/null || [[ ! -w "${VOICES_DIR}" ]]; then
    echo "WARNING: ${VOICES_DIR} is not writable — using /tmp/voices instead."
    VOICES_DIR="/tmp/voices"
    mkdir -p "${VOICES_DIR}"
fi
export VOICES_DIR

# Medium-quality voices — much more natural than "low".
declare -A VOICES=(
    ["en_GB-alan-medium.onnx"]="en/en_GB/alan/medium/en_GB-alan-medium.onnx"
    ["en_GB-alan-medium.onnx.json"]="en/en_GB/alan/medium/en_GB-alan-medium.onnx.json"
    # صوتٌ نسائيّ بريطانيّ — مس ثريا معلّمة، فصوتها أنثى
    ["en_GB-cori-medium.onnx"]="en/en_GB/cori/medium/en_GB-cori-medium.onnx"
    ["en_GB-cori-medium.onnx.json"]="en/en_GB/cori/medium/en_GB-cori-medium.onnx.json"
    ["ar_JO-kareem-medium.onnx"]="ar/ar_JO/kareem/medium/ar_JO-kareem-medium.onnx"
    ["ar_JO-kareem-medium.onnx.json"]="ar/ar_JO/kareem/medium/ar_JO-kareem-medium.onnx.json"
)

# A single failed download must NOT kill the Space. Before, `set -e` plus a
# failing curl meant the container exited and every page got 503 forever —
# one unreachable voice took the whole tutor offline. Now we log it, drop the
# half-written file, and start with whatever voices did arrive.
for fname in "${!VOICES[@]}"; do
    out="${VOICES_DIR}/${fname}"
    if [[ ! -s "${out}" ]]; then
        echo "Downloading ${fname}..."
        if ! curl -fsSL --retry 3 --retry-delay 2 --max-time 300 \
                 "${HF_BASE}/${VOICES[$fname]}" -o "${out}"; then
            echo "WARNING: could not download ${fname} — continuing without it."
            rm -f "${out}"
        fi
    fi
done

echo "Voices ready in ${VOICES_DIR}:"
ls -lh "${VOICES_DIR}" || true

if ! ls "${VOICES_DIR}"/*.onnx >/dev/null 2>&1; then
    echo "ERROR: no voice models available — /synthesize will answer 503."
fi

exec uvicorn app:app --host 0.0.0.0 --port "${PORT:-7860}"
