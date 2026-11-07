/**
 * CSV for the insights exports (issue #243). RFC 4180 quoting, a byte order
 * mark so spreadsheet apps read UTF-8, and cells that start like a formula
 * prefixed with an apostrophe so opening the file never runs one.
 */

export type CsvColumn = readonly [key: string, header: string];

function cell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let s = typeof value === "number" ? (Number.isInteger(value) ? String(value) : value.toFixed(2)) : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCsv(columns: readonly CsvColumn[], rows: readonly Record<string, unknown>[]): string {
  const lines = [columns.map(([, header]) => cell(header)).join(",")];
  for (const row of rows) lines.push(columns.map(([key]) => cell(row[key])).join(","));
  return `﻿${lines.join("\r\n")}\r\n`;
}

/** A safe file name: sydcrest-<table>-<from>-to-<to>.csv */
export function csvFileName(table: string, from: string, to: string) {
  return `sydcrest-${table.replace(/[^a-z0-9_]/g, "")}-${from}-to-${to}.csv`;
}
