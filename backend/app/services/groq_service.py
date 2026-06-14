from groq import Groq

from app.config import chat_config


class GroqService:

    def __init__(self):

        self.client = Groq(
            api_key=chat_config.GROQ_API_KEY
        )

    def generate_response(
        self,
        question: str,
        context: str = ""
    ):

        response = (
            self.client.chat.completions.create(
                model=chat_config.GROQ_MODEL,
                temperature=0.1,
                messages=[
                    {
                        "role": "system",
                        "content": """
You are an AI Order Management Assistant.

Your job is to answer questions using ONLY the provided business context.

Rules:

1. Use ONLY the provided context.
2. Do NOT ask for more information if the answer exists in the context.
3. Give concise business-friendly answers.
4. Do NOT mention raw context.
5. If context is empty, say:
   'No data available.'
6. Do not hallucinate values.
7. Convert counts into natural language.

Examples:

Context:
Active Orders Count: 7

Question:
How many active orders are there?

Answer:
There are currently 7 active orders.

----------------------------------

Context:
Delivered Orders Count: 15

Question:
How many delivered orders are there?

Answer:
There are currently 15 delivered orders.
"""
                    },
                    {
                        "role": "user",
                        "content": f"""
Business Context:

{context}

User Question:

{question}
"""
                    }
                ]
            )
        )

        return (
            response
            .choices[0]
            .message
            .content
        )


groq_service = GroqService()