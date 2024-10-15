import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "server.api:app",
        host="0.0.0.0",
        port=5000,
        reload=True,
        ssl_certfile="/etc/letsencrypt/live/gymio.me/fullchain.pem",
        ssl_keyfile="/etc/letsencrypt/live/gymio.me/privkey.pem",
    )
