# -*- coding: utf-8 -*-
import json
from pathlib import Path

patches = json.loads(Path("scripts/message-patches.json").read_text(encoding="utf-8"))

def deep_merge(base, patch):
    for k, v in patch.items():
        if isinstance(v, dict) and isinstance(base.get(k), dict):
            deep_merge(base[k], v)
        else:
            base[k] = v

for loc, patch in patches.items():
    path = Path(f"messages/{loc}.json")
    data = json.loads(path.read_text(encoding="utf-8"))
    if "nav" in data and "boutiques" in data["nav"]:
        del data["nav"]["boutiques"]
    if "cta" in data and "findBoutiques" in data["cta"]:
        del data["cta"]["findBoutiques"]
    if "boutiquesPage" in data:
        del data["boutiquesPage"]
    deep_merge(data, patch)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("patched", loc)
