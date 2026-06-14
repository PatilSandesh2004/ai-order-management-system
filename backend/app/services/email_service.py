import os
import smtplib

from dotenv import load_dotenv
from email.mime.text import MIMEText

load_dotenv()

EMAIL = os.getenv("EMAIL_ADDRESS")
PASSWORD = os.getenv("EMAIL_PASSWORD")


def send_email_alert(
    subject,
    message,
    receiver_email
):

    msg = MIMEText(message)

    msg["Subject"] = subject
    msg["From"] = EMAIL
    msg["To"] = receiver_email

    server = smtplib.SMTP(
        "smtp.gmail.com",
        587
    )

    server.starttls()

    server.login(
        EMAIL,
        PASSWORD
    )

    server.sendmail(
        EMAIL,
        receiver_email,
        msg.as_string()
    )

    server.quit()

    print("Email Sent")