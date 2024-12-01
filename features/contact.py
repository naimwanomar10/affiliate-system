#!/usr/bin/env python3
import cgi
import cgitb

# Enable debugging (optional, helpful for development)
cgitb.enable()

# Print HTTP headers
print("Content-Type: text/html\n")

# Parse form data
form = cgi.FieldStorage()
name = form.getvalue("name")
email = form.getvalue("email")
message = form.getvalue("message")

# Input validation
if not name or not email or not message:
    print("""
    <html>
    <head>
        <title>Error: Missing Information</title>
    </head>
    <body>
        <h2>Error: Missing Information</h2>
        <p>Please ensure all fields are filled out before submitting the form.</p>
        <p><a href="/index.html">Back to Contact Form</a></p>
    </body>
    </html>
    """)
else:
    # Display a confirmation message
    print(f"""
    <html>
    <head>
        <title>Contact Submitted</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                color: #333;
                margin: 0;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                text-align: center;
            }}
            h2 {{
                color: #4CAF50;
            }}
            a {{
                color: #2196F3;
                text-decoration: none;
            }}
            a:hover {{
                text-decoration: underline;
            }}
        </style>
    </head>
    <body>
        <h2>Thank you, {name}!</h2>
        <p>We have received your message and will get back to you shortly.</p>
        <p><strong>Your Message:</strong></p>
        <p>{message}</p>
        <p><a href="/index.html">Back to the website</a></p>
    </body>
    </html>
    """)
    
