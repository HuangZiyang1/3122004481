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
