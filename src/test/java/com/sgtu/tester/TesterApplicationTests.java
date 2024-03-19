package com.sgtu.tester;

import org.junit.jupiter.api.Test;
import org.mariuszgromada.math.mxparser.*;
import org.mariuszgromada.math.mxparser.mathcollection.MathFunctions;
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

		String s = "der(sin(2x))";
		String cur = "2cos(2x)";
		Argument x = new Argument("x = 2");
		Expression e2 = new Expression("der(3*x + (sin(x^2)) - (5*x + 2), x)", x);
		CalcStepsRegister calcStepsRegister = new CalcStepsRegister();
		System.out.println(e2.getExpressionString() + " = " + e2.calculate(calcStepsRegister));
		System.out.println("----");
		for (CalcStepRecord step : calcStepsRegister.calcStepRecords)
			mXparser.consolePrintln(step.content);
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
