# React OIDC Demo

React app using https://github.com/bjerkio/oidc-react connecting against ORY Hyrda


# Getting Started
## Setting ORY Hyrda

https://www.ory.sh/hydra/docs/configure-deploy

```
docker network create hydraguide

docker run \
  --network hydraguide \
  --name ory-hydra-example--postgres \
  -e POSTGRES_USER=hydra \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=hydra \
  -d postgres:9.6

export SECRETS_SYSTEM=$(export LC_CTYPE=C; cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)
export DSN=postgres://hydra:secret@ory-hydra-example--postgres:5432/hydra?sslmode=disable

docker run -it --rm  --network hydraguide   oryd/hydra:v1.10.3   migrate sql --yes $DSN 

docker run -d     --name ory-hydra-example--hydra     --network hydraguide     -p 9000:4444     -p 9001:4445     -e SECRETS_SYSTEM=$SECRETS_SYSTEM     -e DSN=$DSN     -e URLS_SELF_ISSUER=https://localhost:9000/     -e URLS_CONSENT=http://localhost:9020/consent     -e URLS_LOGIN=http://localhost:9020/login     -e SERVE_PUBLIC_CORS_ENABLED=true     oryd/hydra:v1.10.3 serve all

docker run --rm -it \
  -e HYDRA_ADMIN_URL=https://ory-hydra-example--hydra:4445 \
  --network hydraguide \
  oryd/hydra:v1.10.3 \
  clients create --skip-tls-verify \
    --id foo-app \
    --secret some-secret \
    --grant-types authorization_code,refresh_token,client_credentials,implicit \
    --response-types token,code,id_token \
    --scope openid,offline,photos.read \
    --callbacks http://127.0.0.1:3000/
```

## Run the app

http://localhost:3000 then login