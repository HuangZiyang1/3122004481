// Myapp.test.js
const { generateRandomNumberOrFraction } = require('./Myapp');
const Fraction = require('fraction.js'); // 假设 Fraction 类在 fraction.js 中定义

test('range 为 1 时返回自然数', () => {
    const result = generateRandomNumberOrFraction(1);
    expect(Number.isInteger(result)).toBe(true);
});

test('range 大于 1 时返回自然数或真分数', () => {
    const result = generateRandomNumberOrFraction(10);
    if (typeof result === 'number') {
        expect(Number.isInteger(result)).toBe(true);
    } else {
        // 我们生成的真分数形如5/6或者1'5/6，所以需要处理
        if (typeof result === 'string') {
            const [integerPart, numerator, denominator] = result.split(/['/]/).map(Number);
            expect(numerator).toBeLessThan(denominator);
        } else if (result instanceof Fraction) {
            expect(result.numerator).toBeLessThan(result.denominator);
        }
    }
});

test('返回的分数是一个真分数', () => {
    const result = generateRandomNumberOrFraction(10);
    if (result instanceof Fraction) {
        expect(result.numerator).toBeLessThan(result.denominator);
    }
});

test('生成的自然数在范围内', () => {
    const range = 10;
    const result = generateRandomNumberOrFraction(range);
    if (typeof result === 'number') {
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(range);
    }
});

test('生成的分数分子和分母在范围内', () => {
    const range = 10;
    const result = generateRandomNumberOrFraction(range);
    if (result instanceof Fraction) {
        expect(result.numerator).toBeGreaterThanOrEqual(1);
        expect(result.numerator).toBeLessThanOrEqual(range);
        expect(result.denominator).toBeGreaterThanOrEqual(1);
        expect(result.denominator).toBeLessThanOrEqual(range);
    }
});

test('生成的假分数被正确处理为真分数', () => {
    const range = 10;
    const result = generateRandomNumberOrFraction(range);
    if (typeof result === 'string') {
        const [integerPart, numerator, denominator] = result.split(/['/]/).map(Number);
        expect(numerator).toBeLessThan(denominator);
    }
});

test('生成的自然数和分数是正数', () => {
    const range = 10;
    const result = generateRandomNumberOrFraction(range);
    if (typeof result === 'number') {
        expect(result).toBeGreaterThan(0);
    } else if (result instanceof Fraction) {
        expect(result.numerator).toBeGreaterThan(0);
        expect(result.denominator).toBeGreaterThan(0);
    }
});

test('生成的分数不等于1', () => {
    const range = 10;
    const result = generateRandomNumberOrFraction(range);
    if (result instanceof Fraction) {
        expect(result.numerator).not.toBe(result.denominator);
    }
});

test('生成的自然数不等于0', () => {
    const range = 10;
    const result = generateRandomNumberOrFraction(range);
    if (typeof result === 'number') {
        expect(result).not.toBe(0);
    }
});

test('生成的分数分母不等于0', () => {
    const range = 10;
    const result = generateRandomNumberOrFraction(range);
    if (result instanceof Fraction) {
        expect(result.denominator).not.toBe(0);
    }
});