package com.sgtu.tester;

import org.junit.jupiter.api.Test;
import org.mariuszgromada.math.mxparser.*;
import org.mariuszgromada.math.mxparser.mathcollection.MathFunctions;
import org.matheclipse.core.eval.ExprEvaluator;
import org.matheclipse.core.expression.F;
import org.matheclipse.core.interfaces.IExpr;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@SpringBootTest
class TesterApplicationTests {

	private static final String NUMBER_PATTERN = "-?\\d+(\\.\\d+)?";
	private static final String VARIABLE_PATTERN = "[a-zA-Z]";
	private static final String OPERATOR_PATTERN = "[+\\-*/^]";
	private static final String BRACKET_PATTERN = "[()]";

	private static final String FUNCTION_PATTERN = "(sin|cos|tan|log|sqrt)\\([^)]*\\)";

	@Test
	public void getResult() {
		boolean isCallSuccessful = License.iConfirmNonCommercialUse("John Doe");
		boolean isConfirmed = License.checkIfUseTypeConfirmed();
		String message = License.getUseTypeConfirmationMessage();

		mXparser.setDegreesMode();
//		Function function = new Function("f(x) = 3*x + (sin(x^2)) - (5*x + 2)");
//		Expression e = new Expression("f(2)", function);
//		System.out.println(e.getExpressionString() + " = " + e.calculate());

		String inputExpression = "(6/(a-1))-(10/(a-1)^2)/(10/(a^2-1))-(2a+2)/(a-1)";

		// Создание объекта вычислителя выражений
		ExprEvaluator eval = new ExprEvaluator();

		// Определение переменных и выражения
		IExpr expr = eval.parse(inputExpression);

		// Вывод исходного выражения
		System.out.println("Исходное выражение: " + expr.toString());

		// Упрощение выражения
		IExpr simplifiedExpr = eval.eval(expr);

		// Вывод упрощенного выражения
		System.out.println("Упрощенное выражение: " + simplifiedExpr.toString());
//		Expression expression = new Expression("sin(x)^2 + cos(x)^2 + 1/(1 + tan(x/2))");
//		expression.setDescription("Сложное выражение с дробями и тригонометрическими функциями");
//
//		Argument x = new Argument("x = 0"); // Создание аргумента x и установка его значения
//		expression.addArguments(x); // Добавление аргумента к выражению
//
//		System.out.println("Исходное выражение: " + expression.getExpressionString());
//
//		double result = expression.calculate(); // Вычисление значения выражения
//		System.out.println("Результат вычисления: " + result);
//
//		// Упрощенное выражение (после вычисления)
//		System.out.println("Упрощенное выражение: " + expression.getExpressionString());
	}

	public static void parseExpression(String expression) {
		Pattern pattern = Pattern.compile(NUMBER_PATTERN + "|" + VARIABLE_PATTERN + "|" +
				OPERATOR_PATTERN + "|" + BRACKET_PATTERN + "|" + FUNCTION_PATTERN);
		Matcher matcher = pattern.matcher(expression);

		while (matcher.find()) {
			String match = matcher.group();
			System.out.println(match);
		}
	}

//	public static void solveEquation(String expression, String variable) {
//		Function function = new Function("f(x)=" + expression);
//		Expression e = new Expression("f(2)", function);
//		System.out.println(e.getExpressionString() + " = " + e.calculate());
//	}

}
