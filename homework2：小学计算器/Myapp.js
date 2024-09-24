const fs = require('fs');

/**
 * 表示一个分数的类。
 */
class Fraction {
  /**
   * 创建一个分数对象。
   * @param {number} numerator - 分子。
   * @param {number} denominator - 分母。
   */
  constructor(numerator, denominator) {
    this.numerator = numerator;
    this.denominator = denominator;
    this.simplify();
  }

  /**
   * 简化分数。
   * @private
   */
  simplify() {
    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    const common = gcd(this.numerator, this.denominator);
    this.numerator = this.numerator / common;
    this.denominator = this.denominator / common;
  }

  /**
   * 将分数转换为字符串表示形式。
   * @returns {string} 分数的字符串表示形式。
   */
  toString() {
    if (this.denominator === 1) {
      return this.numerator.toString();
    }
    return `${this.numerator}/${this.denominator}`;
  }

  /**
   * 将两个分数相加。
   * @param {Fraction} f1 - 第一个分数。
   * @param {Fraction} f2 - 第二个分数。
   * @returns {Fraction} 相加后的分数。
   */
  static add(f1, f2) {
    let num = f1.numerator * f2.denominator + f2.numerator * f1.denominator;
    let denom = f1.denominator * f2.denominator;
    return new Fraction(num, denom).simplify();
  }
  
  /**
   * 将两个分数相减。
   * @param {Fraction} f1 - 第一个分数。
   * @param {Fraction} f2 - 第二个分数。
   * @returns {Fraction} 相减后的分数。
   */
  static subtract(f1, f2) {
    let num = f1.numerator * f2.denominator - f2.numerator * f1.denominator;
    let denom = f1.denominator * f2.denominator;
    return new Fraction(num, denom).simplify();
  }
  
  /**
   * 将两个分数相乘。
   * @param {Fraction} f1 - 第一个分数。
   * @param {Fraction} f2 - 第二个分数。
   * @returns {Fraction} 相乘后的分数。
   */
  static multiply(f1, f2) {
    let num = f1.numerator * f2.numerator;
    let denom = f1.denominator * f2.denominator;
    return new Fraction(num, denom).simplify();
  }
  
  /**
   * 将两个分数相除。
   * @param {Fraction} f1 - 第一个分数。
   * @param {Fraction} f2 - 第二个分数。
   * @returns {Fraction} 相除后的分数。
   */
  static divide(f1, f2) {
    let num = f1.numerator * f2.denominator;
    let denom = f1.denominator * f2.numerator;
    return new Fraction(num, denom).simplify();
  }
}
// 生成随机自然数或真分数
function generateRandomNumberOrFraction(range) {
  let isFraction = Math.random() > 0.5;
  if (isFraction) {
    let numerator = Math.floor(Math.random() * range) + 1;
    let denominator = Math.floor(Math.random() * range) + 1;
    return new Fraction(numerator, denominator);
  } else {
    return Math.floor(Math.random() * range);
  }
}

// 生成随机运算符
function getRandomOperator() {
  const operators = ['+', '-', '*', '/'];
  return operators[Math.floor(Math.random() * operators.length)];
}

// 生成随机表达式
function generateExpression(maxOperators, range) {
  let expr = generateRandomNumberOrFraction(range).toString();
  let operatorCount = Math.floor(Math.random() * (maxOperators - 1)) + 1; // 至少一个运算符

  for (let i = 0; i < operatorCount; i++) {
    let operator = getRandomOperator();
    let nextNum = generateRandomNumberOrFraction(range).toString();
    if (operator === '-' && (expr instanceof Fraction ? expr.numerator < nextNum : expr < nextNum)) {
      [expr, nextNum] = [nextNum, expr]; // 确保减法表达式不产生负数
    }
    if (operator === '/' && (expr instanceof Fraction ? expr.numerator <= nextNum : expr <= nextNum)) {
      if (nextNum instanceof Fraction ? nextNum.numerator === 0 : nextNum === 0) {
        i--; // 除数不能为 0，重新生成
        continue;
      }
    }
    expr = `(${expr} ${operator} ${nextNum})`;
  }

  return expr;
}

// 计算表达式结果
function evaluateExpression(expr) {
  try {
    return eval(expr);
  } catch (e) {
    return null;
  }
}

// 生成题目和答案
function generateProblems(numProblems, range) {
  let problems = [];
  let answers = [];
  let generated = new Set();

  for (let i = 0; i < numProblems; i++) {
    let problem;
    do {
      problem = generateExpression(3, range);
      problem = problem.replace(/,/g, "'");
    } while (generated.has(problem));
    generated.add(problem);
    let answer = evaluateExpression(problem);
    
    if (answer !== null && answer !== 0) { // 避免生成 0 = 的无效题目
      problems.push(`${i + 1}. ${problem} = `); // 添加序号
      answers.push(`${i + 1}. ${answer}`); // 添加序号
    } else {
      i--; // 重新生成
    }
  }

  fs.writeFileSync('Exercises.txt', problems.join('\n'));
  fs.writeFileSync('Answers.txt', answers.join('\n'));
}

// 对答案进行判定
function gradeProblems(exerciseFile, answerFile) {
  let exercises = fs.readFileSync(exerciseFile, 'utf-8').split('\n');
  let answers = fs.readFileSync(answerFile, 'utf-8').split('\n');

  let correct = [];
  let wrong = [];

  for (let i = 0; i < exercises.length; i++) {
    let problemNumber = i + 1; // 题目编号
    let actualAnswer = evaluateExpression(exercises[i].replace(/ = $/, '').split('. ')[1]);
    let studentAnswer = answers[i].split(' ')[1];
    console.log(i, actualAnswer, studentAnswer, exercises[i].replace(/ = $/, '').split('. ')[1]);
    if (actualAnswer.toString() === studentAnswer.toString()) {
      correct.push(problemNumber);
    } else {
      wrong.push(problemNumber);
    }
  }

  fs.writeFileSync('Grade.txt', `Correct: ${correct.length} (${correct.join(', ')})\nWrong: ${wrong.length} (${wrong.join(', ')})`);
}

// 命令行参数解析
const args = process.argv.slice(2);
if (args.includes('-n') && args.includes('-r')) {
  let numProblems = parseInt(args[args.indexOf('-n') + 1]);
  let range = parseInt(args[args.indexOf('-r') + 1]);
  if (isNaN(range)) {
    console.log("必须输入一个数字作为范围。");
    process.exit(1);
  }
  generateProblems(numProblems, range);
} else if (args.includes('-e') && args.includes('-a')) {
  let exerciseFile = args[args.indexOf('-e') + 1];
  let answerFile = args[args.indexOf('-a') + 1];
  gradeProblems(exerciseFile, answerFile);
} else {
  console.log("用例: Myapp.exe -n <number of problems> -r <range> or Myapp.exe -e <exercise file> -a <answer file>");
}