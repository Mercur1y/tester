import json
import os
import pika
from pika import PlainCredentials, ConnectionParameters
from sympy import symbols, simplify, diff, sympify

RABBIT_HOST = os.getenv('RABBIT_HOST', 'host.docker.internal')
RABBIT_USER = os.getenv('RABBIT_USER', 'guest')
RABBIT_PASSWORD = os.getenv('RABBIT_PASSWORD', 'guest')

# входные данные
IN_EXCHANGE = 'ru.ex.equation.request'
DIFF_QUEUE = 'ru.qu.equation.differential.request'
SIMPLIFY_QUEUE = 'ru.qu.simplification.request'

# выходной exchange и routing key
OUT_EXCHANGE = 'ru.ex.equation.response'
OUT_ROUTING_KEY = 'ru.qu.equation.response'

def connect():
    credentials = PlainCredentials(RABBIT_USER, RABBIT_PASSWORD)
    parameters = ConnectionParameters(
        host=RABBIT_HOST,
        port=5672,
        credentials=credentials
    )

    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()
    return connection, channel

def process_formulas(formulas, mode):
    x = symbols('x')
    result = []

    for item in formulas:
        raw_formula = item['formula']
        expr_str = raw_formula.replace('^', '**').replace('∗', '*')
        expr = sympify(expr_str)

        if mode == 'derivative':
            output = diff(expr, x)
        elif mode == 'simplify':
            output = simplify(expr)
        else:
            output = expr

        result.append({
            'formula': raw_formula,            # оригинальная формула
            'rightAnswer': str(output)         # вычисленный результат
        })

    return result

def send_response(channel, test_id, formulas):
    payload = {
        "testId": test_id,
        "formulas": formulas
    }
    channel.basic_publish(
        exchange=OUT_EXCHANGE,
        routing_key=OUT_ROUTING_KEY,
        body=json.dumps(payload),
        properties=pika.BasicProperties(delivery_mode=2)
    )

def handle_message(ch, method, properties, body, mode):
    data = json.loads(body)
    test_id = data.get("testId")
    formulas = data.get("formulas", [])
    result = process_formulas(formulas, mode)
    send_response(ch, test_id, result)
    print(f"[x] Processed {mode} for testId {test_id}")

def main():
    conn, ch = connect()

    # обрабатываем exchange и очереди
    ch.exchange_declare(exchange=IN_EXCHANGE, exchange_type='direct', durable=True)
    ch.exchange_declare(exchange=OUT_EXCHANGE, exchange_type='fanout', durable=True)

    ch.queue_declare(queue=DIFF_QUEUE, durable=True)
    ch.queue_declare(queue=SIMPLIFY_QUEUE, durable=True)

    ch.queue_bind(exchange=IN_EXCHANGE, queue=DIFF_QUEUE, routing_key='ru.key.equation.differential.request')
    ch.queue_bind(exchange=IN_EXCHANGE, queue=SIMPLIFY_QUEUE, routing_key='ru.key.simplification.request')

    # регистрация консюмеров
    ch.basic_consume(
        queue=DIFF_QUEUE,
        on_message_callback=lambda ch, method, props, body: handle_message(ch, method, props, body, mode='derivative'),
        auto_ack=True
    )

    ch.basic_consume(
        queue=SIMPLIFY_QUEUE,
        on_message_callback=lambda ch, method, props, body: handle_message(ch, method, props, body, mode='simplify'),
        auto_ack=True
    )

    print(" [*] Waiting for messages. To exit press CTRL+C")
    ch.start_consuming()

if __name__ == "__main__":
    main()
