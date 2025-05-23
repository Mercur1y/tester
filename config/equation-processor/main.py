import json
import os
import pika
from pika import PlainCredentials, ConnectionParameters
from sympy import symbols, simplify, diff
from sympy.parsing.sympy_parser import (
    parse_expr, standard_transformations, implicit_multiplication_application
)

# Подключение
RABBIT_HOST = os.getenv('RABBIT_HOST', 'host.docker.internal')
RABBIT_USER = os.getenv('RABBIT_USER', 'guest')
RABBIT_PASSWORD = os.getenv('RABBIT_PASSWORD', 'guest')

# Exchange и очереди
IN_EXCHANGE = 'ru.ex.equation.request'
DIFF_QUEUE = 'ru.qu.equation.differential.request'
SIMPLIFY_QUEUE = 'ru.qu.simplification.request'
CHECK_QUEUE = 'ru.qu.expression.check'
CHECK_ROUTING_KEY = 'ru.key.expression.check'

OUT_EXCHANGE = 'ru.ex.equation.response'
OUT_ROUTING_KEY = 'ru.qu.equation.response'

CHECK_RESPONSE_EXCHANGE = 'ru.ex.expression.check.response'

# Transformations for parsing (support for implicit multiplication)
TRANSFORMS = standard_transformations + (implicit_multiplication_application,)


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

        try:
            expr = parse_expr(expr_str, transformations=TRANSFORMS)

            if mode == 'derivative':
                output = diff(expr, x)
            elif mode == 'simplify':
                output = simplify(expr)
            else:
                output = expr

            result.append({
                'formula': raw_formula,
                'rightAnswer': str(output)
            })
        except Exception as e:
            result.append({
                'formula': raw_formula,
                'rightAnswer': 'ERROR'
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


def handle_check(ch, method, properties, body):
    data = json.loads(body)
    test_id = data.get("testId")
    formulas = data.get("formulas", [])
    result = []

    for f in formulas:
        try:
            expr1 = parse_expr(f['rightAnswer'].replace("^", "**").replace("∗", "*"), transformations=TRANSFORMS)
            expr2 = parse_expr(f['answer'].replace("^", "**").replace("∗", "*"), transformations=TRANSFORMS)
            correct = simplify(expr1 - expr2) == 0
        except Exception as e:
            correct = False

        result.append({
            "id": f["id"],
            "formula": f["formula"],
            "rightAnswer": f["rightAnswer"],
            "answer": f["answer"],
            "correct": correct
        })

    ch.basic_publish(
        exchange=CHECK_RESPONSE_EXCHANGE,
        routing_key='',  # fanout
        body=json.dumps({
            "testId": test_id,
            "formulas": result
        }),
        properties=pika.BasicProperties(delivery_mode=2)
    )
    print(f"[✓] Checked testId {test_id}")


def main():
    conn, ch = connect()

    # Declare exchanges
    ch.exchange_declare(exchange=IN_EXCHANGE, exchange_type='direct', durable=True)
    ch.exchange_declare(exchange=OUT_EXCHANGE, exchange_type='fanout', durable=True)
    ch.exchange_declare(exchange=CHECK_RESPONSE_EXCHANGE, exchange_type='fanout', durable=True)

    # Declare queues
    ch.queue_declare(queue=DIFF_QUEUE, durable=True)
    ch.queue_declare(queue=SIMPLIFY_QUEUE, durable=True)
    ch.queue_declare(queue=CHECK_QUEUE, durable=True)

    # Bind queues
    ch.queue_bind(exchange=IN_EXCHANGE, queue=DIFF_QUEUE, routing_key='ru.key.equation.differential.request')
    ch.queue_bind(exchange=IN_EXCHANGE, queue=SIMPLIFY_QUEUE, routing_key='ru.key.simplification.request')
    ch.queue_bind(exchange=IN_EXCHANGE, queue=CHECK_QUEUE, routing_key=CHECK_ROUTING_KEY)

    # Consume
    ch.basic_consume(queue=DIFF_QUEUE, on_message_callback=lambda ch, m, p, b: handle_message(ch, m, p, b, 'derivative'), auto_ack=True)
    ch.basic_consume(queue=SIMPLIFY_QUEUE, on_message_callback=lambda ch, m, p, b: handle_message(ch, m, p, b, 'simplify'), auto_ack=True)
    ch.basic_consume(queue=CHECK_QUEUE, on_message_callback=handle_check, auto_ack=True)

    print(" [*] Waiting for messages. To exit press CTRL+C")
    ch.start_consuming()


if __name__ == "__main__":
    main()