import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Принимает заказ из корзины и сохраняет в базу данных."""

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
