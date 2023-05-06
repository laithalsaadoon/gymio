import uvicorn


if __name__ == "__main__":
    uvicorn.run(
        "app.api:app",
        host="0.0.0.0",
        port=5000,
        reload=True,
        ssl_certfile="/etc/ssl/certs/certificate.crt",
        ssl_keyfile="/etc/ssl/private/private.key",
    )
