import { Decimal } from 'decimal.js';

/**
 * 高精度加法
 * @param a 第一个数（数字/字符串，推荐传字符串避免提前丢失精度）
 * @param b 第二个数
 * @returns 运算结果（可按需返回数字/字符串）
 */
export const add = (a: number | string, b: number | string): number => {
  return new Decimal(a).add(new Decimal(b)).toNumber();
};

/**
 * 高精度减法
 */
export const sub = (a: number | string, b: number | string): number => {
  return new Decimal(a).sub(new Decimal(b)).toNumber();
};

/**
 * 高精度乘法
 */
export const mul = (a: number | string, b: number | string): number => {
  return new Decimal(a).mul(new Decimal(b)).toNumber();
};

/**
 * 高精度除法
 * @param precision 保留小数位数（默认2位）
 */
export const div = (a: number | string, b: number | string, precision = 2): number => {
  return new Decimal(a).div(new Decimal(b)).toDecimalPlaces(precision).toNumber();
};

/**
 * 格式化浮点数（解决显示时的精度问题，如 0.30000000000000004 → 0.3）
 */
export const formatFloat = (num: number, precision = 2): string => {
  return new Decimal(num).toDecimalPlaces(precision).toString();
};