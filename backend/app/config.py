import os


class ChatConfig:

    GROQ_API_KEY = os.getenv(
        "GROQ_API_KEY"
    )

    GROQ_MODEL = os.getenv(
        "GROQ_MODEL",
        "llama-3.3-70b-versatile"
    )

    CHAT_TEMPERATURE = float(
        os.getenv(
            "CHAT_TEMPERATURE",
            0.1
        )
    )

    MAX_CHAT_TOKENS = int(
        os.getenv(
            "MAX_CHAT_TOKENS",
            1024
        )
    )
    GROQ_ROUTER_MODEL = os.getenv(
            "GROQ_ROUTER_MODEL"
        )

chat_config = ChatConfig()