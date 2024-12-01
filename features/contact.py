#!/usr/bin/env python3

import cgi
import cgitb
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Enable debugging
cgitb.enable()

# Print HTTP headers
print("Content-Type: text/html\n")

# Get form data
form = cgi.FieldStorage()

# Retrieve individual fields
name = form.getvalue("name")
email = form.getvalue("email")
message = form.getvalue("message")

# Validate the input
if not name or not email or not message:
    print("""
    <html>
    <head>
        <title>Contact Submission Error</title>
    </head>
    <body>
        <h2>Error: Missing Information</h2>
        <p>Please make sure all fields are filled out and try again.</p>
        <p><a href="/index.html">Back to Contact Form</a></p>
    </body>
    </html>
    """)
else:
    # Prepare email content (optional)
    sender_email = "your-email@example.com"  # Replace with your email
    sender_password = "your-email-password"  # Replace with your password
    recipient_email = "recipient@example.com"  # Replace with your recipient email

    subject = f"New Contact Form Submission from {name}"
    email_message = f"""
    Name: {name}
    Email: {email}
    Message:
    {message}
    """

    try:
        # Set up the email server (optional - remove if email is not required)
        smtp_server = smtplib.SMTP("smtp.gmail.com", 587)  # Replace with your SMTP server
        smtp_server.starttls()
        smtp_server.login(sender_email, sender_password)

        # Compose the email
        msg = MIMEMultipart()
        msg["From"] = sender_email
        msg["To"] = recipient_email
        msg["Subject"] = subject
        msg.attach(MIMEText(email_message, "plain"))

        # Send the email
        smtp_server.send_message(msg)
        smtp_server.quit()

        email_status = "Message sent successfully!"
    except Exception as e:
        email_status = f"Failed to send email: {str(e)}"

    # Display confirmation message
    print(f"""
    <html>
    <head>
        <title>Contact Submitted</title>
    </head>
    <body>
        <h2>Thank you, {name}!</h2>
        <p>We have received your message and will get back to you shortly.</p>
        <p><strong>Your Message:</strong> {message}</p>
        <p>{email_status}</p>
        <p><a href="/index.html">Back to Website</a></p>
    </body>
    </html>
    """)
  
