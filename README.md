# local_language_corrector

Agent n8n workflow which correct french text based on languagetool and ollama in local.
Avoid sending sensitive information to correct your text.
This workflow aim to avoid spending to much brain time on french language correction.


## Prerequisite
Docker installed

The Phi4 model is used in the workflow. You have to check if your pc configuration is compatible.

## Installation
### setup
```sh
docker compose up -d
```

### Download model
Enter in ollama docker with bash.
```sh
docker exec -it my_agent_ollama bash
```
Download model in it:
```
ollama pull phi4
```

## How to use it
You can install the extension, or use it througth this endpoint:
```sh
curl -G "http://localhost:5678/webhook/check" \
  --data-urlencode "text=Les lapin ne mangent que du cavir. En effets les lapins aiment le caviar selon une étude de l'universitée du massàchausette."
```
Réponse:
```json
{"output":"Les lapins ne mangent que du caviar. En effet, les lapins aiment le caviar selon une étude de l’université du Massachusetts."}
```
