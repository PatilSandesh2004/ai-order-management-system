from app.services.email_service import send_email_alert

send_email_alert(
    subject="AI OMS Test",
    message="Email service is working",
    receiver_email="Sandesh20004@gmail.com"
)