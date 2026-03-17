import json
import os
import smtplib
import psycopg2
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_email_notification(order_id, name, phone, email, address, comment, items, total_price):
    """Отправляет уведомление о новом заказе на почту владельца."""
    smtp_login = os.environ.get('SMTP_LOGIN', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    notify_email = os.environ.get('NOTIFY_EMAIL', '')

    if not smtp_login or not smtp_password or not notify_email:
        return

    items_html = ''.join(
        f"<tr><td style='padding:4px 8px'>{i.get('name','')}</td>"
        f"<td style='padding:4px 8px;text-align:center'>{i.get('qty','')}</td>"
        f"<td style='padding:4px 8px;text-align:right'>{i.get('price','')}</td></tr>"
        for i in items
    )

    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px">
      <h2 style="color:#333">Новый заказ #{order_id}</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
        <tr><td style="padding:4px 8px;color:#666">Имя:</td><td style="padding:4px 8px"><b>{name}</b></td></tr>
        <tr><td style="padding:4px 8px;color:#666">Телефон:</td><td style="padding:4px 8px"><b>{phone}</b></td></tr>
        {"<tr><td style='padding:4px 8px;color:#666'>Email:</td><td style='padding:4px 8px'>" + email + "</td></tr>" if email else ""}
        {"<tr><td style='padding:4px 8px;color:#666'>Адрес:</td><td style='padding:4px 8px'>" + address + "</td></tr>" if address else ""}
        {"<tr><td style='padding:4px 8px;color:#666'>Комментарий:</td><td style='padding:4px 8px'>" + comment + "</td></tr>" if comment else ""}
      </table>
      <h3 style="color:#333">Состав заказа</h3>
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee">
        <thead>
          <tr style="background:#f5f5f5">
            <th style="padding:6px 8px;text-align:left">Товар</th>
            <th style="padding:6px 8px">Кол-во</th>
            <th style="padding:6px 8px;text-align:right">Цена</th>
          </tr>
        </thead>
        <tbody>{items_html}</tbody>
      </table>
      <p style="font-size:18px;margin-top:16px">Итого: <b>{total_price} ₽</b></p>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новый заказ #{order_id} — {name}'
    msg['From'] = smtp_login
    msg['To'] = notify_email
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    domain = smtp_login.split('@')[-1].lower()
    if 'yandex' in domain or 'ya.ru' in domain:
        host, port = 'smtp.yandex.ru', 465
        use_ssl = True
    elif 'mail.ru' in domain or 'bk.ru' in domain or 'list.ru' in domain or 'inbox.ru' in domain:
        host, port = 'smtp.mail.ru', 465
        use_ssl = True
    else:
        host, port = 'smtp.gmail.com', 465
        use_ssl = True

    if use_ssl:
        server = smtplib.SMTP_SSL(host, port)
    else:
        server = smtplib.SMTP(host, port)
        server.starttls()

    server.login(smtp_login, smtp_password)
    server.sendmail(smtp_login, notify_email, msg.as_string())
    server.quit()


def send_email_confirmation(order_id, name, email, address, comment, items, total_price, smtp_login, smtp_password, host, port, use_ssl):
    """Отправляет покупателю подтверждение заказа."""
    if not email:
        return

    items_html = ''.join(
        f"<tr><td style='padding:6px 12px'>{i.get('name','')}</td>"
        f"<td style='padding:6px 12px;text-align:center'>{i.get('qty','')}</td>"
        f"<td style='padding:6px 12px;text-align:right'>{i.get('price','')}</td></tr>"
        for i in items
    )

    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
      <div style="background:#1a1a1a;padding:24px 32px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:28px;letter-spacing:4px">MyBarista</h1>
      </div>
      <div style="padding:32px">
        <h2 style="margin-top:0">Ваш заказ принят!</h2>
        <p>Привет, {name}! Мы получили ваш заказ <b>#{order_id}</b> и скоро свяжемся с вами для подтверждения.</p>
        <h3>Состав заказа</h3>
        <table style="width:100%;border-collapse:collapse;border:1px solid #eee">
          <thead>
            <tr style="background:#f5f5f5">
              <th style="padding:8px 12px;text-align:left">Товар</th>
              <th style="padding:8px 12px">Кол-во</th>
              <th style="padding:8px 12px;text-align:right">Цена</th>
            </tr>
          </thead>
          <tbody>{items_html}</tbody>
        </table>
        <p style="font-size:20px;margin-top:16px">Итого: <b>{total_price} ₽</b></p>
        {"<p><b>Адрес доставки:</b> " + address + "</p>" if address else ""}
        {"<p><b>Комментарий:</b> " + comment + "</p>" if comment else ""}
        <p style="color:#666;font-size:14px;margin-top:32px">Если у вас есть вопросы — просто ответьте на это письмо.</p>
      </div>
      <div style="background:#f5f5f5;padding:16px 32px;text-align:center;font-size:12px;color:#999">
        MyBarista — премиальные кофемолки и кофемашины
      </div>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Заказ #{order_id} принят — MyBarista'
    msg['From'] = smtp_login
    msg['To'] = email
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    if use_ssl:
        server = smtplib.SMTP_SSL(host, port)
    else:
        server = smtplib.SMTP(host, port)
        server.starttls()

    server.login(smtp_login, smtp_password)
    server.sendmail(smtp_login, email, msg.as_string())
    server.quit()


def handler(event: dict, context) -> dict:
    """Принимает заказ из корзины, сохраняет в базу данных и отправляет email-уведомления владельцу и покупателю."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    raw_body = event.get('body', '{}') or '{}'
    if isinstance(raw_body, dict):
        body = raw_body
    else:
        body = json.loads(raw_body)

    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    address = body.get('address', '').strip()
    comment = body.get('comment', '').strip()
    items = body.get('items', [])
    total_price = body.get('total_price', 0)

    if not name or not phone or not items:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'Укажите имя, телефон и товары'}
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO t_p83199393_coffee_shop_launch.orders
          (customer_name, customer_phone, customer_email, customer_address, items, total_price, comment)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING id, created_at
        """,
        (name, phone, email, address, json.dumps(items, ensure_ascii=False), total_price, comment)
    )

    row = cur.fetchone()
    order_id = row[0]
    created_at = row[1].isoformat()

    conn.commit()
    cur.close()
    conn.close()

    smtp_login = os.environ.get('SMTP_LOGIN', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')

    domain = smtp_login.split('@')[-1].lower() if smtp_login else ''
    if 'yandex' in domain or 'ya.ru' in domain:
        host, port, use_ssl = 'smtp.yandex.ru', 465, True
    elif 'mail.ru' in domain or 'bk.ru' in domain or 'list.ru' in domain or 'inbox.ru' in domain:
        host, port, use_ssl = 'smtp.mail.ru', 465, True
    else:
        host, port, use_ssl = 'smtp.gmail.com', 465, True

    try:
        send_email_notification(order_id, name, phone, email, address, comment, items, total_price)
    except Exception as e:
        print(f"Owner email notification failed: {e}")

    try:
        send_email_confirmation(order_id, name, email, address, comment, items, total_price, smtp_login, smtp_password, host, port, use_ssl)
    except Exception as e:
        print(f"Customer email confirmation failed: {e}")

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': {
            'success': True,
            'order_id': order_id,
            'created_at': created_at,
            'message': f'Заказ #{order_id} успешно оформлен!'
        }
    }